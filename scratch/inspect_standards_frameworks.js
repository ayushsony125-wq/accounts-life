const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching all STANDARD entries from the database...');
  const entries = await prisma.entry.findMany({
    where: {
      entryType: 'STANDARD',
    },
    include: {
      standardDetail: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  console.log(`Found ${entries.length} standard entries:\n`);
  console.log(JSON.stringify(
    entries.map(e => ({
      id: e.id,
      slug: e.entrySlug,
      title: e.entryTitle,
      standardCode: e.standardDetail?.standardCode,
      standardFramework: e.standardDetail?.standardFramework,
    })),
    null,
    2
  ));
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
