const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF to perform operations consistently
const hasCrlf = content.includes('\r\n');
if (hasCrlf) {
  content = content.replace(/\r\n/g, '\n');
}

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

if (content.includes(oldImports)) {
  content = content.replace(oldImports, newImports);
  console.log('Successfully replaced imports!');
} else {
  console.log('Could not find imports block in normalized content.');
}

// Restore CRLF if it had it
if (hasCrlf) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('File written successfully.');
