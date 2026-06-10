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
  Clock,
  CheckCircle2,
  LayoutGrid,
  GraduationCap,
  RefreshCw,
  Zap
} from 'lucide-react'

// ─── Domain data ──────────────────────────────────────────────────────────────

const PROFESSIONAL_DOMAINS = [
  {
    id: 'accounts',
    code: 'ACC',
    name: 'Accounts',
    description: 'Concepts, AS, Ind AS, Journal Entries, Financial Statements & Practical Guidance.',
    href: '/foundations',
    color: '#2D5BE3',
    Icon: BookOpen,
  },
  {
    id: 'audit',
    code: 'AUD',
    name: 'Audit',
    description: 'Standards on Auditing, Audit Procedures, CARO, Working Papers & Audit Guidance.',
    href: '/search?q=Audit',
    color: '#0F6B5E',
    Icon: ShieldCheck,
  },
  {
    id: 'income-tax',
    code: 'ITX',
    name: 'Income Tax',
    description: 'Sections, TDS, Returns, Assessments, Case Laws & Compliance.',
    href: '/search?q=Income+Tax',
    color: '#B45309',
    Icon: Calculator,
  },
  {
    id: 'gst',
    code: 'GST',
    name: 'GST',
    description: 'ITC, Registration, Returns, Compliance, Notices & Practical Issues.',
    href: '/search?q=GST',
    color: '#1A7A4A',
    Icon: TrendingUp,
  },
  {
    id: 'corporate-law',
    code: 'LAW',
    name: 'Corporate & Laws',
    description: 'Companies Act, LLP, ROC Compliance, Corporate Governance & More.',
    href: '/search?q=Corporate+Law',
    color: '#6B3FA0',
    Icon: Building2,
  },
  {
    id: 'fm-other',
    code: 'FM',
    name: 'Finance & Other',
    description: 'Ratios, Capital Budgeting, Cost of Capital, Analysis & Decision Making.',
    href: '/financial-analysis',
    color: '#5B6678',
    Icon: BarChart3,
  },
]

const POPULAR_SEARCHES = [
  { label: 'AS 1 Disclosure', href: '/search?q=AS+1' },
  { label: 'Revenue Recognition', href: '/search?q=Revenue+Recognition' },
  { label: 'ITR Due Dates', href: '/search?q=ITR+Due+Dates' },
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
    Icon: Scale,
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

const LATEST_UPDATES = [
  {
    id: 'it-1',
    category: 'Income Tax',
    categoryColor: '#B45309',
    categoryBg: '#FEF6E4',
    source: 'CBDT Notification',
    date: '08 Jun 2025',
    title: 'CBDT extends due date for filing ITR for AY 2025-26',
    summary: 'CBDT Notification No. 27/2025 extends the due date for furnishing return of income for AY 2025-26.',
    href: '/search?q=ITR+due+date',
  },
  {
    id: 'gst-1',
    category: 'GST',
    categoryColor: '#1A7A4A',
    categoryBg: '#E8F7EE',
    source: 'CBIC Circular',
    date: '07 Jun 2025',
    title: 'CBIC clarifies ITC eligibility on corporate guarantees',
    summary: 'CBIC issues clarification on ITC availment in respect of corporate guarantees given by holding companies.',
    href: '/search?q=ITC+corporate+guarantee',
  },
  {
    id: 'aud-1',
    category: 'Audit',
    categoryColor: '#0F6B5E',
    categoryBg: '#E6F4F2',
    source: 'ICAI Announcement',
    date: '06 Jun 2025',
    title: 'ICAI updates SA 315 — Identifying and Assessing Risks',
    summary: 'Revised SA 315 issued with enhanced guidance on risk identification procedures during audit planning.',
    href: '/search?q=SA+315',
  },
  {
    id: 'law-1',
    category: 'Corporate Law',
    categoryColor: '#6B3FA0',
    categoryBg: '#F3EEF9',
    source: 'MCA Circular',
    date: '30 May 2025',
    title: 'MCA extends additional fees waiver for LLP filings',
    summary: 'MCA General Circular No. 10/2025 extends the waiver of additional fees for LLP filings for FY 2024-25.',
    href: '/search?q=LLP+filing',
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
    subtitle: 'June 2025',
    Icon: Calendar,
    color: '#1A7A4A',
    href: '/search?q=GST+Return+Calendar',
  },
  {
    id: 'tds-rates',
    title: 'TDS Rates & Codes',
    subtitle: 'Assessment Year 2025-26',
    Icon: FileText,
    color: '#2D5BE3',
    href: '/search?q=TDS+Rates',
  },
  {
    id: 'mca-forms',
    title: 'Important Forms',
    subtitle: 'Companies Act, 2013',
    Icon: Building2,
    color: '#6B3FA0',
    href: '/search?q=MCA+Forms',
  },
]

const ACCURACY_PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Verified Sources',
    body: 'Content from official authorities only',
  },
  {
    Icon: CheckCircle2,
    title: 'Expert Reviewed',
    body: 'Reviewed by professionals & subject experts',
  },
  {
    Icon: FileText,
    title: 'Plain & Practical',
    body: 'Simple language with practical insights',
  },
  {
    Icon: RefreshCw,
    title: 'Always Updated',
    body: 'Real-time updates on laws, rules & amendments',
  },
  {
    Icon: CheckCircle2,
    title: '100% Reliable',
    body: 'Trusted by professionals across India',
  },
]

