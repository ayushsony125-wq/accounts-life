import type { Metadata } from 'next'
import LearningPortal from '../learning/page'

export const metadata: Metadata = {
  title: 'Indian Accounting Standards (Ind AS) — IFRS-Converged Reference & Learning',
  description:
    'Indian Accounting Standards (Ind AS) converged with IFRS — applicable to listed companies and large entities. Recognition, measurement, presentation, and disclosure requirements.',
  alternates: { canonical: '/standards/ind-as' },
}

interface IndASPageProps {
  searchParams?: Promise<{ selected?: string }>
}

export default async function IndASPage({ searchParams }: IndASPageProps) {
  return <LearningPortal defaultFramework="Ind AS" searchParams={searchParams} />
}
