const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log('=== SYSTEM RESOURCE AUDIT ===');
  
  // 1. Fetch all standard entries
  const entries = await prisma.entry.findMany({
    where: {
      entryType: 'STANDARD',
    },
    include: {
      standardDetail: true,
      resources: {
        include: {
          mediaFile: true
        }
      }
    },
    orderBy: {
      id: 'asc'
    }
  });

  console.log(`Fetched ${entries.length} total standard entries from DB.\n`);

  const report = [];

  for (const e of entries) {
    const detail = e.standardDetail;
    const slug = e.entrySlug;
    const title = e.entryTitle;
    
    // Normalization rule classification
    let rawFramework = detail?.standardFramework || null;
    let normalizedFw = 'OTHER';
    if (slug.startsWith('schedule-iii-') || title.includes('Division') || title.includes('Schedule III')) {
      normalizedFw = 'SCHEDULE_III';
    } else if (rawFramework === 'IND_AS' || slug.startsWith('ind-as-') || title.includes('Ind AS')) {
      normalizedFw = 'IND_AS';
    } else if (rawFramework === 'AS' || slug.startsWith('as-') || title.includes('AS ')) {
      normalizedFw = 'AS';
    }

    const pdfResources = e.resources.filter(r => r.resourceType === 'PDF');
    const videoResources = e.resources.filter(r => r.resourceType === 'VIDEO');

    // Check filesystem for PDF
    const localPdfPath = path.join(process.cwd(), 'public/pdfs', `${slug}.pdf`);
    const hasFsPdf = fs.existsSync(localPdfPath);

    // Check filesystem for Video
    const localVideoPath = path.join(process.cwd(), 'public/videos', `${slug}.mp4`);
    const hasFsVideo = fs.existsSync(localVideoPath);

    // Analyze PDF status
    let dbPdfStatus = 'NONE';
    let dbPdfDetails = '';
    if (pdfResources.length > 0) {
      const res = pdfResources[0];
      const hasBase64 = (res.mediaFile?.filePath?.startsWith('data:') || res.resourceUrl?.startsWith('data:'));
      dbPdfStatus = hasBase64 ? 'BASE64' : 'LINK';
      dbPdfDetails = hasBase64 ? 'Base64 data stored' : `Redirect URL: ${res.resourceUrl}`;
    }

    // Analyze Video status
    let dbVideoStatus = 'NONE';
    let dbVideoDetails = '';
    if (videoResources.length > 0) {
      const res = videoResources[0];
      const hasBase64 = (res.mediaFile?.filePath?.startsWith('data:') || res.resourceUrl?.startsWith('data:'));
      dbVideoStatus = hasBase64 ? 'BASE64' : 'LINK';
      dbVideoDetails = hasBase64 ? 'Base64 data stored' : `Video URL: ${res.resourceUrl}`;
    }

    report.push({
      id: e.id,
      slug,
      title,
      dbFramework: rawFramework,
      normalizedFramework: normalizedFw,
      pdfCount: pdfResources.length,
      dbPdfStatus,
      dbPdfDetails,
      hasFsPdf,
      videoCount: videoResources.length,
      dbVideoStatus,
      dbVideoDetails,
      hasFsVideo,
      publishStatus: e.status
    });
  }

  // Compile totals
  const asRecords = report.filter(r => r.normalizedFramework === 'AS');
  const indAsRecords = report.filter(r => r.normalizedFramework === 'IND_AS');
  const sch3Records = report.filter(r => r.normalizedFramework === 'SCHEDULE_III');

  const totalPdfs = report.filter(r => r.pdfCount > 0 || r.hasFsPdf).length;
  const totalVideos = report.filter(r => r.videoCount > 0 || r.hasFsVideo).length;

  console.log('=== AUDIT RESULTS BY FRAMEWORK ===');
  console.log(`AS Records: ${asRecords.length}`);
  console.log(`Ind AS Records: ${indAsRecords.length}`);
  console.log(`Schedule III Records: ${sch3Records.length}`);
  console.log(`Total PDF Assets: ${totalPdfs}`);
  console.log(`Total Video Assets: ${totalVideos}\n`);

  console.log('=== DETAILED RECORD LIST ===');
  console.log(JSON.stringify(report, null, 2));

  // Write report to artifact folder
  const outputPath = path.join('C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9', 'comprehensive_audit_report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\nReport written to: ${outputPath}`);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
