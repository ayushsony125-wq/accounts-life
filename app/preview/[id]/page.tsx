import { notFound } from 'next/navigation'
import { verifyAdminSession } from '../../admin/session'
import { getEntryById } from '@/lib/queries'
import { fetchStandards, fetchStandardDetail } from '@/lib/learning-loader'
import LearningPortalClient from '../../standards/learning/LearningPortalClient'
import TopicPageClient from '@/components/ui/TopicPageClient'
import BackButton from '@/components/ui/BackButton'
import TableOfContents from '@/components/ui/TableOfContents'
import VerificationBadge from '@/components/ui/VerificationBadge'
import { formatReviewDate, estimateReadTime, getEntryTypeLabel } from '@/lib/utils'
import Link from 'next/link'
import { Clock, BookOpen, AlertCircle } from 'lucide-react'

interface PreviewPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function PreviewPage({ params }: PreviewPageProps) {
  // Ensure only authenticated admins can access previews
  await verifyAdminSession()
  const { id } = await params
  
  const entry = await getEntryById(Number(id))
  if (!entry) {
    notFound()
  }

  // Banner indicating it is a preview mode
  const previewBanner = (
    <div className="bg-[#FEF6E4] border-b border-[#F5C6C0] px-6 py-2.5 flex items-center justify-between text-xs text-[#B45309] font-semibold sticky top-16 z-50">
      <div className="flex items-center gap-2">
        <AlertCircle size={14} className="text-[#B45309]" />
        <span>PREVIEW MODE — Viewing exact layout for {entry.entryTitle} (Status: {entry.status})</span>
      </div>
      <div className="flex items-center gap-3">
        <Link href={`/admin/entries/${id}/edit`} className="text-[#2D5BE3] hover:underline font-bold">
          Back to Editor
        </Link>
      </div>
    </div>
  )

  // 1. Render STANDARD Entry
  if (entry.entryType === 'STANDARD') {
    const framework = entry.standardDetail?.standardFramework === 'IND_AS' ? 'Ind AS' : 'AS'
    const standardDetails = await fetchStandardDetail(entry.entrySlug, framework)
    if (!standardDetails) {
      return (
        <div className="p-8 text-center space-y-4">
          <p className="text-red-500 font-bold">Standard details not found in database.</p>
          <Link href={`/admin/entries/${id}/edit`} className="text-blue-500 hover:underline">
            Back to Editor
          </Link>
        </div>
      )
    }

    const standards = await fetchStandards(framework)
    // Inject current preview details into list if not already present
    if (!standards.some((s) => s.id === standardDetails.id)) {
      standards.push(standardDetails)
    }

    return (
      <div className="flex flex-col min-h-screen">
        {previewBanner}
        <div className="flex-1">
          <LearningPortalClient
            initialStandards={standards}
            initialSelectedStandardDetails={standardDetails}
            defaultFramework={framework}
            initialSelectedStandardId={standardDetails.id}
          />
        </div>
      </div>
    )
  }

  // 2. Render CONCEPT or OTHER Entries
  const body = (typeof entry.entryBody === 'string'
    ? JSON.parse(entry.entryBody)
    : entry.entryBody) || {}

  const mappedEntry = {
    ...entry,
    sections: body.sections || [],
    keyPoints: body.keyPoints || [],
    formula: body.formula || null,
    notes: entry.notes.length > 0 ? entry.notes : (body.notes || []),
    faqs: entry.faqs.length > 0 ? entry.faqs : (body.faqs || []),
    relatedEntries: entry.relationsFrom
      ?.filter((rel: any) => rel.relatedEntry?.status === 'PUBLISHED')
      ?.map((rel: any) => rel.relatedEntry) || [],
  }

  // Render TopicPageClient if Universal Topic structure exists
  if (mappedEntry.entryBody && (mappedEntry.entryBody as any).quickAnswer) {
    return (
      <div className="flex flex-col min-h-screen">
        {previewBanner}
        <div className="flex-1">
          <TopicPageClient entry={mappedEntry} />
        </div>
      </div>
    )
  }