// ─── Main Client Component ────────────────────────────────────────────────────

export default function HomePageClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    // Explicit email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setSubscribeError('Please enter a valid email address.')
      return
    }

    setSubscribing(true)
    setSubscribeError(null)

    setTimeout(() => {
      setSubscribing(false)
      if (trimmed.toLowerCase() === 'error@accounts.one') {
        setSubscribeError('This email is already registered.')
      } else {
        setSubscribed(true)
        setEmail('')
      }
    }, 500)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

            {/* Left: Headline + Search */}
            <div className="flex flex-col">
              {/* Heading */}
              <h1
                id="hero-heading"
                className="font-sans font-bold text-[#1C1C1E] dark:text-white leading-tight tracking-tight text-3xl sm:text-4xl"
              >
                The Operating System for<br />
                <span className="text-[#2D5BE3] dark:text-[#60A5FA]">Professional Excellence</span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-4 text-[15px] text-[#4A4A52] dark:text-gray-300 leading-relaxed max-w-xl">
                Trusted explanations. Exact legal support. Official sources. <br className="hidden sm:inline" />
                Practical notes. Curated videos. <strong className="font-bold text-[#1C1C1E] dark:text-white">Everything a professional needs.</strong>
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-7 relative max-w-2xl flex items-center">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#76767E] dark:text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for topics, sections, standards, rules, cases..."
                    className="w-full bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 hover:border-[#C8C7C2] dark:hover:border-gray-700 focus:border-[#2D5BE3] dark:focus:border-[#60A5FA] focus:bg-white dark:focus:bg-[#161C2C] text-sm font-medium pl-10 pr-4 py-3.5 rounded-lg outline-none transition-all placeholder:text-[#A0A0A8] dark:text-gray-400 shadow-sm focus:ring-2 focus:ring-[#2D5BE3]/10 dark:focus:ring-[#60A5FA]/10"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-3 bg-[#2D5BE3] hover:bg-[#2450CC] text-white text-sm font-bold px-6 py-3.5 rounded-lg transition-colors shadow-sm"
                >
                  Search
                </button>
              </form>

              {/* Popular searches */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#A0A0A8] dark:text-gray-400 font-medium shrink-0">Popular searches:</span>
                {POPULAR_SEARCHES.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="text-xs text-[#4A4A52] dark:text-gray-300 hover:text-[#2D5BE3] dark:hover:text-[#60A5FA] bg-[#F4F3F0] dark:bg-gray-800 hover:bg-[#EEF2FD] dark:hover:bg-gray-700 border border-[#E2E1DD] dark:border-gray-700 hover:border-[#D0DCFA] px-3 py-1 rounded-full transition-all font-medium"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Trust Card */}
            <div className="lg:pt-2">
              <div className="bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white mb-4">
                  Why Professionals Trust Accounts.One
                </h2>
                <ul className="flex flex-col gap-3 mb-6">
                  {TRUST_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-xs text-[#4A4A52] dark:text-gray-300 leading-snug font-medium">
                      <CheckCircle2
                        size={14}
                        className="text-[#2D5BE3] dark:text-[#60A5FA] shrink-0 mt-0.5"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/foundations"
                  className="flex items-center justify-center gap-2 w-full text-xs font-bold text-[#2D5BE3] dark:text-[#60A5FA] border border-[#2D5BE3] dark:border-[#60A5FA] bg-white dark:bg-[#0B0F19] hover:bg-[#EEF2FD] dark:hover:bg-gray-800 px-4 py-2.5 rounded-md transition-all shadow-sm"
                >
                  Explore All Features
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Explore By Domain ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="domains-heading"
        className="bg-[#FAFAF8] dark:bg-[#111726] border-b border-[#E2E1DD] dark:border-gray-800"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <header className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <LayoutGrid size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                <h2
                  id="domains-heading"
                  className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight"
                >
                  Explore by Domain
                </h2>
              </div>
              <p className="text-sm text-[#76767E] dark:text-gray-400">
                Choose a subject to access structured knowledge, laws, standards, and practical guidance.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5BE3] dark:text-[#60A5FA] hover:text-[#2450CC] dark:hover:text-[#3B82F6] shrink-0 transition-colors"
            >
              View All Domains
              <ArrowRight size={12} />
            </Link>
          </header>

          {/* 6-col horizontal layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {PROFESSIONAL_DOMAINS.map((domain) => {
              const { Icon } = domain
              return (
                <Link
                  key={domain.id}
                  href={domain.href}
                  id={`domain-card-${domain.id}`}
                  className="group flex flex-col items-center text-center p-6 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] dark:hover:border-gray-700 hover:shadow-md transition-all h-full"
                >
                  {/* Circular Icon Container */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                    style={{ backgroundColor: `${domain.color}14` }}
                  >
                    <Icon size={22} style={{ color: domain.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors leading-snug mb-2">
                    {domain.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">
                    {domain.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Latest Updates ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="updates-heading"
        className="bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

            {/* ─ LEFT: Latest Updates feed ──────────────────────────── */}
            <div>
              <header className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Bell size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                    <h2
                      id="updates-heading"
                      className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight"
                    >
                      Latest Updates
                    </h2>
                  </div>
                  <p className="text-sm text-[#76767E] dark:text-gray-400">
                    Stay informed with important notifications, circulars & professional updates.
                  </p>
                </div>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5BE3] dark:text-[#60A5FA] hover:text-[#2450CC] dark:hover:text-[#3B82F6] shrink-0 transition-colors"
                >
                  View All Updates
                  <ArrowRight size={12} />
                </Link>
              </header>

              <ol className="flex flex-col divide-y divide-[#F4F3F0] dark:divide-gray-800">
                {LATEST_UPDATES.map((update) => (
                  <li key={update.id} className="py-5 first:pt-0 last:pb-0">
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
                        <span className="text-[10px] text-[#A0A0A8] dark:text-gray-400 font-semibold">
                          {update.source}
                        </span>
                        <span className="text-[#A0A0A8]/60 text-[10px]" aria-hidden="true">•</span>
                        <time className="text-[10px] text-[#A0A0A8] dark:text-gray-400 font-semibold">
                          {update.date}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-[#1C1C1E] dark:text-white leading-snug">
                        {update.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">
                        {update.summary}
                      </p>

                      {/* Read More */}
                      <Link
                        href={update.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5BE3] dark:text-[#60A5FA] hover:text-[#2450CC] dark:hover:text-[#3B82F6] transition-colors w-fit mt-1"
                      >
                        Read More
                        <ArrowRight size={11} />
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
            </div>

            {/* ─ RIGHT: Subscribe + Today's Essentials ──────────────── */}
            <div className="flex flex-col gap-6">

              {/* Subscribe Card */}
              <div className="border border-[#D0DCFA] dark:border-gray-800 rounded-xl p-5 bg-[#EEF2FD] dark:bg-[#1E2640] shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    Subscribe to Daily Professional Updates
                  </h3>
                </div>
                <p className="text-xs text-[#4A4A52] dark:text-gray-300 mb-4 leading-relaxed font-medium">
                  Get important notifications, amendments, circulars & updates directly in your inbox.
                </p>
                {subscribeError && (
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 px-3 py-2.5 rounded-md">
                    <span>{subscribeError}</span>
                  </div>
                )}
                {subscribed ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A7A4A] dark:text-[#4ADE80] bg-[#E8F7EE] dark:bg-green-950/30 border border-[#C5E9D4] dark:border-green-900/50 px-3 py-2.5 rounded-md">
                    <ShieldCheck size={14} />
                    You&apos;re subscribed. Thank you!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      disabled={subscribing}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 min-w-0 bg-white dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 focus:border-[#2D5BE3] text-xs text-[#1C1C1E] dark:text-white font-medium px-3 py-2.5 rounded-md outline-none transition-all placeholder:text-[#A0A0A8] shadow-xs disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="shrink-0 bg-[#2D5BE3] hover:bg-[#2450CC] text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60"
                    >
                      {subscribing ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                )}
                <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-2 font-medium">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Today's Essentials */}
              <div className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#1E2640] shadow-xs">
                <div className="px-5 py-3.5 border-b border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#111726] flex items-center gap-2">
                  <Calendar size={14} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider">
                    Today&apos;s Essentials
                  </h3>
                </div>
                <div className="divide-y divide-[#F4F3F0] dark:divide-gray-800">
                  {TODAYS_ESSENTIALS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAF8] dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                        style={{ backgroundColor: `${item.color}14` }}
                      >
                        <item.Icon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                           {item.title}
                        </p>
                        <p className="text-[10px] text-[#A0A0A8] dark:text-gray-400 mt-0.5 font-medium">{item.subtitle}</p>
                      </div>
                      <ChevronRight size={13} className="text-[#C8C7C2] dark:text-gray-600 group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] shrink-0 transition-colors" />
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
        className="bg-[#FAFAF8] dark:bg-[#111726] border-b border-[#E2E1DD] dark:border-gray-800"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <header className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                <h2
                  id="quickaccess-heading"
                  className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight"
                >
                  Quick Access
                </h2>
              </div>
              <p className="text-sm text-[#76767E] dark:text-gray-400">Everything you need, right at your fingertips.</p>
            </div>
          </header>

          {/* 5-col quick link cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {QUICK_LINKS.map(({ label, href, description, Icon: QIcon, color }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col items-start p-5 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] dark:hover:border-gray-700 hover:shadow-md transition-all h-full"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{ backgroundColor: `${color}14` }}
                  >
                    <QIcon size={18} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors leading-snug">
                      {label}
                    </h3>
                    <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-1 leading-relaxed font-medium">{description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built For Accuracy. Designed For Professionals. ─────────────── */}
      <section
        aria-labelledby="accuracy-heading"
        className="bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800 py-12"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-10">
            <ShieldCheck size={20} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
            <h2
              id="accuracy-heading"
              className="text-lg font-bold text-[#1C1C1E] dark:text-white tracking-tight text-center"
            >
              Built for Accuracy. Designed for Professionals.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {ACCURACY_PILLARS.map(({ Icon: FIcon, title, body }) => (
              <div
                key={title}
                className="flex items-start gap-3"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EEF2FD] dark:bg-gray-800 shrink-0">
                  <FIcon size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">{title}</h3>
                  <p className="text-[10px] text-[#76767E] dark:text-gray-400 leading-relaxed font-semibold">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
