const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const entry = await prisma.entry.findFirst({
      where: { entrySlug: 'as-1' },
      include: {
        illustrations: { take: 2 }
      }
    });
    entry.illustrations.forEach((i, idx) => {
      console.log(`\n--- Illustration ${idx + 1}: ${i.illusTitle} ---`);
      console.log(`Scenario: ${i.illusScenario}`);
      console.log(`Answer: ${i.illusAnswer}`);
      console.log(`Working: ${i.illusWorking}`);
      console.log(`Note: ${i.illusNote}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
