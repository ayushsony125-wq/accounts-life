import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, Building2, ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import TableOfContents from '@/components/ui/TableOfContents'
import VerificationBadge from '@/components/ui/VerificationBadge'
import { formatFullDate } from '@/lib/utils'
import { getIndASStandardBySlug, getSearchIndex, getDomains } from '@/lib/queries'
import { prisma } from '@/lib/db'
import type { TableOfContentsItem, VerificationLevel } from '@/lib/types'

interface PageParams {
  params: { slug: string }
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  const index = await getSearchIndex()
  return index
    .filter((item) => item.slug.startsWith('standards/ind-as/'))
    .map((item) => {
      const slug = item.slug.split('/').pop()!
      return { slug }
    })
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const std = await getIndASStandardBySlug(params.slug)
  if (!std) return { title: 'Not Found' }
  return {
    title: std.entryTitle,
    description: std.summary,
    alternates: { canonical: `/standards/ind-as/${params.slug}` },
    openGraph: {
      title: `${std.entryTitle} | Accounts.Life`,
      description: std.summary,
    },
  }
}

const IND_AS_TOC: TableOfContentsItem[] = [
  { id: 'ind-objective', label: 'Objective', level: 1 },
  { id: 'ind-scope', label: 'Scope', level: 1 },
  { id: 'ind-components', label: 'Key Components', level: 1 },
  { id: 'ind-related', label: 'Related Standards', level: 1 },
  { id: 'ind-faq', label: 'FAQs', level: 1 },
]

const FW_COLOR = '#6B3FA0'
const STATUS_CLS: Record<string, string> = {
  ACTIVE: 'bg-[#E8F7EE] text-[#1A7A4A]',
  WITHDRAWN: 'bg-[#FDEEEE] text-[#C0392B]',
  REVISED: 'bg-[#FEF6E4] text-[#B45309]',
}

