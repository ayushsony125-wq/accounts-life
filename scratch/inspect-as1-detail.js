const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const entry = await prisma.entry.findFirst({
      where: { entrySlug: 'as-1' },
      select: {
        id: true,
        entrySlug: true,
        entryTitle: true,
        entryType: true,
        status: true,
        standardDetail: true
      }
    });
    console.log('--- AS-1 ENTRY AND DETAIL ---');
    console.log(JSON.stringify(entry, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
