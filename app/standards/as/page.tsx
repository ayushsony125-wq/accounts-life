import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import BackButton from '@/components/ui/BackButton'
import SubdomainNav from '@/components/ui/SubdomainNav'
import { DOMAINS } from '@/lib/data/domains'

const DOMAIN = DOMAINS.find((d) => d.domainSlug === 'standards/as')!

export const metadata: Metadata = {
  title: 'AS Standards (ICAI) — All 32 Accounting Standards',
  description:
    'Complete coverage of all 32 Accounting Standards issued by ICAI — each with objectives, scope, provisions, journal entries, and illustrative examples.',
  alternates: { canonical: '/standards/as' },
}

// ─── Standard index (quick-reference) ────────────────────────────────────────

const AS_LIST = [
  { code: 'AS 1', title: 'Disclosure of Accounting Policies', slug: 'as-1', status: 'ACTIVE' as const },
  { code: 'AS 2', title: 'Valuation of Inventories', slug: 'as-2', status: 'ACTIVE' as const },
  { code: 'AS 3', title: 'Cash Flow Statements', slug: 'as-3', status: 'ACTIVE' as const },
  { code: 'AS 4', title: 'Contingencies and Events Occurring After the Balance Sheet Date', slug: 'as-4', status: 'COMING_SOON' as const },
  { code: 'AS 5', title: 'Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies', slug: 'as-5', status: 'COMING_SOON' as const },
  { code: 'AS 6', title: 'Depreciation Accounting', slug: 'as-6', status: 'ACTIVE' as const },
  { code: 'AS 7', title: 'Construction Contracts', slug: 'as-7', status: 'COMING_SOON' as const },
  { code: 'AS 9', title: 'Revenue Recognition', slug: 'as-9', status: 'ACTIVE' as const },
  { code: 'AS 10', title: 'Property, Plant and Equipment', slug: 'as-10', status: 'ACTIVE' as const },
  { code: 'AS 11', title: 'Effects of Changes in Foreign Exchange Rates', slug: 'as-11', status: 'COMING_SOON' as const },
  { code: 'AS 12', title: 'Accounting for Government Grants', slug: 'as-12', status: 'COMING_SOON' as const },
  { code: 'AS 13', title: 'Accounting for Investments', slug: 'as-13', status: 'COMING_SOON' as const },
  { code: 'AS 14', title: 'Accounting for Amalgamations', slug: 'as-14', status: 'COMING_SOON' as const },
  { code: 'AS 15', title: 'Employee Benefits', slug: 'as-15', status: 'COMING_SOON' as const },
  { code: 'AS 16', title: 'Borrowing Costs', slug: 'as-16', status: 'COMING_SOON' as const },
  { code: 'AS 17', title: 'Segment Reporting', slug: 'as-17', status: 'COMING_SOON' as const },
  { code: 'AS 18', title: 'Related Party Disclosures', slug: 'as-18', status: 'COMING_SOON' as const },
  { code: 'AS 19', title: 'Leases', slug: 'as-19', status: 'COMING_SOON' as const },
  { code: 'AS 20', title: 'Earnings Per Share', slug: 'as-20', status: 'COMING_SOON' as const },
  { code: 'AS 21', title: 'Consolidated Financial Statements', slug: 'as-21', status: 'COMING_SOON' as const },
  { code: 'AS 22', title: 'Accounting for Taxes on Income', slug: 'as-22', status: 'COMING_SOON' as const },
  { code: 'AS 23', title: 'Accounting for Investments in Associates', slug: 'as-23', status: 'COMING_SOON' as const },
  { code: 'AS 24', title: 'Discontinuing Operations', slug: 'as-24', status: 'COMING_SOON' as const },
  { code: 'AS 25', title: 'Interim Financial Reporting', slug: 'as-25', status: 'COMING_SOON' as const },
  { code: 'AS 26', title: 'Intangible Assets', slug: 'as-26', status: 'COMING_SOON' as const },
  { code: 'AS 27', title: 'Financial Reporting of Interests in Joint Ventures', slug: 'as-27', status: 'COMING_SOON' as const },
  { code: 'AS 28', title: 'Impairment of Assets', slug: 'as-28', status: 'COMING_SOON' as const },
  { code: 'AS 29', title: 'Provisions, Contingent Liabilities and Contingent Assets', slug: 'as-29', status: 'COMING_SOON' as const },
  { code: 'AS 30', title: 'Financial Instruments: Recognition and Measurement', slug: 'as-30', status: 'COMING_SOON' as const },
  { code: 'AS 31', title: 'Financial Instruments: Presentation', slug: 'as-31', status: 'COMING_SOON' as const },
  { code: 'AS 32', title: 'Financial Instruments: Disclosures', slug: 'as-32', status: 'COMING_SOON' as const },
]

