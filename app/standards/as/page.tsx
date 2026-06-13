import type { Metadata } from 'next'
import LearningPortal from '../learning/page'

export const metadata: Metadata = {
  title: 'AS Standards (ICAI) — All 32 Accounting Standards',
  description:
    'Complete coverage of all 32 Accounting Standards issued by ICAI — each with objectives, scope, provisions, journal entries, and illustrative examples.',
  alternates: { canonical: '/standards/as' },
}

export default function ASStandardsDomainPage() {
  return <LearningPortal defaultFramework="AS" />
}
