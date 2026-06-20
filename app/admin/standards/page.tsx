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

function getNormalizedFramework(std: {
  entrySlug: string
  entryTitle: string
  standardFramework?: string | null
  standardCode?: string | null
}) {
  const slug = (std.entrySlug || '').toLowerCase()
  const title = (std.entryTitle || '').toLowerCase()
  const code = (std.standardCode || '').toLowerCase()
  const fw = (std.standardFramework || '').toLowerCase()

  // 1. Schedule III rules
  if (
    slug.startsWith('schedule-iii-') ||
    title.includes('schedule iii') ||
    title.includes('division i') ||
    title.includes('division ii') ||
    title.includes('division iii') ||
    code.includes('sch iii') ||
    code.includes('schedule iii')
  ) {
    return 'SCHEDULE_III'
  }

  // 2. Ind AS rules
  if (
    fw === 'ind_as' ||
    slug.startsWith('ind-as-') ||
    title.includes('ind as') ||
    code.startsWith('ind-as')
  ) {
    return 'IND_AS'
  }

  // 3. AS rules
  if (
    fw === 'as' ||
    slug.startsWith('as-') ||
    title.includes('as ') ||
    title.includes('accounting standard') ||
    code.startsWith('as-')
  ) {
    return 'AS'
  }

  return 'OTHER'
}

export default async function StandardsPage() {
  await verifyAdminSession()

  const allEntries = await getAllEntries()
  
  // Sort standards first by framework, then by sortOrder, then by code number
  const standards = allEntries
    .filter((e) => e.entryType === 'STANDARD')
    .map((e) => {
      const framework = getNormalizedFramework({
        entrySlug: e.entrySlug,
        entryTitle: e.entryTitle,
        standardFramework: e.standardFramework || e.standardDetail?.standardFramework,
        standardCode: e.standardCode || e.standardDetail?.standardCode,
      })
      return {
        ...e,
        standardFramework: framework,
        standardCode: e.standardCode || e.standardDetail?.standardCode || null,
      }
    })
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

  const asCount = standards.filter((s) => s.standardFramework === 'AS').length
  const indAsCount = standards.filter((s) => s.standardFramework === 'IND_AS').length
  const scheduleIiiCount = standards.filter((s) => s.standardFramework === 'SCHEDULE_III').length
  const pdfCount = standards.filter((s) =>
    s.resources?.some((r: any) => r.resourceType === 'PDF')
  ).length

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
          { label: 'AS Standards Count', value: asCount, color: '#2D5BE3' },
          { label: 'Ind AS Standards Count', value: indAsCount, color: '#1A7A4A' },
          { label: 'Schedule III Count', value: scheduleIiiCount, color: '#6B3FA0' },
          { label: 'PDF Uploaded Count', value: pdfCount, color: '#0F6B5E' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E2E1DD] rounded-xl p-4 shadow-xs">
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
