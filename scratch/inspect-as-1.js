const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const e = await prisma.entry.findUnique({
    where: { entrySlug: 'as-1' },
    include: {
      standardDetail: true,
      resources: true,
      illustrations: true,
      faqs: true
    }
  });
  console.log('--- DB AS-1 Record ---');
  console.log(JSON.stringify(e, null, 2));
}

run().catch(console.error).finally(() => prisma.$disconnect());
