import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getIndASStandardBySlug, getSearchIndex } from '@/lib/queries'

interface PageParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const index = await getSearchIndex()
  return index
    .filter((item) => item.slug.startsWith('standards/ind-as/'))
    .map((item) => {
      const slug = item.slug.split('/').pop()!
      return { slug }
    })
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const std = await getIndASStandardBySlug(slug)
  if (!std) return { title: 'Not Found' }
  return {
    title: std.entryTitle,
    description: std.summary,
    alternates: { canonical: `/standards/ind-as/${slug}` },
    openGraph: {
      title: `${std.entryTitle} | Accounts.One`,
      description: std.summary,
    },
  }
}

export default async function IndASStandardPage({ params }: PageParams) {
  const { slug } = await params
  redirect(`/standards/ind-as?selected=${slug}`)
}
