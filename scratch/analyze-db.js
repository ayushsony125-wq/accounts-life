const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== VERIFY DATABASE RECORDS ===');
  
  // 1. Check domains & subdomains
  const domains = await prisma.domain.findMany({
    select: { id: true, domainCode: true, domainName: true, domainSlug: true }
  });
  console.log('\n--- Domains:');
  console.log(domains);

  // 2. Check entries for AS and Schedule III
  console.log('\n--- Entries related to AS (as) or Schedule III (schedule-iii or similar):');
  const entries = await prisma.entry.findMany({
    where: {
      OR: [
        { entrySlug: { contains: 'as-' } },
        { entrySlug: { contains: 'as1' } },
        { entrySlug: { contains: 'schedule' } }
      ]
    },
    select: {
      id: true,
      entrySlug: true,
      entryTitle: true,
      entryType: true,
      domainId: true,
      status: true
    }
  });
  console.log(entries);

  // 3. Verify entry resources
  console.log('\n--- Entry Resources (PDF and VIDEO):');
  const resources = await prisma.entryResource.findMany({
    include: {
      entry: {
        select: { entrySlug: true, entryTitle: true }
      },
      mediaFile: {
        select: { id: true, fileName: true, filePath: true, fileSizeBytes: true, fileType: true }
      }
    }
  });
  
  console.log(`Total resources: ${resources.length}`);
  resources.forEach(r => {
    console.log(`Resource ID: ${r.id}`);
    console.log(`  Entry Slug: ${r.entry?.entrySlug}`);
    console.log(`  Type: ${r.resourceType}`);
    console.log(`  Title: ${r.resourceTitle}`);
    console.log(`  URL: ${r.resourceUrl ? r.resourceUrl.substring(0, 100) + (r.resourceUrl.length > 100 ? '...' : '') : 'null'}`);
    if (r.mediaFile) {
      console.log(`  MediaFile Mapping: ID=${r.mediaFile.id}, Name=${r.mediaFile.fileName}`);
      console.log(`    FilePath Type/Prefix: ${r.mediaFile.filePath ? r.mediaFile.filePath.substring(0, 50) + '...' : 'null'}`);
      console.log(`    File Size: ${r.mediaFile.fileSizeBytes} bytes`);
    } else {
      console.log(`  MediaFile Mapping: NONE`);
    }
  });

  // 4. Check Homepage configs
  console.log('\n--- Homepage Configs:');
  const configs = await prisma.homepageConfig.findMany();
  console.log(configs);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