export default async function IndASStandardPage({ params }: PageParams) {
  // Check if it's a subdomain first
  let dbSubdomain = await (async () => {
    try {
      return await prisma.subdomain.findFirst({
        where: {
          subdomainSlug: params.slug,
          domain: { domainSlug: 'standards/ind-as' }
        },
        include: {
          domain: true,
          entries: {
            where: { status: 'PUBLISHED' },
            include: { standardDetail: true },
            orderBy: { sortOrder: 'asc' }
          }
        }
      })
    } catch (e) {
      console.warn('Prisma subdomain.findFirst failed, using fallback.', e)
      return null
    }
  })()

  if (!dbSubdomain) {
    const staticDomains = await getDomains()
    const staticDomain = staticDomains.find(d => d.domainSlug === 'standards/ind-as')
    const staticSub = staticDomain?.subdomains.find(s => ('subdomainSlug' in s ? (s as any).subdomainSlug : (s as any).slug) === params.slug)
    if (staticSub) {
      dbSubdomain = {
        subdomainName: 'name' in staticSub ? (staticSub as any).name : (staticSub as any).subdomainName || '',
        subdomainSlug: params.slug,
        subdomainDescription: '',
        domain: {
          domainSlug: 'standards/ind-as',
          domainName: 'Ind AS Standards',
          domainColorHex: '#6B3FA0'
        },
        entries: []
      } as any
    }
  }

  if (dbSubdomain) {
    let entries = dbSubdomain.entries || []
    if (entries.length === 0) {
      entries = await (async () => {
        try {
          return await prisma.entry.findMany({
            where: {
              subdomain: { subdomainSlug: params.slug },
              domain: { domainSlug: 'standards/ind-as' },
              status: 'PUBLISHED'
            },
            include: { standardDetail: true },
            orderBy: { sortOrder: 'asc' }
          })
        } catch (e) {
          console.warn('Prisma entry.findMany failed, using fallback.', e)
          return []
        }
      })()
    }

    const colorHex = dbSubdomain.domain?.domainColorHex || '#6B3FA0'

    return (
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Ind AS Standards', href: '/standards/ind-as' },
            { label: dbSubdomain.subdomainName }
          ]}
          className="mb-6"
        />

        <header className="mb-10 pb-8 border-b border-[#E2E1DD]">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-3"
            style={{
              backgroundColor: `${colorHex}18`,
              color: colorHex,
            }}
          >
            Subdomain
          </span>
          <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight leading-tight">
            {dbSubdomain.subdomainName}
          </h1>
          {dbSubdomain.subdomainDescription && (
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed max-w-2xl">
              {dbSubdomain.subdomainDescription}
            </p>
          )}
        </header>

        <main className="min-w-0 max-w-3xl">
          <h2 className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight">
            Accounting Standards in this Category
          </h2>

          {entries.length === 0 ? (
            <div className="p-6 rounded-lg border border-dashed border-[#E2E1DD] bg-white text-center">
              <span className="text-sm font-medium text-[#4A4A52]">No standards published yet</span>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Link
                  key={entry.entrySlug}
                  href={`/standards/ind-as/${entry.entrySlug}`}
                  className="group block p-5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#6B3FA0] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#6B3FA0]15 text-[#6B3FA0]">
                      {entry.standardDetail?.standardCode || 'Ind AS'}
                    </span>
                    <h3 className="text-base font-semibold text-[#1C1C1E] group-hover:text-[#6B3FA0] transition-colors leading-snug flex-1 pl-3">
                      {entry.entryTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-[#76767E] leading-relaxed mb-3 line-clamp-2">
                    {entry.summary}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#6B3FA0]">
                    <span>Read standard guide</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    )
  }

  const std = await getIndASStandardBySlug(params.slug)

  if (!std) notFound()

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ind AS Standards', href: '/standards/ind-as' },
          { label: std.standardCode },
        ]}
        className="mb-6"
      />
      <Link
        href="/standards/ind-as"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#76767E] hover:text-[#2D5BE3] transition-colors mb-6"
      >
        <ArrowLeft size={12} />
        Back to Ind AS Standards
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 xl:gap-16">
        <article className="min-w-0 max-w-[680px]" aria-labelledby="ind-std-title">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-[#E2E1DD]">
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest px-2.5 py-1 rounded" style={{ backgroundColor: `${FW_COLOR}18`, color: FW_COLOR }}>
                Ind AS
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUS_CLS[std.standardStatus] || 'bg-[#F4F3F0] text-[#76767E]'}`}>
                {std.standardStatus}
              </span>
              <VerificationBadge level={std.verificationLevel as VerificationLevel} size="sm" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: FW_COLOR }}>
              {std.standardCode}
            </p>
            <h1 id="ind-std-title" className="text-[28px] md:text-[32px] font-bold text-[#1C1C1E] tracking-tight leading-tight">
              {std.entryTitle}
            </h1>
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed">{std.summary}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider flex items-center gap-1">
                  <Building2 size={11} aria-hidden="true" /> Issued by
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">{std.issuingBody}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={11} aria-hidden="true" /> Notified / Issued
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">{std.dateIssued ? formatFullDate(std.dateIssued) : 'N/A'}</dd>
              </div>
            </dl>
            {/* Authority */}
            <div className="mt-5 flex items-start gap-3 p-4 rounded-lg bg-[#F4F3F0] border border-[#E2E1DD]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A7A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-1">Official Source</p>
                {std.authorityPrimaryUrl ? (
                  <a href={std.authorityPrimaryUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2D5BE3] hover:underline inline-flex items-center gap-1">
                    {std.authorityPrimary} <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-[#1C1C1E]">{std.authorityPrimary}</span>
                )}
                <p className="text-xs text-[#76767E] mt-1 leading-relaxed">{std.applicabilitySummary}</p>
              </div>
            </div>
          </header>

          {/* Objective */}
          {std.objective && (
            <section id="ind-objective" aria-labelledby="ind-obj-h" className="mb-10 scroll-mt-24">
              <h2 id="ind-obj-h" className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-4">Objective</h2>
              <p className="text-base text-[#1C1C1E] font-reading leading-relaxed">{std.objective}</p>
            </section>
          )}

          {/* Scope */}
          {std.scope && (
            <section id="ind-scope" aria-labelledby="ind-scope-h" className="mb-10 scroll-mt-24">
              <h2 id="ind-scope-h" className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-4">Scope</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#E8F7EE] border border-[#C3E8D4]">
                  <p className="text-xs font-semibold text-[#1A7A4A] uppercase tracking-widest mb-2">Applies To</p>
                  <ul className="space-y-1.5">
                    {std.scope.included?.map((item: string, i: number) => (
                      <li key={i} className="text-xs text-[#1C1C1E] leading-relaxed flex gap-2">
                        <span className="text-[#1A7A4A] shrink-0">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-[#FDEEEE] border border-[#F5C6C0]">
                  <p className="text-xs font-semibold text-[#C0392B] uppercase tracking-widest mb-2">Does Not Apply To</p>
                  <ul className="space-y-1.5">
                    {std.scope.excluded?.map((item: string, i: number) => (
                      <li key={i} className="text-xs text-[#1C1C1E] leading-relaxed flex gap-2">
                        <span className="text-[#C0392B] shrink-0">✗</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Key Components */}
          {std.keyComponents && std.keyComponents.length > 0 && (
            <section id="ind-components" aria-labelledby="ind-comp-h" className="mb-10 scroll-mt-24">
              <h2 id="ind-comp-h" className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-4">Key Components</h2>
              <div className="space-y-4">
                {std.keyComponents.map((comp: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg border border-[#E2E1DD] bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: FW_COLOR }} aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-[#1C1C1E]">{comp.title}</h3>
                    </div>
                    <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Standards */}
          {std.relatedStandards && std.relatedStandards.length > 0 && (
            <section id="ind-related" aria-labelledby="ind-rel-h" className="mb-10 scroll-mt-24">
              <h2 id="ind-rel-h" className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-4">Related Standards</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {std.relatedStandards.map((rs: any) => (
                  <Link
                    key={rs.slug}
                    href={`/standards/${rs.framework}/${rs.slug}`}
                    className="group flex items-center gap-3 p-3.5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] transition-all"
                  >
                    <span
                      className="text-xs font-bold shrink-0 px-2 py-0.5 rounded whitespace-nowrap"
                      style={{ backgroundColor: `${rs.framework === 'as' ? '#0F6B5E' : FW_COLOR}15`, color: rs.framework === 'as' ? '#0F6B5E' : FW_COLOR }}
                    >
                      {rs.code}
                    </span>
                    <span className="text-sm text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors min-w-0 truncate">{rs.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {std.faqs && std.faqs.length > 0 && (
            <section id="ind-faq" aria-labelledby="ind-faq-h" className="scroll-mt-24">
              <h2 id="ind-faq-h" className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-4">FAQs</h2>
              <div className="space-y-4">
                {std.faqs.map((faq: any) => (
                  <div key={faq.id} className="p-4 rounded-lg border border-[#E2E1DD] bg-white">
                    <p className="text-sm font-semibold text-[#1C1C1E] mb-2">{faq.question}</p>
                    <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* TOC */}
        <aside className="hidden lg:block">
          <TableOfContents items={IND_AS_TOC} label="Standard sections" />
        </aside>
      </div>
    </div>
  )
}
