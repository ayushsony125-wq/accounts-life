const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const resources = await prisma.entryResource.findMany({
      include: {
        entry: {
          select: {
            entrySlug: true,
            entryTitle: true,
            entryType: true
          }
        }
      }
    });
    console.log('--- ALL ENTRY RESOURCES IN DB ---');
    resources.forEach(r => {
      console.log(`Resource ID: ${r.id} | Entry: ${r.entry.entrySlug} (${r.entry.entryType}) | Type: ${r.resourceType} | Title: ${r.resourceTitle} | URL: ${r.resourceUrl?.substring(0, 100)} | MediaFileId: ${r.mediaFileId}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
