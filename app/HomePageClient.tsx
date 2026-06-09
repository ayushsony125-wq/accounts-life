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
  Bell,
  Mail,
  Calendar,
  ExternalLink,
  Clock,
  CheckCircle2,
  LayoutGrid,
  Lightbulb,
  GraduationCap,
  Gavel,
  Eye,
} from 'lucide-react'

// ─── Domain data ──────────────────────────────────────────────────────────────

const PROFESSIONAL_DOMAINS = [
  {
    id: 'accounts',
    code: 'ACC',
    name: 'Accounts',
    description: 'Concepts, AS, Ind AS, Journal Entries, Financial Statements & Practical Accounting.',
    topicCount: 120,
    href: '/foundations',
    color: '#2D5BE3',
    Icon: BookOpen,
    topics: ['Accounting Standards (AS)', 'Ind AS / IFRS', 'Journal Entries'],
  },
  {
    id: 'audit',
    code: 'AUD',
    name: 'Audit',
    description: 'Standards on Auditing, Audit Procedures, CARO, Working Papers & More.',
    topicCount: 85,
    href: '/search?q=Audit',
    color: '#0F6B5E',
    Icon: ShieldCheck,
    topics: ['Auditing Standards (SA)', 'Audit Evidence', 'Internal Audit'],
  },
  {
    id: 'income-tax',
    code: 'ITX',
    name: 'Income Tax',
    description: 'Sections, TDS, Returns, Assessments, Case Laws & Compliance.',
    topicCount: 140,
    href: '/search?q=Income+Tax',
    color: '#B45309',
    Icon: Calculator,
    topics: ['Heads of Income', 'Deductions (80C–80U)', 'TDS / TCS'],
  },
  {
    id: 'gst',
    code: 'GST',
    name: 'GST',
    description: 'ITC, Registration, Returns, Compliance, Notices & Practical Issues.',
    topicCount: 110,
    href: '/search?q=GST',
    color: '#1A7A4A',
    Icon: TrendingUp,
    topics: ['Supply & Levy', 'Input Tax Credit', 'Returns & Compliance'],
  },
  {
    id: 'corporate-law',
    code: 'LAW',
    name: 'Corporate & Laws',
    description: 'Companies Act, LLP, ROC Compliance, Corporate Governance & More.',
    topicCount: 95,
    href: '/search?q=Corporate+Law',
    color: '#6B3FA0',
    Icon: Building2,
    topics: ['Companies Act 2013', 'Corporate Governance', 'FEMA & SEBI'],
  },
  {
    id: 'fm-other',
    code: 'FM',
    name: 'Financial Management & Other',
    description: 'Ratios, Capital Budgeting, Cost of Capital, Analysis & Decision Making.',
    topicCount: 75,
    href: '/financial-analysis',
    color: '#5B6678',
    Icon: BarChart3,
    topics: ['Financial Analysis', 'Cost Accounting', 'Capital Budgeting'],
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
  'Backed by ICAI, Government & Official Sources',
  'Simple Language, Practical Understanding',
  'Section, Rule, Notification with Every Answer',
  'Study Material & Curated Video Lectures',
  'For Students, Articles & Practising Professionals',
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
    label: 'Standards Library',
    href: '/standards/as',
    description: 'AS, Ind AS, SA, IFRS & more',
    Icon: BookOpen,
    color: '#2D5BE3',
  },
  {
    label: 'Section Finder',
    href: '/search',
    description: 'Income Tax, GST & Companies Act',
    Icon: Search,
    color: '#0F6B5E',
  },
  {
    label: 'Case Laws',
    href: '/search?q=Case+Laws',
    description: 'Important judgments & rulings',
    Icon: Gavel,
    color: '#6B3FA0',
  },
  {
    label: 'Forms & Checklists',
    href: '/search?q=Forms',
    description: 'Practical templates & checklists',
    Icon: FileText,
    color: '#B45309',
  },
  {
    label: 'Calculators',
    href: '/search?q=Calculators',
    description: 'Financial & Tax calculators',
    Icon: Calculator,
    color: '#1A7A4A',
  },
]

const STATS = [
  { value: '12,000+', label: 'Topics' },
  { value: '250+', label: 'Standards' },
  { value: '5,000+', label: 'Updates' },
  { value: '100+', label: 'Forms & Tools' },
  { value: '50+', label: 'Expert Contributors' },
  { value: '100%', label: 'Source Backed' },
]

