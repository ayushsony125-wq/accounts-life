'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  updateEntriesOrder,
  saveVideoResourceAction,
  deleteStandardResourceByType,
  uploadPdfAction
} from '../actions'

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
  Search,
  Layers,
  FileText,
  File,
  Table,
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

export default function StandardsManagerClient({ initialStandards }: StandardsManagerClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [standards, setStandards] = useState<StandardEntry[]>(initialStandards)
  const [hasChanges, setHasChanges] = useState(false)

  // Filters State
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'as' | 'ind-as' | 'schedule-iii'>('all')

  // Inline action states
  const [uploadingEntryId, setUploadingEntryId] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Video Modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [videoModalEntryId, setVideoModalEntryId] = useState<number | null>(null)
  const [videoTitle, setVideoTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoChannel, setVideoChannel] = useState('')
  const [isVideoSaving, setIsVideoSaving] = useState(false)

  const handleRemoveResource = async (entryId: number, resourceType: 'PDF' | 'VIDEO') => {
    if (!confirm(`Are you sure you want to remove the ${resourceType === 'PDF' ? 'PDF document' : 'video lecture'} for this standard?`)) return
    try {
      const res = await deleteStandardResourceByType(entryId, resourceType)
      if (res.success) {
        setStandards(prev => prev.map(s => {
          if (s.id === entryId) {
            return {
              ...s,
              resources: (s.resources || []).filter(r => r.resourceType !== resourceType)
            }
          }
          return s
        }))
        alert(`${resourceType === 'PDF' ? 'PDF document' : 'Video lecture'} removed successfully.`)
        router.refresh()
      } else {
        alert(`Failed to remove resource: ${res.error}`)
      }
    } catch (err: any) {
      alert(`Error removing resource: ${err.message}`)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !uploadingEntryId) return

    const entry = standards.find(s => s.id === uploadingEntryId)
    if (!entry) return

    const formData = new FormData()
    formData.append('pdfFile', file)
    formData.append('entrySlug', entry.entrySlug)

    setIsUploading(true)
    try {
      const res = await uploadPdfAction(formData)
      if (res.success) {
        setStandards(prev => prev.map(s => {
          if (s.id === uploadingEntryId) {
            const cleanResources = (s.resources || []).filter(r => r.resourceType !== 'PDF')
            return {
              ...s,
              resources: [
                ...cleanResources,
                {
                  resourceType: 'PDF',
                  resourceTitle: `Official ${s.entryTitle} PDF`,
                  resourceUrl: `/api/pdfs/${s.entrySlug}`
                }
              ]
            }
          }
          return s
        }))
        alert('PDF uploaded successfully.')
        router.refresh()
      } else {
        alert(`Upload failed: ${res.error}`)
      }
    } catch (err: any) {
      alert(`Upload error: ${err.message}`)
    } finally {
      setIsUploading(false)
      setUploadingEntryId(null)
      e.target.value = ''
    }
  }

  const handleOpenVideoModal = (std: StandardEntry) => {
    const existingVideo = std.resources?.find((r: any) => r.resourceType === 'VIDEO')
    setVideoModalEntryId(std.id)
    setVideoTitle(existingVideo?.resourceTitle || `Lecture Video for ${std.entryTitle}`)
    setVideoUrl(existingVideo?.resourceUrl || '')
    setVideoChannel(existingVideo?.videoChannel || 'Accounts.One Faculty')
    setVideoModalOpen(true)
  }

  const handleSaveVideo = async () => {
    if (!videoModalEntryId) return
    if (!videoTitle.trim() || !videoUrl.trim()) {
      alert('Please provide both video title and URL.')
      return
    }

    setIsVideoSaving(true)
    try {
      const res = await saveVideoResourceAction(videoModalEntryId, {
        resourceTitle: videoTitle.trim(),
        resourceUrl: videoUrl.trim(),
        videoChannel: videoChannel.trim()
      })

      if (res.success) {
        setStandards(prev => prev.map(s => {
          if (s.id === videoModalEntryId) {
            const cleanResources = (s.resources || []).filter(r => r.resourceType !== 'VIDEO')
            return {
              ...s,
              resources: [
                ...cleanResources,
                {
                  resourceType: 'VIDEO',
                  resourceTitle: videoTitle.trim(),
                  resourceUrl: videoUrl.trim(),
                  videoChannel: videoChannel.trim()
                }
              ]
            }
          }
          return s
        }))
        alert('Video attached successfully.')
        setVideoModalOpen(false)
        router.refresh()
      } else {
        alert(`Failed to save video: ${res.error}`)
      }
    } catch (err: any) {
      alert(`Error saving video: ${err.message}`)
    } finally {
      setIsVideoSaving(false)
    }
  }


  const isScheduleIii = (std: StandardEntry) => std.standardFramework === 'SCHEDULE_III' || std.entrySlug.startsWith('schedule-iii-')
  const isAs = (std: StandardEntry) => std.standardFramework === 'AS'
  const isIndAs = (std: StandardEntry) => std.standardFramework === 'IND_AS'

  const getCategory = (std: StandardEntry) => {
    if (isScheduleIii(std)) return 'Schedule III'
    if (isAs(std)) return 'AS'
    if (isIndAs(std)) return 'Ind AS'
    return std.standardFramework || 'Other'
  }

  // Filter visible standards dynamically
  const visibleStandards = standards.filter((std) => {
    // 1. Tab filter
    if (activeTab === 'as' && !isAs(std)) return false
    if (activeTab === 'ind-as' && !isIndAs(std)) return false
    if (activeTab === 'schedule-iii' && !isScheduleIii(std)) return false

    // 2. Search filter
    if (!search.trim()) return true
    const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, '')
    const cleanQ = normalize(search)
    const cleanCode = normalize(std.standardCode || '')
    const cleanSlug = normalize(std.entrySlug || '')
    const cleanTitle = normalize(std.entryTitle || '')
    const cleanCategory = normalize(getCategory(std))

    return cleanCode.includes(cleanQ) || cleanSlug.includes(cleanQ) || cleanTitle.includes(cleanQ) || cleanCategory.includes(cleanQ)
  })

  // Move item up or down relative to the currently visible list
  const moveItem = (id: number, direction: 'up' | 'down') => {
    const visibleIndex = visibleStandards.findIndex((s) => s.id === id)
    if (visibleIndex === -1) return

    const targetVisibleIndex = direction === 'up' ? visibleIndex - 1 : visibleIndex + 1
    if (targetVisibleIndex < 0 || targetVisibleIndex >= visibleStandards.length) return

    const targetItem = visibleStandards[targetVisibleIndex]

    // Swap position in the global standards array
    const idxA = standards.findIndex((s) => s.id === id)
    const idxB = standards.findIndex((s) => s.id === targetItem.id)
    if (idxA === -1 || idxB === -1) return

    const updated = [...standards]
    const temp = updated[idxA]
    updated[idxA] = updated[idxB]
    updated[idxB] = temp

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

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: 'All Standards', icon: <Layers size={13} />, count: standards.length },
    { id: 'as', label: 'AS', icon: <FileText size={13} />, count: standards.filter(isAs).length },
    { id: 'ind-as', label: 'Ind AS', icon: <File size={13} />, count: standards.filter(isIndAs).length },
    { id: 'schedule-iii', label: 'Schedule III', icon: <Table size={13} />, count: standards.filter(isScheduleIii).length },
  ]

  return (
    <div className="space-y-6">
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

      {/* Filter and Search controls */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Box */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code, title, or category..."
            className="w-full pl-9 pr-8 py-2 border border-[#E2E1DD] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3] transition-all text-[#1C1C1E]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-sm leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* Tab Controls */}
        <div className="flex border border-[#E2E1DD] rounded-lg bg-[#F4F3F0] p-1 flex-wrap gap-1 w-full md:w-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex-1 md:flex-none justify-center ${
                activeTab === t.id
                  ? 'bg-white text-[#2D5BE3] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {t.icon}
              {t.label}
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === t.id ? 'bg-[#2D5BE3]/10 text-[#2D5BE3]' : 'bg-[#E2E1DD] text-slate-500'
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Standards List Table */}
      {visibleStandards.length === 0 ? (
        <div className="bg-white border border-[#E2E1DD] rounded-xl p-16 text-center shadow-xs">
          <BookMarked size={36} className="mx-auto mb-3 text-[#C8C7C2]" />
          <p className="text-sm font-medium text-[#76767E]">No matching standards found</p>
          <p className="text-xs text-[#A0A0A8] mt-1">
            Try adjusting your search query or switching tabs.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#E2E1DD] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E1DD] bg-[#FAFAF8] text-[#76767E]">
                  <th className="px-5 py-3 font-semibold">Code</th>
                  <th className="px-5 py-3 font-semibold">Standard Name</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">PDF Status</th>
                  <th className="px-5 py-3 font-semibold">Video Status</th>
                  <th className="px-5 py-3 font-semibold">Publish Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F3F0]">
                {visibleStandards.map((std, idx) => {
                  const hasPdf = std.resources?.some((r: any) => r.resourceType === 'PDF')
                  const hasVideo = std.resources?.some((r: any) => r.resourceType === 'VIDEO')
                  const isFirst = idx === 0
                  const isLast = idx === visibleStandards.length - 1

                  // Visual distinction styles based on category
                  let borderLeftStyle = ''
                  let codeBadgeClass = ''
                  let categoryBadgeClass = ''

                  if (isScheduleIii(std)) {
                    borderLeftStyle = 'border-l-4 border-l-purple-500'
                    codeBadgeClass = 'bg-purple-50 text-purple-700 border border-purple-200'
                    categoryBadgeClass = 'bg-purple-50 text-purple-700 border-purple-200'
                  } else if (isAs(std)) {
                    borderLeftStyle = 'border-l-4 border-l-blue-500'
                    codeBadgeClass = 'bg-blue-50 text-blue-700 border border-blue-200'
                    categoryBadgeClass = 'bg-blue-50 text-blue-700 border-blue-200'
                  } else if (isIndAs(std)) {
                    borderLeftStyle = 'border-l-4 border-l-emerald-500'
                    codeBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    categoryBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  } else {
                    borderLeftStyle = 'border-l-4 border-l-slate-400'
                    codeBadgeClass = 'bg-slate-50 text-slate-700 border border-slate-200'
                    categoryBadgeClass = 'bg-slate-50 text-slate-700 border-slate-200'
                  }

                  return (
                    <tr
                      key={std.id}
                      className={`hover:bg-[#FAFAF8] transition-colors group ${borderLeftStyle}`}
                    >
                      {/* Code */}
                      <td className="px-5 py-3.5 font-medium">
                        <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded whitespace-nowrap ${codeBadgeClass}`}>
                          {std.standardCode || std.entrySlug?.toUpperCase().replace('-', ' ')}
                        </span>
                      </td>

                      {/* Standard Name */}
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-[#1C1C1E]">{std.entryTitle}</div>
                        <div className="text-[10px] text-[#A0A0A8] font-mono mt-0.5">/{std.entrySlug}</div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${categoryBadgeClass}`}>
                          {getCategory(std)}
                        </span>
                      </td>

                      {/* PDF Status */}
                      <td className="px-5 py-3.5">
                        {hasPdf ? (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              <CheckCircle2 size={10} className="text-emerald-600 shrink-0" /> PDF Uploaded
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                              <a
                                href={`/api/pdfs/${std.entrySlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2D5BE3] hover:underline font-bold"
                              >
                                Preview
                              </a>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => {
                                  setUploadingEntryId(std.id)
                                  setTimeout(() => document.getElementById('inline-pdf-upload')?.click(), 50)
                                }}
                                className="text-[#76767E] hover:underline font-normal"
                              >
                                Replace
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => handleRemoveResource(std.id, 'PDF')}
                                className="text-rose-600 hover:underline font-normal"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                              <AlertCircle size={10} className="text-rose-500 shrink-0" /> No PDF
                            </span>
                            <button
                              onClick={() => {
                                setUploadingEntryId(std.id)
                                setTimeout(() => document.getElementById('inline-pdf-upload')?.click(), 50)
                              }}
                              className="text-[10px] text-[#2D5BE3] hover:underline font-bold"
                            >
                              Upload PDF
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Video Status */}
                      <td className="px-5 py-3.5">
                        {hasVideo ? (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                              <CheckCircle2 size={10} className="text-blue-600 shrink-0" /> Video Added
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                              <a
                                href={`/api/videos/${std.entrySlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2D5BE3] hover:underline font-bold"
                              >
                                Preview
                              </a>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => handleOpenVideoModal(std)}
                                className="text-[#76767E] hover:underline font-normal"
                              >
                                Replace
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => handleRemoveResource(std.id, 'VIDEO')}
                                className="text-rose-600 hover:underline font-normal"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                              <AlertCircle size={10} className="text-amber-500 shrink-0" /> No Video
                            </span>
                            <button
                              onClick={() => handleOpenVideoModal(std)}
                              className="text-[10px] text-[#2D5BE3] hover:underline font-bold"
                            >
                              Add Video
                            </button>
                          </div>
                        )}
                      </td>


                      {/* Publish Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            std.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              std.status === 'PUBLISHED' ? 'bg-emerald-600' : 'bg-slate-400'
                            }`}
                          />
                          {std.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Move up / down arrows */}
                          <div className="flex items-center gap-0.5 border border-[#E2E1DD] rounded bg-[#F4F3F0] p-0.5 shrink-0">
                            <button
                              onClick={() => moveItem(std.id, 'up')}
                              disabled={isFirst}
                              className="p-1 hover:bg-white rounded disabled:opacity-25 text-slate-500 hover:text-[#2D5BE3] transition-colors"
                              title="Move up"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              onClick={() => moveItem(std.id, 'down')}
                              disabled={isLast}
                              className="p-1 hover:bg-white rounded disabled:opacity-25 text-slate-500 hover:text-[#2D5BE3] transition-colors"
                              title="Move down"
                            >
                              <ArrowDown size={11} />
                            </button>
                          </div>

                          {/* Sort order manual input */}
                          <input
                            type="number"
                            value={std.sortOrder}
                            onChange={(e) => handleSortOrderChange(std.id, e.target.value)}
                            className="w-10 text-center py-1 border border-[#E2E1DD] rounded focus:outline-none focus:border-[#2D5BE3] font-bold text-xs bg-white text-[#1C1C1E] shrink-0"
                            title="Sort order"
                          />

                          {/* View Page */}
                          <a
                            href={
                              std.entrySlug.startsWith('schedule-iii-')
                                ? `/standards/schedule-iii`
                                : `/standards/${std.standardFramework === 'IND_AS' ? 'ind-as' : 'as'}?selected=${std.entrySlug}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#76767E] hover:text-[#2D5BE3] hover:bg-[#EEF2FD] rounded-lg transition-all border border-transparent hover:border-[#2D5BE3]/20 shrink-0"
                            title="View live page"
                          >
                            <Eye size={13} />
                          </a>

                          {/* Edit Content */}
                          <Link
                            href={`/admin/entries/${std.id}/edit`}
                            className="p-1.5 text-[#76767E] hover:text-[#2D5BE3] hover:bg-[#EEF2FD] rounded-lg transition-all border border-transparent hover:border-[#2D5BE3]/20 shrink-0"
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
      )}

      {/* Hidden File Input for PDF Upload */}
      <input
        type="file"
        id="inline-pdf-upload"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Inline Uploading Indicator Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border border-[#E2E1DD] rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-[#2D5BE3]" size={32} />
            <p className="text-xs font-semibold text-slate-700">Uploading PDF document inline...</p>
          </div>
        </div>
      )}

      {/* Video Lecture Attachment Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border border-[#E2E1DD] rounded-xl w-full max-w-md p-6 shadow-xl space-y-4 animate-fade-in">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Attach Lecture Video Link</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Attach a YouTube or external lecture video directly to this standard.</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Video Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. Ind AS 1 - Complete Lecture"
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#2D5BE3] transition-all text-[#1C1C1E]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Video URL (YouTube link/embed)</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#2D5BE3] transition-all text-[#1C1C1E]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Faculty / Channel Name</label>
                <input
                  type="text"
                  value={videoChannel}
                  onChange={(e) => setVideoChannel(e.target.value)}
                  placeholder="e.g. CA Anish Krishnan"
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#2D5BE3] transition-all text-[#1C1C1E]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                disabled={isVideoSaving}
                className="px-4 py-2 border border-[#E2E1DD] text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveVideo}
                disabled={isVideoSaving}
                className="px-4 py-2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isVideoSaving ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Saving...
                  </>
                ) : (
                  'Save Video'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
