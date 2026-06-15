'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { restoreRevision, getRevisionSnapshot } from '../../../actions'
import {
  CheckCircle2,
  FileText,
  RotateCcw,
  Eye,
  User,
  Clock,
  Loader2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Globe,
  GitBranch,
  X,
} from 'lucide-react'

interface Revision {
  id: number
  version: number
  action: string
  isPublished: boolean
  description: string | null
  userEmail: string | null
  createdAt: Date | string
}

interface VersionHistoryClientProps {
  entryId: number
  entryTitle: string
  entrySlug: string
  revisions: Revision[]
}

const ACTION_LABELS: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  PUBLISH: { label: 'Published', color: '#1A7A4A', bg: '#E8F7EE', icon: Globe },
  SAVE_DRAFT: { label: 'Saved Draft', color: '#B45309', bg: '#FEF6E4', icon: FileText },
  ROLLBACK: { label: 'Restored', color: '#6B3FA0', bg: '#F0EAF9', icon: RotateCcw },
  CREATE: { label: 'Created', color: '#2D5BE3', bg: '#EEF2FD', icon: CheckCircle2 },
  UPDATE: { label: 'Updated', color: '#0F6B5E', bg: '#E6F4F1', icon: CheckCircle2 },
}

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

function RelativeTime({ date }: { date: Date | string }) {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return <span>just now</span>
  if (mins < 60) return <span>{mins}m ago</span>
  if (hours < 24) return <span>{hours}h ago</span>
  if (days < 7) return <span>{days}d ago</span>
  return <span>{formatDate(date)}</span>
}

