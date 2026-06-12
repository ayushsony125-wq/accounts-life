import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BackButton from '@/components/ui/BackButton'
import {
  BookOpen,
  Landmark,
  Scale,
  FileText,
  BookMarked,
  Settings,
  Building2,
  TrendingUp,
  Package,
  Users,
  BarChart2,
  ShieldCheck,
  Calculator,
  Calendar,
  RefreshCw,
  Wallet,
  GraduationCap,
  Bell,
  Laptop,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accounts — Master Accounting & Drive Financial Excellence',
  description:
    'Comprehensive learning hub for CA students, articles and professionals to build strong accounting, reporting and financial management expertise. Covers Schedule III, AS, Ind AS, foundations, advanced and corporate topics.',
  alternates: { canonical: '/accounts' },
  openGraph: {
    title: 'Accounts | Accounts.One',
    description:
      'Your complete Accounts learning hub — Schedule III, AS Standards, Ind AS, Journal Entries, Financial Statements, and professional-grade guidance.',
  },
}

// ─── Section Data ──────────────────────────────────────────────────────────────

const CORE_LEARNING = [
  {
    icon: Landmark,
    title: 'Accounting Fundamentals',
    desc: 'Concepts, conventions, accounting principles and terminology.',
    href: '/foundations',
  },
  {
    icon: RefreshCw,
    title: 'Double Entry System',
    desc: 'Rules of debit & credit, accounting equation and recording transactions.',
    href: '/foundations',
  },
  {
    icon: BookOpen,
    title: 'Books of Original Entry',
    desc: 'Journal, Cash Book, Purchases Book, Sales Book and other subsidiary books.',
    href: '/foundations',
  },
  {
    icon: BookMarked,
    title: 'Ledger & Posting',
    desc: 'Posting from journals to ledger, balancing and trial balance preparation.',
    href: '/foundations',
  },
  {
    icon: Scale,
    title: 'Trial Balance',
    desc: 'Preparation, errors and rectification with detailed examples.',
    href: '/foundations',
  },
  {
    icon: FileText,
    title: 'Final Accounts',
    desc: 'Trading, Profit & Loss A/c and Balance Sheet preparation.',
    href: '/foundations',
  },
  {
    icon: Settings,
    title: 'Adjusting Entries',
    desc: 'Pre-adjustment and post-adjustment entries with examples.',
    href: '/foundations',
  },
  {
    icon: Building2,
    title: 'Bank Reconciliation',
    desc: 'Bank reconciliation statements with practical applications.',
    href: '/foundations',
  },
  {
    icon: TrendingUp,
    title: 'Depreciation Accounting',
    desc: 'Methods, calculation and accounting treatment of depreciation.',
    href: '/foundations',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    desc: 'Valuation methods, stock control and inventory accounting.',
    href: '/search?q=Inventory',
  },
  {
    icon: Users,
    title: 'Receivables & Payables Management',
    desc: 'Accounting and control of debtors, creditors and payables.',
    href: '/search?q=Receivables',
  },
  {
    icon: BarChart2,
    title: 'Cost & Margin Analysis',
    desc: 'Costing concepts, break-even analysis, contribution and marginal costing.',
    href: '/search?q=Cost+Analysis',
  },
]

