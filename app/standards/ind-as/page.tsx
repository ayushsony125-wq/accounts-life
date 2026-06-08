import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SubdomainNav from '@/components/ui/SubdomainNav'
import { DOMAINS } from '@/lib/data/domains'

const DOMAIN = DOMAINS.find((d) => d.domainSlug === 'standards/ind-as')!

export const metadata: Metadata = {
  title: 'Ind AS Standards — IFRS-Converged Indian Accounting Standards',
  description:
    'Indian Accounting Standards (Ind AS) converged with IFRS — applicable to listed companies and large entities. Recognition, measurement, presentation, and disclosure requirements.',
  alternates: { canonical: '/standards/ind-as' },
}

const IND_AS_LIST = [
  { code: 'Ind AS 1', title: 'Presentation of Financial Statements', slug: 'ind-as-1', status: 'ACTIVE' as const },
  { code: 'Ind AS 2', title: 'Inventories', slug: 'ind-as-2', status: 'ACTIVE' as const },
  { code: 'Ind AS 7', title: 'Statement of Cash Flows', slug: 'ind-as-7', status: 'COMING_SOON' as const },
  { code: 'Ind AS 8', title: 'Accounting Policies, Changes in Accounting Estimates and Errors', slug: 'ind-as-8', status: 'COMING_SOON' as const },
  { code: 'Ind AS 10', title: 'Events after the Reporting Period', slug: 'ind-as-10', status: 'COMING_SOON' as const },
  { code: 'Ind AS 12', title: 'Income Taxes', slug: 'ind-as-12', status: 'COMING_SOON' as const },
  { code: 'Ind AS 16', title: 'Property, Plant and Equipment', slug: 'ind-as-16', status: 'COMING_SOON' as const },
  { code: 'Ind AS 19', title: 'Employee Benefits', slug: 'ind-as-19', status: 'COMING_SOON' as const },
  { code: 'Ind AS 20', title: 'Accounting for Government Grants', slug: 'ind-as-20', status: 'COMING_SOON' as const },
  { code: 'Ind AS 21', title: 'Effects of Changes in Foreign Exchange Rates', slug: 'ind-as-21', status: 'COMING_SOON' as const },
  { code: 'Ind AS 23', title: 'Borrowing Costs', slug: 'ind-as-23', status: 'COMING_SOON' as const },
  { code: 'Ind AS 24', title: 'Related Party Disclosures', slug: 'ind-as-24', status: 'COMING_SOON' as const },
  { code: 'Ind AS 28', title: 'Investments in Associates and Joint Ventures', slug: 'ind-as-28', status: 'COMING_SOON' as const },
  { code: 'Ind AS 33', title: 'Earnings Per Share', slug: 'ind-as-33', status: 'COMING_SOON' as const },
  { code: 'Ind AS 36', title: 'Impairment of Assets', slug: 'ind-as-36', status: 'COMING_SOON' as const },
  { code: 'Ind AS 37', title: 'Provisions, Contingent Liabilities and Contingent Assets', slug: 'ind-as-37', status: 'COMING_SOON' as const },
  { code: 'Ind AS 38', title: 'Intangible Assets', slug: 'ind-as-38', status: 'COMING_SOON' as const },
  { code: 'Ind AS 101', title: 'First-time Adoption of Indian Accounting Standards', slug: 'ind-as-101', status: 'COMING_SOON' as const },
  { code: 'Ind AS 102', title: 'Share-based Payment', slug: 'ind-as-102', status: 'COMING_SOON' as const },
  { code: 'Ind AS 103', title: 'Business Combinations', slug: 'ind-as-103', status: 'COMING_SOON' as const },
  { code: 'Ind AS 105', title: 'Non-current Assets Held for Sale and Discontinued Operations', slug: 'ind-as-105', status: 'COMING_SOON' as const },
  { code: 'Ind AS 108', title: 'Operating Segments', slug: 'ind-as-108', status: 'COMING_SOON' as const },
  { code: 'Ind AS 109', title: 'Financial Instruments', slug: 'ind-as-109', status: 'COMING_SOON' as const },
  { code: 'Ind AS 110', title: 'Consolidated Financial Statements', slug: 'ind-as-110', status: 'COMING_SOON' as const },
  { code: 'Ind AS 113', title: 'Fair Value Measurement', slug: 'ind-as-113', status: 'COMING_SOON' as const },
  { code: 'Ind AS 115', title: 'Revenue from Contracts with Customers', slug: 'ind-as-115', status: 'COMING_SOON' as const },
  { code: 'Ind AS 116', title: 'Leases', slug: 'ind-as-116', status: 'COMING_SOON' as const },
]

export default function IndASPage() {
  const live = IND_AS_LIST.filter((s) => s.status === 'ACTIVE')
  const upcoming = IND_AS_LIST.filter((s) => s.status === 'COMING_SOON')

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standards' },
          { label: 'Ind AS' },
        ]}
        className="mb-6"
      />

      <header className="mb-10 pb-8 border-b border-[#E2E1DD]">
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
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FEF6E4] text-[#B45309]">
              Partial
            </span>
            <span className="text-xs font-medium text-[#76767E]">MCA / NACAS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] tracking-tight leading-tight">
            Ind AS Standards
          </h1>
          <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed max-w-2xl">
            {DOMAIN.domainDescription}
          </p>
        </div>

        <dl className="mt-6 flex flex-wrap gap-6">
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Standards Covered</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">{IND_AS_LIST.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Live Now</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">{live.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">IFRS Equivalent</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#1C1C1E]">Converged with IFRS</dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Official Source</dt>
            <dd className="mt-0.5">
              <a
                href="https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/standards.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline inline-flex items-center gap-1"
                style={{ color: DOMAIN.domainColorHex }}
              >
                MCA.gov.in <ExternalLink size={11} />
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

        <aside className="hidden lg:block sticky top-24 h-fit">
          <SubdomainNav domain={DOMAIN} />
        </aside>

        <main className="min-w-0">

          <div className="lg:hidden mb-8">
            <SubdomainNav domain={DOMAIN} />
          </div>

          {/* Live */}
          <section aria-labelledby="ind-as-live-heading" className="mb-12">
            <h2
              id="ind-as-live-heading"
              className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight"
            >
              Available Now
            </h2>
            <div className="space-y-3">
              {live.map((std) => (
                <Link
                  key={std.slug}
                  href={`/standards/ind-as/${std.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#6B3FA0] hover:shadow-sm transition-all"
                >
                  <span
                    className="text-xs font-bold shrink-0 px-2 py-1 rounded whitespace-nowrap"
                    style={{ backgroundColor: `${DOMAIN.domainColorHex}15`, color: DOMAIN.domainColorHex }}
                  >
                    {std.code}
                  </span>
                  <span className="text-sm font-medium text-[#1C1C1E] group-hover:text-[#6B3FA0] transition-colors min-w-0">
                    {std.title}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto shrink-0 text-[#A0A0A8] group-hover:text-[#6B3FA0] transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section aria-labelledby="ind-as-upcoming-heading">
            <h2
              id="ind-as-upcoming-heading"
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
                  <span className="text-xs font-bold text-[#A0A0A8] shrink-0 whitespace-nowrap">{std.code}</span>
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