const FEATURE_PILLARS = [
  {
    Icon: Lightbulb,
    title: 'Simple Explanation',
    body: 'Complex topics explained in simple, easy-to-understand language.',
    color: '#2D5BE3',
  },
  {
    Icon: Scale,
    title: 'Exact Legal Support',
    body: 'Get exact section, rule, notification with official source & authority links.',
    color: '#0F6B5E',
  },
  {
    Icon: Eye,
    title: 'Practical Understanding',
    body: 'Practical examples, illustrations & journal entries for real-world application.',
    color: '#B45309',
  },
  {
    Icon: GraduationCap,
    title: 'Curated Learning',
    body: 'Handpicked video lectures & study material from trusted educators.',
    color: '#6B3FA0',
  },
]

// ─── Latest Updates data ──────────────────────────────────────────────────────

const LATEST_UPDATES = [
  {
    id: 'it-1',
    category: 'Income Tax',
    categoryColor: '#B45309',
    categoryBg: '#FEF6E4',
    title: 'CBDT extends due date for filing ITR for AY 2025-26',
    summary: 'CBDT Notification No. 27/2025 extends the due date for furnishing return of income for AY 2025-26.',
    source: 'CBDT Notification',
    date: 'Jun 8, 2025',
    href: '/search?q=ITR+due+date',
  },
  {
    id: 'gst-1',
    category: 'GST',
    categoryColor: '#1A7A4A',
    categoryBg: '#E8F7EE',
    title: 'CBIC clarifies ITC eligibility on corporate guarantees',
    summary: 'CBIC issues clarification on ITC availment in respect of corporate guarantees given by holding companies.',
    source: 'CBIC Circular',
    date: 'Jun 7, 2025',
    href: '/search?q=ITC+corporate+guarantee',
  },
  {
    id: 'aud-1',
    category: 'Audit',
    categoryColor: '#0F6B5E',
    categoryBg: '#E6F4F2',
    title: 'ICAI updates SA 315 — Identifying and Assessing Risks',
    summary: 'Revised SA 315 issued with enhanced guidance on risk identification procedures during audit planning.',
    source: 'ICAI Announcement',
    date: 'Jun 6, 2025',
    href: '/search?q=SA+315',
  },
  {
    id: 'law-1',
    category: 'Corporate Law',
    categoryColor: '#6B3FA0',
    categoryBg: '#F3EEF9',
    title: 'MCA extends additional fees waiver for LLP filings',
    summary: 'MCA General Circular No. 10/2025 extends the waiver of additional fees for LLP filings for FY 2024-25.',
    source: 'MCA Circular',
    date: 'May 30, 2025',
    href: '/search?q=LLP+filing',
  },
  {
    id: 'acc-1',
    category: 'Accounts',
    categoryColor: '#2D5BE3',
    categoryBg: '#EEF2FD',
    title: 'Ind AS 117 (Insurance Contracts) — Key Highlights',
    summary: 'ICAI publishes key highlights and illustrative examples on Ind AS 117 implementation for insurance entities.',
    source: 'ICAI Study Material',
    date: 'Jun 4, 2025',
    href: '/search?q=Ind+AS+117',
  },
]

const TODAYS_ESSENTIALS = [
  {
    id: 'due-dates',
    title: 'Income Tax Due Dates',
    subtitle: 'AY 2025-26',
    Icon: Calculator,
    color: '#B45309',
    href: '/search?q=Income+Tax+Due+Dates',
  },
  {
    id: 'gst-calendar',
    title: 'GST Return Calendar',
    subtitle: 'Assessment Year: 2025-26',
    Icon: Calendar,
    color: '#1A7A4A',
    href: '/search?q=GST+Return+Calendar',
  },
  {
    id: 'tds-rates',
    title: 'TDS Rates & Codes',
    subtitle: 'Assessment Year: 2025-26',
    Icon: FileText,
    color: '#2D5BE3',
    href: '/search?q=TDS+Rates',
  },
  {
    id: 'mca-forms',
    title: 'Important MCA Forms',
    subtitle: 'Companies Act, 2013',
    Icon: Building2,
    color: '#6B3FA0',
    href: '/search?q=MCA+Forms',
  },
]

// ─── Main Client Component ────────────────────────────────────────────────────

