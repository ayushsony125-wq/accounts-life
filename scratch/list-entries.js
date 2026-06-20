const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
  const entries = await prisma.entry.findMany({
    include: {
      standardDetail: true
    }
  })

  console.log(`Total Entries in DB: ${entries.length}`)
  
  const groups = {}
  entries.forEach(e => {
    const type = e.entryType
    const framework = e.standardDetail?.standardFramework || 'N/A'
    const key = `${type} (${framework})`
    if (!groups[key]) groups[key] = []
    groups[key].push(e.entrySlug)
  })

  console.log('\n--- Entries grouped by Type and Framework: ---')
  for (const [key, slugs] of Object.entries(groups)) {
    console.log(`\n* ${key} [${slugs.length} items]:`)
    console.log(slugs.slice(0, 15).join(', ') + (slugs.length > 15 ? '...' : ''))
  }
}

main()
  .catch(err => {
    console.error('Error running script:', err)
  })
  .finally(() => {
    prisma.$disconnect()
  })
