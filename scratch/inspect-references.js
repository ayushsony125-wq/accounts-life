const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const entry = await prisma.entry.findFirst({
      where: { entrySlug: 'as-1' },
      include: {
        illustrations: true,
        faqs: true
      }
    });
    console.log('--- Illustrations with page references ---');
    entry.illustrations.forEach((i, idx) => {
      const texts = [i.illusTitle, i.illusScenario, i.illusAnswer, i.illusWorking, i.illusNote].join(' ');
      const match = texts.match(/page\s*\d+/i) || texts.match(/\[.*?\]/);
      if (match) {
        console.log(`- Illus ${idx+1}: ${i.illusTitle} -> matches: ${match[0]}`);
      } else {
        console.log(`- Illus ${idx+1}: ${i.illusTitle} -> NO page match`);
      }
    });

    console.log('\n--- FAQs with page references ---');
    entry.faqs.forEach((f, idx) => {
      console.log(`- FAQ ${idx+1}: ${f.faqQuestion} -> sourceRef: ${f.faqSourceRef}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
