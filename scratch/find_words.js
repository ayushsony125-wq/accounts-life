const fs = require('fs');
const content = fs.readFileSync('app/standards/learning/LearningPortalClient.tsx', 'utf-8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('selector') || line.toLowerCase().includes('chooser') || line.toLowerCase().includes('case study') || line.toLowerCase().includes('dropdown')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
