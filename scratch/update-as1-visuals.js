const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'standards', 'learning', 'LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF (\n) to make matching robust
content = content.replace(/\r\n/g, '\n');

// 1. Redefine ChapterHeader component definition using a robust regex match
const regexHeader = /const ChapterHeader = \(\{\s*num,\s*title,\s*description\s*\}\s*:\s*\{\s*num:\s*string;\s*title:\s*string;\s*description:\s*string\s*\}\)\s*=>\s*\{[\s\S]*?\n\s*\};/;

const newChapterHeader = `const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1',
      'II': '2',
      'III': '3',
      'IV': '4',
      'V': '5',
      'VI': '6',
      'VII': '7',
      'VIII': '8',
      'IX': '9'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 mt-10 first:mt-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[19px] sm:text-[21px] font-sans font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
            <span className="text-amber-700 dark:text-amber-400 font-mono font-bold mr-2 select-none">{arabicNum}.</span>
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-[13px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed pl-0">
            {description}
          </p>
        )}
      </div>
    );
  };`;

if (regexHeader.test(content)) {
  content = content.replace(regexHeader, newChapterHeader);
  console.log('ChapterHeader component redefined successfully via regex.');
} else {
  console.log('WARNING: ChapterHeader regex did not match!');
}

// Restore Windows CR+LF style for output compatibility
content = content.replace(/\n/g, '\r\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Regex update finished.');
