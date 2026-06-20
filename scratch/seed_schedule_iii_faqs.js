const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const faqsByPart = {
  'balance-sheet': [
    {
      faqQuestion: 'Can current maturities of long-term debt be classified as non-current liabilities under Division I?',
      faqAnswer: 'No. Under Schedule III Division I, the current portion of long-term debt must be presented under "Other Current Liabilities", not as part of non-current long-term borrowings.',
      faqCategory: 'RECOGNITION'
    },
    {
      faqQuestion: 'How are security deposits classified under Schedule III?',
      faqAnswer: 'Security deposits paid are classified as "Long-Term Loans and Advances" under non-current assets, unless they are expected to be realized within 12 months from the reporting date.',
      faqCategory: 'DISCLOSURE'
    }
  ],
  'profit-loss': [
    {
      faqQuestion: 'How is Excise Duty presented in the Statement of Profit and Loss under Division I?',
      faqAnswer: 'Excise duty should be presented as a line item on the face of the Profit and Loss statement as a deduction from "Revenue from operations".',
      faqCategory: 'DISCLOSURE'
    },
    {
      faqQuestion: 'Where is Corporate Social Responsibility (CSR) expenditure disclosed?',
      faqAnswer: 'CSR expenses must be disclosed in the Notes to Accounts, showing the amount required to be spent, amount spent, and shortfall, if any, along with related party transactions.',
      faqCategory: 'DISCLOSURE'
    }
  ],
  'cash-flow': [
    {
      faqQuestion: 'Is the Cash Flow Statement mandatory for all companies under Schedule III?',
      faqAnswer: 'No. Small companies, One Person Companies (OPC), and dormant companies are exempted from preparing a Cash Flow Statement under Section 2(40) of the Companies Act 2013.',
      faqCategory: 'APPLICABILITY'
    }
  ],
  'others': [
    {
      faqQuestion: 'What are the disclosure requirements for Trade Payables aging under Schedule III?',
      faqAnswer: 'Companies must separately disclose the aging schedule for Trade Payables due to MSMEs vs Others. Dues must be aged into: < 1 year, 1-2 years, 2-3 years, and > 3 years.',
      faqCategory: 'DISCLOSURE'
    }
  ]
};

async function main() {
  console.log('Seeding Schedule III FAQs...');
  const entries = await prisma.entry.findMany({
    where: {
      entrySlug: { startsWith: 'schedule-iii-' }
    }
  });

  console.log(`Found ${entries.length} Schedule III entries.`);

  for (const entry of entries) {
    const slug = entry.entrySlug;
    const slugParts = slug.split('-');
    const partSuffix = slugParts.slice(3).join('-'); // e.g. 'balance-sheet', 'profit-loss' etc.

    const faqs = faqsByPart[partSuffix] || faqsByPart['others'];
    
    // Clear existing FAQs first to avoid duplicates
    await prisma.entryFAQ.deleteMany({
      where: { entryId: entry.id }
    });

    for (const f of faqs) {
      await prisma.entryFAQ.create({
        data: {
          entryId: entry.id,
          faqQuestion: f.faqQuestion,
          faqAnswer: f.faqAnswer,
          faqCategory: f.faqCategory,
          sortOrder: 0
        }
      });
    }
    console.log(`Seeded FAQs for ${slug}`);
  }

  console.log('FAQs seeding completed successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
