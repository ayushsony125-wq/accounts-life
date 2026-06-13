const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- DB ENTRIES IN STANDARD CLASSIFICATION ---');
  const entries = await prisma.entry.findMany({
    include: {
      standardDetail: true
    }
  });

  for (const e of entries) {
    console.log(`\nEntry ID: ${e.id}`);
    console.log(`Slug: ${e.entrySlug}`);
    console.log(`Title: ${e.entryTitle}`);
    console.log(`Status: ${e.status}`);
    console.log(`Type: ${e.entryType}`);
    if (e.standardDetail) {
      console.log(`Framework: ${e.standardDetail.standardFramework}`);
      console.log(`Code: ${e.standardDetail.standardCode}`);
      console.log(`Objective: ${e.standardDetail.objectiveText ? e.standardDetail.objectiveText.substring(0, 100) + '...' : 'None'}`);
    } else {
      console.log('No StandardDetail');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
