import type { Metadata } from 'next'
import { getGlossaryTerms } from '@/lib/queries'
import GlossaryPageClient from './GlossaryPageClient'

export const metadata: Metadata = {
  title: 'Accounting Glossary — Structured Definitions',
  description: 'Definitions of all major accounting terms and phrases, complete with official citations from AS and Ind AS standards.',
  alternates: { canonical: '/glossary' },
}

export default async function GlossaryPage() {
  const glossaryTerms = await getGlossaryTerms()
  return <GlossaryPageClient glossaryTerms={glossaryTerms as any} />
}
