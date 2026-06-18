const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const entry = await prisma.entry.findFirst({
      where: { entrySlug: 'as-1' },
      include: {
        standardDetail: true,
        resources: true,
        illustrations: true,
        notes: true,
        faqs: true
      }
    });
    console.log('--- AS-1 ENTRY IN DB ---');
    console.log(JSON.stringify(entry, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
