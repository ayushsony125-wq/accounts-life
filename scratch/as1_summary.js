const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function run() {
  const entry = await p.entry.findFirst({
    where: { entrySlug: 'as-1' },
    include: {
      standardDetail: true,
      illustrations: true,
      resources: true,
      faqs: true,
      notes: true
    }
  });
  if (!entry) {
    console.log('No AS 1 entry found!');
    await p.$disconnect();
    return;
  }
  console.log('Title:', entry.entryTitle);
  console.log('Slug:', entry.entrySlug);
  console.log('Status:', entry.status);
  console.log('Notes count:', entry.notes.length);
  console.log('Illustrations count:', entry.illustrations.length);
  console.log('Resources count:', entry.resources.length);
  console.log('FAQs count:', entry.faqs.length);
  console.log('StandardDetail:', entry.standardDetail ? 'Yes' : 'No');
  if (entry.standardDetail) {
    console.log('  Standard Code:', entry.standardDetail.standardCode);
    console.log('  Framework:', entry.standardDetail.standardFramework);
    console.log('  Objective length:', entry.standardDetail.objectiveText?.length || 0);
    console.log('  Scope length:', entry.standardDetail.scopeStatement?.length || 0);
  }
  await p.$disconnect();
}

run().catch(console.error);
