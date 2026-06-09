import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Accounts.One — The Operating System for Professional Excellence',
  description:
    'Trusted explanations. Exact legal support. Official sources. Practical notes. Curated videos. Everything a professional needs — CA, CMA, CS, and finance.',
  alternates: { canonical: '/' },
}

// ─── Page (Server Component → renders Client Component) ───────────────────────

export default function HomePage() {
  return <HomePageClient />
}
