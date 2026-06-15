import { verifyAdminSession } from '../../../session'
import { getEntryRevisions } from '../../../actions'
import prisma from '@/lib/db'
import Link from 'next/link'
import {
  Clock,
  ArrowLeft,
  GitBranch,
  CheckCircle2,
  FileText,
  Eye,
  RotateCcw,
  User,
} from 'lucide-react'
import VersionHistoryClient from './VersionHistoryClient'

export const dynamic = 'force-dynamic'

function formatDate(date: Date | string) {
  return new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export default async function VersionHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await verifyAdminSession()
  const { id } = await params

  const entryId = parseInt(id)
  if (isNaN(entryId)) {
    return <div className="p-8 text-red-500">Invalid entry ID</div>
  }

  // Load entry + revisions in parallel
  const [entry, revisionsResult] = await Promise.all([
    prisma.entry.findUnique({
      where: { id: entryId },
      select: {
        id: true,
        entryTitle: true,
        entrySlug: true,
        entryType: true,
        status: true,
        updatedAt: true,
      },
    }),
    getEntryRevisions(entryId),
  ])

  if (!entry) {
    return (
      <div className="p-8 text-red-500">
        Entry #{entryId} not found.{' '}
        <Link href="/admin/entries" className="underline">
          Back to entries
        </Link>
      </div>
    )
  }

  const revisions = revisionsResult.revisions || []

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <Link
          href={`/admin/entries/${entryId}/edit`}
          className="flex items-center gap-1.5 text-xs text-[#76767E] hover:text-[#1C1C1E] mb-4 transition-colors font-medium"
        >
          <ArrowLeft size={13} />
          Back to Editor
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1C1C1E] flex items-center gap-2">
              <GitBranch size={22} className="text-[#2D5BE3]" />
              Version History
            </h1>
            <p className="text-sm text-[#76767E] mt-1">
              <span className="font-semibold text-[#1C1C1E]">{entry.entryTitle}</span>
              {' '}&mdash; {revisions.length} revision{revisions.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                entry.status === 'PUBLISHED'
                  ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                  : 'bg-[#FEF6E4] text-[#B45309]'
              }`}
            >
              ● {entry.status}
            </span>
          </div>
        </div>
      </div>

      {/* Revision timeline */}
      {revisions.length === 0 ? (
        <div className="bg-white border border-[#E2E1DD] rounded-xl p-16 text-center">
          <GitBranch size={36} className="mx-auto mb-3 text-[#C8C7C2]" />
          <p className="text-sm font-medium text-[#76767E]">No versions recorded yet</p>
          <p className="text-xs text-[#A0A0A8] mt-1">
            Save or publish the entry to create your first revision snapshot.
          </p>
          <Link
            href={`/admin/entries/${entryId}/edit`}
            className="mt-4 inline-flex items-center gap-1.5 bg-[#2D5BE3] text-white text-xs font-semibold px-4 py-2 rounded-lg"
          >
            Go to Editor
          </Link>
        </div>
      ) : (
        <VersionHistoryClient
          entryId={entryId}
          entryTitle={entry.entryTitle}
          entrySlug={entry.entrySlug}
          revisions={revisions}
        />
      )}

      {/* Explanation panel */}
      <div className="bg-[#EEF2FD] border border-[#D0DCFA] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#2D5BE3] mb-2 flex items-center gap-1.5">
          <Clock size={13} /> How Version History Works
        </h2>
        <ul className="text-xs text-[#4A5BE3] space-y-1.5">
          <li>• Every <strong>Save Draft</strong> or <strong>Publish</strong> creates a new revision snapshot.</li>
          <li>• <strong>Restore</strong> replaces the current content with that version&apos;s complete snapshot.</li>
          <li>• <strong>Compare</strong> shows what changed between any two versions.</li>
          <li>• Revisions are stored permanently — unlimited history, even after months.</li>
        </ul>
      </div>
    </div>
  )
}
