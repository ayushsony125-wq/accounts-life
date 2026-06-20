const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== MEDIA FILES ===');
  const mediaFiles = await prisma.mediaFile.findMany({
    select: {
      id: true,
      fileName: true,
      fileSizeBytes: true,
      fileType: true,
      uploadedAt: true
    }
  });
  console.log(mediaFiles);
  
  console.log('\n=== HOMEPAGE SECTIONS ORDER ===');
  const config = await prisma.homepageConfig.findUnique({
    where: { key: 'homepage_layout_config' }
  });
  console.log(config?.value?.sectionsOrder);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
