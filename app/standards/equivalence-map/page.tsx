import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Standards Equivalence Map | Accounts.Life',
  description: 'Map corresponding ICAI Accounting Standards (AS) to Indian Accounting Standards (Ind AS) equivalents.',
}

export default async function EquivalenceMapPage() {
  // Query standard equivalents from DB
  const equivalents = await (async () => {
    try {
      return await prisma.standardEquivalent.findMany({
        include: {
          standardEntry: {
            include: { standardDetail: true }
          },
          equivalentEntry: {
            include: { standardDetail: true }
          }
        }
      })
    } catch (e) {
      console.warn('Prisma standardEquivalent.findMany failed, using fallback.', e)
      return []
    }
  })()

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standards', href: '/standards/as' },
          { label: 'Equivalence Map' },
        ]}
        className="mb-6"
      />
      <main className="min-w-0">
        <header className="mb-10 pb-8 border-b border-[#E2E1DD]">
          <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight leading-tight">
            AS vs Ind AS Equivalence Map
          </h1>
          <p className="mt-3 text-base text-[#4A4A52] font-reading leading-relaxed max-w-2xl">
            Quick reference index mapping traditional ICAI Accounting Standards (AS) to their modern IFRS-converged Indian Accounting Standards (Ind AS) counterparts.
          </p>
        </header>

        <div className="overflow-x-auto rounded-lg border border-[#E2E1DD]">
          <table className="w-full text-sm" aria-label="AS to Ind AS equivalence mapping">
            <thead>
              <tr className="border-b border-[#E2E1DD] bg-[#F4F3F0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A52] uppercase tracking-wider w-1/2">
                  Accounting Standard (AS)
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A52] uppercase tracking-wider w-1/2">
                  Indian Accounting Standard (Ind AS) Equivalent
                </th>
              </tr>
            </thead>
            <tbody>
              {equivalents.length === 0 ? (
                // Fallback static maps for demo
                <>
                  <tr className="border-b border-[#E2E1DD] bg-white">
                    <td className="px-4 py-3">
                      <Link href="/standards/as/as-1" className="font-semibold text-[#0F6B5E] hover:underline">
                        AS 1 — Disclosure of Accounting Policies
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href="/standards/ind-as/ind-as-1" className="font-semibold text-[#6B3FA0] hover:underline">
                        Ind AS 1 — Presentation of Financial Statements
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E2E1DD] bg-white">
                    <td className="px-4 py-3">
                      <span className="text-[#76767E]">AS 2 — Valuation of Inventories</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#76767E]">Ind AS 2 — Inventories</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E2E1DD] bg-white">
                    <td className="px-4 py-3">
                      <span className="text-[#76767E]">AS 3 — Cash Flow Statements</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#76767E]">Ind AS 7 — Statement of Cash Flows</span>
                    </td>
                  </tr>
                </>
              ) : (
                equivalents.map((eq) => (
                  <tr key={eq.id} className="border-b border-[#E2E1DD] bg-white">
                    <td className="px-4 py-3">
                      <Link
                        href={`/standards/as/${eq.standardEntry.entrySlug}`}
                        className="font-semibold text-[#0F6B5E] hover:underline"
                      >
                        {eq.standardEntry.standardDetail?.standardCode} — {eq.standardEntry.entryTitle}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/standards/ind-as/${eq.equivalentEntry.entrySlug}`}
                        className="font-semibold text-[#6B3FA0] hover:underline"
                      >
                        {eq.equivalentEntry.standardDetail?.standardCode} — {eq.equivalentEntry.entryTitle}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
