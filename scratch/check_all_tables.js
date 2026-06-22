const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to database...');
  
  const tables = [
    { name: 'Domain', query: () => prisma.domain.findMany() },
    { name: 'Subdomain', query: () => prisma.subdomain.findMany() },
    { name: 'Entry', query: () => prisma.entry.findMany() },
    { name: 'StandardDetail', query: () => prisma.standardDetail.findMany() },
    { name: 'StandardDefinition', query: () => prisma.standardDefinition.findMany() },
    { name: 'StandardDisclosureGroup', query: () => prisma.standardDisclosureGroup.findMany() },
    { name: 'StandardDisclosureItem', query: () => prisma.standardDisclosureItem.findMany() },
    { name: 'StandardComparisonRow', query: () => prisma.standardComparisonRow.findMany() },
    { name: 'StandardAmendment', query: () => prisma.standardAmendment.findMany() },
    { name: 'EntryJournalEntry', query: () => prisma.entryJournalEntry.findMany() },
    { name: 'JournalEntryRow', query: () => prisma.journalEntryRow.findMany() },
    { name: 'EntryIllustration', query: () => prisma.entryIllustration.findMany() },
    { name: 'EntryResource', query: () => prisma.entryResource.findMany() },
    { name: 'GlossaryTerm', query: () => prisma.glossaryTerm.findMany() },
    { name: 'Revision', query: () => prisma.revision.findMany() },
    { name: 'EntryNote', query: () => prisma.entryNote.findMany() },
    { name: 'EntryFAQ', query: () => prisma.entryFAQ.findMany() },
    { name: 'HomepageConfig', query: () => prisma.homepageConfig.findMany() }
  ];

  for (const table of tables) {
    try {
      const records = await table.query();
      for (const record of records) {
        const str = JSON.stringify(record);
        if (str && (str.includes('DEPLOYMENT') || str.includes('TEST') || str.includes('marker') || str.includes('BUILD-XYZ'))) {
          // Exclude expected configuration descriptions
          if (str.includes('Current deployment configuration') || str.includes('Live production deployment health')) continue;
          
          console.log(`[${table.name}] Record ID ${record.id || 'N/A'} contains keyword:`);
          if (str.includes('DEPLOYMENT')) console.log('  - DEPLOYMENT');
          if (str.includes('TEST')) console.log('  - TEST');
          if (str.includes('marker')) console.log('  - marker');
          if (str.includes('BUILD-XYZ')) console.log('  - BUILD-XYZ');
          console.log('Record content:', str.substring(0, 300));
        }
      }
    } catch (err) {
      console.error(`Error querying table ${table.name}:`, err.message);
    }
  }

  console.log('All tables checked.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
