const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const mediaFiles = await prisma.mediaFile.findMany({
      select: {
        id: true,
        fileName: true,
        fileType: true,
        uploadedAt: true,
      }
    });
    console.log('--- MEDIA FILES ---');
    console.log(mediaFiles);

    const resources = await prisma.entryResource.findMany({
      select: {
        id: true,
        entryId: true,
        resourceType: true,
        resourceTitle: true,
        resourceUrl: true,
        mediaFileId: true,
        entry: {
          select: {
            entrySlug: true,
            entryTitle: true,
          }
        }
      }
    });
    console.log('\n--- ENTRY RESOURCES ---');
    console.log(resources);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
