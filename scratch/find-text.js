const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Searching database for specified keywords...');
  const entries = await prisma.entry.findMany();
  for (const e of entries) {
    const str = JSON.stringify(e);
    if (str.includes('This section provides') || str.includes('Intro to AS')) {
      console.log('Found in Entry:', e.id, e.entrySlug, e.entryTitle);
    }
  }
  const details = await prisma.standardDetail.findMany();
  for (const d of details) {
    const str = JSON.stringify(d);
    if (str.includes('This section provides') || str.includes('Intro to AS')) {
      console.log('Found in StandardDetail:', d.id, d.standardCode);
    }
  }
  console.log('Finished search.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
