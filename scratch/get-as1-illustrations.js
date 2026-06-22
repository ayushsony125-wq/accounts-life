const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const entry = await prisma.entry.findFirst({
    where: { entrySlug: 'as-1' },
    include: { illustrations: true }
  });
  console.log('ILLUSTRATIONS COUNT:', entry ? entry.illustrations.length : 0);
  if (entry && entry.illustrations.length > 0) {
    entry.illustrations.forEach((ill, idx) => {
      console.log(`ILLUSTRATION ${idx + 1}:`, ill.illusTitle, 'sortOrder:', ill.sortOrder);
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
