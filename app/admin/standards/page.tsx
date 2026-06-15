import Link from 'next/link'
import { verifyAdminSession } from '../session'
import { getAllEntries } from '@/lib/queries'
import {
  BookMarked,
  PlusCircle,
  ArrowRight,
} from 'lucide-react'
import StandardsManagerClient from './StandardsManagerClient'

export const dynamic = 'force-dynamic'

export default async function StandardsPage() {
  await verifyAdminSession()

  const allEntries = await getAllEntries()
  
  // Sort standards first by framework, then by sortOrder, then by code number
  const standards = allEntries
    .filter((e) => e.entryType === 'STANDARD')
    .sort((a, b) => {
      const fwA = a.standardFramework || ''
      const fwB = b.standardFramework || ''
      if (fwA !== fwB) {
        return fwA.localeCompare(fwB)
      }
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder
      }
      const getNum = (e: any) => {
        const code = e.standardCode || e.entrySlug || ''
        const match = code.match(/\d+/)
        return match ? parseInt(match[0]) : 9999
      }
      return getNum(a) - getNum(b)
    })

  const published = standards.filter((s) => s.status === 'PUBLISHED').length
  const withPdf = standards.filter((s) =>
    s.resources?.some((r: any) => r.resourceType === 'PDF')
  ).length
  const verified = standards.filter((s) => s.verificationLevel === 'VERIFIED').length

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] flex items-center gap-2">
            <BookMarked size={22} className="text-[#2D5BE3]" />
            Standards Manager
          </h1>
          <p className="text-sm text-[#76767E] mt-1">
            Manage Accounting Standards (AS), Ind AS, SA, and IFRS entries.
          </p>
        </div>
        <Link
          href="/admin/entries/new"
          className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <PlusCircle size={15} />
          New Standard
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Standards', value: standards.length, color: '#2D5BE3' },
          { label: 'Published', value: published, color: '#1A7A4A' },
          { label: 'Verified', value: verified, color: '#6B3FA0' },
          { label: 'With PDF', value: withPdf, color: '#0F6B5E' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E2E1DD] rounded-xl p-4">
            <p className="text-xs text-[#76767E] font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Standards list with client-side ordering capabilities */}
      {standards.length === 0 ? (
        <div className="bg-white border border-[#E2E1DD] rounded-xl p-16 text-center">
          <BookMarked size={36} className="mx-auto mb-3 text-[#C8C7C2]" />
          <p className="text-sm font-medium text-[#76767E]">No standards found</p>
          <p className="text-xs text-[#A0A0A8] mt-1 mb-4">
            Create your first standard entry to get started.
          </p>
          <Link
            href="/admin/entries/new"
            className="inline-flex items-center gap-1.5 bg-[#2D5BE3] text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <PlusCircle size={14} /> Create Standard
          </Link>
        </div>
      ) : (
        <StandardsManagerClient initialStandards={standards} />
      )}

      {/* Upload PDFs CTA */}
      <div className="bg-[#EEF2FD] border border-[#D0DCFA] rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#2D5BE3]">Upload Official PDFs</p>
          <p className="text-xs text-[#5B7BE3] mt-1">
            Attach official ICAI PDF documents to each standard for viewer access.
          </p>
        </div>
        <Link
          href="/admin/media"
          className="flex items-center gap-1.5 bg-[#2D5BE3] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2450CC] transition-colors"
        >
          Manage PDFs <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
