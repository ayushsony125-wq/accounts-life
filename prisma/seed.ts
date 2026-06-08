/**
 * prisma/seed.ts
 *
 * Seeds the database with domain and subdomain metadata from the
 * static data collection at lib/data/domains.ts.
 *
 * Run with: npx prisma db seed
 * (Requires "prisma": { "seed": "ts-node --transpile-only prisma/seed.ts" }
 *  to be added to package.json — see comment below.)
 */

import { PrismaClient } from '@prisma/client'
import { DOMAINS } from '../lib/data/domains'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Accounts.Life database …\n')

  for (const d of DOMAINS) {
    // Upsert the domain row
    const domain = await db.domain.upsert({
      where: { domainCode: d.domainCode },
      create: {
        domainCode: d.domainCode,
        domainName: d.domainName,
        domainSlug: d.domainSlug,
        domainTagline: d.domainTagline,
        domainDescription: d.domainDescription,
        domainColorHex: d.domainColorHex,
        domainStatus: d.domainStatus,
        sortOrder: d.sortOrder,
        plannedEntryCount: d.plannedEntryCount,
      },
      update: {
        domainName: d.domainName,
        domainSlug: d.domainSlug,
        domainTagline: d.domainTagline,
        domainDescription: d.domainDescription,
        domainColorHex: d.domainColorHex,
        domainStatus: d.domainStatus,
        sortOrder: d.sortOrder,
        plannedEntryCount: d.plannedEntryCount,
      },
    })

    console.log(`  ✓ Domain ${domain.domainCode}: ${domain.domainName}`)

    // Upsert subdomains for this domain
    for (let i = 0; i < d.subdomains.length; i++) {
      const s = d.subdomains[i]
      await db.subdomain.upsert({
        where: {
          domainId_subdomainSlug: {
            domainId: domain.id,
            subdomainSlug: s.slug,
          },
        },
        create: {
          domainId: domain.id,
          subdomainName: s.name,
          subdomainSlug: s.slug,
          sortOrder: i,
        },
        update: {
          subdomainName: s.name,
          sortOrder: i,
        },
      })
      console.log(`     ↳ Subdomain: ${s.name}`)
    }
  }

  console.log('\n✅ Seeding complete.')
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

/*
 * REQUIRED: Add the following to package.json to enable `npx prisma db seed`:
 *
 * "prisma": {
 *   "seed": "ts-node --transpile-only prisma/seed.ts"
 * }
 *
 * And install ts-node as a dev dependency:
 *   npm install -D ts-node
 */
