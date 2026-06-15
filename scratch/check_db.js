const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Fetching PDF resources from database...')
  const pdfs = await prisma.entryResource.findMany({
    where: { resourceType: 'PDF' },
    include: {
      entry: true
    }
  })

  console.log(`\nFound ${pdfs.length} PDF resources in database:\n`)
  pdfs.forEach(p => {
    const isBase64 = p.resourceUrl?.startsWith('data:')
    const preview = isBase64 ? `${p.resourceUrl.substring(0, 50)}... (Length: ${p.resourceUrl.length})` : p.resourceUrl
    console.log(`ID: ${p.id}`)
    console.log(`Entry: ${p.entry.entryTitle} (${p.entry.entrySlug})`)
    console.log(`Title: ${p.resourceTitle}`)
    console.log(`URL: ${preview}`)
    console.log(`Source Type: ${p.sourceType}`)
    console.log('-'.repeat(40))
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
