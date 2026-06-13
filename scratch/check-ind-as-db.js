const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- IND AS ENTRIES IN DATABASE ---');
  const entries = await prisma.entry.findMany({
    where: {
      entrySlug: { startsWith: 'ind-as-' }
    },
    include: {
      resources: true,
      illustrations: true
    }
  });

  for (const e of entries) {
    console.log(`Slug: ${e.entrySlug}`);
    console.log(`Resources Count: ${e.resources.length}`);
    for (const r of e.resources) {
      console.log(` - ${r.resourceType}: ${r.resourceTitle} (${r.resourceUrl})`);
    }
    console.log(`Illustrations Count: ${e.illustrations.length}`);
    for (const i of e.illustrations) {
      console.log(` - Illus: ${i.illusTitle}`);
    }
    console.log('---');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
