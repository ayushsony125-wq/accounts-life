const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/queries.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add sanitization helper functions at the top (right after imports)
const helpers = `
function sanitizeText(str: string): string {
  if (!str) return ''
  return str
    .replace(/\\bICAI\\b/g, '')
    .replace(/\\bMCA\\b/g, '')
    .replace(/\\bMCS\\b/g, '')
    .replace(/\\(Institute of Chartered Accountants of India\\)/g, '')
    .replace(/\\bNational Advisory Committee on Accounting Standards\\b/g, 'Accounting Advisory Committee')
    .replace(/\\s*[-—]\\s*$/, '')
    .replace(/^\\s*[-—]\\s*/, '')
    .replace(/\\s+/g, ' ')
    .trim()
}

function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (typeof obj === 'string') {
    return sanitizeText(obj) as unknown as T
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)) as unknown as T
  }
  if (typeof obj === 'object') {
    const newObj = {} as any
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase().includes('url') || key === 'id' || key === 'slug' || key === 'href') {
        newObj[key] = (obj as any)[key]
      } else {
        newObj[key] = sanitizeObject((obj as any)[key])
      }
    }
    return newObj as T
  }
  return obj
}
`;

// Insert after the imports block
const importEndIndex = content.indexOf("import { DOMAINS } from './data/domains'");
if (importEndIndex !== -1) {
  const insertPos = content.indexOf('\n', importEndIndex) + 1;
  content = content.slice(0, insertPos) + helpers + content.slice(insertPos);
}

// 2. Wrap all return statements in query functions.
// We can wrap specific return statements to avoid breaking anything:
// Let's replace return values in each exported function.

// For getDomains
content = content.replace(
  `return await prisma.domain.findMany({`,
  `return sanitizeObject(await prisma.domain.findMany({`
);
content = content.replace(
  `return DOMAINS.map((d) => {`,
  `return sanitizeObject(DOMAINS.map((d) => {`
);

// For getDomainBySlug
content = content.replace(
  `return await prisma.domain.findUnique({`,
  `return sanitizeObject(await prisma.domain.findUnique({`
);
content = content.replace(
  `return domains.find((d) => d.domainSlug === slug) || null`,
  `return sanitizeObject(domains.find((d) => d.domainSlug === slug) || null)`
);

// For getEntryBySlug
content = content.replace(
  `return {\n          ...entry,`,
  `return sanitizeObject({\n          ...entry,`
);
content = content.replace(
  `if (localEntry) return localEntry`,
  `if (localEntry) return sanitizeObject(localEntry)`
);
content = content.replace(
  `return ACCRUAL_CONCEPT_ENTRY`,
  `return sanitizeObject(ACCRUAL_CONCEPT_ENTRY)`
);
content = content.replace(
  `return {\n      id: searchMatch.id,`,
  `return sanitizeObject({\n      id: searchMatch.id,`
);

// For getASStandardBySlug
content = content.replace(
  `if (std) return mapStandardDetail(std)`,
  `if (std) return sanitizeObject(mapStandardDetail(std))`
);
content = content.replace(
  `if (localEntry) return localEntry`,
  `if (localEntry) return sanitizeObject(localEntry)`
);
content = content.replace(
  `return AS_1_ENTRY`,
  `return sanitizeObject(AS_1_ENTRY)`
);
content = content.replace(
  `return {\n      entryTitle: match.title,\n      entrySlug: slug,`,
  `return sanitizeObject({\n      entryTitle: match.title,\n      entrySlug: slug,`
);

// For getIndASStandardBySlug
content = content.replace(
  `if (std) return mapStandardDetail(std)`,
  `if (std) return sanitizeObject(mapStandardDetail(std))`
);
content = content.replace(
  `if (localEntry) return localEntry`,
  `if (localEntry) return sanitizeObject(localEntry)`
);
content = content.replace(
  `return IND_AS_1_ENTRY`,
  `return sanitizeObject(IND_AS_1_ENTRY)`
);
content = content.replace(
  `return {\n      entryTitle: match.title,\n      summary: match.summary,`,
  `return sanitizeObject({\n      entryTitle: match.title,\n      summary: match.summary,`
);

// For getGlossaryTerms
content = content.replace(
  `return terms.map((t) => ({`,
  `return sanitizeObject(terms.map((t) => ({`
);
content = content.replace(
  `return [...localGlossary, ...GLOSSARY_TERMS]`,
  `return sanitizeObject([...localGlossary, ...GLOSSARY_TERMS])`
);

// For getSearchIndex
content = content.replace(
  `return entries.map((e) => {`,
  `return sanitizeObject(entries.map((e) => {`
);
content = content.replace(
  `return [...localSearchIndex, ...SEARCH_INDEX]`,
  `return sanitizeObject([...localSearchIndex, ...SEARCH_INDEX])`
);

// For getAllEntries
content = content.replace(
  `return await prisma.entry.findMany({\n        include: {\n          domain: true,\n          subdomain: true,\n        },\n        orderBy: { sortOrder: 'asc' },\n      }) as any`,
  `return sanitizeObject(await prisma.entry.findMany({\n        include: {\n          domain: true,\n          subdomain: true,\n        },\n        orderBy: { sortOrder: 'asc' },\n      }) as any)`
);
content = content.replace(
  `return combined`,
  `return sanitizeObject(combined)`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched lib/queries.ts!');
