const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');
const existingContent = fs.readFileSync(targetPath, 'utf8');

const header = `import React from 'react'

export interface CardPanel {
  title: string;
  content: React.ReactNode;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  badgeColor?: string;
  pdfPage?: number;
  panels: CardPanel[];
  examFocus?: string;
  examFocusType?: 'trap' | 'focus' | 'trick' | 'concept' | 'adjustment';
}

`;

fs.writeFileSync(targetPath, header + existingContent, 'utf8');
console.log('Prepended header to AS1ExamplesData.tsx successfully.');
