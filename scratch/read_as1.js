const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function run() {
  const entry = await p.entry.findFirst({
    where: { entrySlug: 'as-1' },
    include: {
      standardDetail: {
        include: {
          disclosureGroups: {
            include: { items: true }
          },
          comparisonRows: true
        }
      },
      illustrations: true,
      resources: true,
      faqs: true,
      notes: true
    }
  });
  console.log(JSON.stringify(entry, null, 2));
  await p.$disconnect();
}

run().catch(console.error);
