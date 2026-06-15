'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateEntriesOrder } from '../actions'
import {
  BookMarked,
  PlusCircle,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  RefreshCw,
} from 'lucide-react'

interface StandardEntry {
  id: number
  entryTitle: string
  entrySlug: string
  entryType: string
  status: string
  verificationLevel: string
  sortOrder: number
  standardCode?: string
  standardFramework?: string
  resources?: any[]
}

interface StandardsManagerClientProps {
  initialStandards: StandardEntry[]
}

const FRAMEWORK_COLORS: Record<string, { color: string; bg: string }> = {
  AS: { color: '#2D5BE3', bg: '#EEF2FD' },
  IND_AS: { color: '#1A7A4A', bg: '#E8F7EE' },
  SA: { color: '#6B3FA0', bg: '#F0EAF9' },
  IFRS: { color: '#0F6B5E', bg: '#E6F4F1' },
  OTHER: { color: '#5B6678', bg: '#F4F3F0' },
}

export default function StandardsManagerClient({ initialStandards }: StandardsManagerClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [standards, setStandards] = useState<StandardEntry[]>(initialStandards)
  const [hasChanges, setHasChanges] = useState(false)

  // Move item up or down in the array
  const moveItem = (id: number, direction: 'up' | 'down') => {
    const index = standards.findIndex((s) => s.id === id)
    if (index === -1) return

    const framework = standards[index].standardFramework
    // Find matching items in the same framework group
    const fwItems = standards.filter((s) => s.standardFramework === framework)
    const fwIndex = fwItems.findIndex((s) => s.id === id)

    const targetFwIndex = direction === 'up' ? fwIndex - 1 : fwIndex + 1
    if (targetFwIndex < 0 || targetFwIndex >= fwItems.length) return

    // Find the actual global index of the target item
    const targetItem = fwItems[targetFwIndex]
    const targetGlobalIndex = standards.findIndex((s) => s.id === targetItem.id)

    // Swap items in the global standards array
    const updated = [...standards]
    const temp = updated[index]
    updated[index] = updated[targetGlobalIndex]
    updated[targetGlobalIndex] = temp

    // Re-assign sortOrder values based on their new positions
    const finalSorted = updated.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1,
    }))

    setStandards(finalSorted)
    setHasChanges(true)
  }

  // Handle manual sortOrder number input changes
  const handleSortOrderChange = (id: number, val: string) => {
    const parsed = parseInt(val)
    if (isNaN(parsed)) return

    const updated = standards.map((s) => {
      if (s.id === id) {
        return { ...s, sortOrder: parsed }
      }
      return s
    })

    setStandards(updated)
    setHasChanges(true)
  }

  // Save the new sort order mapping to the database
  const handleSaveOrder = () => {
    startTransition(async () => {
      try {
        const mapping = standards.map((s) => ({
          id: s.id,
          sortOrder: s.sortOrder,
        }))
        const res = await updateEntriesOrder(mapping)
        if (res.success) {
          alert('Sort order updated successfully.')
          setHasChanges(false)
          router.refresh()
        } else {
          alert('Failed to save sort order: ' + (res.error || 'Unknown error'))
        }
      } catch (err: any) {
        alert('Error saving sort order: ' + (err.message || String(err)))
      }
    })
  }

  // Re-sort standards in client view based on current sortOrder values
  const handleReset = () => {
    setStandards(initialStandards)
    setHasChanges(false)
  }

  // Group by framework
  const asStandards = standards.filter((s) => s.standardFramework === 'AS')
  const indAsStandards = standards.filter((s) => s.standardFramework === 'IND_AS')
  const saStandards = standards.filter((s) => s.standardFramework === 'SA')
  const otherStandards = standards.filter(
    (s) => !['AS', 'IND_AS', 'SA'].includes(s.standardFramework || '')
  )

  const groups = [
    { label: 'Accounting Standards (AS)', items: asStandards, framework: 'AS' },
    { label: 'Indian AS (Ind AS)', items: indAsStandards, framework: 'IND_AS' },
    { label: 'Standards on Auditing (SA)', items: saStandards, framework: 'SA' },
    { label: 'Other Standards', items: otherStandards, framework: 'OTHER' },
  ].filter((g) => g.items.length > 0)

  return (
    <div className="space-y-8">
      {/* Floating ActionBar if changes occur */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#E2E1DD] shadow-lg rounded-xl p-4 flex items-center gap-3 animate-fade-in">
          <p className="text-xs text-[#76767E] font-medium">
            You have unsaved sorting changes
          </p>
          <button
            onClick={handleSaveOrder}
            disabled={isPending}
            className="flex items-center gap-1.5 bg-[#1A7A4A] hover:bg-[#15613B] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Save size={12} />
            )}
            Save Order
          </button>
          <button
            onClick={handleReset}
            disabled={isPending}
            className="flex items-center gap-1.5 border border-[#E2E1DD] hover:bg-[#F4F3F0] text-[#4A4A52] px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
          >
            <RefreshCw size={12} />
            Discard
          </button>
        </div>
      )}

      {/* Standards grouped by framework */}
      {groups.map((group) => {
        const fw = FRAMEWORK_COLORS[group.framework] || FRAMEWORK_COLORS.OTHER
        return (
          <div key={group.label} className="bg-white border border-[#E2E1DD] rounded-xl overflow-hidden shadow-xs">
            {/* Group header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b border-[#E2E1DD]"
              style={{ backgroundColor: fw.bg + '25' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: fw.bg, color: fw.color }}
                >
                  {group.framework}
                </span>
                <h2 className="text-sm font-semibold text-[#1C1C1E]">{group.label}</h2>
                <span className="text-xs text-[#76767E]">({group.items.length})</span>
              </div>
            </div>

            {/* Standards table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F4F3F0] bg-[#FAFAF8] text-[#76767E]">
                    <th className="px-5 py-3 font-semibold w-16 text-center">Order</th>
                    <th className="px-5 py-3 font-semibold">Move</th>
                    <th className="px-5 py-3 font-semibold">Code</th>
                    <th className="px-5 py-3 font-semibold">Title</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Verification</th>
                    <th className="px-5 py-3 font-semibold">PDF</th>
                    <th className="px-5 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F3F0]">
                  {group.items.map((std, idx) => {
                    const hasPdf = std.resources?.some((r: any) => r.resourceType === 'PDF')
                    const isFirst = idx === 0
                    const isLast = idx === group.items.length - 1

                    return (
                      <tr key={std.id} className="hover:bg-[#FAFAF8] transition-colors group">
                        {/* Sort Order Input */}
                        <td className="px-5 py-3.5">
                          <input
                            type="number"
                            value={std.sortOrder}
                            onChange={(e) => handleSortOrderChange(std.id, e.target.value)}
                            className="w-12 text-center py-1 border border-[#E2E1DD] rounded focus:outline-none focus:border-[#2D5BE3] font-bold text-xs bg-[#F4F3F0] focus:bg-white text-[#1C1C1E]"
                          />
                        </td>
                        {/* Up/Down Arrow shift controls */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveItem(std.id, 'up')}
                              disabled={isFirst}
                              title="Move up"
                              className="p-1 hover:bg-[#EEF2FD] rounded disabled:opacity-20 text-[#76767E] hover:text-[#2D5BE3] transition-colors"
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              onClick={() => moveItem(std.id, 'down')}
                              disabled={isLast}
                              title="Move down"
                              className="p-1 hover:bg-[#EEF2FD] rounded disabled:opacity-20 text-[#76767E] hover:text-[#2D5BE3] transition-colors"
                            >
                              <ArrowDown size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="font-mono font-bold text-[11px] px-2 py-0.5 rounded"
                            style={{ backgroundColor: fw.bg, color: fw.color }}
                          >
                            {std.standardCode || std.entrySlug?.toUpperCase().replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-[#1C1C1E] max-w-xs truncate">
                            {std.entryTitle}
                          </p>
                          <p className="text-[10px] text-[#A0A0A8] font-mono mt-0.5">
                            /{std.entrySlug}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              std.status === 'PUBLISHED'
                                ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                                : 'bg-[#F4F3F0] text-[#76767E]'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                std.status === 'PUBLISHED' ? 'bg-[#1A7A4A]' : 'bg-[#C8C7C2]'
                              }`}
                            />
                            {std.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              std.verificationLevel === 'VERIFIED'
                                ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                                : std.verificationLevel === 'DRAFT'
                                ? 'bg-[#FEF6E4] text-[#B45309]'
                                : 'bg-[#F4F3F0] text-[#76767E]'
                            }`}
                          >
                            {std.verificationLevel === 'VERIFIED' ? (
                              <CheckCircle2 size={8} />
                            ) : (
                              <AlertCircle size={8} />
                            )}
                            {std.verificationLevel}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          {hasPdf ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1A7A4A] bg-[#E8F7EE] px-2 py-0.5 rounded-full">
                              PDF
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#A0A0A8]">No PDF</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                              href={`/standards/${std.standardFramework === 'IND_AS' ? 'ind-as' : 'as'}?selected=${std.entrySlug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-[#76767E] hover:text-[#2D5BE3] hover:bg-[#EEF2FD] rounded transition-all"
                              title="View live page"
                            >
                              <Eye size={13} />
                            </a>
                            <Link
                              href={`/admin/entries/${std.id}/edit`}
                              className="p-1 text-[#76767E] hover:text-[#2D5BE3] hover:bg-[#EEF2FD] rounded transition-all"
                              title="Edit standard content"
                            >
                              <Edit size={13} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
