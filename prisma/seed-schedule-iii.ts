import { PrismaClient } from '@prisma/client'
import { SCHEDULE_III_DATA } from '../app/standards/schedule-iii/data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Schedule III entries into the database...')

  const domainId = 4 // Company Accounts
  const subdomainId = 12 // Final Accounts of Companies

  const divisions = [
    { key: 'div1', framework: 'AS', name: 'Division I (AS Companies)' },
    { key: 'div2', framework: 'IND_AS', name: 'Division II (Ind AS Companies)' },
    { key: 'div3', framework: 'IND_AS', name: 'Division III (Ind AS NBFCs)' }
  ] as const

  const parts = [
    { key: 'balanceSheet', name: 'Balance Sheet', slugSuffix: 'balance-sheet' },
    { key: 'profitAndLoss', name: 'Profit and Loss', slugSuffix: 'profit-loss' },
    { key: 'cashFlow', name: 'Cash Flow Statements', slugSuffix: 'cash-flow' },
    { key: 'others', name: 'Others', slugSuffix: 'others' }
  ] as const

  for (const div of divisions) {
    for (const part of parts) {
      const slug = `schedule-iii-${div.key}-${part.slugSuffix}`
      const topicData = (SCHEDULE_III_DATA as any)[div.key][part.key]

      if (!topicData) continue

      console.log(`Processing entry: ${slug}...`)

      // Check if entry exists
      let entry = await prisma.entry.findUnique({
        where: { entrySlug: slug }
      })

      // Convert content to Visual Blocks
      const blocks: any[] = []

      // 1. Meaning
      blocks.push({ id: `meaning-h-${Date.now()}`, type: 'HEADING', content: 'Meaning & Overview' })
      blocks.push({ id: `meaning-p-${Date.now()}`, type: 'PARAGRAPH', content: topicData.content.meaning || '' })

      // 2. Scope
      blocks.push({ id: `scope-h-${Date.now()}`, type: 'HEADING', content: 'Scope of Application' })
      blocks.push({ id: `scope-p-${Date.now()}`, type: 'PARAGRAPH', content: topicData.content.scope || '' })

      // 3. Classification Rules
      if (topicData.content.classificationRules && topicData.content.classificationRules.length > 0) {
        blocks.push({ id: `rules-h-${Date.now()}`, type: 'HEADING', content: 'Classification Rules & Guidelines' })
        topicData.content.classificationRules.forEach((rule: any, i: number) => {
          blocks.push({
            id: `rules-n-${i}-${Date.now()}`,
            type: 'NOTE',
            title: rule.title || 'Guideline',
            body: rule.body || ''
          })
        })
      }

      // 4. Formats & Tables
      if (topicData.content.formats && topicData.content.formats.length > 0) {
        blocks.push({ id: `formats-h-${Date.now()}`, type: 'HEADING', content: 'Statutory Presentation Formats' })
        topicData.content.formats.forEach((fmt: any, i: number) => {
          blocks.push({
            id: `formats-title-${i}-${Date.now()}`,
            type: 'SUB_HEADING',
            content: fmt.title || 'Format Structure'
          })
          blocks.push({
            id: `formats-t-${i}-${Date.now()}`,
            type: 'TABLE',
            headers: fmt.headers || [],
            rows: fmt.rows || []
          })
        })
      }

      // 5. Takeaways
      if (topicData.content.takeaways && topicData.content.takeaways.length > 0) {
        blocks.push({ id: `takeaways-h-${Date.now()}`, type: 'HEADING', content: 'Key Disclosures & Takeaways' })
        topicData.content.takeaways.forEach((take: any, i: number) => {
          blocks.push({
            id: `takeaways-n-${i}-${Date.now()}`,
            type: 'PRACTICAL_USE',
            title: take.title || 'Disclosure Note',
            body: take.body || ''
          })
        })
      }

      // 6. Exam Traps
      if (topicData.content.examTraps && topicData.content.examTraps.length > 0) {
        blocks.push({ id: `traps-h-${Date.now()}`, type: 'HEADING', content: 'Exam Traps & Crucial Points' })
        topicData.content.examTraps.forEach((trap: any, i: number) => {
          blocks.push({
            id: `traps-e-${i}-${Date.now()}`,
            type: 'EXAM_TRAP',
            title: trap.title || 'Warning',
            body: trap.body || ''
          })
        })
      }

      // 7. Case Laws
      if (topicData.content.caseLaws && topicData.content.caseLaws.length > 0) {
        blocks.push({ id: `caselaw-h-${Date.now()}`, type: 'HEADING', content: 'Case Laws & Judicial Guidance' })
        topicData.content.caseLaws.forEach((cl: any, i: number) => {
          blocks.push({
            id: `caselaw-c-${i}-${Date.now()}`,
            type: 'CASE_LAW',
            title: cl.title || 'Ruling',
            citation: cl.citation || 'Official Citation',
            verdict: cl.body || ''
          })
        })
      }

      // 8. Examples
      if (topicData.content.examples && topicData.content.examples.length > 0) {
        blocks.push({ id: `examples-h-${Date.now()}`, type: 'HEADING', content: 'Illustrations & Practical Scenarios' })
        topicData.content.examples.forEach((ex: any, i: number) => {
          blocks.push({
            id: `examples-ex-${i}-${Date.now()}`,
            type: 'EXAMPLE',
            title: ex.title || 'Scenario Illustration',
            scenario: ex.scenario || '',
            working: ex.solution || '',
            answer: ex.solution || '',
            note: ''
          })
        })
      }

      const entryPayload = {
        entryType: 'STANDARD' as const,
        entryTitle: topicData.title,
        entrySlug: slug,
        domainId: domainId,
        subdomainId: subdomainId,
        summary: `Complete Statutory Presentation Guidance and Disclosure Requirements for ${topicData.title}.`,
        entryBody: { blocks },
        authorityPrimary: topicData.sourceLabel || 'Companies Act 2013',
        authorityPrimaryUrl: topicData.sourceLink || null,
        verificationLevel: 'VERIFIED' as const,
        status: 'PUBLISHED' as const,
        examLevelTags: ['CA Final', 'CA Intermediate'],
        isFeatured: false,
        seoTitle: topicData.title,
        seoDescription: `Guidance on ${topicData.title} under Schedule III of the Companies Act 2013.`
      }

      if (entry) {
        // Update entry structure
        await prisma.entry.update({
          where: { id: entry.id },
          data: {
            ...entryPayload,
            standardDetail: {
              upsert: {
                create: {
                  standardCode: `Sch III ${div.key.toUpperCase()} ${part.name}`,
                  standardFramework: div.framework as any,
                  standardStatus: 'ACTIVE',
                  issuingBody: 'MCA',
                  dateIssued: new Date('2013-08-29')
                },
                update: {
                  standardCode: `Sch III ${div.key.toUpperCase()} ${part.name}`,
                  standardFramework: div.framework as any,
                  standardStatus: 'ACTIVE',
                  issuingBody: 'MCA'
                }
              }
            }
          }
        })
        console.log(`Updated Schedule III entry: ${slug}`)
      } else {
        // Create entry structure
        await prisma.entry.create({
          data: {
            ...entryPayload,
            standardDetail: {
              create: {
                standardCode: `Sch III ${div.key.toUpperCase()} ${part.name}`,
                standardFramework: div.framework as any,
                standardStatus: 'ACTIVE',
                issuingBody: 'MCA',
                dateIssued: new Date('2013-08-29')
              }
            }
          }
        })
        console.log(`Created new Schedule III entry: ${slug}`)
      }
    }
  }

  console.log('Schedule III seeding completed successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
