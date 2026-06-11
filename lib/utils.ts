import { clsx, type ClassValue } from 'clsx'

/**
 * Merge Tailwind class names safely using clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/**
 * Format a number using the Indian comma system (e.g. 1,00,000).
 * Renders as a currency string with ₹ symbol, no decimal places.
 */
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a number using the Indian comma system without currency symbol.
 * e.g. 1234567 → "12,34,567"
 */
export function formatIndianNumber(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount)
}

/**
 * Format a date as "Month Year" — used for "Last reviewed" display labels.
 * e.g. new Date('2024-03-15') → "March 2024"
 */
export function formatReviewDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Format a date as "DD Month YYYY" for full display.
 * e.g. new Date('2024-03-15') → "15 March 2024"
 */
export function formatFullDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Get the domain hex color from a domain code string.
 * Falls back to the accent blue (#2D5BE3) for unknown codes.
 */
export function getDomainColor(domainCode: string): string {
  const colors: Record<string, string> = {
    D01: '#2D5BE3',
    D02: '#0F6B5E',
    D03: '#6B3FA0',
    D04: '#B45309',
    D05: '#1A7A4A',
    D06: '#4A4A52',
    D07: '#4A4A52',
    D08: '#4A4A52',
    D09: '#4A4A52',
    D10: '#4A4A52',
    D11: '#5B6678',
    D12: '#4A4A52',
    GLO: '#5B6678',
  }
  return colors[domainCode] ?? '#2D5BE3'
}

/**
 * Get a light/tint background color for a domain code.
 * Used for card backgrounds and badges.
 */
export function getDomainLightColor(domainCode: string): string {
  const colors: Record<string, string> = {
    D01: '#EEF2FD',
    D02: '#E6F4F2',
    D03: '#F2EDF9',
    D04: '#FEF6E4',
    D05: '#E8F7EE',
    D06: '#F0F0F2',
    D07: '#F0F0F2',
    D08: '#F0F0F2',
    D09: '#F0F0F2',
    D10: '#F0F0F2',
    D11: '#F0F1F3',
    D12: '#F0F0F2',
    GLO: '#F0F1F3',
  }
  return colors[domainCode] ?? '#EEF2FD'
}

/**
 * Truncate text to `maxLength` characters, appending an ellipsis if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Generate a URL-safe slug from a string.
 * e.g. "AS 1: Disclosure of Accounting Policies" → "as-1-disclosure-of-accounting-policies"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Pluralise a word based on a count.
 * e.g. pluralise('entry', 1) → 'entry', pluralise('entry', 2) → 'entries'
 */
export function pluralise(word: string, count: number, plural?: string): string {
  if (count === 1) return word
  if (plural) return plural
  // Basic English pluralisation
  if (word.endsWith('y')) return word.slice(0, -1) + 'ies'
  if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z')) return word + 'es'
  return word + 's'
}

/**
 * Calculate an estimated read time in minutes from a word count.
 * Uses 200 wpm as the average reading speed for technical content.
 */
export function estimateReadTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

/**
 * Convert a hex color to an rgba string with the given opacity.
 */
export function hexToRgba(hex: string, opacity: number): string {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Get the display label for a VerificationLevel.
 */
export function getVerificationLabel(level: 'VERIFIED' | 'DRAFT' | 'PLACEHOLDER'): string {
  const labels: Record<string, string> = {
    VERIFIED: 'Verified',
    DRAFT: 'Draft',
    PLACEHOLDER: 'Coming Soon',
  }
  return labels[level] ?? level
}

/**
 * Get the display label for a StandardFramework.
 */
export function getFrameworkLabel(framework: 'AS' | 'IND_AS'): string {
  return framework === 'AS' ? 'AS' : 'Ind AS'
}

/**
 * Get the display label for an EntryType.
 */
export function getEntryTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    CONCEPT: 'Concept',
    STANDARD: 'Standard',
    JOURNAL_ENTRY: 'Journal Entry',
    GLOSSARY_TERM: 'Glossary',
    ILLUSTRATION: 'Illustration',
    FAQ: 'FAQ',
    REFERENCE: 'Reference',
  }
  return labels[type] ?? type
}

/**
 * Build a canonical URL path for an entry.
 */
export function getEntryPath(domainSlug: string, subSlug: string, entrySlug: string): string {
  return `/${domainSlug}/${subSlug}/${entrySlug}`
}

/**
 * Build a canonical URL path for a domain.
 */
export function getDomainPath(domainSlug: string): string {
  return `/${domainSlug}`
}
