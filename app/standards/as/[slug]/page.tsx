import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getASStandardBySlug, getSearchIndex } from '@/lib/queries'

interface PageParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const index = await getSearchIndex()
  return index
    .filter((item) => item.slug.startsWith('standards/as/'))
    .map((item) => {
      const slug = item.slug.split('/').pop()!
      return { slug }
    })
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const std = await getASStandardBySlug(slug)
  if (!std) return { title: 'Not Found' }
  return {
    title: std.entryTitle,
    description: std.summary,
    alternates: { canonical: `/standards/as/${slug}` },
    openGraph: {
      title: `${std.entryTitle} | Accounts.One`,
      description: std.summary,
    },
  }
}

export default async function StandardPage({ params }: PageParams) {
  const { slug } = await params
  redirect(`/standards/as?selected=${slug}`)
}
