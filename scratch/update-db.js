const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating resource title in DB...');
  const res = await prisma.entryResource.update({
    where: { id: 5 },
    data: {
      resourceTitle: 'AS 1 Official Accounting Standard Text'
    }
  });
  console.log('UPDATED RESOURCE:', res);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
