'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowRight,
  Search,
  BookOpen,
  Scale,
  FileText,
  TrendingUp,
  ShieldCheck,
  Building2,
  Calculator,
  BarChart3,
  ChevronRight,
} from 'lucide-react'

// ─── Domain data (6 professional domains) ────────────────────────────────────

const PROFESSIONAL_DOMAINS = [
  {
    id: 'accounts',
    code: 'ACC',
    name: 'Accounts',
    description:
      'Core accounting concepts, double-entry system, AS Standards, Ind AS, journal entries, and financial reporting frameworks.',
    topicCount: 120,
    href: '/foundations',
    color: '#2D5BE3',
    Icon: BookOpen,
    topics: ['Accounting Standards (AS)', 'Ind AS / IFRS', 'Journal Entries', 'Financial Statements'],
  },
  {
    id: 'audit',
    code: 'AUD',
    name: 'Audit',
    description:
      'Statutory audit, internal audit, audit planning, evidence, risk assessment, and auditing standards under SA series.',
    topicCount: 85,
    href: '/search?q=Audit',
    color: '#0F6B5E',
    Icon: ShieldCheck,
    topics: ['Auditing Standards (SA)', 'Audit Evidence', 'Internal Audit', 'Risk Assessment'],
  },
  {
    id: 'income-tax',
    code: 'ITX',
    name: 'Income Tax',
    description:
      'Income Tax Act provisions, heads of income, deductions, TDS, advance tax, and assessment procedures under Indian law.',
    topicCount: 140,
    href: '/search?q=Income+Tax',
    color: '#B45309',
    Icon: Calculator,
    topics: ['Heads of Income', 'Deductions (80C–80U)', 'TDS / TCS', 'Assessment & Appeals'],
  },
  {
    id: 'gst',
    code: 'GST',
    name: 'GST',
    description:
      'Goods & Services Tax — levy, supply, exemptions, input tax credit, returns, composition scheme, and GST compliance.',
    topicCount: 110,
    href: '/search?q=GST',
    color: '#1A7A4A',
    Icon: TrendingUp,
    topics: ['Supply & Levy', 'Input Tax Credit', 'Returns & Compliance', 'Composition Scheme'],
  },
  {
    id: 'corporate-law',
    code: 'LAW',
    name: 'Corporate & Laws',
    description:
      'Companies Act 2013, corporate governance, FEMA, SEBI regulations, Insolvency & Bankruptcy Code, and commercial laws.',
    topicCount: 95,
    href: '/search?q=Corporate+Law',
    color: '#6B3FA0',
    Icon: Building2,
    topics: ['Companies Act 2013', 'Corporate Governance', 'FEMA & SEBI', 'IBC 2016'],
  },
  {
    id: 'fm-other',
    code: 'FM',
    name: 'Financial Management & Other',
    description:
      'Financial analysis, ratio analysis, capital budgeting, cost accounting, management accounting, and strategic financial management.',
    topicCount: 75,
    href: '/financial-analysis',
    color: '#5B6678',
    Icon: BarChart3,
    topics: ['Financial Analysis', 'Cost Accounting', 'Capital Budgeting', 'Working Capital'],
  },
]

const POPULAR_SEARCHES = [
  { label: 'AS 1 Disclosure', href: '/search?q=AS+1' },
  { label: 'Revenue Recognition', href: '/search?q=Revenue+Recognition' },
  { label: 'Deferred Tax', href: '/search?q=Deferred+Tax' },
  { label: 'Audit Evidence', href: '/search?q=Audit+Evidence' },
  { label: 'Input Tax Credit', href: '/search?q=Input+Tax+Credit' },
  { label: 'Transfer Pricing', href: '/search?q=Transfer+Pricing' },
]

const TRUST_POINTS = [
  { Icon: ShieldCheck, text: 'ICAI Approved Sources' },
  { Icon: FileText, text: '32 AS Standards Covered' },
  { Icon: Scale, text: 'MCA & CBDT Referenced' },
  { Icon: BookOpen, text: 'Structured by Experts' },
]

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

// ─── Main Client Component ────────────────────────────────────────────────────

