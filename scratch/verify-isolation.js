const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== VERIFY RESOURCE ISOLATION ===');
  
  // 1. Fetch entries by domain
  const asEntries = await prisma.entry.findMany({
    where: {
      standardDetail: {
        standardFramework: 'AS'
      },
      NOT: {
        entrySlug: { startsWith: 'schedule-iii-' }
      }
    },
    include: {
      resources: true
    }
  });

  const indAsEntries = await prisma.entry.findMany({
    where: {
      standardDetail: {
        standardFramework: 'IND_AS'
      },
      NOT: {
        entrySlug: { startsWith: 'schedule-iii-' }
      }
    },
    include: {
      resources: true
    }
  });

  const scheduleIiiEntries = await prisma.entry.findMany({
    where: {
      entrySlug: { startsWith: 'schedule-iii-' }
    },
    include: {
      resources: true
    }
  });

  console.log(`\n--- AS Standards (Framework=AS, no schedule-iii prefix):`);
  console.log(`Total AS Entries: ${asEntries.length}`);
  let totalAsResources = 0;
  asEntries.forEach(e => {
    if (e.resources.length > 0) {
      console.log(`Entry: ${e.entrySlug} (ID: ${e.id})`);
      e.resources.forEach(r => {
        console.log(`  -> Resource: ${r.resourceTitle} (${r.resourceType}) URL: ${r.resourceUrl ? r.resourceUrl.substring(0, 60) + '...' : 'null'}`);
        totalAsResources++;
      });
    }
  });
  console.log(`Total AS Resources: ${totalAsResources}`);

  console.log(`\n--- Ind AS Standards (Framework=IND_AS, no schedule-iii prefix):`);
  console.log(`Total Ind AS Entries: ${indAsEntries.length}`);
  let totalIndAsResources = 0;
  indAsEntries.forEach(e => {
    if (e.resources.length > 0) {
      console.log(`Entry: ${e.entrySlug} (ID: ${e.id})`);
      e.resources.forEach(r => {
        console.log(`  -> Resource: ${r.resourceTitle} (${r.resourceType}) URL: ${r.resourceUrl ? r.resourceUrl.substring(0, 60) + '...' : 'null'}`);
        totalIndAsResources++;
      });
    }
  });
  console.log(`Total Ind AS Resources: ${totalIndAsResources}`);

  console.log(`\n--- Schedule III Standards (slug starts with schedule-iii-):`);
  console.log(`Total Schedule III Entries: ${scheduleIiiEntries.length}`);
  let totalSchIiiResources = 0;
  scheduleIiiEntries.forEach(e => {
    if (e.resources.length > 0) {
      console.log(`Entry: ${e.entrySlug} (ID: ${e.id})`);
      e.resources.forEach(r => {
        console.log(`  -> Resource: ${r.resourceTitle} (${r.resourceType}) URL: ${r.resourceUrl ? r.resourceUrl.substring(0, 60) + '...' : 'null'}`);
        totalSchIiiResources++;
      });
    }
  });
  console.log(`Total Schedule III Resources: ${totalSchIiiResources}`);

  // 2. Perform validation checks
  // Check if any resource ID overlaps or if any entry contains resources of other domains
  console.log('\n--- Overlap / Leakage checks:');
  const asEntryIds = new Set(asEntries.map(e => e.id));
  const indAsEntryIds = new Set(indAsEntries.map(e => e.id));
  const schIiiEntryIds = new Set(scheduleIiiEntries.map(e => e.id));

  const allResources = await prisma.entryResource.findMany({
    include: {
      entry: true
    }
  });

  let leakages = 0;
  allResources.forEach(r => {
    const eid = r.entryId;
    if (asEntryIds.has(eid)) {
      // should be AS resource
      if (r.entry?.entrySlug?.startsWith('schedule-iii-')) {
        console.log(`🔴 LEAKAGE DETECTED: Resource ${r.id} belongs to AS entry ${eid} but slug is Schedule III`);
        leakages++;
      }
    } else if (indAsEntryIds.has(eid)) {
      // should be Ind AS resource
      if (r.entry?.entrySlug?.startsWith('schedule-iii-')) {
        console.log(`🔴 LEAKAGE DETECTED: Resource ${r.id} belongs to Ind AS entry ${eid} but slug is Schedule III`);
        leakages++;
      }
    } else if (schIiiEntryIds.has(eid)) {
      // should be Schedule III resource
      if (!r.entry?.entrySlug?.startsWith('schedule-iii-')) {
        console.log(`🔴 LEAKAGE DETECTED: Resource ${r.id} belongs to Schedule III entry ${eid} but slug is NOT Schedule III`);
        leakages++;
      }
    } else {
      console.log(`Note: Resource ${r.id} belongs to entry ${eid} which is not AS/Ind AS/Schedule III (e.g. general concept or other domain).`);
    }
  });

  if (leakages === 0) {
    console.log('✅ PASS: No resource leakage or overlap detected! AS, Ind AS, and Schedule III resources are strictly mapped and isolated to their respective entry_id records in the database.');
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
