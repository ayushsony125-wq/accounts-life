const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const all = await prisma.entry.findMany({
    where: { entryType: 'STANDARD' },
    include: { standardDetail: true }
  });

  const counts = { AS: 0, IND_AS: 0, SCHEDULE_III: 0, OTHER: 0 };
  
  all.forEach(e => {
    const slug = e.entrySlug;
    const fw = e.standardDetail?.standardFramework;
    
    if (slug.startsWith('schedule-iii-')) {
      counts.SCHEDULE_III++;
    } else if (fw === 'AS') {
      counts.AS++;
    } else if (fw === 'IND_AS') {
      counts.IND_AS++;
    } else {
      counts.OTHER++;
    }
  });

  console.log('--- VERIFIED DATABASE COUNTS ---');
  console.log(`Total Standard Entries: ${all.length}`);
  console.log(`AS Count (including Intro): ${counts.AS}`);
  console.log(`Ind AS Count (including Intro): ${counts.IND_AS}`);
  console.log(`Schedule III Count: ${counts.SCHEDULE_III}`);
  console.log(`Other: ${counts.OTHER}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
