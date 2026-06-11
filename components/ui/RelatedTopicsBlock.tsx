import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { EntryRelationship } from '@/lib/types'

interface RelatedEntry {
  id: number
  entryTitle: string
  entrySlug: string
  entryType: string
  summary: string
  domain: {
    domainCode: string
    domainSlug: string
    domainColorHex: string
  }
}

interface RelatedTopicsBlockProps {
  entries: RelatedEntry[]
  heading?: string
}

const TYPE_LABEL: Record<string, string> = {
  CONCEPT: 'Concept',
  STANDARD: 'Standard',
  JOURNAL_ENTRY: 'Journal Entry',
  GLOSSARY_TERM: 'Glossary',
  ILLUSTRATION: 'Illustration',
  FAQ: 'FAQ',
  REFERENCE: 'Reference',
}

export default function RelatedTopicsBlock({
  entries,
  heading = 'Related Topics',
}: RelatedTopicsBlockProps) {
  if (entries.length === 0) return null

  return (
    <aside aria-labelledby="related-topics-heading" className="mt-10 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
      <h2 id="related-topics-heading" className="text-base font-bold text-[#1C1C1E] dark:text-white mb-4 tracking-tight">
        {heading}
      </h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link
              href={`/${entry.domain.domainSlug}/${entry.entrySlug}`}
              className="group flex items-center gap-3 p-3 rounded-lg border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] dark:hover:border-gray-700 hover:shadow-xs transition-all"
            >
              <span
                className="text-xs font-bold shrink-0 px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${entry.domain.domainColorHex}18`,
                  color: entry.domain.domainColorHex,
                }}
              >
                {entry.domain.domainCode}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors truncate">
                  {entry.entryTitle}
                </p>
                <p className="text-xs text-[#76767E] dark:text-gray-400 mt-0.5">
                  {TYPE_LABEL[entry.entryType] ?? entry.entryType}
                </p>
              </div>
              <ArrowRight size={13} className="text-[#A0A0A8] dark:text-gray-500 group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] shrink-0 transition-colors" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