const STATUS_CLS = {
  ACTIVE: 'bg-[#E8F7EE] text-[#1A7A4A]',
  COMING_SOON: 'bg-[#F4F3F0] text-[#A0A0A8]',
}

export default function ASStandardsDomainPage() {
  const live = AS_LIST.filter((s) => s.status === 'ACTIVE')
  const upcoming = AS_LIST.filter((s) => s.status === 'COMING_SOON')

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath="/" />
      </div>

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
              <span className="text-xs font-medium text-[#76767E]">
                Issued by ICAI
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] tracking-tight leading-tight">
              AS Standards (ICAI)
            </h1>
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed max-w-2xl">
              {DOMAIN.domainDescription}
            </p>
          </div>
        </div>

        <dl className="mt-6 flex flex-wrap gap-6">
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Total Standards</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">32</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Live on Platform</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">{live.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Issuing Body</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">ICAI</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Official Source</dt>
            <dd className="mt-0.5">
              <a
                href="https://www.icai.org/post/accounting-standards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#0F6B5E] hover:underline inline-flex items-center gap-1"
              >
                ICAI.org <ExternalLink size={11} />
              </a>
            </dd>
          </div>
        </dl>
      </header>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

        {/* Left nav */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <SubdomainNav domain={DOMAIN} />
        </aside>

        {/* Center */}
        <main className="min-w-0">

          {/* Mobile nav */}
          <div className="lg:hidden mb-8">
            <SubdomainNav domain={DOMAIN} />
          </div>

          {/* Live standards */}
          <section aria-labelledby="live-standards-heading" className="mb-12">
            <h2
              id="live-standards-heading"
              className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight"
            >
              Available Now
            </h2>
            <div className="space-y-3">
              {live.map((std) => (
                <Link
                  key={std.slug}
                  href={`/standards/as/${std.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#0F6B5E] hover:shadow-sm transition-all"
                >
                  <span
                    className="text-xs font-bold shrink-0 px-2 py-1 rounded"
                    style={{ backgroundColor: `${DOMAIN.domainColorHex}15`, color: DOMAIN.domainColorHex }}
                  >
                    {std.code}
                  </span>
                  <span className="text-sm font-medium text-[#1C1C1E] group-hover:text-[#0F6B5E] transition-colors min-w-0">
                    {std.title}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto shrink-0 text-[#A0A0A8] group-hover:text-[#0F6B5E] transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section aria-labelledby="upcoming-heading">
            <h2
              id="upcoming-heading"
              className="text-xs font-semibold text-[#76767E] uppercase tracking-widest mb-4"
            >
              Coming Soon
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {upcoming.map((std) => (
                <div
                  key={std.slug}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E2E1DD] bg-[#FAFAF8] opacity-70 cursor-not-allowed"
                  aria-label={`${std.code} — Coming soon`}
                >
                  <span className="text-xs font-bold text-[#A0A0A8] shrink-0">{std.code}</span>
                  <span className="text-sm text-[#76767E] truncate">{std.title}</span>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
