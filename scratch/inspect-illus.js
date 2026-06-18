const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const entry = await prisma.entry.findFirst({
      where: { entrySlug: 'as-1' },
      include: {
        illustrations: { take: 8 }
      }
    });
    entry.illustrations.forEach((i, idx) => {
      console.log(`\n--- Illustration ${idx + 1}: ${i.illusTitle} ---`);
      console.log(`Scenario: ${i.illusScenario?.substring(0, 200)}...`);
      console.log(`Answer: ${i.illusAnswer?.substring(0, 200)}...`);
      console.log(`Working: ${i.illusWorking?.substring(0, 200)}...`);
      console.log(`Note: ${i.illusNote?.substring(0, 200)}...`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
