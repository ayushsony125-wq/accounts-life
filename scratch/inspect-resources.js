const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching all resource records for entry with slug as-1...');
  const entry = await prisma.entry.findUnique({
    where: { entrySlug: 'as-1' },
    include: {
      resources: true
    }
  });

  if (!entry) {
    console.log('AS-1 entry not found in the database.');
    return;
  }

  console.log(`Entry found: ID=${entry.id}, Title="${entry.entryTitle}", Status="${entry.status}"`);
  console.log(`Total Resources: ${entry.resources.length}`);
  
  entry.resources.forEach((r, idx) => {
    console.log(`\nResource #${idx + 1}:`);
    console.log(`- ID: ${r.id}`);
    console.log(`- Type: ${r.resourceType}`);
    console.log(`- Title: ${r.resourceTitle}`);
    if (r.resourceUrl) {
      console.log(`- URL Length: ${r.resourceUrl.length}`);
      console.log(`- URL Snippet: ${r.resourceUrl.substring(0, 80)}...`);
    } else {
      console.log(`- URL: null`);
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