  // Build TOC items from sections
  const tocItems = mappedEntry.sections.map((s: any) => ({
    id: s.id,
    label: s.heading,
    level: s.level,
    children: s.subsections?.map((sub: any) => ({
      id: sub.id,
      label: sub.heading,
      level: sub.level,
    })),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      {previewBanner}
      <div className="max-w-[1280px] mx-auto px-6 py-10 flex-1 w-full">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <BackButton fallbackPath={`/${mappedEntry.domain.domainSlug}/${mappedEntry.subdomain.subdomainSlug}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 xl:gap-16">
          {/* Main reading column */}
          <article className="min-w-0 max-w-[680px]">
            <header className="mb-8">
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span
                  className="text-xs font-bold tracking-widest px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${mappedEntry.domain.domainColorHex}18`,
                    color: mappedEntry.domain.domainColorHex,
                  }}
                >
                  {mappedEntry.domain.domainCode}
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#EEF2FD] text-[#2D5BE3]">
                  {getEntryTypeLabel(mappedEntry.entryType)}
                </span>
                <VerificationBadge level={mappedEntry.verificationLevel} size="sm" />
                {mappedEntry.examLevelTags?.map((tag: string) => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F4F3F0] text-[#4A4A52]">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-[28px] md:text-[32px] font-bold text-[#1C1C1E] tracking-tight leading-tight">
                {mappedEntry.entryTitle}
              </h1>

              <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed">
                {mappedEntry.summary}
              </p>

              <div className="mt-4 flex items-center flex-wrap gap-4 text-xs text-[#76767E]">
                {mappedEntry.wordCount && (
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {estimateReadTime(mappedEntry.wordCount)}
                  </span>
                )}
                {mappedEntry.lastReviewedAt && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Reviewed {formatReviewDate(mappedEntry.lastReviewedAt)}
                  </span>
                )}
              </div>
            </header>

            {mappedEntry.authorityPrimary && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F4F3F0] border border-[#E2E1DD] mb-6">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-1">Authority Source</p>
                  {mappedEntry.authorityPrimaryUrl ? (
                    <a href={mappedEntry.authorityPrimaryUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2D5BE3] hover:underline inline-flex items-center gap-1">
                      {mappedEntry.authorityPrimary}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-[#1C1C1E]">{mappedEntry.authorityPrimary}</span>
                  )}
                  {mappedEntry.authoritySecondary && <p className="text-xs text-[#76767E] mt-1 leading-relaxed">{mappedEntry.authoritySecondary}</p>}
                </div>
              </div>
            )}

            {mappedEntry.keyPoints && mappedEntry.keyPoints.length > 0 && (
              <div className="my-6 p-4 rounded-lg border border-[#E2E1DD] bg-white">
                <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-3">Key Points</p>
                <ul className="space-y-2">
                  {mappedEntry.keyPoints.map((pt: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#1C1C1E] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: mappedEntry.domain.domainColorHex }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="border-[#E2E1DD] my-8" />

            <div className="space-y-10">
              {mappedEntry.sections.map((section: any) => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id} className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-3 scroll-mt-24">
                    {section.heading}
                  </h2>
                  <p className="text-base text-[#1C1C1E] font-reading leading-relaxed">
                    {section.body}
                  </p>
                  {section.subsections?.map((sub: any) => (
                    <div key={sub.id} className="mt-5 pl-4 border-l-2 border-[#E2E1DD]">
                      <h3 id={sub.id} className="text-base font-semibold text-[#1C1C1E] mb-2 scroll-mt-24">
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

            {mappedEntry.formula && (
              <div className="mt-10 rounded-lg border border-[#E2E1DD] overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F4F3F0] border-b border-[#E2E1DD]">
                  <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest">Formula</p>
                </div>
                <div className="px-4 py-5 bg-white">
                  <pre className="font-mono text-sm text-[#1C1C1E] whitespace-pre-wrap leading-relaxed text-center">{mappedEntry.formula.formula}</pre>
                </div>
              </div>
            )}

            {mappedEntry.notes && mappedEntry.notes.length > 0 && (
              <div className="mt-10 space-y-4 font-sans">
                {mappedEntry.notes.map((note: any, i: number) => {
                  const type = note.noteType || note.type || 'NOTE'
                  const title = note.noteTitle || note.title || ''
                  const body = note.noteBody || note.body || ''
                  return (
                    <div key={i} className={`p-4 border-l-4 rounded-r-xl bg-[#F4F3F0] border-[#E2E1DD]`}>
                      {title && <p className="text-sm font-semibold mb-1">{title}</p>}
                      <p className="text-sm leading-relaxed">{body}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {mappedEntry.domain?.domainSlug?.toLowerCase() !== 'as' && mappedEntry.faqs && mappedEntry.faqs.length > 0 && (
              <section className="mt-10 pt-8 border-t border-[#E2E1DD]">
                <h2 className="text-base font-bold text-[#1C1C1E] mb-5 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {mappedEntry.faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-lg border border-[#E2E1DD] bg-white">
                      <p className="text-sm font-semibold text-[#1C1C1E] mb-2">{faq.faqQuestion || faq.question}</p>
                      <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{faq.faqAnswer || faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </aside>
        </div>
      </div>
    </div>
  )
}