export default function VersionHistoryClient({
  entryId,
  entryTitle,
  entrySlug,
  revisions,
}: VersionHistoryClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [restoringId, setRestoringId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [snapshotData, setSnapshotData] = useState<Record<number, any>>({})
  const [loadingSnapshot, setLoadingSnapshot] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [compareA, setCompareA] = useState<number | null>(null)
  const [compareB, setCompareB] = useState<number | null>(null)
  const [restoreResult, setRestoreResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleRestore = (revisionId: number, version: number) => {
    if (!confirm(`Restore this entry to Version ${version}? The current content will be saved as a new revision before restoring.`)) {
      return
    }
    setRestoringId(revisionId)
    startTransition(async () => {
      try {
        const result = await restoreRevision(revisionId)
        if (result.success) {
          setRestoreResult({ success: true, message: `Successfully restored to version ${version}. Redirecting to editor...` })
          setTimeout(() => {
            router.push(`/admin/entries/${entryId}/edit`)
            router.refresh()
          }, 1500)
        } else {
          setRestoreResult({ success: false, message: (result as any).error || 'Restore failed.' })
        }
      } catch (e: any) {
        setRestoreResult({ success: false, message: e.message || 'Restore failed.' })
      } finally {
        setRestoringId(null)
      }
    })
  }

  const handleViewSnapshot = async (revisionId: number) => {
    if (expandedId === revisionId) {
      setExpandedId(null)
      return
    }
    setExpandedId(revisionId)
    if (!snapshotData[revisionId]) {
      setLoadingSnapshot(revisionId)
      try {
        const result = await getRevisionSnapshot(revisionId)
        if (result.success && result.revision) {
          setSnapshotData((prev) => ({ ...prev, [revisionId]: result.revision.snapshot }))
        }
      } finally {
        setLoadingSnapshot(null)
      }
    }
  }

  const getCompareDiff = () => {
    if (!compareA || !compareB) return null
    const snapA = snapshotData[compareA]
    const snapB = snapshotData[compareB]
    if (!snapA || !snapB) return null

    const fields = ['entryTitle', 'summary', 'status', 'verificationLevel', 'authorityPrimary']
    return fields.map((field) => ({
      field,
      a: String(snapA[field] || ''),
      b: String(snapB[field] || ''),
      changed: snapA[field] !== snapB[field],
    }))
  }

  return (
    <div className="space-y-4">
      {/* Restore result notification */}
      {restoreResult && (
        <div
          className={`flex items-start gap-2.5 p-4 rounded-lg border text-sm ${
            restoreResult.success
              ? 'bg-[#E8F7EE] text-[#1A7A4A] border-[#C5E9D4]'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {restoreResult.success ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertTriangle size={16} className="shrink-0" />}
          <div>
            <p className="font-semibold">{restoreResult.message}</p>
          </div>
          <button onClick={() => setRestoreResult(null)} className="ml-auto shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Compare toggle */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#76767E]">
          {revisions.length} revision{revisions.length !== 1 ? 's' : ''} — most recent first
        </p>
        <button
          onClick={() => { setCompareMode(!compareMode); setCompareA(null); setCompareB(null) }}
          className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            compareMode
              ? 'bg-[#2D5BE3] text-white'
              : 'border border-[#E2E1DD] text-[#4A4A52] hover:bg-[#F4F3F0]'
          }`}
        >
          <GitBranch size={12} />
          {compareMode ? 'Cancel Compare' : 'Compare Versions'}
        </button>
      </div>

      {/* Compare panel */}
      {compareMode && compareA && compareB && snapshotData[compareA] && snapshotData[compareB] && (
        <div className="bg-white border border-[#2D5BE3]/30 rounded-xl overflow-hidden">
          <div className="bg-[#EEF2FD] px-5 py-3 border-b border-[#D0DCFA]">
            <h3 className="text-sm font-semibold text-[#2D5BE3]">
              Comparing Version {revisions.find(r => r.id === compareA)?.version} vs Version {revisions.find(r => r.id === compareB)?.version}
            </h3>
          </div>
          <div className="divide-y divide-[#F4F3F0]">
            {getCompareDiff()?.map(({ field, a, b, changed }) => (
              <div key={field} className={`px-5 py-3 ${changed ? 'bg-[#FEF6E4]/40' : ''}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1.5">{field}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`text-xs p-2 rounded ${changed ? 'bg-red-50 text-red-700 line-through opacity-70' : 'text-[#4A4A52]'}`}>
                    {a || <span className="italic opacity-50">empty</span>}
                  </div>
                  <div className={`text-xs p-2 rounded ${changed ? 'bg-[#E8F7EE] text-[#1A7A4A] font-semibold' : 'text-[#4A4A52]'}`}>
                    {b || <span className="italic opacity-50">empty</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {compareMode && (!compareA || !compareB) && (
        <div className="bg-[#EEF2FD] border border-[#D0DCFA] rounded-lg px-4 py-3 text-xs text-[#2D5BE3] font-medium">
          Select two versions below to compare them. Click &ldquo;View Details&rdquo; on each version you want to compare.
        </div>
      )}

      {/* Revision list */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl overflow-hidden divide-y divide-[#F4F3F0]">
        {revisions.map((rev, idx) => {
          const meta = ACTION_LABELS[rev.action] || ACTION_LABELS.UPDATE
          const Icon = meta.icon
          const isLatest = idx === 0
          const isExpanded = expandedId === rev.id
          const isCompareSelected = compareA === rev.id || compareB === rev.id

          return (
            <div key={rev.id} className={`${isCompareSelected ? 'bg-[#EEF2FD]/30' : 'hover:bg-[#FAFAF8]'} transition-colors`}>
              {/* Main row */}
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Version badge */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs"
                  style={{ backgroundColor: meta.bg, color: meta.color }}
                >
                  v{rev.version}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: meta.bg, color: meta.color }}
                    >
                      <Icon size={9} className="inline mr-1" />
                      {meta.label}
                    </span>
                    {isLatest && (
                      <span className="text-[10px] font-bold bg-[#2D5BE3] text-white px-2 py-0.5 rounded-full">
                        CURRENT
                      </span>
                    )}
                    {rev.isPublished && (
                      <span className="text-[10px] font-semibold text-[#1A7A4A]">● Live</span>
                    )}
                  </div>
                  <p className="text-xs text-[#76767E] mt-1">
                    {rev.description || `Version ${rev.version}`}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-[#A0A0A8] flex items-center gap-1">
                      <User size={9} /> {rev.userEmail || 'Admin'}
                    </span>
                    <span className="text-[11px] text-[#A0A0A8] flex items-center gap-1">
                      <Clock size={9} />
                      <RelativeTime date={rev.createdAt} />
                      <span className="text-[#C8C7C2]">·</span>
                      <span>{formatDate(rev.createdAt)}</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Compare select */}
                  {compareMode && (
                    <button
                      onClick={async () => {
                        // Load snapshot first for comparison
                        if (!snapshotData[rev.id]) {
                          setLoadingSnapshot(rev.id)
                          try {
                            const result = await getRevisionSnapshot(rev.id)
                            if (result.success && result.revision) {
                              setSnapshotData((prev) => ({ ...prev, [rev.id]: result.revision.snapshot }))
                            }
                          } finally {
                            setLoadingSnapshot(null)
                          }
                        }
                        if (!compareA) setCompareA(rev.id)
                        else if (!compareB && rev.id !== compareA) setCompareB(rev.id)
                        else { setCompareA(rev.id); setCompareB(null) }
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        isCompareSelected
                          ? 'bg-[#2D5BE3] text-white border-[#2D5BE3]'
                          : 'border-[#E2E1DD] text-[#4A4A52] hover:bg-[#F4F3F0]'
                      }`}
                    >
                      {isCompareSelected ? 'Selected' : 'Select'}
                    </button>
                  )}

                  {/* View Details */}
                  <button
                    onClick={() => handleViewSnapshot(rev.id)}
                    className="text-xs text-[#76767E] hover:text-[#2D5BE3] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#EEF2FD] transition-all"
                  >
                    {loadingSnapshot === rev.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : isExpanded ? (
                      <ChevronDown size={12} />
                    ) : (
                      <ChevronRight size={12} />
                    )}
                    Details
                  </button>

                  {/* Restore */}
                  {!isLatest && (
                    <button
                      onClick={() => handleRestore(rev.id, rev.version)}
                      disabled={isPending || restoringId !== null}
                      className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#C8C7C2] text-[#4A4A52] hover:border-[#2D5BE3] hover:text-[#2D5BE3] hover:bg-[#EEF2FD] transition-all disabled:opacity-50"
                    >
                      {restoringId === rev.id ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <RotateCcw size={11} />
                      )}
                      Restore
                    </button>
                  )}

                  {/* View live */}
                  {rev.isPublished && (
                    <a
                      href={`/standards/${entrySlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#1A7A4A] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#E8F7EE] transition-all"
                    >
                      <Eye size={11} /> View Live
                    </a>
                  )}
                </div>
              </div>

              {/* Expanded snapshot details */}
              {isExpanded && (
                <div className="px-5 pb-4 border-t border-[#F4F3F0] bg-[#FAFAF8]">
                  {loadingSnapshot === rev.id ? (
                    <div className="py-6 text-center text-xs text-[#76767E]">
                      <Loader2 size={16} className="mx-auto animate-spin mb-2" />
                      Loading snapshot...
                    </div>
                  ) : snapshotData[rev.id] ? (
                    <div className="pt-3 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-2">Snapshot Preview</p>
                      {[
                        { label: 'Title', val: snapshotData[rev.id]?.entryTitle },
                        { label: 'Status', val: snapshotData[rev.id]?.status },
                        { label: 'Verification', val: snapshotData[rev.id]?.verificationLevel },
                        { label: 'Summary', val: snapshotData[rev.id]?.summary },
                        { label: 'Authority', val: snapshotData[rev.id]?.authorityPrimary },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex gap-3 text-xs">
                          <span className="text-[#A0A0A8] w-24 shrink-0 font-medium">{label}</span>
                          <span className="text-[#1C1C1E] font-mono">{val || <span className="italic opacity-40">—</span>}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-4 text-xs text-[#A0A0A8] text-center">Snapshot details unavailable.</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
