import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react'
import BackButton from '@/components/ui/BackButton'
import { prisma } from '@/lib/db'
import { getDomains, getSearchIndex } from '@/lib/queries'

interface PageParams {
  params: {
    domainSlug: string
    subSlug: string
  }
}

export async function generateStaticParams() {
  const params: Array<{ domainSlug: string; subSlug: string }> = []
  try {
    const index = await getSearchIndex()
    const subdomains = new Set<string>()

    for (const item of index) {
      const parts = item.slug.split('/')
      if (parts.length === 3) {
        const [domainSlug, subSlug] = parts
        if (domainSlug === 'standards') continue // Skip standard routes statically defined
        const key = `${domainSlug}/${subSlug}`
        if (!subdomains.has(key)) {
          subdomains.add(key)
          params.push({ domainSlug, subSlug })
        }
      }
    }

    const domains = await getDomains()
    for (const domain of domains) {
      const dSlug = domain.domainSlug
      if (dSlug.includes('/') || dSlug === 'foundations') continue // Skip nested or custom-mapped
      if (domain.subdomains) {
        for (const sub of domain.subdomains) {
          const sSlug = 'subdomainSlug' in sub ? (sub as any).subdomainSlug : (sub as any).slug
          const key = `${dSlug}/${sSlug}`
          if (!subdomains.has(key)) {
            subdomains.add(key)
            params.push({ domainSlug: dSlug, subSlug: sSlug })
          }
        }
      }
    }

    const foundationsDomain = domains.find(d => d.domainSlug === 'foundations')
    if (foundationsDomain && foundationsDomain.subdomains) {
      for (const sub of foundationsDomain.subdomains) {
        const sSlug = 'subdomainSlug' in sub ? (sub as any).subdomainSlug : (sub as any).slug
        params.push({ domainSlug: 'foundations', subSlug: sSlug })
      }
    }
  } catch (e) {
    console.warn('generateStaticParams failed in subdomain page:', e)
  }

  return params
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  let subdomain = null
  try {
    subdomain = await prisma.subdomain.findFirst({
      where: {
        subdomainSlug: params.subSlug,
        domain: { domainSlug: params.domainSlug }
      },
      include: { domain: true }
    })
  } catch (e) {
    console.warn('generateMetadata prisma call failed:', e)
  }

  if (!subdomain) {
    return {
      title: `${params.subSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Accounts.One`,
      description: `Explore detailed guidance, concepts, and tutorials under ${params.subSlug}.`,
      alternates: { canonical: `/${params.domainSlug}/${params.subSlug}` },
    }
  }

  return {
    title: `${subdomain.subdomainName} | ${subdomain.domain.domainName} — Accounts.One`,
    description: subdomain.subdomainDescription || `Explore detailed guidance, concepts, and tutorials under ${subdomain.subdomainName}.`,
    alternates: { canonical: `/${params.domainSlug}/${params.subSlug}` },
  }
}

export default async function SubdomainPage({ params }: PageParams) {
  let subdomain = null
  try {
    subdomain = await prisma.subdomain.findFirst({
      where: {
        subdomainSlug: params.subSlug,
        domain: { domainSlug: params.domainSlug }
      },
      include: {
        domain: true,
        entries: {
          where: { status: 'PUBLISHED' },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })
  } catch (e) {
    console.warn('SubdomainPage prisma call failed:', e)
  }

  if (!subdomain) {
    // Check static fallback
    const domains = await getDomains()
    const staticDomain = domains.find(d => d.domainSlug === params.domainSlug)
    if (!staticDomain) notFound()
    
    const staticSub = staticDomain.subdomains.find(
      s => ('subdomainSlug' in s ? (s as any).subdomainSlug : (s as any).slug) === params.subSlug
    )
    if (!staticSub) notFound()

    const domainName = staticDomain.domainName
    const subdomainName = 'subdomainName' in staticSub ? (staticSub as any).subdomainName : (staticSub as any).name || ''
    const colorHex = staticDomain.domainColorHex

    return renderSubdomainView({
      domainSlug: params.domainSlug,
      domainName,
      subdomainSlug: params.subSlug,
      subdomainName,
      subdomainDescription: '',
      colorHex,
      entries: []
    })
  }

  return renderSubdomainView({
    domainSlug: subdomain.domain.domainSlug,
    domainName: subdomain.domain.domainName,
    subdomainSlug: subdomain.subdomainSlug,
    subdomainName: subdomain.subdomainName,
    subdomainDescription: subdomain.subdomainDescription || '',
    colorHex: subdomain.domain.domainColorHex,
    entries: subdomain.entries
  })
}

function renderSubdomainView({
  domainSlug,
  domainName,
  subdomainSlug,
  subdomainName,
  subdomainDescription,
  colorHex,
  entries
}: {
  domainSlug: string
  domainName: string
  subdomainSlug: string
  subdomainName: string
  subdomainDescription: string
  colorHex: string
  entries: any[]
}) {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath={`/${domainSlug}`} />
      </div>

      <header className="mb-10 pb-8 border-b border-[#E2E1DD] dark:border-gray-800">
        <span
          className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-3"
          style={{
            backgroundColor: `${colorHex}18`,
            color: colorHex,
          }}
        >
          Subdomain
        </span>
        <h1 className="text-3xl font-bold text-[#1C1C1E] dark:text-white tracking-tight leading-tight">
          {subdomainName}
        </h1>
        {subdomainDescription && (
          <p className="mt-3 text-base text-[#4A4A52] dark:text-gray-300 font-reading leading-relaxed max-w-2xl">
            {subdomainDescription}
          </p>
        )}
      </header>

      <main className="min-w-0 max-w-3xl">
        <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white mb-5 tracking-tight">
          Guides & Articles
        </h2>

        {entries.length === 0 ? (
          <div className="p-6 rounded-lg border border-dashed border-[#E2E1DD] dark:border-gray-700 bg-white dark:bg-[#1E2640] text-center">
            <BookOpen size={24} className="mx-auto text-[#A0A0A8] mb-2" />
            <p className="text-sm font-medium text-[#4A4A52] dark:text-gray-300">No articles published yet</p>
            <p className="text-xs text-[#76767E] dark:text-gray-400 mt-1">Our editors are currently curating content for this section.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Link
                key={entry.entrySlug}
                href={`/${domainSlug}/${subdomainSlug}/${entry.entrySlug}`}
                className="group block p-5 rounded-lg border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] dark:hover:border-gray-700 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-base font-semibold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] transition-colors leading-snug">
                    {entry.entryTitle}
                  </h3>
                  {entry.verificationLevel === 'VERIFIED' && (
                    <CheckCircle2 size={14} className="text-[#1A7A4A] shrink-0" aria-label="Verified" />
                  )}
                </div>
                <p className="text-sm text-[#76767E] dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
                  {entry.summary}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#2D5BE3]">
                  <span>Read learning guide</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
