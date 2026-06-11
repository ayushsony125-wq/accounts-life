import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, BookOpen, ArrowLeft } from 'lucide-react'
import BackButton from '@/components/ui/BackButton'
import TableOfContents from '@/components/ui/TableOfContents'
import VerificationBadge from '@/components/ui/VerificationBadge'
import { formatReviewDate, estimateReadTime, getEntryTypeLabel } from '@/lib/utils'
import { getEntryBySlug, getSearchIndex } from '@/lib/queries'
import type {
  TableOfContentsItem,
  EntryType,
  VerificationLevel,
} from '@/lib/types'
import TopicPageClient from '@/components/ui/TopicPageClient'

interface PageParams {
  params: {
    domainSlug: string
    subSlug: string
    entrySlug: string
  }
}

// ─── generateStaticParams — pre-renders known entries ─────────────────────────

export async function generateStaticParams() {
  const index = await getSearchIndex()
  return index
    .filter((item) => {
      const parts = item.slug.split('/')
      return parts.length === 3 && parts[0] !== 'standards'
    })
    .map((item) => {
      const [domainSlug, subSlug, entrySlug] = item.slug.split('/')
      return { domainSlug, subSlug, entrySlug }
    })
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  if (params.domainSlug === 'standards') return { title: 'Not Found' }
  const entry = await getEntryBySlug(params.domainSlug, params.subSlug, params.entrySlug)
  if (!entry) return { title: 'Not Found' }
  return {
    title: entry.entryTitle,
    description: entry.summary,
    alternates: {
      canonical: `/${params.domainSlug}/${params.subSlug}/${params.entrySlug}`,
    },
    openGraph: {
      title: `${entry.entryTitle} | Accounts.One`,
      description: entry.summary,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TopicPage({ params }: PageParams) {
  if (params.domainSlug === 'standards') notFound()
  const entry = await getEntryBySlug(
    params.domainSlug,
    params.subSlug,
    params.entrySlug
  )

  if (!entry) notFound()

  // If entry contains Universal Topic Page structure, render TopicPageClient
  if (entry.entryBody && (entry.entryBody as any).quickAnswer) {
    return <TopicPageClient entry={entry} />
  }

  // Build TOC items from sections
  const tocItems: TableOfContentsItem[] = entry.sections.map((s: any) => ({
    id: s.id,
    label: s.heading,
    level: s.level,
    children: s.subsections?.map((sub: any) => ({
      id: sub.id,
      label: sub.heading,
      level: sub.level,
    })),
  }))

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://accounts.one'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': `${entry.entryTitle} | Accounts.One`,
    'description': entry.summary,
    'datePublished': entry.publishedAt || entry.createdAt || new Date().toISOString(),
    'dateModified': entry.updatedAt || new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': 'AK',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Accounts.One',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/logo.png`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${params.domainSlug}/${params.subSlug}/${params.entrySlug}`,
    },
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath={`/${entry.domain.domainSlug}/${entry.subdomain.subdomainSlug}`} />
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 xl:gap-16">

        {/* ── Main reading column ────────────────────────────────── */}
        <article className="min-w-0 max-w-[680px]" aria-labelledby="entry-title">

          {/* Entry header */}
          <header className="mb-8">
            {/* Type + Domain badges */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span
                className="text-xs font-bold tracking-widest px-2 py-0.5 rounded"
                style={{
                  backgroundColor: `${entry.domain.domainColorHex}18`,
                  color: entry.domain.domainColorHex,
                }}
              >
                {entry.domain.domainCode}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#EEF2FD] text-[#2D5BE3]">
                {getEntryTypeLabel(entry.entryType)}
              </span>
              <VerificationBadge level={entry.verificationLevel as VerificationLevel} size="sm" />
              {entry.examLevelTags?.map((tag: string) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F4F3F0] text-[#4A4A52]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              id="entry-title"
              className="text-[28px] md:text-[32px] font-bold text-[#1C1C1E] tracking-tight leading-tight"
            >
              {entry.entryTitle}
            </h1>

            {/* Summary */}
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed">
              {entry.summary}
            </p>

            {/* Meta row */}
            <div className="mt-4 flex items-center flex-wrap gap-4 text-xs text-[#76767E]">
              {entry.wordCount && (
                <span className="flex items-center gap-1">
                  <BookOpen size={12} aria-hidden="true" />
                  {estimateReadTime(entry.wordCount)}
                </span>
              )}
              {entry.lastReviewedAt && (
                <span className="flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  Reviewed {formatReviewDate(entry.lastReviewedAt)}
                </span>
              )}
            </div>
          </header>

          {/* ── Authority source ─────────────────────────────────── */}
          {entry.authorityPrimary && (
            <AuthorityInline
              primary={entry.authorityPrimary}
              primaryUrl={entry.authorityPrimaryUrl}
              secondary={entry.authoritySecondary}
            />
          )}

          {/* ── Key points ──────────────────────────────────────── */}
          {entry.keyPoints && entry.keyPoints.length > 0 && (
            <KeyPointsSection points={entry.keyPoints} color={entry.domain.domainColorHex} />
          )}

          {/* ── Divider ─────────────────────────────────────────── */}
          <hr className="border-[#E2E1DD] my-8" />

          {/* ── Body sections ───────────────────────────────────── */}
          <div className="space-y-10">
            {entry.sections.map((section: any) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-3 scroll-mt-24"
                >
                  {section.heading}
                </h2>
                <p className="text-base text-[#1C1C1E] font-reading leading-relaxed">
                  {section.body}
                </p>
                {section.subsections?.map((sub: any) => (
                  <div key={sub.id} className="mt-5 pl-4 border-l-2 border-[#E2E1DD]">
                    <h3
                      id={sub.id}
                      className="text-base font-semibold text-[#1C1C1E] mb-2 scroll-mt-24"
                    >
                      {sub.heading}
                    </h3>
                    <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">
                      {sub.body}
                    </p>
                  </div>
                ))}
              </section>
            ))}
          </div>

          {/* ── Formula ─────────────────────────────────────────── */}
          {entry.formula && (
            <div className="mt-10">
              <FormulaInline
                formula={entry.formula.formula}
                label={entry.formula.label}
                note={entry.formula.note}
              />
            </div>
          )}

          {/* ── Callout notes ────────────────────────────────────── */}
          {entry.notes && entry.notes.length > 0 && (
            <div className="mt-10 space-y-4">
              {entry.notes.map((note: any, i: number) => (
                <CalloutInline key={i} type={note.type} title={note.title} body={note.body} />
              ))}
            </div>
          )}

          {/* ── FAQs ─────────────────────────────────────────────── */}
          {entry.faqs && entry.faqs.length > 0 && (
            <FAQSection faqs={entry.faqs} />
          )}

          {/* ── Related topics ───────────────────────────────────── */}
          {entry.relatedEntries && entry.relatedEntries.length > 0 && (
            <RelatedSection entries={entry.relatedEntries} />
          )}
        </article>

        {/* ── Right TOC column ──────────────────────────────────── */}
        <aside className="hidden lg:block">
          <TableOfContents items={tocItems} />
        </aside>
      </div>
    </div>
  )
}

// ─── Inline sub-components (no separate file needed — page-only) ─────────────

function AuthorityInline({
  primary,
  primaryUrl,
  secondary,
}: {
  primary: string
  primaryUrl?: string | null
  secondary?: string | null
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F4F3F0] border border-[#E2E1DD] mb-6">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A7A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-1">Authority Source</p>
        {primaryUrl ? (
          <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2D5BE3] hover:underline inline-flex items-center gap-1">
            {primary}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        ) : (
          <span className="text-sm font-semibold text-[#1C1C1E]">{primary}</span>
        )}
        {secondary && <p className="text-xs text-[#76767E] mt-1 leading-relaxed">{secondary}</p>}
      </div>
    </div>
  )
}

function KeyPointsSection({ points, color }: { points: string[]; color: string }) {
  return (
    <div className="my-6 p-4 rounded-lg border border-[#E2E1DD] bg-white">
      <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-3">Key Points</p>
      <ul className="space-y-2">
        {points.map((pt, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#1C1C1E] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: color }} aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FormulaInline({ formula, label, note }: { formula: string; label?: string; note?: string }) {
  return (
    <div className="rounded-lg border border-[#E2E1DD] overflow-hidden">
      <div className="px-4 py-2.5 bg-[#F4F3F0] border-b border-[#E2E1DD]">
        <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest">{label ?? 'Formula'}</p>
      </div>
      <div className="px-4 py-5 bg-white">
        <pre className="font-mono text-sm text-[#1C1C1E] whitespace-pre-wrap leading-relaxed text-center">{formula}</pre>
      </div>
      {note && (
        <div className="px-4 py-2.5 bg-[#FAFAF8] border-t border-[#E2E1DD]">
          <p className="text-xs text-[#76767E] leading-relaxed">{note}</p>
        </div>
      )}
    </div>
  )
}

function CalloutInline({ type, title, body }: { type: string; title?: string; body: string }) {
  const config: Record<string, { cls: string; icon: string }> = {
    IMPORTANT: { cls: 'callout callout-important', icon: '⚠' },
    NOTE: { cls: 'callout callout-note', icon: 'ℹ' },
    TIP: { cls: 'callout callout-tip', icon: '💡' },
    CAUTION: { cls: 'callout callout-caution', icon: '⚡' },
  }
  const { cls, icon } = config[type] ?? config.NOTE
  return (
    <div className={cls} role="note">
      <span className="text-base shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
      <div>
        {title && <p className="text-sm font-semibold mb-1">{title}</p>}
        <p className="text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function FAQSection({ faqs }: { faqs: Array<{ id: number; faqQuestion: string; faqAnswer: string; faqSourceRef?: string }> }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-10 pt-8 border-t border-[#E2E1DD]">
      <h2 id="faq-heading" className="text-base font-bold text-[#1C1C1E] mb-5 tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-4 rounded-lg border border-[#E2E1DD] bg-white">
            <p className="text-sm font-semibold text-[#1C1C1E] mb-2">{faq.faqQuestion}</p>
            <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{faq.faqAnswer}</p>
            {faq.faqSourceRef && (
              <p className="mt-2 text-xs text-[#A0A0A8]">Source: {faq.faqSourceRef}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function RelatedSection({ entries }: { entries: Array<{ id: number; entryTitle: string; entrySlug: string; entryType: string; domain: { domainCode: string; domainSlug: string; domainColorHex: string } }> }) {
  const TYPE_LABEL: Record<string, string> = {
    CONCEPT: 'Concept', STANDARD: 'Standard', JOURNAL_ENTRY: 'Journal Entry',
    GLOSSARY_TERM: 'Glossary', ILLUSTRATION: 'Illustration', FAQ: 'FAQ', REFERENCE: 'Reference',
  }
  return (
    <aside aria-labelledby="related-heading" className="mt-10 pt-8 border-t border-[#E2E1DD]">
      <h2 id="related-heading" className="text-base font-bold text-[#1C1C1E] mb-4 tracking-tight">
        Related Topics
      </h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link
              href={`/${entry.domain.domainSlug}/${entry.entrySlug}`}
              className="group flex items-center gap-3 p-3 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] transition-all"
            >
              <span
                className="text-xs font-bold shrink-0 px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${entry.domain.domainColorHex}18`, color: entry.domain.domainColorHex }}
              >
                {entry.domain.domainCode}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors truncate">
                  {entry.entryTitle}
                </p>
                <p className="text-xs text-[#76767E] mt-0.5">{TYPE_LABEL[entry.entryType] ?? entry.entryType}</p>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#A0A0A8] group-hover:text-[#2D5BE3] shrink-0 transition-colors" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
