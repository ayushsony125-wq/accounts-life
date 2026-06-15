const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const PDF_PATH = path.join(__dirname, '../public/pdfs/as-1.pdf');

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error('Local PDF file not found at:', PDF_PATH);
    process.exit(1);
  }

  const pdfBuffer = fs.readFileSync(PDF_PATH);
  const base64Pdf = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
  console.log('PDF File read successfully. Base64 length:', base64Pdf.length);

  // Find the PDF resource for AS 1
  const resource = await prisma.entryResource.findFirst({
    where: {
      entryId: 10,
      resourceType: 'PDF'
    }
  });

  if (!resource) {
    console.log('No PDF resource found for entryId 10. Creating one...');
    const newResource = await prisma.entryResource.create({
      data: {
        entryId: 10,
        resourceType: 'PDF',
        resourceTitle: 'Official AS 1 — Disclosure of Accounting Policies PDF',
        resourceUrl: base64Pdf,
        sourceType: 'ICAI_OFFICIAL',
        refYear: 2026,
        sortOrder: 1
      }
    });
    console.log('Created resource:', newResource.id);
  } else {
    console.log('Updating existing PDF resource with ID:', resource.id);
    const updated = await prisma.entryResource.update({
      where: { id: resource.id },
      data: {
        resourceUrl: base64Pdf,
        resourceTitle: 'Official AS 1 — Disclosure of Accounting Policies PDF',
        sourceType: 'ICAI_OFFICIAL'
      }
    });
    console.log('Resource updated successfully.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
