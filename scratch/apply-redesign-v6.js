const fs = require('fs');
const path = require('path');

const clientPath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
const v5Path = path.join(__dirname, 'update-tab-content-v5.js');

// 1. Read files and normalize line endings to LF
let clientContent = fs.readFileSync(clientPath, 'utf8').replace(/\r\n/g, '\n');
const v5Content = fs.readFileSync(v5Path, 'utf8').replace(/\r\n/g, '\n');

// 2. Extract newComponentCode from update-tab-content-v5.js
const markerStart = 'const newComponentCode = `';
const startIdx = v5Content.indexOf(markerStart);
if (startIdx === -1) {
  console.error('Could not find start marker in update-tab-content-v5.js');
  process.exit(1);
}

const markerEnd = '`;\n\nconst prefix =';
const endIdx = v5Content.indexOf(markerEnd);
if (endIdx === -1) {
  console.error('Could not find end marker in update-tab-content-v5.js');
  process.exit(1);
}

let newComponentCode = v5Content.substring(startIdx + markerStart.length, endIdx);
newComponentCode = newComponentCode.replace(/\\`/g, '`').replace(/\\\$\{/g, '${');
console.log('Extracted newComponentCode successfully!');
console.log('Start of extracted code:', newComponentCode.substring(0, 100));
console.log('End of extracted code:', newComponentCode.substring(newComponentCode.length - 100));

// 3. Update the imports block in clientContent
const oldImports = `import {
  BookOpen,
  Scale,
  FileText,
  Search,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  Volume2,
  VolumeX,
  SkipForward,
  Settings,
  Maximize,
  ExternalLink,
  Download,
  Video,
  Highlighter,
  PenTool,
  Eraser,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ChevronDown,
  X
} from 'lucide-react'`;

const newImports = `import {
  BookOpen,
  Scale,
  FileText,
  Search,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  Volume2,
  VolumeX,
  SkipForward,
  Settings,
  Maximize,
  ExternalLink,
  Download,
  Video,
  Highlighter,
  PenTool,
  Eraser,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ChevronDown,
  X,
  Users,
  CreditCard,
  Briefcase,
  Globe,
  Award,
  AlertTriangle,
  TrendingUp,
  Check
} from 'lucide-react'`;

if (clientContent.includes(oldImports)) {
  clientContent = clientContent.replace(oldImports, newImports);
  console.log('Successfully updated imports in clientContent!');
} else {
  console.log('Imports already updated or mismatch.');
}

// 4. Find boundaries of AS1StandardTabContent in clientContent
const lines = clientContent.split('\n');
let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }')) {
    startIndex = i;
    break;
  }
}

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].trim() === 'interface LearningPortalClientProps {') {
    // Trace back to find the closing brace of the component
    for (let j = i - 1; j > startIndex; j--) {
      if (lines[j].trim() === '}') {
        endIndex = j;
        break;
      }
    }
    break;
  }
}

console.log(`Found component boundaries - startIndex: ${startIndex}, endIndex: ${endIndex}`);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find component boundaries in LearningPortalClient.tsx');
  process.exit(1);
}

// 5. Replace component body
const prefix = lines.slice(0, startIndex).join('\n');
const suffix = lines.slice(endIndex + 1).join('\n');

const newClientContent = prefix + '\n' + newComponentCode + '\n' + suffix;

// 6. Write back with CRLF line endings (standard for this Windows project)
fs.writeFileSync(clientPath, newClientContent.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated LearningPortalClient.tsx!');
