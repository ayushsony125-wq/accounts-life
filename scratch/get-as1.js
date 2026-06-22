const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const entry = await prisma.entry.findFirst({
    where: { entrySlug: 'as-1' }
  });
  if (entry) {
    console.log('ID:', entry.id);
    console.log('TYPE OF ENTRY BODY:', typeof entry.entryBody);
    console.log('KEYS OF ENTRY BODY:', Object.keys(entry.entryBody || {}));
    console.log('EXAMPLES HTML IN DB EXISTS:', !!entry.entryBody?.examplesHtml);
    console.log('EXAMPLES HTML LENGTH:', entry.entryBody?.examplesHtml?.length);
  } else {
    console.log('AS-1 not found in DB');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
