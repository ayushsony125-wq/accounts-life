import type { Metadata } from 'next'
import { fetchStandards } from '@/lib/learning-loader'
import LearningPortalClient from './LearningPortalClient'

export const metadata: Metadata = {
  title: 'Accounting Standards Learning Portal',
  description: 'Interactive learning portal for AS and Ind AS accounting standards.',
  alternates: { canonical: '/standards/learning' },
}

interface LearningPortalProps {
  defaultFramework?: 'AS' | 'Ind AS'
  searchParams?: Promise<{ framework?: string; selected?: string }>
}

export default async function LearningPortal({ defaultFramework, searchParams }: LearningPortalProps) {
  // Determine framework
  let fw: 'AS' | 'Ind AS' = defaultFramework || 'AS'
  let selectedId: string | undefined = undefined
  if (searchParams) {
    const params = await searchParams
    if (params?.framework) {
      const lower = params.framework.toLowerCase()
      if (lower === 'ind-as' || lower === 'ind_as' || lower === 'ind as') {
        fw = 'Ind AS'
      } else if (lower === 'as') {
        fw = 'AS'
      }
    }
    if (params?.selected) {
      selectedId = params.selected
    }
  }

  const standards = await fetchStandards(fw)

  return (
    <LearningPortalClient
      initialStandards={standards}
      defaultFramework={fw}
      initialSelectedStandardId={selectedId}
    />
  )
}
