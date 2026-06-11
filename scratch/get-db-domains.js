const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function run() {
  await p.$connect()
  const domains = await p.domain.findMany({
    include: { subdomains: true }
  })
  console.log('--- DOMAINS IN DATABASE ---')
  domains.forEach(d => {
    console.log(`- ${d.domainName} (${d.domainSlug}): [${d.subdomains.map(s => s.subdomainSlug).join(', ')}]`)
  })

  const entriesCount = await p.entry.count()
  console.log('\nTotal Entries Count:', entriesCount)

  const entries = await p.entry.findMany({
    take: 10,
    select: { entryTitle: true, entrySlug: true, domain: { select: { domainSlug: true } }, subdomain: { select: { subdomainSlug: true } } }
  })
  console.log('\nSample Entries:')
  entries.forEach(e => {
    console.log(`- ${e.entryTitle} (${e.entrySlug}) under ${e.domain.domainSlug}/${e.subdomain.subdomainSlug}`)
  })
  
  await p.$disconnect()
}

run().catch(e => {
  console.error(e)
  p.$disconnect()
})
