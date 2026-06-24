const fs = require('fs');

const code = fs.readFileSync('app/standards/learning/LearningPortalClient.tsx', 'utf8');
const lines = code.split('\n');

let stack = [];
let inString = false;
let stringChar = '';
let inComment = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    const nextChar = line[j + 1];

    if (inComment) {
      if (char === '*' && nextChar === '/') {
        inComment = false;
        j++;
      }
      continue;
    }

    if (inString) {
      if (char === '\\') {
        j++; // skip next char
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    if (char === '/' && nextChar === '*') {
      inComment = true;
      j++;
      continue;
    }
    if (char === '/' && nextChar === '/') {
      break; // rest of line is comment
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === '{' || char === '(' || char === '[') {
      stack.push({ char, line: i + 1, col: j + 1 });
    } else if (char === '}' || char === ')' || char === ']') {
      const last = stack.pop();
      if (!last) {
        console.log(`Unmatched closing ${char} at line ${i + 1}:${j + 1}`);
        continue;
      }
      const matching = { '}': '{', ')': '(', ']': '[' }[char];
      if (last.char !== matching) {
        console.log(`Mismatched ${char} at line ${i + 1}:${j + 1}. Expected match for ${last.char} from line ${last.line}:${last.col}`);
      }
    }
  }
}

if (stack.length > 0) {
  console.log(`Unclosed items remaining: ${stack.length}`);
  stack.slice(-10).forEach(item => {
    console.log(`  Unclosed ${item.char} at line ${item.line}:${item.col}`);
  });
} else {
  console.log('Brackets are balanced!');
}
