const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.error('Log file does not exist at:', logPath);
  process.exit(1);
}

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

console.log('Searching for User Inputs and Tagline references...');

lines.forEach((line) => {
  if (!line.trim()) return;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      const content = obj.content || '';
      const lower = content.toLowerCase();
      // check if it references tags, hero, headline, or approved
      if (lower.includes('headline') || lower.includes('tagline') || lower.includes('approved') || lower.includes('wording') || lower.includes('branding')) {
        console.log(`\n=========================================`);
        console.log(`Step ${obj.step_index} | Created At: ${obj.created_at}`);
        console.log(`=========================================`);
        console.log(content);
      }
    }
  } catch (e) {
    // ignore parsing errors
  }
});

