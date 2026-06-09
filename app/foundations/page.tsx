import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SubdomainNav from '@/components/ui/SubdomainNav'
import { DOMAINS } from '@/lib/data/domains'

// ─── Static data ─────────────────────────────────────────────────────────────

const DOMAIN = DOMAINS.find((d) => d.domainSlug === 'foundations')!

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Accounting Foundations — Core Principles & Concepts',
  description:
    'The bedrock of accounting knowledge — double-entry bookkeeping, fundamental assumptions, accounting conventions, and the conceptual framework that underpins all financial reporting.',
  alternates: { canonical: '/foundations' },
  openGraph: {
    title: 'Accounting Foundations | Accounts.Life',
    description: DOMAIN.domainDescription,
  },
}

// ─── Featured topics ─────────────────────────────────────────────────────────

const FEATURED_TOPICS = [
  {
    title: 'Double Entry System',
    slug: 'double-entry',
    summary:
      'Every transaction affects at least two accounts. The foundation of all modern accounting.',
    subSlug: 'double-entry-system',
    verified: true,
  },
  {
    title: 'Going Concern Concept',
    slug: 'going-concern',
    summary:
      'The assumption that a business will continue operating indefinitely into the foreseeable future.',
    subSlug: 'concepts-conventions',
    verified: true,
  },
  {
    title: 'Accrual Concept',
    slug: 'accrual-concept',
    summary:
      'Revenue and expenses are recognised when earned/incurred, not when cash changes hands.',
    subSlug: 'concepts-conventions',
    verified: true,
  },
  {
    title: 'Depreciation — SLM vs WDV',
    slug: 'slm',
    summary:
      'Straight-Line Method vs Written Down Value — recognition, calculation, and journal entries.',
    subSlug: 'depreciation-accounting',
    verified: false,
  },
]

const LEARNING_PATH = [
  { step: 1, label: 'Accounting Concepts & Conventions', href: '/foundations/concepts-conventions' },
  { step: 2, label: 'Double Entry System', href: '/foundations/double-entry-system' },
  { step: 3, label: 'Books of Original Entry', href: '/foundations/books-of-original-entry' },
  { step: 4, label: 'Depreciation Accounting', href: '/foundations/depreciation-accounting' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FoundationsDomainPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Accounting Foundations' },
        ]}
        className="mb-6"
      />

      {/* Domain Header */}
      <header className="mb-10 pb-8 border-b border-[#E2E1DD]">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-bold tracking-widest px-2.5 py-1 rounded"
                style={{
                  backgroundColor: `${DOMAIN.domainColorHex}18`,
                  color: DOMAIN.domainColorHex,
                }}
              >
                {DOMAIN.domainCode}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#E8F7EE] text-[#1A7A4A]">
                Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] tracking-tight leading-tight">
              {DOMAIN.domainName}
            </h1>
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed max-w-2xl">
              {DOMAIN.domainDescription}
            </p>
          </div>
        </div>

        {/* Domain stats */}
        <dl className="mt-6 flex flex-wrap gap-6">
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Entries</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">
              {DOMAIN.entryCount}
              <span className="text-sm font-normal text-[#A0A0A8] ml-1">
                of {DOMAIN.plannedEntryCount} planned
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Subdomains</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">{DOMAIN.subdomains.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Authority</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">ICAI / AS Standards</dd>
          </div>
        </dl>
      </header>

      {/* 3-column layout: Left nav | Center content | Right (future TOC/sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

        {/* Left — Subdomain navigator */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <SubdomainNav domain={DOMAIN} />
        </aside>

        {/* Center — Main content */}
        <main className="min-w-0">

          {/* Mobile subdomain nav */}
          <div className="lg:hidden mb-8">
            <SubdomainNav domain={DOMAIN} />
          </div>

          {/* Featured topics */}
          <section aria-labelledby="featured-heading" className="mb-12">
            <h2
              id="featured-heading"
              className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight"
            >
              Featured Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURED_TOPICS.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/foundations/${topic.subSlug}/${topic.slug}`}
                  className="group flex flex-col gap-3 p-4 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-snug">
                      {topic.title}
                    </span>
                    {topic.verified && (
                      <CheckCircle2 size={14} className="text-[#1A7A4A] shrink-0" aria-label="Verified" />
                    )}
                  </div>
                  <p className="text-xs text-[#76767E] leading-relaxed">{topic.summary}</p>
                  <div className="flex items-center gap-1 text-xs text-[#2D5BE3] mt-auto">
                    <span>Read entry</span>
                    <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Learning path */}
          <section aria-labelledby="learning-path-heading" className="mb-12">
            <h2
              id="learning-path-heading"
              className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight"
            >
              Suggested Learning Path
            </h2>
            <ol className="space-y-3" aria-label="Learning path steps">
              {LEARNING_PATH.map(({ step, label, href }) => (
                <li key={step}>
                  <Link
                    href={href}
                    className="group flex items-center gap-4 p-4 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#2D5BE3] hover:shadow-sm transition-all"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 text-white"
                      style={{ backgroundColor: DOMAIN.domainColorHex }}
                      aria-label={`Step ${step}`}
                    >
                      {step}
                    </span>
                    <span className="text-sm font-medium text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors">
                      {label}
                    </span>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-[#A0A0A8] group-hover:text-[#2D5BE3] transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {/* All subdomains explorer */}
          <section aria-labelledby="subdomains-heading">
            <h2
              id="subdomains-heading"
              className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight"
            >
              Browse by Topic
            </h2>
            <div className="space-y-3">
              {DOMAIN.subdomains.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/foundations/${sub.slug}`}
                  className="group flex items-center justify-between p-4 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <BookOpen
                      size={16}
                      className="shrink-0"
                      style={{ color: DOMAIN.domainColorHex }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors truncate">
                        {sub.name}
                      </p>
                      {sub.entryCount > 0 && (
                        <p className="text-xs text-[#76767E] mt-0.5">
                          {sub.entryCount} {sub.entryCount === 1 ? 'entry' : 'entries'}
                        </p>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-[#A0A0A8] group-hover:text-[#2D5BE3] transition-colors shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
