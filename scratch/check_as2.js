const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const entry = await prisma.entry.findUnique({
    where: { id: 11 },
    include: {
      illustrations: true,
      standardDetail: true
    }
  });
  console.log('--- ENTRY 11 ---');
  console.log('Slug:', entry.entrySlug);
  console.log('Title:', entry.entryTitle);
  console.log('EntryBody:', JSON.stringify(entry.entryBody, null, 2));
  console.log('Illustrations count:', entry.illustrations.length);
  console.log('StandardDetail exists:', !!entry.standardDetail);
}

main().catch(console.error).finally(() => prisma.$disconnect());
