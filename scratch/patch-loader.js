const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/learning-loader.ts');
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
const importEndIndex = content.indexOf("import { prisma } from './db'");
if (importEndIndex !== -1) {
  const insertPos = content.indexOf('\n', importEndIndex) + 1;
  content = content.slice(0, insertPos) + helpers + content.slice(insertPos);
}

// 2. Wrap return of fetchStandards:
// We replace the last line mapping of staticList.map
const target = `  return staticList.map(item => {`;
const replacement = `  return sanitizeObject(staticList.map(item => {`;
content = content.replace(target, replacement);

// And we need to add the closing parenthesis for the map:
// The end of fetchStandards is:
//   })
// }
// Let's replace the last '  })\n}' with '  }))\n}'
const lastIndex = content.lastIndexOf('  })');
if (lastIndex !== -1 && lastIndex > content.length - 100) {
  content = content.slice(0, lastIndex) + '  }))' + content.slice(lastIndex + 4);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched lib/learning-loader.ts!');
