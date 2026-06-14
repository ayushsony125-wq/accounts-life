import type { Metadata } from 'next'
import LearningPortal from '../learning/page'

export const metadata: Metadata = {
  title: 'Accounting Standards (AS) — Complete Reference & Learning Portal',
  description:
    'Complete professional coverage of all 32 Accounting Standards — each with objectives, scope, provisions, journal entries, and illustrative examples.',
  alternates: { canonical: '/standards/as' },
}

interface ASStandardsDomainPageProps {
  searchParams?: Promise<{ selected?: string }>
}

export default async function ASStandardsDomainPage({ searchParams }: ASStandardsDomainPageProps) {
  return <LearningPortal defaultFramework="AS" searchParams={searchParams} />
}
