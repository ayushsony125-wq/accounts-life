const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const entry = await prisma.entry.findFirst({
      where: { entrySlug: 'as-1' },
      include: {
        standardDetail: {
          include: {
            definitions: true,
            disclosureGroups: { include: { items: true } },
            comparisonRows: true
          }
        },
        illustrations: true,
        resources: true,
        notes: true,
        faqs: true,
        journalEntries: { include: { rows: true } }
      }
    });

    if (!entry) {
      console.log('No entry found');
      return;
    }

    console.log('Found entry:', entry.entryTitle);

    // Let's build the payload that EntryForm submits to saveEntry
    const payload = {
      id: entry.id,
      entryTitle: entry.entryTitle,
      entrySlug: entry.entrySlug,
      entryType: entry.entryType,
      domainId: entry.domainId,
      subdomainId: entry.subdomainId,
      summary: entry.summary,
      verificationLevel: entry.verificationLevel,
      status: entry.status,
      examLevelTags: Array.isArray(entry.examLevelTags) ? entry.examLevelTags.join(', ') : 'CA Intermediate',
      authorityPrimary: entry.authorityPrimary,
      authorityPrimaryUrl: entry.authorityPrimaryUrl,
      authoritySecondary: entry.authoritySecondary,
      isFeatured: entry.isFeatured,
      seoTitle: entry.seoTitle,
      seoDescription: entry.seoDescription,
      sections: [], // entry doesn't have sections directly stored?
      faqs: entry.faqs.map(f => ({
        faqQuestion: f.faqQuestion,
        faqAnswer: f.faqAnswer,
        faqSourceRef: f.faqSourceRef,
        faqCategory: f.faqCategory
      })),
      notes: entry.notes.map(n => ({
        noteType: n.noteType,
        noteTitle: n.noteTitle,
        noteBody: n.noteBody
      })),
      journalEntries: entry.journalEntries.map(je => ({
        jeScenarioTitle: je.jeScenarioTitle,
        jeLabel: je.jeLabel,
        jeCategoryHeading: je.jeCategoryHeading,
        jeNarration: je.jeNarration,
        rows: je.rows.map(row => ({
          rowType: row.rowType,
          accountName: row.accountName,
          drAmount: row.drAmount,
          crAmount: row.crAmount
        }))
      })),
      illustrations: entry.illustrations.map(i => ({
        illusTitle: i.illusTitle,
        illusScenario: i.illusScenario,
        illusWorking: i.illusWorking,
        illusAnswer: i.illusAnswer,
        illusNote: i.illusNote,
        illusDifficulty: i.illusDifficulty
      })),
      resources: [
        {
          resourceType: 'PDF',
          resourceTitle: 'Test PDF upload.pdf',
          resourceUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvUmVzb3VyY2VzIDw8ID4+IC9NZWRpYUJveCBbMCAwIDU5NSA4NDJdIC9Db250ZW50cyA0IDAgUiA+PgplbmRvYmoKNCAwIG9iago8PCAvTGVuZ3RoIDU4ID4+CnN0cmVhbQpCVAovRjEgMTIgVGYKNzIgNzEyIFRkCihMaXZlIFByb2R1Y3Rpb24gdGVzdCB1cGxvYWQ6IElDQUkvTUNBIEFjY291bnRpbmcgU3RhbmRhcmQgUERGKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDIyMiAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDUgL1Jvb3QgMSAwIFIgPj4Kc3RhcnR4cmVmCjMyOQolJUVPRg==',
          sourceType: 'ICAI_OFFICIAL',
          videoChannel: null,
          refYear: 2026
        }
      ],
      standardCode: entry.standardDetail?.standardCode,
      standardFramework: entry.standardDetail?.standardFramework,
      standardStatus: entry.standardDetail?.standardStatus,
      issuingBody: entry.standardDetail?.issuingBody,
      dateIssued: entry.standardDetail?.dateIssued,
      dateEffective: entry.standardDetail?.dateEffective,
      applicabilitySummary: entry.standardDetail?.applicabilitySummary,
      objective: {
        text: entry.standardDetail?.objectiveText,
        sourcePara: entry.standardDetail?.objectiveSourcePara,
        commentary: entry.standardDetail?.objectiveCommentary,
        keyIssues: entry.standardDetail?.objectiveKeyIssues || []
      },
      scope: {
        statement: entry.standardDetail?.scopeStatement,
        included: entry.standardDetail?.scopeIncluded || [],
        excluded: entry.standardDetail?.scopeExcluded || []
      },
      definitions: entry.standardDetail?.definitions.map(d => ({
        defTerm: d.defTerm,
        defParaReference: d.defParaReference,
        defOfficialText: d.defOfficialText,
        defPlainExplanation: d.defPlainExplanation
      })) || [],
      disclosureGroups: entry.standardDetail?.disclosureGroups.map(g => ({
        groupHeading: g.groupHeading,
        groupParaRange: g.groupParaRange,
        items: g.items.map(item => ({
          itemText: item.itemText,
          itemIsConditional: item.itemIsConditional
        }))
      })) || [],
      comparisonRows: entry.standardDetail?.comparisonRows.map(r => ({
        criterion: r.criterion,
        valueStd1: r.valueStd1,
        valueStd2: r.valueStd2,
        isDifferent: r.isDifferent
      })) || []
    };

    console.log('Built payload. Executing save logic...');
    
    // Mimic saveEntry in actions.ts:
    const entryId = payload.id;
    
    // Recreate child relations to prevent duplication on edit
    await prisma.entryNote.deleteMany({ where: { entryId } });
    await prisma.entryFAQ.deleteMany({ where: { entryId } });
    await prisma.entryJournalEntry.deleteMany({ where: { entryId } });
    await prisma.entryIllustration.deleteMany({ where: { entryId } });

    // Check if a PDF resource is already mapped in the database
    const submittedPdf = (payload.resources || []).find((r) => r.resourceType === 'PDF');
    if (submittedPdf) {
      if (submittedPdf.resourceUrl && !submittedPdf.resourceUrl.startsWith('/api/pdfs/')) {
        await prisma.entryResource.deleteMany({ where: { entryId } });
      } else {
        await prisma.entryResource.deleteMany({
          where: {
            entryId,
            resourceType: { not: 'PDF' }
          }
        });
      }
    } else {
      await prisma.entryResource.deleteMany({ where: { entryId } });
    }

    await prisma.standardDetail.deleteMany({ where: { entryId } });

    // Filter out any API route placeholder PDF resource from being recreated to avoid duplication
    const resourcesToCreate = (payload.resources || []).filter((r) => {
      if (r.resourceType === 'PDF' && r.resourceUrl && r.resourceUrl.startsWith('/api/pdfs/')) {
        return false;
      }
      return true;
    });

    const dataPayload = {
      entryType: payload.entryType,
      entryTitle: payload.entryTitle,
      entrySlug: payload.entrySlug,
      domainId: Number(payload.domainId),
      subdomainId: Number(payload.subdomainId),
      summary: payload.summary,
      verificationLevel: payload.verificationLevel || 'DRAFT',
      status: payload.status || 'DRAFT',
      examLevelTags: payload.examLevelTags || [],
      authorityPrimary: payload.authorityPrimary || null,
      authorityPrimaryUrl: payload.authorityPrimaryUrl || null,
      authoritySecondary: payload.authoritySecondary || null,
      isFeatured: payload.isFeatured || false,
      seoTitle: payload.seoTitle || null,
      seoDescription: payload.seoDescription || null,
      wordCount: payload.summary ? payload.summary.split(/\s+/).length : 50,
      publishedAt: payload.status === 'PUBLISHED' ? new Date() : null,
      lastReviewedAt: new Date(),
      notes: {
        create: (payload.notes || []).map((n, idx) => ({
          noteType: n.noteType || 'NOTE',
          noteTitle: n.noteTitle || null,
          noteBody: n.noteBody || '',
          sortOrder: idx,
        })),
      },
      faqs: {
        create: (payload.faqs || []).map((f, idx) => ({
          faqQuestion: f.faqQuestion || '',
          faqAnswer: f.faqAnswer || '',
          faqSourceRef: f.faqSourceRef || null,
          faqCategory: f.faqCategory || 'GENERAL',
          sortOrder: idx,
        })),
      },
      journalEntries: {
        create: (payload.journalEntries || []).map((je, jeIdx) => ({
          jeScenarioTitle: je.jeScenarioTitle || null,
          jeLabel: je.jeLabel || null,
          jeCategoryHeading: je.jeCategoryHeading || null,
          jeNarration: je.jeNarration || null,
          sortOrder: jeIdx,
          rows: {
            create: (je.rows || []).map((row, rIdx) => ({
              rowType: row.rowType || 'DR',
              accountName: row.accountName || null,
              drAmount: row.drAmount !== '' && row.drAmount !== null ? Number(row.drAmount) : null,
              crAmount: row.crAmount !== '' && row.crAmount !== null ? Number(row.crAmount) : null,
              sortOrder: rIdx,
            })),
          },
        })),
      },
      illustrations: {
        create: (payload.illustrations || []).map((illus, idx) => ({
          illusTitle: illus.illusTitle || '',
          illusScenario: illus.illusScenario || null,
          illusWorking: illus.illusWorking || null,
          illusAnswer: illus.illusAnswer || null,
          illusNote: illus.illusNote || null,
          illusDifficulty: illus.illusDifficulty || 'BEGINNER',
          sortOrder: idx,
        })),
      },
      resources: {
        create: resourcesToCreate.map((r, idx) => ({
          resourceType: r.resourceType || 'REFERENCE',
          resourceTitle: r.resourceTitle || '',
          resourceUrl: r.resourceUrl || null,
          sourceType: r.sourceType || 'EXTERNAL',
          videoChannel: r.videoChannel || null,
          refYear: r.refYear ? Number(r.refYear) : null,
          sortOrder: idx,
        })),
      },
    };

    if (payload.entryType === 'STANDARD') {
      dataPayload.standardDetail = {
        create: {
          standardCode: payload.standardCode || '',
          standardFramework: payload.standardFramework || 'AS',
          standardStatus: payload.standardStatus || 'ACTIVE',
          issuingBody: payload.issuingBody || 'ICAI',
          dateIssued: payload.dateIssued ? new Date(payload.dateIssued) : null,
          dateEffective: payload.dateEffective ? new Date(payload.dateEffective) : null,
          applicabilitySummary: payload.applicabilitySummary || null,
          objectiveText: payload.objective?.text || null,
          objectiveSourcePara: payload.objective?.sourcePara || null,
          objectiveCommentary: payload.objective?.commentary || null,
          objectiveKeyIssues: payload.objective?.keyIssues || [],
          scopeStatement: payload.scope?.statement || null,
          scopeIncluded: payload.scope?.included || [],
          scopeExcluded: payload.scope?.excluded || [],
          definitions: {
            create: (payload.definitions || []).map((def, idx) => ({
              defTerm: def.defTerm || '',
              defParaReference: def.defParaReference || null,
              defOfficialText: def.defOfficialText || '',
              defPlainExplanation: def.defPlainExplanation || null,
              sortOrder: idx,
            })),
          },
          disclosureGroups: {
            create: (payload.disclosureGroups || []).map((g, gIdx) => ({
              groupHeading: g.groupHeading || '',
              groupParaRange: g.groupParaRange || null,
              sortOrder: gIdx,
              items: {
                create: (g.items || []).map((item, iIdx) => ({
                  itemText: item.itemText || '',
                  itemIsConditional: item.itemIsConditional || false,
                  sortOrder: iIdx,
                })),
              },
            })),
          },
          comparisonRows: {
            create: (payload.comparisonRows || []).map((row, idx) => ({
              criterion: row.criterion || '',
              valueStd1: row.valueStd1 || null,
              valueStd2: row.valueStd2 || null,
              isDifferent: row.isDifferent || false,
              sortOrder: idx,
            })),
          },
        },
      };
    }

    console.log('Performing prisma.entry.update...');
    const result = await prisma.entry.update({
      where: { id: entryId },
      data: dataPayload
    });
    console.log('SUCCESS! Updated entry ID:', result.id);
  } catch (err) {
    console.error('ERROR OCCURRED:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
