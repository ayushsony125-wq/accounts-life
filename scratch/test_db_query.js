const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkEntry(id, framework) {
  const fwKey = framework === 'AS' ? 'AS' : 'IND_AS';
  console.log(`Querying for ${id} with framework ${fwKey}...`);
  try {
    const entry = await prisma.entry.findFirst({
      where: {
        entrySlug: id,
        entryType: 'STANDARD',
        standardDetail: {
          standardFramework: fwKey
        }
      },
      include: {
        standardDetail: true,
        resources: true,
      }
    });
    if (entry) {
      console.log(`✓ Found: ${entry.entryTitle} (ID: ${entry.id})`);
      console.log(`  Resources count: ${entry.resources.length}`);
      console.log(`  Resources:`, entry.resources.map(r => ({ type: r.resourceType, url: r.resourceUrl })));
    } else {
      console.log(`❌ Not found!`);
    }
  } catch (err) {
    console.error(`Error querying ${id}:`, err.message);
  }
}

async function main() {
  await checkEntry('as-1', 'AS');
  await checkEntry('as-2', 'AS');
  await checkEntry('as-3', 'AS');
  await checkEntry('ind-as-1', 'Ind AS');
}

main().finally(async () => {
  await prisma.$disconnect();
});
