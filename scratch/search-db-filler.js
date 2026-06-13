const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Searching database for filler text...');
  const rx = /authority and the applicability|different entities|AS to different/i;

  const entries = await prisma.entry.findMany({});
  for (const e of entries) {
    if (e.summary && rx.test(e.summary)) {
      console.log(`Found in Entry slug: ${e.entrySlug} (summary): "${e.summary}"`);
    }
    if (e.entryBody) {
      const bodyStr = typeof e.entryBody === 'string' ? e.entryBody : JSON.stringify(e.entryBody);
      if (rx.test(bodyStr)) {
        console.log(`Found in Entry slug: ${e.entrySlug} (body)`);
      }
    }
  }

  const details = await prisma.standardDetail.findMany({});
  for (const d of details) {
    if (d.objectiveText && rx.test(d.objectiveText)) {
      console.log(`Found in StandardDetail id: ${d.id} (objective)`);
    }
    if (d.scopeStatement && rx.test(d.scopeStatement)) {
      console.log(`Found in StandardDetail id: ${d.id} (scope)`);
    }
  }
  console.log('Search finished.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
