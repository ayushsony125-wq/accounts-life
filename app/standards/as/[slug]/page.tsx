import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, Building2, CheckCircle2, ArrowRight } from 'lucide-react'
import BackButton from '@/components/ui/BackButton'
import TableOfContents from '@/components/ui/TableOfContents'
import VerificationBadge from '@/components/ui/VerificationBadge'
import { formatFullDate, estimateReadTime } from '@/lib/utils'
import { getASStandardBySlug, getSearchIndex, getDomains } from '@/lib/queries'
import { prisma } from '@/lib/db'
import type { TableOfContentsItem, VerificationLevel } from '@/lib/types'

interface PageParams {
  params: { slug: string }
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  const index = await getSearchIndex()
  return index
    .filter((item) => item.slug.startsWith('standards/as/'))
    .map((item) => {
      const slug = item.slug.split('/').pop()!
      return { slug }
    })
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const std = await getASStandardBySlug(params.slug)
  if (!std) return { title: 'Not Found' }
  return {
    title: std.entryTitle,
    description: std.summary,
    alternates: { canonical: `/standards/as/${params.slug}` },
    openGraph: {
      title: `${std.entryTitle} | Accounts.One`,
      description: std.summary,
    },
  }
}

// ─── TOC items ────────────────────────────────────────────────────────────────

const STD_TOC: TableOfContentsItem[] = [
  { id: 'std-objective', label: 'Objective', level: 1 },
  { id: 'std-scope', label: 'Scope', level: 1 },
  { id: 'std-definitions', label: 'Key Definitions', level: 1 },
  { id: 'std-recognition', label: 'Recognition Rules', level: 1 },
  { id: 'std-measurement', label: 'Measurement', level: 1 },
  { id: 'std-disclosure', label: 'Disclosure Requirements', level: 1 },
  { id: 'std-journal', label: 'Journal Entry Guidance', level: 1 },
  { id: 'std-comparison', label: 'Comparison: AS vs Ind AS', level: 1 },
  { id: 'std-related', label: 'Related Standards', level: 1 },
  { id: 'std-faq', label: 'FAQs', level: 1 },
]

// ─── Framework color map ──────────────────────────────────────────────────────

