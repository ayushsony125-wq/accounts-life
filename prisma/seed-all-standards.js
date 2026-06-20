const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AS_STANDARDS = [
  { num: 1, name: "Disclosure of Accounting Policies" },
  { num: 2, name: "Valuation of Inventories" },
  { num: 3, name: "Cash Flow Statements" },
  { num: 4, name: "Contingencies and Events Occurring After the Balance Sheet Date" },
  { num: 5, name: "Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies" },
  { num: 7, name: "Construction Contracts" },
  { num: 9, name: "Revenue Recognition" },
  { num: 10, name: "Property, Plant and Equipment" },
  { num: 11, name: "The Effects of Changes in Foreign Exchange Rates" },
  { num: 12, name: "Accounting for Government Grants" },
  { num: 13, name: "Accounting for Investments" },
  { num: 14, name: "Accounting for Amalgamations" },
  { num: 15, name: "Employee Benefits" },
  { num: 16, name: "Borrowing Costs" },
  { num: 17, name: "Segment Reporting" },
  { num: 18, name: "Related Party Disclosures" },
  { num: 19, name: "Leases" },
  { num: 20, name: "Earnings Per Share" },
  { num: 21, name: "Consolidated Financial Statements" },
  { num: 22, name: "Accounting for Taxes on Income" },
  { num: 23, name: "Accounting for Investments in Associates in Consolidated Financial Statements" },
  { num: 24, name: "Discontinuing Operations" },
  { num: 25, name: "Interim Financial Reporting" },
  { num: 26, name: "Intangible Assets" },
  { num: 27, name: "Financial Reporting of Interests in Joint Ventures" },
  { num: 28, name: "Impairment of Assets" },
  { num: 29, name: "Provisions, Contingent Liabilities and Contingent Assets" }
];

const IND_AS_STANDARDS = [
  { num: 1, name: "Presentation of Financial Statements" },
  { num: 2, name: "Inventories" },
  { num: 7, name: "Statement of Cash Flows" },
  { num: 8, name: "Accounting Policies, Changes in Accounting Estimates and Errors" },
  { num: 10, name: "Events after the Reporting Period" },
  { num: 12, name: "Income Taxes" },
  { num: 16, name: "Property, Plant and Equipment" },
  { num: 19, name: "Employee Benefits" },
  { num: 20, name: "Accounting for Government Grants and Disclosure of Government Assistance" },
  { num: 21, name: "The Effects of Changes in Foreign Exchange Rates" },
  { num: 23, name: "Borrowing Costs" },
  { num: 24, name: "Related Party Disclosures" },
  { num: 27, name: "Separate Financial Statements" },
  { num: 28, name: "Investments in Associates and Joint Ventures" },
  { num: 29, name: "Financial Reporting in Hyperinflationary Economies" },
  { num: 32, name: "Financial Instruments: Presentation" },
  { num: 33, name: "Earnings Per Share" },
  { num: 34, name: "Interim Financial Reporting" },
  { num: 36, name: "Impairment of Assets" },
  { num: 37, name: "Provisions, Contingent Liabilities and Contingent Assets" },
  { num: 38, name: "Intangible Assets" },
  { num: 40, name: "Investment Property" },
  { num: 41, name: "Agriculture" },
  { num: 101, name: "First-time Adoption of Indian Accounting Standards" },
  { num: 102, name: "Share-based Payment" },
  { num: 103, name: "Business Combinations" },
  { num: 104, name: "Insurance Contracts" },
  { num: 105, name: "Non-current Assets Held for Sale and Discontinued Operations" },
  { num: 106, name: "Exploration for and Evaluation of Mineral Resources" },
  { num: 107, name: "Financial Instruments: Disclosures" },
  { num: 108, name: "Operating Segments" },
  { num: 109, name: "Financial Instruments" },
  { num: 110, name: "Consolidated Financial Statements" },
  { num: 111, name: "Joint Arrangements" },
  { num: 112, name: "Disclosure of Interests in Other Entities" },
  { num: 113, name: "Fair Value Measurement" },
  { num: 114, name: "Regulatory Deferral Accounts" },
  { num: 115, name: "Revenue from Contracts with Customers" },
  { num: 116, name: "Leases" },
  { num: 117, name: "Insurance Contracts" }
];

