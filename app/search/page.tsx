import type { Metadata } from 'next'
import { getSearchIndex } from '@/lib/queries'
import SearchPageClient from './SearchPageClient'

export const metadata: Metadata = {
  title: 'Search Accounting Operating System',
  description: 'Search across all accounting topics, ICAI AS standards, Ind AS rules, journal entries, and glossary terms.',
  alternates: { canonical: '/search' },
}

export default async function SearchPage() {
  const searchIndex = await getSearchIndex()
  return <SearchPageClient searchIndex={searchIndex} />
}
