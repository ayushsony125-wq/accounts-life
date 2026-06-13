const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Ind AS 1 database records...');
  
  // Find Ind AS 1 entry
  const entry = await prisma.entry.findUnique({
    where: { entrySlug: 'ind-as-1' }
  });
  
  if (!entry) {
    console.error('Ind AS 1 entry not found in database!');
    return;
  }
  
  const entryId = entry.id;

  // Clear existing resources/illustrations for Ind AS 1
  await prisma.entryResource.deleteMany({ where: { entryId } });
  await prisma.entryIllustration.deleteMany({ where: { entryId } });

  // 1. Create resources (Video, PDF, Reference Link)
  await prisma.entryResource.createMany({
    data: [
      {
        entryId,
        resourceType: 'VIDEO',
        resourceTitle: 'Ind AS 1 - Presentation of Financial Statements (Full Class)',
        resourceUrl: 'https://youtu.be/nyA1pKuWVWY?si=T7aO6wUVdG8E9Gme',
        sourceType: 'EXTERNAL',
        sortOrder: 1
      },
      {
        entryId,
        resourceType: 'PDF',
        resourceTitle: 'Ind AS 1 Official Accounting Standard Text',
        resourceUrl: 'https://resource.cdn.icai.org/89095asb-aps2918-as1.pdf',
        sourceType: 'EXTERNAL',
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
        illusTitle: 'Example 1: Classification of Assets/Liabilities as Current vs Non-Current',
        illusScenario: 'An entity has a loan payable in 18 months. However, the agreement contains a clause allowing the lender to demand immediate repayment if certain covenant is breached. The covenant is breached at the reporting date, but the lender agrees not to demand repayment for 12 months after reporting date. The agreement of forbearance was signed after reporting date but before approval of financial statements.',
        illusAnswer: 'Under Ind AS 1, the liability must be classified as current. The criteria for classification must be met at the reporting date. Since the entity did not have an unconditional right to defer settlement for at least 12 months at the reporting date, post-reporting date rectifications or forbearance agreements cannot change the classification.',
        illusWorking: 'Ind AS 1 Para 69-76. Classification as current is required if covenant is breached at reporting date, even if lender waives it after reporting date but before authorization.',
        sortOrder: 1
      },
      {
        entryId,
        illusTitle: 'Example 2: Disclosure of Key Sources of Estimation Uncertainty',
        illusScenario: 'An engineering company has major litigation pending. They disclosed the contingent liability in the notes. Do they need additional disclosure under Ind AS 1?',
        illusAnswer: 'Yes. Ind AS 1 requires disclosure of information about assumptions made about the future, and other major sources of estimation uncertainty at the reporting date, that have a significant risk of causing a material adjustment to the carrying amounts of assets and liabilities within the next financial year.',
        illusWorking: 'Ind AS 1 Para 125. Disclose carrying amounts and details of assumptions to aid transparency.',
        sortOrder: 2
      }
    ]
  });

  console.log('✅ Ind AS 1 successfully seeded in DB.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