export default function HomePageClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="bg-white border-b border-[#E2E1DD]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Left: Headline + Search */}
            <div className="flex flex-col">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 self-start">
                <span className="bg-[#EEF2FD] text-[#2D5BE3] text-xs font-semibold px-3 py-1 rounded-full border border-[#D0DCFA]">
                  Built for Professionals. Backed by Authority.
                </span>
              </div>

              {/* Heading */}
              <h1
                id="hero-heading"
                className="font-sans font-bold text-[#1C1C1E] leading-tight tracking-tight"
                style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
              >
                The Operating System for{' '}
                <span className="text-[#2D5BE3]">Professional Excellence</span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-5 text-base text-[#4A4A52] leading-relaxed max-w-xl">
                Trusted explanations. Exact legal support. Official sources.{' '}
                Practical notes. Curated videos.{' '}
                <span className="text-[#1C1C1E] font-medium">Everything a professional needs.</span>
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-8 relative max-w-2xl">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#76767E] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search standards, concepts, GST provisions, audit terms…"
                  className="w-full bg-[#FAFAF8] border border-[#E2E1DD] hover:border-[#C8C7C2] focus:border-[#2D5BE3] focus:bg-white text-sm font-medium pl-12 pr-28 py-3.5 rounded-lg outline-none transition-all placeholder:text-[#A0A0A8] shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white text-xs font-bold px-4 py-2 rounded-md transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Popular searches */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#A0A0A8] font-medium shrink-0">Popular:</span>
                {POPULAR_SEARCHES.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="text-xs text-[#4A4A52] hover:text-[#2D5BE3] bg-[#F4F3F0] hover:bg-[#EEF2FD] border border-[#E2E1DD] hover:border-[#D0DCFA] px-2.5 py-1 rounded-full transition-all"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Trust Card */}
            <div className="lg:pt-4">
              <div className="bg-[#FAFAF8] border border-[#E2E1DD] rounded-xl p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#1C1C1E] mb-1">
                  Accounts.One
                </h2>
                <p className="text-xs text-[#76767E] mb-5 leading-relaxed">
                  India's most structured professional knowledge platform — built for CA, CMA, CS, and finance professionals.
                </p>
                <ul className="flex flex-col gap-3">
                  {TRUST_POINTS.map(({ Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-xs text-[#4A4A52]">
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-[#EEF2FD] shrink-0">
                        <Icon size={14} className="text-[#2D5BE3]" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-[#E2E1DD] flex flex-col gap-2.5">
                  <Link
                    href="/foundations"
                    className="flex items-center justify-between text-xs font-semibold text-[#2D5BE3] hover:text-[#2450CC] group"
                  >
                    Start with Foundations
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/standards/as"
                    className="flex items-center justify-between text-xs font-semibold text-[#4A4A52] hover:text-[#1C1C1E] group"
                  >
                    Browse AS Standards
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Explore by Domain ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="domains-heading"
        className="bg-[#FAFAF8] border-b border-[#E2E1DD]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
          <header className="mb-10">
            <h2
              id="domains-heading"
              className="text-2xl font-bold text-[#1C1C1E] tracking-tight"
            >
              Explore by Domain
            </h2>
            <p className="mt-2 text-sm text-[#4A4A52]">
              6 professional domains. Structured content. Authority-cited sources.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFESSIONAL_DOMAINS.map((domain) => {
              const { Icon } = domain
              return (
                <Link
                  key={domain.id}
                  href={domain.href}
                  id={`domain-card-${domain.id}`}
                  className="group flex flex-col gap-4 p-5 rounded-xl border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-md transition-all"
                  aria-label={`${domain.name} — explore topics`}
                >
                  {/* Top row: icon + code */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-lg"
                      style={{ backgroundColor: `${domain.color}18` }}
                    >
                      <Icon size={18} style={{ color: domain.color }} />
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${domain.color}12`,
                        color: domain.color,
                      }}
                    >
                      {domain.code}
                    </span>
                  </div>

                  {/* Name + description */}
                  <div>
                    <h3 className="text-sm font-bold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-snug mb-1.5">
                      {domain.name}
                    </h3>
                    <p className="text-xs text-[#76767E] leading-relaxed line-clamp-3">
                      {domain.description}
                    </p>
                  </div>

                  {/* Topics list */}
                  <ul className="flex flex-col gap-1">
                    {domain.topics.slice(0, 3).map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-xs text-[#76767E]">
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: domain.color }}
                          aria-hidden="true"
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  {/* Footer: topic count + arrow */}
                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-[#F4F3F0]">
                    <span className="text-xs text-[#A0A0A8]">
                      {domain.topicCount}+ topics
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#A0A0A8] group-hover:text-[#2D5BE3] transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Quick Access ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="quickaccess-heading"
        className="max-w-[1280px] mx-auto px-6 py-16 md:py-20"
      >
        <h2
          id="quickaccess-heading"
          className="text-2xl font-bold text-[#1C1C1E] tracking-tight mb-10"
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ label, href, description, color }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-start gap-4 p-5 rounded-xl border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
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
                <p className="text-xs text-[#76767E] mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="shrink-0 text-[#A0A0A8] group-hover:text-[#2D5BE3] mt-0.5 transition-colors ml-auto"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Platform Features ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="features-heading"
        className="border-t border-[#E2E1DD] bg-[#F4F3F0]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
          <h2
            id="features-heading"
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
    </>
  )
}
