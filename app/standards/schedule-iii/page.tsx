import type { Metadata } from 'next'
import { fetchScheduleIIIData } from '@/lib/learning-loader'
import ScheduleIIIClient from './ScheduleIIIClient'

export const metadata: Metadata = {
  title: 'Schedule III Companies Act 2013 — Division I, II, & III Presentation & Disclosure Requirements',
  description:
    'Complete statutory guidance on Schedule III requirements for Division I (AS Companies), Division II (Ind AS Companies), and Division III (Ind AS NBFCs). Financial statements formats, classification rules, ratio disclosures, and templates.',
  alternates: { canonical: '/standards/schedule-iii' },
  openGraph: {
    title: 'Schedule III Companies Act 2013 — Presentation & Disclosures | Accounts.One',
    description:
      'Explore standard formats, current/non-current classification rules, OCI presentation, NBFC liquidity formats, and ratio disclosures required under Schedule III.',
  },
}

export default async function ScheduleIIIPage() {
  const data = await fetchScheduleIIIData()
  return <ScheduleIIIClient />
}
