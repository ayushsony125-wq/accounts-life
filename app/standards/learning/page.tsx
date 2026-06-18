import type { Metadata } from 'next'
import { fetchStandards, fetchStandardDetail } from '@/lib/learning-loader'
import LearningPortalClient from './LearningPortalClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Accounting Standards Learning Portal',
  description: 'Interactive learning portal for AS and Ind AS accounting standards.',
  alternates: { canonical: '/standards/learning' },
}

export default async function LearningPortal(props: any) {
  const { defaultFramework, searchParams } = props || {}
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
  const activeId = selectedId || (standards.length > 0 ? standards[0].id : '')
  
  // Try to load full details for selected standard, falling back to static index if DB yields null
  let activeDetail = await fetchStandardDetail(activeId, fw)
  if (!activeDetail) {
    activeDetail = standards.find(s => s.id === activeId) || standards[0]
  }

  return (
    <LearningPortalClient
      initialStandards={standards}
      initialSelectedStandardDetails={activeDetail}
      defaultFramework={fw}
      initialSelectedStandardId={selectedId}
    />
  )
}
