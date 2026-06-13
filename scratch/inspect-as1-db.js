const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const as1 = await prisma.entry.findFirst({
    where: { entrySlug: 'as-1' },
    include: {
      standardDetail: true
    }
  });
  console.log('--- AS 1 DB ---');
  console.log(JSON.stringify(as1, null, 2));

  const indAs1 = await prisma.entry.findFirst({
    where: { entrySlug: 'ind-as-1' },
    include: {
      standardDetail: true
    }
  });
  console.log('--- Ind AS 1 DB ---');
  console.log(JSON.stringify(indAs1, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
