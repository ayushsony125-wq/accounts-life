import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { getHomepageConfig } from '@/app/admin/actions'

export const dynamic = 'force-dynamic'

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Accounts.One — The Operating System for Professional Excellence',
  description:
    'Trusted explanations. Exact legal support. Official sources. Practical notes. Curated videos. Everything a professional needs — CA, CMA, CS, and finance.',
  alternates: { canonical: '/' },
}

// ─── Page (Server Component → renders Client Component) ───────────────────────

export default async function HomePage() {
  const config = await getHomepageConfig('homepage_layout_config', null)
  return <HomePageClient initialConfig={config} />
}
