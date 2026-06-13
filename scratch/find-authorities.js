const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- SEARCHING DATABASE FOR ICAI/MCA/MCS ---');

  // Search EntryResource
  const resources = await prisma.entryResource.findMany({});
  for (const r of resources) {
    if (/icai|mca|mcs/i.test(r.resourceTitle) || /icai|mca|mcs/i.test(r.resourceType) || /icai|mca|mcs/i.test(r.resourceUrl || '')) {
      console.log(`Resource [ID: ${r.id}]: "${r.resourceTitle}" (URL: ${r.resourceUrl})`);
    }
  }

  // Search Entry
  const entries = await prisma.entry.findMany({});
  for (const e of entries) {
    if (/icai|mca|mcs/i.test(e.entryTitle) || /icai|mca|mcs/i.test(e.summary || '')) {
      console.log(`Entry [ID: ${e.id}]: Slug: "${e.entrySlug}", Title: "${e.entryTitle}"`);
    }
  }

  // Search StandardDetail
  if (prisma.standardDetail) {
    const details = await prisma.standardDetail.findMany({});
    for (const d of details) {
      if (/icai|mca|mcs/i.test(d.standardFramework || '') || /icai|mca|mcs/i.test(d.standardCode || '')) {
        console.log(`StandardDetail [ID: ${d.id}]: Framework: "${d.standardFramework}", Code: "${d.standardCode}"`);
      }
    }
  }

  console.log('--- DONE ---');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
