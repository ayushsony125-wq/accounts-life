const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        subdomains: true
      }
    });
    console.log('--- ALL DOMAINS IN DB ---');
    domains.forEach(d => {
      console.log(`Domain ID: ${d.id} | Code: ${d.domainCode} | Name: ${d.domainName} | Slug: ${d.domainSlug}`);
      d.subdomains.forEach(s => {
        console.log(`  -> Subdomain ID: ${s.id} | Name: ${s.subdomainName} | Slug: ${s.subdomainSlug}`);
      });
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
