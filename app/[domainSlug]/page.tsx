import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import SubdomainNav from '@/components/ui/SubdomainNav'
import BackButton from '@/components/ui/BackButton'
import { getDomainBySlug, getDomains } from '@/lib/queries'
import { prisma } from '@/lib/db'

interface PageParams {
  params: {
    domainSlug: string
  }
}

export async function generateStaticParams() {
  const domains = await getDomains()
  const staticSlugs = ['foundations', 'standards', 'glossary', 'search', 'admin']
  return domains
    .map((d) => d.domainSlug)
    .filter((slug) => !slug.includes('/') && !staticSlugs.includes(slug))
    .map((slug) => ({ domainSlug: slug }))
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const domain = await getDomainBySlug(params.domainSlug)
  if (!domain) return { title: 'Not Found' }
  return {
    title: `${domain.domainName} | Accounts.One`,
    description: domain.domainDescription || domain.domainTagline || '',
    alternates: { canonical: `/${params.domainSlug}` },
    openGraph: {
      title: `${domain.domainName} | Accounts.One`,
      description: domain.domainDescription || domain.domainTagline || '',
    },
  }
}

export default async function DomainPage({ params }: PageParams) {
  let dbDomain = null
  try {
    dbDomain = await prisma.domain.findUnique({
      where: { domainSlug: params.domainSlug },
      include: {
        subdomains: {
          orderBy: { sortOrder: 'asc' },
          include: {
            _count: {
              select: { entries: { where: { status: 'PUBLISHED' } } }
            }
          }
        },
        _count: {
          select: { entries: { where: { status: 'PUBLISHED' } } }
        }
      }
    })
  } catch (e) {
    console.warn('DomainPage prisma call failed, using fallback:', e)
  }

  // If not found in database or query failed, check fallback
  if (!dbDomain) {
    const staticDomains = await getDomains()
    const fallback = staticDomains.find(d => d.domainSlug === params.domainSlug) as any
    if (!fallback) notFound()

    const domainData = {
      domainSlug: fallback.domainSlug,
      domainCode: fallback.domainCode,
      domainName: fallback.domainName,
      domainColorHex: fallback.domainColorHex,
      domainDescription: fallback.domainDescription || '',
      domainTagline: fallback.domainTagline || '',
      domainStatus: fallback.domainStatus,
      plannedEntryCount: fallback.plannedEntryCount,
      entryCount: fallback.entryCount || 0,
      subdomains: fallback.subdomains.map((sub: any) => ({
        slug: sub.slug,
        name: 'name' in sub ? (sub as any).name : (sub as any).subdomainName || '',
        entryCount: sub.entryCount || 0,
      }))
    }

    return renderDomainPage(domainData)
  }

  const domainData = {
    domainSlug: dbDomain.domainSlug,
    domainCode: dbDomain.domainCode,
    domainName: dbDomain.domainName,
    domainColorHex: dbDomain.domainColorHex,
    domainDescription: dbDomain.domainDescription || '',
    domainTagline: dbDomain.domainTagline || '',
    domainStatus: dbDomain.domainStatus,
    plannedEntryCount: dbDomain.plannedEntryCount,
    entryCount: dbDomain._count.entries,
    subdomains: dbDomain.subdomains.map(sub => ({
      slug: sub.subdomainSlug,
      name: sub.subdomainName,
      entryCount: sub._count.entries,
    }))
  }

  return renderDomainPage(domainData)
}

function renderDomainPage(domain: any) {
  const statusLabels = {
    ACTIVE: 'Active',
    PARTIAL: 'Partial',
    COMING_SOON: 'Coming Soon'
  }

  const statusCls = {
    ACTIVE: 'bg-[#E8F7EE] text-[#1A7A4A]',
    PARTIAL: 'bg-[#FEF6E4] text-[#B45309]',
    COMING_SOON: 'bg-[#F4F3F0] text-[#76767E]'
  }

  // Map subdomains to the structure SubdomainNav expects
  const subnavDomain = {
    ...domain,
    subdomains: domain.subdomains.map((sub: any) => ({
      name: sub.name,
      slug: sub.slug,
      entryCount: sub.entryCount
    }))
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath="/" />
      </div>

      <header className="mb-10 pb-8 border-b border-[#E2E1DD]">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-bold tracking-widest px-2.5 py-1 rounded"
                style={{
                  backgroundColor: `${domain.domainColorHex}18`,
                  color: domain.domainColorHex,
                }}
              >
                {domain.domainCode}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusCls[domain.domainStatus as keyof typeof statusCls]}`}>
                {statusLabels[domain.domainStatus as keyof typeof statusLabels]}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] tracking-tight leading-tight">
              {domain.domainName}
            </h1>
            <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed max-w-2xl">
              {domain.domainDescription || domain.domainTagline}
            </p>
          </div>
        </div>

        <dl className="mt-6 flex flex-wrap gap-6">
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Entries</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">
              {domain.entryCount}
              <span className="text-sm font-normal text-[#A0A0A8] ml-1">
                of {domain.plannedEntryCount} planned
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#76767E] font-medium uppercase tracking-wider">Subdomains</dt>
            <dd className="mt-0.5 text-lg font-bold text-[#1C1C1E]">{domain.subdomains.length}</dd>
          </div>
        </dl>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block sticky top-24 h-fit">
          <SubdomainNav domain={subnavDomain} />
        </aside>

        <main className="min-w-0">
          <div className="lg:hidden mb-8">
            <SubdomainNav domain={subnavDomain} />
          </div>

          <section aria-labelledby="subdomains-heading">
            <h2
              id="subdomains-heading"
              className="text-lg font-bold text-[#1C1C1E] mb-5 tracking-tight"
            >
              Browse topics in this domain
            </h2>
            {domain.subdomains.length === 0 ? (
              <p className="text-sm text-[#76767E]">No topics are available yet in this domain.</p>
            ) : (
              <div className="space-y-3">
                {domain.subdomains.map((sub: any) => (
                  <Link
                    key={sub.slug}
                    href={`/${domain.domainSlug}/${sub.slug}`}
                    className="group flex items-center justify-between p-4 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen
                        size={16}
                        className="shrink-0"
                        style={{ color: domain.domainColorHex }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors truncate">
                          {sub.name}
                        </p>
                        <p className="text-xs text-[#76767E] mt-0.5">
                          {sub.entryCount} {sub.entryCount === 1 ? 'entry' : 'entries'} published
                        </p>
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
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
