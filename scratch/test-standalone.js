const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const v5Path = path.join(__dirname, 'update-tab-content-v5.js');
const v5Content = fs.readFileSync(v5Path, 'utf8').replace(/\r\n/g, '\n');

const markerStart = 'const newComponentCode = `';
const startIdx = v5Content.indexOf(markerStart);
const markerEnd = '`;\n\nconst prefix =';
const endIdx = v5Content.indexOf(markerEnd);
let code = v5Content.substring(startIdx + markerStart.length, endIdx);

// Strip the escape backslashes for backticks and template expressions
code = code.replace(/\\`/g, '`').replace(/\\\$\{/g, '${');

// Create standalone React file
const standaloneContent = `
import React, { useState } from 'react';
import {
  BookOpen,
  Scale,
  FileText,
  Search,
  ChevronRight,
  ChevronDown,
  Users,
  CreditCard,
  Briefcase,
  Globe,
  Award,
  AlertTriangle,
  TrendingUp,
  Check
} from 'lucide-react';

interface AS1StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

// Dummy types to satisfy compiler
const PdfRef = ({ page }: { page: number }) => null;
const ChapterHeader = (props: any) => null;

${code}
`;

const tempFilePath = path.join(__dirname, 'temp-component.tsx');
fs.writeFileSync(tempFilePath, standaloneContent, 'utf8');
console.log('Created scratch/temp-component.tsx');

try {
  console.log('Running tsc check on standalone component...');
  execSync('npx tsc --noEmit --jsx preserve --esModuleInterop "' + tempFilePath + '"', { stdio: 'inherit' });
  console.log('Standalone component compiled successfully! No JSX or syntax issues in the component itself.');
} catch (err) {
  console.error('TSC compilation failed for standalone component!');
}
