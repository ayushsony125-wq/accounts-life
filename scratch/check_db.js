const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to database...');
  const entries = await prisma.entry.findMany();
  console.log(`Checking ${entries.length} entries...`);
  for (const entry of entries) {
    const bodyStr = JSON.stringify(entry.entryBody);
    if (bodyStr && (bodyStr.includes('DEPLOYMENT') || bodyStr.includes('TEST') || bodyStr.includes('marker') || bodyStr.includes('BUILD-XYZ'))) {
      console.log(`[ENTRY] ID ${entry.id} slug="${entry.entrySlug}" contains keyword:`);
      if (bodyStr.includes('DEPLOYMENT')) console.log('  - DEPLOYMENT');
      if (bodyStr.includes('TEST')) console.log('  - TEST');
      if (bodyStr.includes('marker')) console.log('  - marker');
      if (bodyStr.includes('BUILD-XYZ')) console.log('  - BUILD-XYZ');
    }
  }
  
  const standardDetails = await prisma.standardDetail.findMany();
  console.log(`Checking ${standardDetails.length} standard details...`);
  for (const sd of standardDetails) {
    const sdStr = JSON.stringify(sd);
    if (sdStr && (sdStr.includes('DEPLOYMENT') || sdStr.includes('TEST') || sdStr.includes('marker') || sdStr.includes('BUILD-XYZ'))) {
      console.log(`[STANDARD_DETAIL] Entry ID ${sd.entryId} contains keyword`);
    }
  }
  
  console.log('Search complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