const FW_COLOR: Record<string, string> = { AS: '#0F6B5E', IND_AS: '#6B3FA0' }
const STATUS_CLS: Record<string, string> = {
  ACTIVE: 'bg-[#E8F7EE] text-[#1A7A4A]',
  WITHDRAWN: 'bg-[#FDEEEE] text-[#C0392B]',
  REVISED: 'bg-[#FEF6E4] text-[#B45309]',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StandardPage({ params }: PageParams) {
  // Check if it's a subdomain first
  let dbSubdomain = await (async () => {
    try {
      return await prisma.subdomain.findFirst({
        where: {
          subdomainSlug: params.slug,
          domain: { domainSlug: 'standards/as' }
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
    const staticDomain = staticDomains.find(d => d.domainSlug === 'standards/as')
    const staticSub = staticDomain?.subdomains.find(s => ('subdomainSlug' in s ? (s as any).subdomainSlug : (s as any).slug) === params.slug)
    if (staticSub) {
      dbSubdomain = {
        subdomainName: 'name' in staticSub ? (staticSub as any).name : (staticSub as any).subdomainName || '',
        subdomainSlug: params.slug,
        subdomainDescription: '',
        domain: {
          domainSlug: 'standards/as',
          domainName: 'AS Standards',
          domainColorHex: '#0F6B5E'
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
              domain: { domainSlug: 'standards/as' },
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

    const colorHex = dbSubdomain.domain?.domainColorHex || '#0F6B5E'

    return (
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <BackButton fallbackPath="/standards/as" />
        </div>

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
                  href={`/standards/as/${entry.entrySlug}`}
                  className="group block p-5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#0F6B5E] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0F6B5E]15 text-[#0F6B5E]">
                      {entry.standardDetail?.standardCode || 'AS'}
                    </span>
                    <h3 className="text-base font-semibold text-[#1C1C1E] group-hover:text-[#0F6B5E] transition-colors leading-snug flex-1 pl-3">
                      {entry.entryTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-[#76767E] leading-relaxed mb-3 line-clamp-2">
                    {entry.summary}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#0F6B5E]">
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

  const std = await getASStandardBySlug(params.slug)

  if (!std) notFound()
  const fwColor = FW_COLOR[std.standardFramework] ?? '#0F6B5E'

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath="/standards/as" />
      </div>

      {/* 2-column: article + TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 xl:gap-16">

        {/* ── Main article ──────────────────────────────────────── */}
        <article className="min-w-0 max-w-[680px]" aria-labelledby="std-title">

          {/* ── Standard Header ─────────────────────────────────── */}
          <header className="mb-8 pb-8 border-b border-[#E2E1DD]">
            {/* Framework + Status badges */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span
                className="text-xs font-bold tracking-widest px-2.5 py-1 rounded"
                style={{ backgroundColor: `${fwColor}18`, color: fwColor }}
              >
                {std.standardFramework === 'AS' ? 'AS Standards' : 'Ind AS'}
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUS_CLS[std.standardStatus]}`}>
                {std.standardStatus}
              </span>
              <VerificationBadge level={std.verificationLevel as VerificationLevel} size="sm" />
            </div>

            {/* Standard code headline */}
            <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: fwColor }}>
              {std.standardCode}
            </p>
            <h1
              id="std-title"
              className="text-[28px] md:text-[32px] font-bold text-[#1C1C1E] tracking-tight leading-tight"
            >
              {std.entryTitle}
            </h1>
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed">
              {std.summary}
            </p>

            {/* Meta facts */}
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider flex items-center gap-1">
                  <Building2 size={11} aria-hidden="true" /> Issued by
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">{std.issuingBody}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={11} aria-hidden="true" /> Issued
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">{std.dateIssued ? formatFullDate(std.dateIssued) : 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={11} aria-hidden="true" /> Effective
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">{std.dateEffective ? formatFullDate(std.dateEffective) : 'N/A'}</dd>
              </div>
            </dl>

            {/* Quick bullets */}
            <div className="mt-5 flex flex-wrap gap-3">
              {std.quickBullets?.map((b: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#F4F3F0] rounded-lg text-sm">
                  <span aria-hidden="true">{b.icon}</span>
                  <div>
                    <span className="font-semibold text-[#1C1C1E]">{b.label}: </span>
                    <span className="text-[#4A4A52]">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Authority + Applicability */}
            <div className="mt-5 flex items-start gap-3 p-4 rounded-lg bg-[#F4F3F0] border border-[#E2E1DD]">
              <CheckCircle2 size={16} className="text-[#1A7A4A] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-1">Authority & Applicability</p>
                {std.authorityPrimaryUrl ? (
                  <a
                    href={std.authorityPrimaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#2D5BE3] hover:underline inline-flex items-center gap-1"
                  >
                    {std.authorityPrimary} <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-[#1C1C1E]">{std.authorityPrimary}</span>
                )}
                <p className="text-xs text-[#76767E] mt-1 leading-relaxed">{std.applicabilitySummary}</p>
              </div>
            </div>
          </header>

          {/* ── Objective ─────────────────────────────────────────── */}
          {std.objective && (
            <section id="std-objective" aria-labelledby="obj-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="obj-heading" title="Objective" para={std.objective.sourcePara} />
              <p className="text-base text-[#1C1C1E] font-reading leading-relaxed">{std.objective.text}</p>
              <p className="mt-3 text-sm text-[#4A4A52] font-reading leading-relaxed">{std.objective.commentary}</p>
              <div className="mt-4 space-y-2">
                {std.objective.keyIssues?.map((issue: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-[#4A4A52]">
                    <span className="text-[#2D5BE3] font-bold shrink-0 mt-0.5">Q{i + 1}.</span>
                    {issue}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Scope ─────────────────────────────────────────────── */}
          {std.scope && (
            <section id="std-scope" aria-labelledby="scope-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="scope-heading" title="Scope" />
              <p className="text-sm text-[#4A4A52] font-reading leading-relaxed mb-4">{std.scope.statement}</p>
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

          {/* ── Definitions ─────────────────────────────────────── */}
          {std.definitions && std.definitions.length > 0 && (
            <section id="std-definitions" aria-labelledby="def-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="def-heading" title="Key Definitions" />
              <div className="space-y-4">
                {std.definitions.map((def: any) => (
                  <div key={def.term} className="rounded-lg border border-[#E2E1DD] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4F3F0] border-b border-[#E2E1DD]">
                      <p className="text-sm font-semibold text-[#1C1C1E]">{def.term}</p>
                      <span className="text-xs text-[#A0A0A8] font-medium">{def.paraRef}</span>
                    </div>
                    <div className="p-4 space-y-2">
                      <blockquote className="text-sm text-[#4A4A52] font-reading leading-relaxed italic border-l-2 pl-3" style={{ borderColor: fwColor }}>
                        {def.officialText}
                      </blockquote>
                      <p className="text-sm text-[#1C1C1E] leading-relaxed">{def.plainExplanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Recognition Rules ────────────────────────────────── */}
          {std.recognitionRules && (
            <section id="std-recognition" aria-labelledby="rec-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="rec-heading" title="Recognition Rules" />
              <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{std.recognitionRules}</p>
            </section>
          )}

          {/* ── Measurement Rules ────────────────────────────────── */}
          {std.measurementRules && (
            <section id="std-measurement" aria-labelledby="meas-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="meas-heading" title="Measurement" />
              <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{std.measurementRules}</p>
            </section>
          )}

          {/* ── Disclosure Requirements ──────────────────────────── */}
          {std.disclosureGroups && std.disclosureGroups.length > 0 && (
            <section id="std-disclosure" aria-labelledby="disc-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="disc-heading" title="Disclosure Requirements" />
              <div className="space-y-6">
                {std.disclosureGroups.map((group: any) => (
                  <div key={group.heading}>
                    <div className="flex items-baseline gap-2 mb-3">
                      <h3 className="text-sm font-semibold text-[#1C1C1E]">{group.heading}</h3>
                      <span className="text-xs text-[#A0A0A8] font-medium">{group.paraRange}</span>
                    </div>
                    <ul className="space-y-2">
                      {group.items?.map((item: any, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A4A52] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: fwColor }} aria-hidden="true" />
                          {item.text}
                          {item.isConditional && (
                            <span className="text-xs font-medium text-[#B45309] bg-[#FEF6E4] px-1.5 py-0.5 rounded shrink-0">Conditional</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Journal Entry Guidance ───────────────────────────── */}
          {std.journalEntryNotes && std.journalEntryNotes.length > 0 && (
            <section id="std-journal" aria-labelledby="je-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="je-heading" title="Journal Entry Guidance" />
              <div className="space-y-4">
                {std.journalEntryNotes.map((je: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg border border-[#E2E1DD] bg-white">
                    <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-2">Scenario {i + 1}</p>
                    <p className="text-sm font-semibold text-[#1C1C1E] mb-2">{je.scenario}</p>
                    <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{je.treatment}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Comparison Table ──────────────────────────────────── */}
          {std.comparison && std.comparison.rows?.length > 0 && (
            <section id="std-comparison" aria-labelledby="cmp-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="cmp-heading" title="Comparison: AS vs Ind AS" />
              <div className="overflow-x-auto rounded-lg border border-[#E2E1DD]">
                <table className="w-full text-sm" aria-label={`${std.standardCode} comparison`}>
                  <thead>
                    <tr className="border-b border-[#E2E1DD] bg-[#F4F3F0]">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A52] uppercase tracking-wider w-1/3">Criterion</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: FW_COLOR.AS }}>{std.standardCode}</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: FW_COLOR.IND_AS }}>{std.comparison.std2Title}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {std.comparison.rows.map((row: any, i: number) => (
                      <tr
                        key={i}
                        className={`border-b border-[#E2E1DD] ${row.isDifferent ? 'bg-[#FEF6E4]' : 'bg-white'}`}
                      >
                        <td className="px-4 py-3 font-medium text-[#1C1C1E] text-xs">{row.criterion}</td>
                        <td className="px-4 py-3 text-[#4A4A52] text-xs leading-relaxed">{row.as}</td>
                        <td className="px-4 py-3 text-[#4A4A52] text-xs leading-relaxed">{row.indAs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 bg-[#FAFAF8] border-t border-[#E2E1DD]">
                  <p className="text-xs text-[#76767E]">
                    <span className="inline-block w-3 h-3 bg-[#FEF6E4] border border-[#FDE68A] rounded mr-1 align-middle" />
                    Highlighted rows indicate key differences.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Related Standards ─────────────────────────────────── */}
          {std.relatedStandards && std.relatedStandards.length > 0 && (
            <section id="std-related" aria-labelledby="rel-std-heading" className="mb-10 scroll-mt-24">
              <SectionHeading id="rel-std-heading" title="Related Standards" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {std.relatedStandards.map((rs: any) => (
                  <Link
                    key={rs.slug}
                    href={`/standards/${rs.framework === 'AS' ? 'as' : 'ind-as'}/${rs.slug}`}
                    className="group flex items-center gap-3 p-3.5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-xs transition-all"
                  >
                    <span
                      className="text-xs font-bold shrink-0 px-2 py-0.5 rounded whitespace-nowrap"
                      style={{ backgroundColor: `${rs.color || '#0F6B5E'}15`, color: rs.color || '#0F6B5E' }}
                    >
                      {rs.code}
                    </span>
                    <span className="text-sm text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors min-w-0 truncate">
                      {rs.title}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── FAQs ──────────────────────────────────────────────── */}
          {std.faqs && std.faqs.length > 0 && (
            <section id="std-faq" aria-labelledby="faq-heading" className="scroll-mt-24">
              <SectionHeading id="faq-heading" title="Frequently Asked Questions" />
              <div className="space-y-4">
                {std.faqs.map((faq: any) => (
                  <div key={faq.id} className="p-4 rounded-lg border border-[#E2E1DD] bg-white">
                    <p className="text-sm font-semibold text-[#1C1C1E] mb-2">{faq.question}</p>
                    <p className="text-sm text-[#4A4A52] font-reading leading-relaxed">{faq.answer}</p>
                    {faq.sourceRef && (
                      <p className="mt-2 text-xs text-[#A0A0A8]">Source: {faq.sourceRef}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>

        {/* ── TOC ─────────────────────────────────────────────────── */}
        <aside className="hidden lg:block">
          <TableOfContents items={STD_TOC} label="Standard sections" />
        </aside>

      </div>
    </div>
  )
}

// ─── SectionHeading helper ────────────────────────────────────────────────────

function SectionHeading({ id, title, para }: { id: string; title: string; para?: string }) {
  return (
    <div className="flex items-baseline gap-2 mb-4">
      <h2 id={id} className="text-xl font-bold text-[#1C1C1E] tracking-tight">
        {title}
      </h2>
      {para && (
        <span className="text-xs text-[#A0A0A8] font-medium">{para}</span>
      )}
    </div>
  )
}
