import type { EntryType } from '@/lib/types'

interface EntryTypeBadgeProps {
  type: EntryType
  size?: 'sm' | 'md'
}

const ENTRY_TYPE_CONFIG: Record<
  EntryType,
  { label: string; bg: string; color: string }
> = {
  CONCEPT: { label: '💡 Concept', bg: '#EEF2FD', color: '#2D5BE3' },
  STANDARD: { label: '📋 Standard', bg: '#E6F4F2', color: '#0F6B5E' },
  JOURNAL_ENTRY: { label: '📔 Journal Entry', bg: '#F5F0FF', color: '#6B3FA0' },
  GLOSSARY_TERM: { label: '📖 Glossary', bg: '#F4F3F0', color: '#4A4A52' },
  ILLUSTRATION: { label: '📐 Illustration', bg: '#FEF6E4', color: '#8B5A00' },
  FAQ: { label: '❓ FAQ', bg: '#FFF5F5', color: '#C0392B' },
  REFERENCE: { label: '🔗 Reference', bg: '#F0FFF4', color: '#1A7A4A' },
}

export default function EntryTypeBadge({
  type,
  size = 'md',
}: EntryTypeBadgeProps) {
  const config = ENTRY_TYPE_CONFIG[type]
  const paddingClass = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-full text-xs font-medium font-sans ${paddingClass}`}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  )
}
