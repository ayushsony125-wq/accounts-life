const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const entries = await prisma.entry.findMany({
    include: {
      standardDetail: true,
      notes: true,
      resources: true,
      illustrations: true
    }
  });

  const patterns = ["ICAI", "MCA", "MCS"];
  const results = [];

  for (const e of entries) {
    for (const pat of patterns) {
      if (e.summary && e.summary.includes(pat)) {
        results.push({ type: 'entry-summary', slug: e.entrySlug, value: e.summary });
      }
      if (e.entryTitle && e.entryTitle.includes(pat)) {
        results.push({ type: 'entry-title', slug: e.entrySlug, value: e.entryTitle });
      }
      const det = e.standardDetail;
      if (det) {
        for (const key of Object.keys(det)) {
          if (typeof det[key] === 'string' && det[key].includes(pat)) {
            results.push({ type: `detail-${key}`, slug: e.entrySlug, value: det[key] });
          }
        }
      }
      for (const note of e.notes) {
        if (note.noteBody && note.noteBody.includes(pat)) {
          results.push({ type: 'note-body', slug: e.entrySlug, value: note.noteBody });
        }
      }
      for (const res of e.resources) {
        if (res.resourceTitle && res.resourceTitle.includes(pat)) {
          results.push({ type: 'resource-title', slug: e.entrySlug, id: res.id, value: res.resourceTitle });
        }
      }
      for (const ill of e.illustrations) {
        if (ill.illusTitle && ill.illusTitle.includes(pat)) {
          results.push({ type: 'illus-title', slug: e.entrySlug, value: ill.illusTitle });
        }
        if (ill.illusScenario && ill.illusScenario.includes(pat)) {
          results.push({ type: 'illus-scenario', slug: e.entrySlug, value: ill.illusScenario });
        }
        if (ill.illusAnswer && ill.illusAnswer.includes(pat)) {
          results.push({ type: 'illus-answer', slug: e.entrySlug, value: ill.illusAnswer });
        }
      }
    }
  }

  console.log('SEARCH RESULTS FOR ICAI/MCA/MCS IN DB:', results);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
