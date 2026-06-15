const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const entry = await prisma.entry.findUnique({
    where: { id: 10 },
    include: {
      notes: true,
      illustrations: true,
      faqs: true,
      resources: true
    }
  });

  console.log('--- AS 1 RELATED DATA ---');
  console.log('Notes count:', entry.notes.length);
  console.log('Notes:', JSON.stringify(entry.notes, null, 2));
  console.log('Illustrations count:', entry.illustrations.length);
  console.log('FAQs count:', entry.faqs.length);
  console.log('FAQs:', JSON.stringify(entry.faqs, null, 2));
  console.log('Resources count:', entry.resources.length);
  console.log('Resources:', JSON.stringify(entry.resources, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