const ADVANCED = [
  {
    icon: ShieldCheck,
    title: 'Internal Controls & Compliance',
    desc: 'Control procedures, documentation and compliance framework.',
    href: '/search?q=Internal+Controls',
  },
  {
    icon: FileText,
    title: 'Consolidated Financial Statements',
    desc: 'Preparation of Consolidated Balance Sheet and P&L A/c.',
    href: '/search?q=Consolidated',
  },
  {
    icon: Settings,
    title: 'Complex Adjustments & Entries',
    desc: 'Advance adjustment for financial accuracy.',
    href: '/search?q=Complex+Adjustments',
  },
  {
    icon: Calculator,
    title: 'Deferred Tax',
    desc: 'Schedule planning for DTA/DTL corporation.',
    href: '/search?q=Deferred+Tax',
  },
  {
    icon: BarChart2,
    title: 'Corporate Reporting',
    desc: 'CFO Dashboards, EBITDA tracking and monthly MIS preparation.',
    href: '/search?q=Corporate+Reporting',
  },
  {
    icon: Laptop,
    title: 'Portal Reconciliations',
    desc: 'Matching profit with Income Tax (TRACES), GETN, etc.',
    href: '/search?q=Reconciliation',
  },
  {
    icon: Calendar,
    title: 'Month-End / Year-End Closure',
    desc: 'Provisioning, accruals, prepaid analysis and cut-off testing.',
    href: '/search?q=Year+End+Closure',
  },
  {
    icon: Users,
    title: 'Corporate Payroll',
    desc: 'CTC structural breakup, EPF (Excluded employees rule), ESC, and Sec 192 TDS.',
    href: '/search?q=Payroll',
  },
  {
    icon: RefreshCw,
    title: 'P2P & O2C Cycles',
    desc: 'Vendor/Customer/Aging. MEME 45-day payment compliance.',
    href: '/search?q=P2P+O2C',
  },
  {
    icon: Building2,
    title: 'Fixed Asset Management',
    desc: 'FAR management and asset accounting.',
    href: '/search?q=Fixed+Assets',
  },
  {
    icon: Wallet,
    title: 'Budgeting & Financial Control',
    desc: 'Budget preparation, variance analysis and financial control.',
    href: '/search?q=Budgeting',
  },
  {
    icon: TrendingUp,
    title: 'Working Capital Management',
    desc: 'Management of current assets, liabilities and liquidity.',
    href: '/search?q=Working+Capital',
  },
]

const PRACTICAL_ROW = [
  {
    icon: Package,
    title: 'Real Examples',
    desc: 'Illustrative & practical case-based learning.',
    href: '/search?q=Examples',
  },
  {
    icon: GraduationCap,
    title: 'Exam & Articleship Ready',
    desc: 'Useful for CA exams, articleship & jobs.',
    href: '/search?q=CA+Exam',
  },
  {
    icon: FileText,
    title: 'Step-by-Step Solutions',
    desc: 'Detailed working with clear explanations.',
    href: '/search?q=Solutions',
  },
  {
    icon: Bell,
    title: 'Updated as per ICAI',
    desc: 'Always aligned with latest standards & notifications.',
    href: '/standards/as',
  },
]

