'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
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
  { label: 'Section 194Q', href: '/search?q=Section+194Q' },
  { label: 'ITC on Expenses', href: '/search?q=ITC+on+Expenses' },
  { label: 'Ind AS 115', href: '/search?q=Ind+AS+115' },
  { label: 'SA 315', href: '/search?q=SA+315' },
  { label: 'CASH FLOW', href: '/search?q=Cash+Flow' },
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

// ─── Main Client Component ────────────────────────────────────────────────────

interface HomePageClientProps {
  initialConfig?: any
}

function getEmbedUrl(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`
  }
  const vimeoRegExp = /vimeo\.com\/(\d+)/
  const vimeoMatch = url.match(vimeoRegExp)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }
  return url
}

export default function HomePageClient({ initialConfig }: HomePageClientProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)

  // One-time cleanup of junk localStorage search_clicks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('search_clicks')
      if (stored) {
        const counts = JSON.parse(stored)
        const cleaned: Record<string, number> = {}
        Object.keys(counts).forEach((key) => {
          const cleanKey = key.trim()
          const cleanLower = cleanKey.toLowerCase().replace(/[^a-z0-9]/g, '')
          const hasLetter = /[a-zA-Z]/.test(cleanKey)
          const isLong = cleanLower.length >= 4
          const isBlocked = cleanLower === 'transferpricing' || cleanLower.includes('transferpricing')
          if (cleanKey && hasLetter && isLong && !isBlocked) {
            cleaned[cleanKey] = counts[key]
          }
        })
        localStorage.setItem('search_clicks', JSON.stringify(cleaned))
      }
    } catch {}
  }, [])

  const resolveIcon = (icon: any) => {
    if (!icon) return BookOpen
    if (typeof icon !== 'string') return icon
    const icons: Record<string, any> = {
      BookOpen,
      Scale,
      FileText,
      TrendingUp,
      ShieldCheck,
      Building2,
      Calculator,
      BarChart3,
      Calendar,
      Zap,
      CheckCircle2,
      LayoutGrid,
      Mail,
      RefreshCw
    }
    return icons[icon] || BookOpen
  }

  // Load configured content or fallback to defaults
  const sectionsOrder = initialConfig?.sectionsOrder || ['hero', 'domains', 'updates', 'quickaccess', 'accuracy']
  const heroTitle = initialConfig?.heroTitle || "The Operating System for"
  const heroTitleSpan = initialConfig?.heroTitleSpan || "Professional Excellence"
  const heroSubtitle = initialConfig?.heroSubtitle || "Trusted explanations. Exact legal support. Official sources. Practical notes. Curated videos. Everything a professional needs."
  const popularSearches = (initialConfig?.popularSearches || POPULAR_SEARCHES).filter(
    (item: any) => {
      const cleanLabel = item.label ? item.label.trim().toLowerCase().replace(/[^a-z0-9]/g, '') : '';
      return cleanLabel !== 'transferpricing';
    }
  )
  const trustPoints = initialConfig?.trustPoints || TRUST_POINTS
  
  const domainsHeading = initialConfig?.domainsHeading || "Explore by Domain"
  const domainsSubheading = initialConfig?.domainsSubheading || "Choose a subject to access structured knowledge, laws, standards, and practical guidance."
  const domainsCards = initialConfig?.domainsCards || PROFESSIONAL_DOMAINS
  
  const updatesHeading = initialConfig?.updatesHeading || "Latest Updates"
  const updatesSubheading = initialConfig?.updatesSubheading || "Stay informed with important notifications, circulars & professional updates."
  const updatesFeed = initialConfig?.updatesFeed || LATEST_UPDATES
  const todaysEssentials = initialConfig?.todaysEssentials || TODAYS_ESSENTIALS
  const subscribeTitle = initialConfig?.subscribeTitle || "Subscribe to Daily Professional Updates"
  const subscribeDesc = initialConfig?.subscribeDesc || "Get important notifications, amendments, circulars & updates directly in your inbox."
  
  const quickAccessHeading = initialConfig?.quickAccessHeading || "Quick Access"
  const quickAccessSubheading = initialConfig?.quickAccessSubheading || "Everything you need, right at your fingertips."
  const quickAccessLinks = initialConfig?.quickAccessLinks || QUICK_LINKS
  
  const accuracyHeading = initialConfig?.accuracyHeading || "Built for Accuracy. Designed for Professionals."
  const accuracyPillars = initialConfig?.accuracyPillars || ACCURACY_PILLARS

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

  // Dynamic trending search logic
  const [trendingSearches, setTrendingSearches] = useState<any[]>(() => {
    const baseList = popularSearches;
    if (typeof window === 'undefined') return baseList;
    try {
      const stored = localStorage.getItem('search_clicks');
      if (stored) {
        const counts = JSON.parse(stored);
        const allItems = [...baseList];
        Object.keys(counts).forEach((query) => {
          const cleanQuery = query.trim();
          const lowerQuery = cleanQuery.toLowerCase();
          const cleanLower = lowerQuery.replace(/[^a-z0-9]/g, '');
          const hasLetter = /[a-zA-Z]/.test(cleanQuery);
          const isLongEnough = cleanLower.length >= 4;
          const isBlocked = cleanLower === 'transferpricing' || cleanLower.includes('transferpricing');
          if (cleanQuery && hasLetter && isLongEnough && !isBlocked && !allItems.some((item) => item.label.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanLower)) {
            allItems.push({
              label: cleanQuery,
              href: `/search?q=${encodeURIComponent(cleanQuery)}`,
            });
          }
        });
        const sorted = allItems.sort((a, b) => {
          const countA = counts[a.label] || 0;
          const countB = counts[b.label] || 0;
          return countB - countA;
        });
        return sorted.slice(0, 6);
      }
    } catch {}
    return baseList;
  });

  const trackSearchClick = (label: string) => {
    try {
      if (!label || !label.trim()) return;
      const cleanLabel = label.trim();
      const lowerLabel = cleanLabel.toLowerCase();
      const cleanLower = lowerLabel.replace(/[^a-z0-9]/g, '');
      const hasLetter = /[a-zA-Z]/.test(cleanLabel);
      const isLongEnough = cleanLower.length >= 4;
      if (!hasLetter || !isLongEnough || cleanLower === 'transferpricing' || cleanLower.includes('transferpricing')) return;
      
      const stored = localStorage.getItem('search_clicks');
      const counts = stored ? JSON.parse(stored) : {};
      counts[cleanLabel] = (counts[cleanLabel] || 0) + 1;
      localStorage.setItem('search_clicks', JSON.stringify(counts));
      
      const baseList = popularSearches;
      const allItems = [...baseList];
      Object.keys(counts).forEach((query) => {
        const cleanQuery = query.trim();
        const lowerQuery = cleanQuery.toLowerCase();
        const cleanLower = lowerQuery.replace(/[^a-z0-9]/g, '');
        const qHasLetter = /[a-zA-Z]/.test(cleanQuery);
        const qIsLong = cleanLower.length >= 4;
        const qIsBlocked = cleanLower === 'transferpricing' || cleanLower.includes('transferpricing');
        if (cleanQuery && qHasLetter && qIsLong && !qIsBlocked && !allItems.some((item) => item.label.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanLower)) {
          allItems.push({
            label: cleanQuery,
            href: `/search?q=${encodeURIComponent(cleanQuery)}`,
          });
        }
      });
      
      const sorted = allItems.sort((a, b) => {
        const countA = counts[a.label] || 0;
        const countB = counts[b.label] || 0;
        return countB - countA;
      });
      setTrendingSearches(sorted.slice(0, 6));
    } catch {}
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      trackSearchClick(searchQuery.trim())
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/search')
    }
  }

  const renderHero = () => (
    <section
      key="hero"
      aria-labelledby="hero-heading"
      className="bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          {/* Left: Headline + Search */}
          <div className="flex flex-col">
            <h1
              id="hero-heading"
              className="font-sans font-bold text-[#1C1C1E] dark:text-white leading-tight tracking-tight text-3xl sm:text-4xl"
            >
              {heroTitle}<br />
              <span className="text-[#2D5BE3] dark:text-[#60A5FA]">{heroTitleSpan}</span>
            </h1>
            <p className="mt-4 text-[15px] text-[#4A4A52] dark:text-gray-300 leading-relaxed max-w-xl">
              {heroSubtitle}
            </p>
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
            <div className="mt-4 w-full max-w-2xl overflow-hidden">
              <div className="flex flex-row flex-nowrap items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-xs text-[#A0A0A8] dark:text-gray-400 font-medium shrink-0 whitespace-nowrap">Trending:</span>
                {trendingSearches.map((s: any) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    onClick={() => trackSearchClick(s.label)}
                    className="text-xs text-[#4A4A52] dark:text-gray-300 hover:text-[#2D5BE3] dark:hover:text-[#60A5FA] bg-[#F4F3F0] dark:bg-gray-800 hover:bg-[#EEF2FD] dark:hover:bg-gray-700 border border-[#E2E1DD] dark:border-gray-700 hover:border-[#D0DCFA] px-3 py-1 rounded-full transition-all font-medium shrink-0 whitespace-nowrap inline-block"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Trust Card */}
          <div className="lg:pt-2">
            <div className="bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white mb-4">
                Why Professionals Trust Accounts.One
              </h2>
              <ul className="flex flex-col gap-3 mb-6">
                {trustPoints.map((point: string) => (
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
  )

  const renderDomains = () => (
    <section
      key="domains"
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
                {domainsHeading}
              </h2>
            </div>
            <p className="text-sm text-[#76767E] dark:text-gray-400">
              {domainsSubheading}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {domainsCards.map((domain: any) => {
            const CardIcon = resolveIcon(domain.Icon || domain.IconName)
            return (
              <Link
                key={domain.id}
                href={domain.href}
                id={`domain-card-${domain.id}`}
                className="group flex flex-col items-center text-center p-6 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] dark:hover:border-gray-700 hover:shadow-md transition-all h-full"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: `${domain.color}14` }}
                >
                  <CardIcon size={22} style={{ color: domain.color }} />
                </div>
                <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors leading-snug mb-2">
                  {domain.name}
                </h3>
                <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">
                  {domain.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )

  const renderUpdates = () => (
    <section
      key="updates"
      aria-labelledby="updates-heading"
      className="bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          {/* LEFT: Latest Updates feed */}
          <div>
            <header className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Bell size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                  <h2
                    id="updates-heading"
                    className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight"
                  >
                    {updatesHeading}
                  </h2>
                </div>
                <p className="text-sm text-[#76767E] dark:text-gray-400">
                  {updatesSubheading}
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
              {updatesFeed.map((update: any) => (
                <li key={update.id} className="py-5 first:pt-0 last:pb-0">
                  <article className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: update.categoryBg || '#EEF2FD',
                          color: update.categoryColor || '#2D5BE3',
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
                    <h3 className="text-sm font-semibold text-[#1C1C1E] dark:text-white leading-snug">
                      {update.title}
                    </h3>
                    <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">
                      {update.summary}
                    </p>
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
          {/* RIGHT: Subscribe + Today's Essentials */}
          <div className="flex flex-col gap-6">
            {/* Subscribe Card */}
            <div className="border border-[#D0DCFA] dark:border-gray-800 rounded-xl p-5 bg-[#EEF2FD] dark:bg-[#1E2640] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                  {subscribeTitle}
                </h3>
              </div>
              <p className="text-xs text-[#4A4A52] dark:text-gray-300 mb-4 leading-relaxed font-medium">
                {subscribeDesc}
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
                {todaysEssentials.map((item: any) => {
                  const EssentialIcon = resolveIcon(item.Icon || item.IconName)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAF8] dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                        style={{ backgroundColor: `${item.color}14` }}
                      >
                        <EssentialIcon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#A0A0A8] dark:text-gray-400 mt-0.5 font-medium">{item.subtitle}</p>
                      </div>
                      <ChevronRight size={13} className="text-[#C8C7C2] dark:text-gray-600 group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] shrink-0 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderQuickAccess = () => (
    <section
      key="quickaccess"
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
                {quickAccessHeading}
              </h2>
            </div>
            <p className="text-sm text-[#76767E] dark:text-gray-400">{quickAccessSubheading}</p>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickAccessLinks.map((link: any) => {
            const QIcon = resolveIcon(link.Icon || link.IconName)
            return (
              <Link
                key={link.label}
                href={link.href}
                className="group flex flex-col items-start p-5 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] dark:hover:border-gray-700 hover:shadow-md transition-all h-full"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{ backgroundColor: `${link.color}14` }}
                  >
                    <QIcon size={18} style={{ color: link.color }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-[#60A5FA] transition-colors leading-snug">
                      {link.label}
                    </h3>
                    <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-1 leading-relaxed font-medium">{link.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )

  const renderAccuracy = () => (
    <section
      key="accuracy"
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
            {accuracyHeading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {accuracyPillars.map((pillar: any) => {
            const FIcon = resolveIcon(pillar.Icon || pillar.IconName)
            return (
              <div
                key={pillar.title}
                className="flex items-start gap-3"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EEF2FD] dark:bg-gray-800 shrink-0">
                  <FIcon size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">{pillar.title}</h3>
                  <p className="text-[10px] text-[#76767E] dark:text-gray-400 leading-relaxed font-semibold">{pillar.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )

  const renderVideos = () => {
    const videos = initialConfig?.videosItems || []
    if (videos.length === 0) return null

    return (
      <section
        key="videos"
        aria-labelledby="videos-heading"
        className="bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800 py-12"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen size={18} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
            <h2 id="videos-heading" className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
              {initialConfig?.videosHeading || "Curated Video Library"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid: any, idx: number) => {
              const embedUrl = getEmbedUrl(vid.url)
              return (
                <div key={idx} className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden bg-[#FAFAF8] dark:bg-[#1E2640] shadow-xs">
                  {embedUrl ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={embedUrl}
                        title={vid.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                  <div className="p-4">
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white line-clamp-1">{vid.title}</h3>
                    <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-1 leading-relaxed font-semibold">{vid.description || "Video Resource"}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {sectionsOrder.map((sectionId: string) => {
        switch (sectionId) {
          case 'hero':
            return renderHero()
          case 'domains':
            return renderDomains()
          case 'updates':
            return renderUpdates()
          case 'quickaccess':
            return renderQuickAccess()
          case 'accuracy':
            return renderAccuracy()
          case 'videos':
            return renderVideos()
          default:
            return null
        }
      })}
    </>
  )
}
