const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== FIXING DATABASE FRAMEWORKS IN PRODUCTION ===');

  // Find all standard details where entry slug contains 'ind-as' but standardFramework is 'AS'
  const mismatches = await prisma.standardDetail.findMany({
    where: {
      standardFramework: 'AS',
      entry: {
        entrySlug: {
          contains: 'ind-as'
        }
      }
    },
    include: {
      entry: true
    }
  });

  console.log(`Found ${mismatches.length} mismatches where Ind AS standard details have standardFramework = AS.`);
  
  for (const m of mismatches) {
    console.log(`Fixing mismatch for entry: ${m.entry.entrySlug} (ID: ${m.entryId}) -> setting framework to IND_AS...`);
    await prisma.standardDetail.update({
      where: { id: m.id },
      data: {
        standardFramework: 'IND_AS'
      }
    });
  }

  console.log('\n--- Verifying frameworks after fix:');
  const remainingMismatches = await prisma.standardDetail.count({
    where: {
      standardFramework: 'AS',
      entry: {
        entrySlug: {
          contains: 'ind-as'
        }
      }
    }
  });
  console.log(`Mismatches remaining: ${remainingMismatches}`);
  
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