export default function HomePageClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

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
        <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

            {/* Left: Headline + Search */}
            <div className="flex flex-col">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-5 self-start">
                <span className="bg-[#EEF2FD] text-[#2D5BE3] text-xs font-semibold px-3 py-1 rounded-full border border-[#D0DCFA]">
                  Built for Professionals. Backed by Authority.
                </span>
              </div>

              {/* Heading */}
              <h1
                id="hero-heading"
                className="font-sans font-bold text-[#1C1C1E] leading-tight tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
              >
                The Operating System for{' '}
                <span className="text-[#2D5BE3]">Professional Excellence</span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-4 text-[15px] text-[#4A4A52] leading-relaxed max-w-xl">
                Trusted explanations. Exact legal support. Official sources.{' '}
                Practical notes. Curated videos.{' '}
                <span className="text-[#1C1C1E] font-medium">Everything a professional needs.</span>
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-7 relative max-w-2xl">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#76767E] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for topics, sections, standards, rules, cases…"
                  className="w-full bg-[#FAFAF8] border border-[#E2E1DD] hover:border-[#C8C7C2] focus:border-[#2D5BE3] focus:bg-white text-sm font-medium pl-11 pr-24 py-3.5 rounded-lg outline-none transition-all placeholder:text-[#A0A0A8] shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white text-xs font-bold px-4 py-2 rounded-md transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Popular searches */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#A0A0A8] font-medium shrink-0">Popular searches:</span>
                {POPULAR_SEARCHES.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="text-xs text-[#4A4A52] hover:text-[#2D5BE3] bg-[#F4F3F0] hover:bg-[#EEF2FD] border border-transparent hover:border-[#D0DCFA] px-2.5 py-1 rounded-full transition-all"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Trust Card */}
            <div className="lg:pt-2">
              <div className="bg-[#FAFAF8] border border-[#E2E1DD] rounded-xl p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#1C1C1E] mb-4">
                  Why Professionals Trust Accounts.One
                </h2>
                <ul className="flex flex-col gap-3 mb-6">
                  {TRUST_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-xs text-[#4A4A52] leading-snug">
                      <CheckCircle2
                        size={14}
                        className="text-[#2D5BE3] shrink-0 mt-0.5"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/foundations"
                  className="flex items-center justify-center gap-2 w-full text-xs font-bold text-[#2D5BE3] border border-[#D0DCFA] bg-white hover:bg-[#EEF2FD] px-4 py-2.5 rounded-md transition-colors"
                >
                  Explore All Features
                  <ArrowRight size={13} />
                </Link>
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
        <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-16">
          <header className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <LayoutGrid size={15} className="text-[#2D5BE3]" />
                <h2
                  id="domains-heading"
                  className="text-xl font-bold text-[#1C1C1E] tracking-tight"
                >
                  Explore by Domain
                </h2>
              </div>
              <p className="text-sm text-[#76767E]">
                Choose a subject to access structured knowledge, laws, standards, and practical guidance.
              </p>
            </div>
            <Link
              href="/search"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#2D5BE3] hover:text-[#2450CC] shrink-0 transition-colors"
            >
              View All Domains
              <ArrowRight size={12} />
            </Link>
          </header>

          {/* 6-col horizontal on lg, 3-col on md, 2-col on sm */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROFESSIONAL_DOMAINS.map((domain) => {
              const { Icon } = domain
              return (
                <Link
                  key={domain.id}
                  href={domain.href}
                  id={`domain-card-${domain.id}`}
                  className="group flex flex-col items-center text-center gap-3 p-5 rounded-xl border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-md transition-all"
                  aria-label={`${domain.name} — explore topics`}
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ backgroundColor: `${domain.color}14` }}
                  >
                    <Icon size={22} style={{ color: domain.color }} />
                  </div>

                  {/* Name */}
                  <h3 className="text-xs font-bold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-snug">
                    {domain.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] text-[#76767E] leading-relaxed line-clamp-3">
                    {domain.description}
                  </p>

                  {/* Topic count */}
                  <span
                    className="text-[10px] font-bold mt-auto"
                    style={{ color: domain.color }}
                  >
                    {domain.topicCount}+ Topics
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Latest Updates ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="updates-heading"
        className="bg-white border-b border-[#E2E1DD]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-12 items-start">

            {/* ─ LEFT: Latest Updates feed ──────────────────────────── */}
            <div>
              <header className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Bell size={15} className="text-[#2D5BE3]" />
                    <h2
                      id="updates-heading"
                      className="text-xl font-bold text-[#1C1C1E] tracking-tight"
                    >
                      Latest Updates
                    </h2>
                  </div>
                  <p className="text-sm text-[#76767E]">
                    Stay informed with important notifications, circulars & professional updates.
                  </p>
                </div>
                <Link
                  href="/search"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#2D5BE3] hover:text-[#2450CC] shrink-0 transition-colors"
                >
                  View All Updates
                  <ArrowRight size={12} />
                </Link>
              </header>

              <ol className="flex flex-col divide-y divide-[#F4F3F0]">
                {LATEST_UPDATES.map((update) => (
                  <li key={update.id} className="py-4 first:pt-0 last:pb-0">
                    <article className="flex flex-col gap-2">
                      {/* Category + source + date row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: update.categoryBg,
                            color: update.categoryColor,
                          }}
                        >
                          {update.category}
                        </span>
                        <span className="text-[10px] text-[#A0A0A8] font-medium">
                          {update.source}
                        </span>
                        <span className="text-[#E2E1DD] text-xs" aria-hidden="true">·</span>
                        <time className="flex items-center gap-1 text-[10px] text-[#A0A0A8]">
                          <Clock size={10} />
                          {update.date}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-[#1C1C1E] leading-snug">
                        {update.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-[#76767E] leading-relaxed line-clamp-2">
                        {update.summary}
                      </p>

                      {/* Read More */}
                      <Link
                        href={update.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5BE3] hover:text-[#2450CC] transition-colors w-fit"
                      >
                        Read More
                        <ArrowRight size={10} />
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
            </div>

            {/* ─ RIGHT: Subscribe + Today's Essentials ──────────────── */}
            <div className="flex flex-col gap-5">

              {/* Subscribe card */}
              <div className="border border-[#E2E1DD] rounded-xl p-5 bg-[#1C1C1E]">
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={14} className="text-[#6B9BF5]" />
                  <h3 className="text-sm font-bold text-white">
                    Subscribe to Daily Professional Updates
                  </h3>
                </div>
                <p className="text-xs text-[#A0A0A8] mb-4 leading-relaxed">
                  Get important notifications, amendments, circulars & updates directly in your inbox.
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A7A4A] bg-[#E8F7EE] border border-[#C5E9D4] px-3 py-2.5 rounded-md">
                    <ShieldCheck size={14} />
                    You&apos;re subscribed. Thank you!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 min-w-0 bg-[#2A2A2E] border border-[#3A3A40] focus:border-[#2D5BE3] text-xs text-white font-medium px-3 py-2.5 rounded-md outline-none transition-all placeholder:text-[#5B5B65]"
                    />
                    <button
                      type="submit"
                      className="shrink-0 bg-[#2D5BE3] hover:bg-[#2450CC] text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
                <p className="text-[10px] text-[#4A4A52] mt-2">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Today's Essentials */}
              <div className="border border-[#E2E1DD] rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-[#E2E1DD] bg-[#FAFAF8] flex items-center gap-2">
                  <Calendar size={13} className="text-[#2D5BE3]" />
                  <h3 className="text-xs font-bold text-[#1C1C1E]">
                    Today&apos;s Essentials
                  </h3>
                </div>
                <div className="divide-y divide-[#F4F3F0]">
                  {TODAYS_ESSENTIALS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors group"
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                        style={{ backgroundColor: `${item.color}14` }}
                      >
                        <item.Icon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#A0A0A8] mt-0.5">{item.subtitle}</p>
                      </div>
                      <ChevronRight size={13} className="text-[#C8C7C2] group-hover:text-[#2D5BE3] shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Access ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="quickaccess-heading"
        className="bg-[#FAFAF8] border-b border-[#E2E1DD]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-16">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2
                id="quickaccess-heading"
                className="text-xl font-bold text-[#1C1C1E] tracking-tight mb-1"
              >
                Quick Access
              </h2>
              <p className="text-sm text-[#76767E]">Everything you need, right at your fingertips.</p>
            </div>
          </div>

          {/* 5-col quick link cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {QUICK_LINKS.map(({ label, href, description, Icon: QIcon, color }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col items-center text-center gap-3 p-5 rounded-xl border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ backgroundColor: `${color}14` }}
                >
                  <QIcon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-snug">
                    {label}
                  </p>
                  <p className="text-[10px] text-[#A0A0A8] mt-1 leading-relaxed">{description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 border-t border-[#E2E1DD] pt-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <span className="text-xl font-bold text-[#1C1C1E] tracking-tight">{value}</span>
                <span className="text-[10px] text-[#76767E] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Features ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="features-heading"
        className="border-t border-[#E2E1DD] bg-[#F4F3F0]"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-16">
          <h2
            id="features-heading"
            className="text-xl font-bold text-[#1C1C1E] tracking-tight text-center mb-10"
          >
            Built for accuracy
          </h2>

          {/* 3-col pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

          {/* 4-col feature pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 border-t border-[#E2E1DD] pt-10">
            {FEATURE_PILLARS.map(({ Icon: FIcon, title, body, color }) => (
              <div key={title} className="flex flex-col gap-3 p-5 rounded-xl bg-white border border-[#E2E1DD]">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ backgroundColor: `${color}14` }}
                >
                  <FIcon size={18} style={{ color }} />
                </div>
                <h3 className="text-sm font-bold text-[#1C1C1E]">{title}</h3>
                <p className="text-xs text-[#76767E] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