async function main() {
  console.log('Starting standards database update...');

  // 1. Fetch domains and subdomains
  const domains = await prisma.domain.findMany({
    include: { subdomains: true }
  });

  const asDomain = domains.find(d => d.domainCode === 'D02');
  const indAsDomain = domains.find(d => d.domainCode === 'D03');

  if (!asDomain || !indAsDomain) {
    throw new Error('Domains D02 (AS) or D03 (Ind AS) not found. Run seed script first.');
  }

  // 2. Delete obsolete AS 6 standard from DB
  const as6Entry = await prisma.entry.findUnique({
    where: { entrySlug: 'as-6' }
  });
  if (as6Entry) {
    console.log('Deleting obsolete AS 6 standard...');
    await prisma.entry.delete({
      where: { entrySlug: 'as-6' }
    });
    console.log('Obsolete AS 6 deleted successfully.');
  }

  // 3. Upsert AS Introduction
  const asCoreSub = asDomain.subdomains.find(s => s.subdomainSlug === 'as-core') || asDomain.subdomains[0];
  console.log('Upserting AS Introduction...');
  const asIntroEntry = await prisma.entry.upsert({
    where: { entrySlug: 'as-intro' },
    update: {
      entryTitle: 'Introduction to Accounting Standards',
      domainId: asDomain.id,
      subdomainId: asCoreSub.id,
      status: 'PUBLISHED',
      verificationLevel: 'VERIFIED',
    },
    create: {
      entryType: 'STANDARD',
      entryTitle: 'Introduction to Accounting Standards',
      entrySlug: 'as-intro',
      domainId: asDomain.id,
      subdomainId: asCoreSub.id,
      summary: 'An overview of the development, objective, and applicability of Accounting Standards (AS) in India.',
      status: 'PUBLISHED',
      verificationLevel: 'VERIFIED',
      sortOrder: 0,
      entryBody: {},
      examLevelTags: ['CA Intermediate']
    }
  });

  await prisma.standardDetail.upsert({
    where: { entryId: asIntroEntry.id },
    update: {
      standardCode: 'AS Intro',
      standardFramework: 'AS',
      standardStatus: 'ACTIVE',
    },
    create: {
      entryId: asIntroEntry.id,
      standardCode: 'AS Intro',
      standardFramework: 'AS',
      standardStatus: 'ACTIVE',
      issuingBody: 'ICAI',
      applicabilitySummary: 'Applicable to non-company entities and companies under Indian GAAP.'
    }
  });

  // 4. Upsert AS Standards (AS 1 to AS 29, excluding 6 and 8)
  for (const std of AS_STANDARDS) {
    const slug = `as-${std.num}`;
    let subSlug = 'as-core';
    if (std.num > 10 && std.num <= 20) subSlug = 'as-financial';
    if (std.num > 20) subSlug = 'as-advanced';

    const subdomain = asDomain.subdomains.find(s => s.subdomainSlug === subSlug) || asDomain.subdomains[0];
    
    console.log(`Upserting ${slug}...`);
    const entry = await prisma.entry.upsert({
      where: { entrySlug: slug },
      update: {
        entryTitle: `AS ${std.num} — ${std.name}`,
        domainId: asDomain.id,
        subdomainId: subdomain.id,
      },
      create: {
        entryType: 'STANDARD',
        entryTitle: `AS ${std.num} — ${std.name}`,
        entrySlug: slug,
        domainId: asDomain.id,
        subdomainId: subdomain.id,
        summary: `Prescribes presentation and recognition criteria for AS ${std.num} — ${std.name}.`,
        status: 'PUBLISHED',
        verificationLevel: 'VERIFIED',
        sortOrder: std.num,
        entryBody: {},
        examLevelTags: ['CA Intermediate']
      }
    });

    await prisma.standardDetail.upsert({
      where: { entryId: entry.id },
      update: {
        standardCode: `AS-${std.num}`,
        standardFramework: 'AS',
      },
      create: {
        entryId: entry.id,
        standardCode: `AS-${std.num}`,
        standardFramework: 'AS',
        standardStatus: 'ACTIVE',
        issuingBody: 'ICAI',
        applicabilitySummary: 'Applicable to entities preparing financial statements under AS framework.',
        objectiveText: `The objective of AS ${std.num} is to prescribe the accounting treatment, presentation, and disclosure requirements for ${std.name}.`
      }
    });
  }

  // 5. Upsert Ind AS Introduction
  const indAsCoreSub = indAsDomain.subdomains.find(s => s.subdomainSlug === 'ind-as-core') || indAsDomain.subdomains[0];
  console.log('Upserting Ind AS Introduction...');
  const indAsIntroEntry = await prisma.entry.upsert({
    where: { entrySlug: 'ind-as-intro' },
    update: {
      entryTitle: 'Introduction to Ind AS',
      domainId: indAsDomain.id,
      subdomainId: indAsCoreSub.id,
      status: 'PUBLISHED',
      verificationLevel: 'VERIFIED',
    },
    create: {
      entryType: 'STANDARD',
      entryTitle: 'Introduction to Ind AS',
      entrySlug: 'ind-as-intro',
      domainId: indAsDomain.id,
      subdomainId: indAsCoreSub.id,
      summary: 'An overview of the convergence of Indian Accounting Standards (Ind AS) with IFRS and its roadmap.',
      status: 'PUBLISHED',
      verificationLevel: 'VERIFIED',
      sortOrder: 0,
      entryBody: {},
      examLevelTags: ['CA Final']
    }
  });

  await prisma.standardDetail.upsert({
    where: { entryId: indAsIntroEntry.id },
    update: {
      standardCode: 'Ind AS Intro',
      standardFramework: 'IND_AS',
      standardStatus: 'ACTIVE',
    },
    create: {
      entryId: indAsIntroEntry.id,
      standardCode: 'Ind AS Intro',
      standardFramework: 'IND_AS',
      standardStatus: 'ACTIVE',
      issuingBody: 'MCA',
      applicabilitySummary: 'Applicable to listed and large unlisted companies under Ind AS roadmap.'
    }
  });

  // 6. Upsert Ind AS Standards
  for (const std of IND_AS_STANDARDS) {
    const slug = `ind-as-${std.num}`;
    let subSlug = 'ind-as-core';
    if (std.num === 32 || std.num === 107 || std.num === 109) {
      subSlug = 'ind-as-financial-instruments';
    } else if (std.num >= 100) {
      subSlug = 'ind-as-ifrs';
    }

    const subdomain = indAsDomain.subdomains.find(s => s.subdomainSlug === subSlug) || indAsDomain.subdomains[0];

    console.log(`Upserting ${slug}...`);
    const entry = await prisma.entry.upsert({
      where: { entrySlug: slug },
      update: {
        entryTitle: `Ind AS ${std.num} — ${std.name}`,
        domainId: indAsDomain.id,
        subdomainId: subdomain.id,
      },
      create: {
        entryType: 'STANDARD',
        entryTitle: `Ind AS ${std.num} — ${std.name}`,
        entrySlug: slug,
        domainId: indAsDomain.id,
        subdomainId: subdomain.id,
        summary: `Prescribes presentation and recognition criteria for Ind AS ${std.num} — ${std.name}.`,
        status: 'PUBLISHED',
        verificationLevel: 'VERIFIED',
        sortOrder: std.num,
        entryBody: {},
        examLevelTags: ['CA Final']
      }
    });

    await prisma.standardDetail.upsert({
      where: { entryId: entry.id },
      update: {
        standardCode: `IND-AS-${std.num}`,
        standardFramework: 'IND_AS',
      },
      create: {
        entryId: entry.id,
        standardCode: `IND-AS-${std.num}`,
        standardFramework: 'IND_AS',
        standardStatus: 'ACTIVE',
        issuingBody: 'MCA',
        applicabilitySummary: 'Applicable to entities preparing financial statements under Ind AS framework.',
        objectiveText: `The objective of Ind AS ${std.num} is to prescribe the accounting treatment, presentation, and disclosure requirements for ${std.name}.`
      }
    });
  }

  console.log('Database standards updates completed successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
