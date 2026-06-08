import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Scale, FileText, Search } from 'lucide-react'
import { DOMAINS, TOTAL_ENTRIES, ACTIVE_DOMAINS } from '@/lib/data/domains'
import type { StaticDomainData } from '@/lib/types'

// ─── SEO ────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Accounts.Life — The Accounting Operating System',
  description:
    'The most complete, structured, and verified accounting knowledge platform. Organized concepts, all 32 AS standards, Ind AS, journal entries, glossary, and official sources — in one place.',
  alternates: { canonical: '/' },
}

// ─── Stat helpers ────────────────────────────────────────────────────────────

const STATS = [
  { value: `${TOTAL_ENTRIES}+`, label: 'Entries published', icon: BookOpen },
  { value: `${ACTIVE_DOMAINS}`, label: 'Active domains', icon: Scale },
  { value: '32', label: 'AS Standards', icon: FileText },
  { value: '100%', label: 'Authority-cited', icon: Search },
]

// ─── Domain status label map ─────────────────────────────────────────────────

const STATUS_LABEL: Record<StaticDomainData['domainStatus'], string> = {
  ACTIVE: 'Active',
  PARTIAL: 'Partial',
  COMING_SOON: 'Coming Soon',
}

const STATUS_CLS: Record<StaticDomainData['domainStatus'], string> = {
  ACTIVE: 'bg-[#E8F7EE] text-[#1A7A4A]',
  PARTIAL: 'bg-[#FEF6E4] text-[#B45309]',
  COMING_SOON: 'bg-[#F4F3F0] text-[#76767E]',
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const activeDomains = DOMAINS.filter((d) => d.domainStatus !== 'COMING_SOON')
  const comingSoon = DOMAINS.filter((d) => d.domainStatus === 'COMING_SOON')

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="border-b border-[#E2E1DD] bg-[#FAFAF8]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28 text-center">
          {/* Kicker */}
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2D5BE3] mb-6">
            <span className="w-4 h-px bg-[#2D5BE3]" aria-hidden="true" />
            The Accounting Operating System
            <span className="w-4 h-px bg-[#2D5BE3]" aria-hidden="true" />
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-sans font-bold text-[#1C1C1E] leading-tight tracking-tight max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Every accounting concept,
            <br />
            <span className="text-[#2D5BE3]">perfectly organised.</span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-5 text-lg text-[#4A4A52] max-w-xl mx-auto leading-relaxed font-reading">
            Structured, verified, and authority-cited accounting knowledge —
            from foundational principles to all 32 AS standards and Ind AS.
          </p>

          {/* Primary CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/foundations"
              id="cta-foundations"
              className="inline-flex items-center gap-2 bg-[#2D5BE3] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#2450CC] transition-colors shadow-sm"
            >
              Start with Foundations
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/standards/as"
              id="cta-standards"
              className="inline-flex items-center gap-2 bg-white border border-[#E2E1DD] text-[#1C1C1E] px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#F4F3F0] transition-colors shadow-sm"
            >
              Browse AS Standards
            </Link>
          </div>

          {/* Stats bar */}
          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={18} className="text-[#2D5BE3] mb-1" aria-hidden="true" />
                <dt className="text-2xl font-bold text-[#1C1C1E] tabular-nums">{value}</dt>
                <dd className="text-xs text-[#76767E] font-medium">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Domain Navigator ───────────────────────────────────────── */}
      <section
        aria-labelledby="domains-heading"
        className="max-w-[1280px] mx-auto px-6 py-16 md:py-20"
      >
        <header className="mb-10">
          <h2
            id="domains-heading"
            className="text-2xl font-bold text-[#1C1C1E] tracking-tight"
          >
            Knowledge Domains
          </h2>
          <p className="mt-2 text-[#4A4A52] text-sm">
            {activeDomains.length} domains live &mdash; select one to explore.
          </p>
        </header>

        {/* Active domains grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDomains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>

        {/* Coming Soon strip */}
        {comingSoon.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xs font-semibold text-[#76767E] uppercase tracking-widest mb-4">
              Coming Soon
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {comingSoon.map((domain) => (
                <ComingSoonCard key={domain.id} domain={domain} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── How it works / platform promise ───────────────────────── */}
      <section
        aria-labelledby="pillars-heading"
        className="border-t border-[#E2E1DD] bg-[#F4F3F0]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
          <h2
            id="pillars-heading"
            className="text-2xl font-bold text-[#1C1C1E] tracking-tight text-center mb-12"
          >
            Built for accuracy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map(({ title, body, accent }) => (
              <article key={title} className="flex flex-col gap-3">
                <div
                  className="w-8 h-1 rounded-full"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold text-[#1C1C1E]">{title}</h3>
                <p className="text-sm text-[#4A4A52] leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore prompts ─────────────────────────────────────────── */}
      <section
        aria-labelledby="explore-heading"
        className="max-w-[1280px] mx-auto px-6 py-16 md:py-20"
      >
        <h2
          id="explore-heading"
          className="text-2xl font-bold text-[#1C1C1E] tracking-tight mb-10"
        >
          Quick access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ label, href, description, color }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-start gap-4 p-5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
            >
              <div
                className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors">
                  {label}
                </p>
                <p className="text-xs text-[#76767E] mt-1 leading-relaxed">{description}</p>
              </div>
              <ArrowRight
                size={14}
                className="shrink-0 text-[#A0A0A8] group-hover:text-[#2D5BE3] mt-0.5 transition-colors ml-auto"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

// ─── Domain card ─────────────────────────────────────────────────────────────

function DomainCard({ domain }: { domain: StaticDomainData }) {
  const href = `/${domain.domainSlug}`

  return (
    <Link
      href={href}
      id={`domain-card-${domain.domainCode.toLowerCase()}`}
      className="group flex flex-col gap-4 p-5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
      aria-label={`${domain.domainName} — ${domain.domainTagline}`}
    >
      {/* Top row: code badge + status pill */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-widest px-2 py-0.5 rounded"
          style={{
            backgroundColor: `${domain.domainColorHex}18`,
            color: domain.domainColorHex,
          }}
        >
          {domain.domainCode}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_CLS[domain.domainStatus]}`}
        >
          {STATUS_LABEL[domain.domainStatus]}
        </span>
      </div>

      {/* Name + tagline */}
      <div>
        <h3 className="text-base font-semibold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-snug">
          {domain.domainName}
        </h3>
        <p className="text-xs text-[#76767E] mt-1 leading-relaxed line-clamp-2">
          {domain.domainTagline}
        </p>
      </div>

      {/* Subdomains */}
      {domain.subdomains.length > 0 && (
        <ul className="flex flex-col gap-1">
          {domain.subdomains.slice(0, 3).map((sub) => (
            <li key={sub.slug} className="flex items-center gap-2 text-xs text-[#76767E]">
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: domain.domainColorHex }}
                aria-hidden="true"
              />
              {sub.name}
            </li>
          ))}
        </ul>
      )}

      {/* Footer: entry count + arrow */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-[#F4F3F0]">
        <span className="text-xs text-[#A0A0A8]">
          {domain.entryCount} of {domain.plannedEntryCount} entries
        </span>
        <ArrowRight
          size={14}
          className="text-[#A0A0A8] group-hover:text-[#2D5BE3] transition-colors"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}

// ─── Coming Soon card ─────────────────────────────────────────────────────────

function ComingSoonCard({ domain }: { domain: StaticDomainData }) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-lg border border-[#E2E1DD] bg-[#FAFAF8] opacity-75 cursor-not-allowed"
      aria-label={`${domain.domainName} — Coming Soon`}
    >
      <span className="text-xs font-bold tracking-widest text-[#A0A0A8]">
        {domain.domainCode}
      </span>
      <p className="text-sm font-medium text-[#4A4A52]">{domain.domainName}</p>
      <p className="text-xs text-[#A0A0A8] leading-relaxed line-clamp-2">
        {domain.domainTagline}
      </p>
    </div>
  )
}

// ─── Static content ───────────────────────────────────────────────────────────

const PILLARS = [
  {
    title: 'Authority-cited',
    body: 'Every entry cites its primary source — ICAI, MCA, IASB, or official government notification. No opinion without citation.',
    accent: '#2D5BE3',
  },
  {
    title: 'Structured by design',
    body: 'Concepts, standards, journal entries, glossary terms — each entry type has a consistent, predictable layout so you always know where to look.',
    accent: '#0F6B5E',
  },
  {
    title: 'Exam-ready',
    body: 'Entries are tagged by CA Foundation, Intermediate, and Final level. Study exactly what you need, at the right depth.',
    accent: '#6B3FA0',
  },
]

const QUICK_LINKS = [
  {
    label: 'AS Standards (ICAI)',
    href: '/standards/as',
    description: 'All 32 Accounting Standards — objectives, scope, provisions, and examples.',
    color: '#0F6B5E',
  },
  {
    label: 'Ind AS Standards',
    href: '/standards/ind-as',
    description: 'IFRS-converged standards for listed companies and large entities.',
    color: '#6B3FA0',
  },
  {
    label: 'Accounting Foundations',
    href: '/foundations',
    description: 'Double-entry, conventions, concepts, and the accounting equation.',
    color: '#2D5BE3',
  },
  {
    label: 'Company Accounts',
    href: '/company-accounts',
    description: 'Share capital, debentures, final accounts, and cash flow under Companies Act.',
    color: '#B45309',
  },
  {
    label: 'Glossary',
    href: '/glossary',
    description: 'Plain-language definitions of every accounting term, standard-cited.',
    color: '#1A7A4A',
  },
  {
    label: 'Search',
    href: '/search',
    description: 'Full-text search across all entries, standards, and glossary terms.',
    color: '#5B6678',
  },
]