export default function AccountsPage() {
  return (
    <div className="w-full min-h-screen">
      {/* ─── Header & Hero Section (White Background) ─────────────────── */}
      <div className="w-full bg-white dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
          {/* Back Button */}
          <div className="mb-8">
            <BackButton fallbackPath="/" />
          </div>

          {/* Hero Content */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-[46px] font-bold text-[#1C1C1E] dark:text-white tracking-tight leading-[1.15] mb-4">
                Accounts
              </h1>
              <p className="text-[18px] sm:text-[20px] font-bold text-[#2D5BE3] dark:text-[#60A5FA] mb-4 leading-snug">
                Master Accounting. Drive Financial Excellence.
              </p>
              <p className="text-[15px] sm:text-[16px] text-[#4A4A52] dark:text-gray-300 leading-relaxed max-w-[580px]">
                Comprehensive learning hub for CA students, articles and professionals to build strong
                accounting, reporting and financial management expertise.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Image
                src="/accounts_hero.png"
                alt="Accounting dashboard illustration showing laptop, reports and graphs"
                width={500}
                height={350}
                priority
                className="w-full max-w-[420px] lg:max-w-none h-auto object-contain select-none"
                draggable={false}
              />
            </div>
          </section>
        </div>
      </div>

      {/* ─── Content Body (Light Grey Background) ──────────────────────── */}
      <div className="w-full bg-[#FAFAF8] dark:bg-[#0B0F19] py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Section 1: Accounting Frameworks & Standards */}
          <section className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-[#1E2640] rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1C1C1E] dark:text-white mb-6">
              Accounting Frameworks &amp; Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Schedule III */}
              <Link
                href="/search?q=Schedule+III"
                className="group flex flex-row gap-4 p-5 rounded-xl border border-[#D5E1FB] dark:border-[#263765] bg-[#EEF2FD] dark:bg-[#1A2542] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#2D5BE3] text-white">
                  <BookOpen size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-blue-400 transition-colors">
                    Schedule III
                  </h3>
                  <p className="text-[12px] font-semibold text-[#76767E] dark:text-gray-400 mt-0.5">
                    Companies Act, 2013
                  </p>
                  <p className="text-[13px] text-[#4A4A52] dark:text-gray-300 mt-2 leading-relaxed">
                    Complete Schedule III covering all applicable accounting requirements.
                  </p>
                </div>
              </Link>

              {/* Card 2: AS */}
              <Link
                href="/standards/as"
                className="group flex flex-row gap-4 p-5 rounded-xl border border-[#C8E8E2] dark:border-[#17463E] bg-[#E6F4F2] dark:bg-[#0E2C27] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#0F6B5E] text-white">
                  <BookOpen size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#0F6B5E] dark:group-hover:text-emerald-400 transition-colors">
                    AS (Accounting Standards)
                  </h3>
                  <p className="text-[12px] font-semibold text-[#76767E] dark:text-gray-400 mt-0.5">
                    Accounting Standards Issued by ICAI
                  </p>
                  <p className="text-[13px] text-[#4A4A52] dark:text-gray-300 mt-2 leading-relaxed">
                    From AS 1 to AS 29 – Principles, policies and practices.
                  </p>
                </div>
              </Link>

              {/* Card 3: Ind AS */}
              <Link
                href="/standards/ind-as"
                className="group flex flex-row gap-4 p-5 rounded-xl border border-[#E5DBFA] dark:border-[#382D5C] bg-[#F5F0FF] dark:bg-[#251E3D] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#6B3FA0] text-white">
                  <BookOpen size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#6B3FA0] dark:group-hover:text-purple-400 transition-colors">
                    Ind AS (Indian Accounting Standards)
                  </h3>
                  <p className="text-[12px] font-semibold text-[#76767E] dark:text-gray-400 mt-0.5">
                    Converged with International Standards
                  </p>
                  <p className="text-[13px] text-[#4A4A52] dark:text-gray-300 mt-2 leading-relaxed">
                    Ind AS 1 to Ind AS 115 and more – Globally aligned standards.
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* Section 2: Core Learning Areas */}
          <section className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-[#1E2640] rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1C1C1E] dark:text-white mb-6">
              Core Learning Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORE_LEARNING.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex flex-row items-start gap-3.5 p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#111726] hover:border-[#2D5BE3] hover:shadow-sm transition-all"
                  >
                    <Icon size={22} className="text-[#2D5BE3] dark:text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-[#76767E] dark:text-gray-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Section 3: Advanced & Specialized */}
          <section className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-[#1E2640] rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1C1C1E] dark:text-white mb-6">
              Advanced &amp; Specialized
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADVANCED.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex flex-row items-start gap-3.5 p-4 rounded-xl border border-[#F5E6D3] dark:border-[#382E22] bg-[#FFF9F2] dark:bg-[#1C1712] hover:border-[#B45309] hover:shadow-sm transition-all"
                  >
                    <Icon size={22} className="text-[#B45309] dark:text-[#F59E0B] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#B45309] dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-[#76767E] dark:text-gray-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Section 4: Practical Row / Bottom bar */}
          <section className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#D5E1FB] dark:border-[#263765] rounded-2xl p-5 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRACTICAL_ROW.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex flex-row items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-[#111726] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon size={20} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                    </div>
                    <div>
                      <span className="block text-[13px] font-bold text-[#1C1C1E] dark:text-white leading-tight">
                        {item.title}
                      </span>
                      <p className="text-[11px] text-[#76767E] dark:text-gray-400 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
