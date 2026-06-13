const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AS 1 database records with official links...');
  
  // Find AS 1 entry
  const entry = await prisma.entry.findUnique({
    where: { entrySlug: 'as-1' }
  });
  
  if (!entry) {
    console.error('AS 1 entry not found in database!');
    return;
  }
  
  const entryId = entry.id;

  // Clear existing resources/illustrations for AS 1
  await prisma.entryResource.deleteMany({ where: { entryId } });
  await prisma.entryIllustration.deleteMany({ where: { entryId } });

  // 1. Create resources (Video, PDF, Reference Link)
  await prisma.entryResource.createMany({
    data: [
      {
        entryId,
        resourceType: 'VIDEO',
        resourceTitle: 'AS 1 - Disclosure of Accounting Policies (Full Class)',
        resourceUrl: 'https://youtu.be/nyA1pKuWVWY?si=T7aO6wUVdG8E9Gme',
        sourceType: 'EXTERNAL',
        sortOrder: 1
      },
      {
        entryId,
        resourceType: 'PDF',
        resourceTitle: 'AS 1 Official Accounting Standard Text (ICAI)',
        resourceUrl: 'https://resource.cdn.icai.org/89095asb-aps2918-as1.pdf',
        sourceType: 'ICAI_OFFICIAL',
        sortOrder: 2
      },
      {
        entryId,
        resourceType: 'REFERENCE',
        resourceTitle: 'Lecture Reference Link',
        resourceUrl: 'https://youtu.be/nyA1pKuWVWY?si=T7aO6wUVdG8E9Gme',
        sourceType: 'EXTERNAL',
        sortOrder: 3
      }
    ]
  });

  // 2. Create illustrations
  await prisma.entryIllustration.createMany({
    data: [
      {
        entryId,
        illusTitle: 'Example 1: Change in Depreciation Method',
        illusScenario: 'A company changes its depreciation calculation method from Straight Line (SLM) to Written Down Value (WDV) to reflect actual usage pattern.',
        illusAnswer: 'Under AS 1, a change in accounting policy is permissible only if required by statute, for compliance with an accounting standard, or if it results in a more appropriate presentation. The company must disclose the change, the reasons for it, and the quantitative impact on current year profits.',
        illusWorking: 'Depreciation method changes are treated as a change in accounting policy under AS 1 (though modern standards treat it as estimate change, under classical AS it is a policy change). Disclose impact in Notes to Accounts.',
        sortOrder: 1
      },
      {
        entryId,
        illusTitle: 'Example 2: Disclosure of Inventory Valuation',
        illusScenario: 'A trade retailer values raw stocks at Weighted Average Cost and finished goods at FIFO. They ask if a summary list of valuation methods is sufficient.',
        illusAnswer: 'AS 1 requires that all significant accounting policies, especially where options exist (like inventory valuation methods), must be disclosed in a single place as part of the financial statements, typically in Note 1.',
        illusWorking: 'Ensure all policies are consolidated in Note 1 rather than scattered across various financial statement line notes.',
        sortOrder: 2
      }
    ]
  });

  console.log('✅ AS 1 successfully seeded with official links.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
