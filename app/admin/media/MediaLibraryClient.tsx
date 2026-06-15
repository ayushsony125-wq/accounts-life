'use client'

import { useState, useRef, useCallback, useTransition } from 'react'
import {
  Upload,
  FileText,
  Video,
  Image as ImageIcon,
  Layers,
  Search,
  Trash2,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  File,
  Play,
  Eye,
} from 'lucide-react'
import { uploadPdfAction, deletePdfResource } from '../actions'

// ─── Types ───────────────────────────────────────────────────────────────────

interface EntrySnippet {
  id: number
  entryTitle: string
  entrySlug: string
  entryType: string
  status: string
}

interface ResourceRow {
  id: number
  resourceType: string
  resourceTitle: string
  resourceUrl: string | null
  sourceType: string
  videoChannel: string | null
  sortOrder: number
  entry: EntrySnippet
}

interface StandardOption {
  id: number
  entryTitle: string
  entrySlug: string
  status: string
}

interface Props {
  pdfs: ResourceRow[]
  videos: ResourceRow[]
  standards: StandardOption[]
}

type Tab = 'all' | 'pdfs' | 'videos' | 'images'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getSourceBadge(sourceType: string) {
  const map: Record<string, { label: string; cls: string }> = {
    ICAI_OFFICIAL: { label: 'ICAI Official', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
    MCA: { label: 'MCA', cls: 'bg-purple-50 text-purple-700 border border-purple-200' },
    IASB: { label: 'IASB', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    EXTERNAL: { label: 'External', cls: 'bg-[#F4F3F0] text-[#1C1C1E]/60 border border-[#E2E1DD]' },
  }
  const b = map[sourceType] || map['EXTERNAL']
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${b.cls}`}>
      {b.label}
    </span>
  )
}

function getStatusDot(status: string) {
  return status === 'PUBLISHED' ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1A7A4A]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#1A7A4A] inline-block" />
      Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#B45309]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] inline-block" />
      Draft
    </span>
  )
}

// ─── PDF Upload Panel ─────────────────────────────────────────────────────────

function PdfUploadPanel({
  standards,
  onUploaded,
}: {
  standards: StandardOption[]
  onUploaded: () => void
}) {
  const [selectedSlug, setSelectedSlug] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, startUpload] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_MB = 4
  const MAX_BYTES = MAX_MB * 1024 * 1024

  const validateFile = (f: File): string | null => {
    if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) {
      return 'Only PDF files (.pdf) are accepted.'
    }
    if (f.size > MAX_BYTES) {
      return `File is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed is ${MAX_MB} MB.`
    }
    return null
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const dropped = e.dataTransfer.files[0]
      if (!dropped) return
      const err = validateFile(dropped)
      if (err) {
        setResult({ success: false, message: err })
        return
      }
      setFile(dropped)
      setResult(null)
    },
    []
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0]
    if (!chosen) return
    const err = validateFile(chosen)
    if (err) {
      setResult({ success: false, message: err })
      return
    }
    setFile(chosen)
    setResult(null)
  }

  const handleUpload = () => {
    if (!file) {
      setResult({ success: false, message: 'Please select a PDF file.' })
      return
    }
    if (!selectedSlug) {
      setResult({ success: false, message: 'Please select a standard to map this PDF to.' })
      return
    }

    startUpload(async () => {
      const formData = new FormData()
      formData.append('pdfFile', file)
      formData.append('entrySlug', selectedSlug)

      const res = await uploadPdfAction(formData)
      if (res.success) {
        setResult({ success: true, message: `PDF uploaded successfully → /api/pdfs/${selectedSlug}` })
        setFile(null)
        setSelectedSlug('')
        if (fileInputRef.current) fileInputRef.current.value = ''
        onUploaded()
      } else {
        setResult({ success: false, message: res.error || 'Upload failed.' })
      }
    })
  }

  return (
    <div className="bg-white border border-[#E2E1DD] rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-[#1C1C1E] mb-4 flex items-center gap-2">
        <Upload size={15} className="text-[#2D5BE3]" />
        Upload New PDF
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Standard selector */}
        <div>
          <label className="block text-xs font-medium text-[#1C1C1E]/60 mb-1.5">
            Map to Standard <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full appearance-none border border-[#E2E1DD] rounded-lg px-3 py-2 pr-8 text-sm text-[#1C1C1E] bg-white focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3] cursor-pointer"
            >
              <option value="">— Select a standard —</option>
              {standards.map((s) => (
                <option key={s.id} value={s.entrySlug}>
                  {s.entryTitle}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1C1C1E]/40 pointer-events-none"
            />
          </div>
          {standards.length === 0 && (
            <p className="mt-1 text-[11px] text-[#B45309]">
              No standards found — PDFs can still be uploaded by slug.
            </p>
          )}
        </div>

        {/* File info panel when file selected */}
        {file && (
          <div className="flex items-center gap-3 border border-[#E2E1DD] rounded-lg px-3 py-2 bg-[#F4F3F0]">
            <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center shrink-0">
              <FileText size={14} className="text-red-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#1C1C1E] truncate">{file.name}</p>
              <p className="text-[11px] text-[#1C1C1E]/50">{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={() => {
                setFile(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="shrink-0 text-[#1C1C1E]/40 hover:text-red-600 transition-colors"
            >
              <XCircle size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Drop zone */}
      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-[#2D5BE3] bg-[#2D5BE3]/5'
              : 'border-[#E2E1DD] hover:border-[#2D5BE3]/40 hover:bg-[#F4F3F0]'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                dragOver ? 'bg-[#2D5BE3]/10' : 'bg-[#F4F3F0]'
              }`}
            >
              <Upload size={18} className={dragOver ? 'text-[#2D5BE3]' : 'text-[#1C1C1E]/30'} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1C1E]">
                {dragOver ? 'Drop the PDF here' : 'Drag & drop PDF or click to browse'}
              </p>
              <p className="text-xs text-[#1C1C1E]/50 mt-0.5">PDF files only · Max {MAX_MB} MB</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Feedback message */}
      {result && (
        <div
          className={`mt-4 flex items-start gap-2.5 px-3.5 py-3 rounded-lg text-sm border ${
            result.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {result.success ? (
            <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
          ) : (
            <XCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      {/* Upload button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D5BE3] hover:bg-[#3B6BF0] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Upload size={13} />
              Upload PDF
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── PDF Table ────────────────────────────────────────────────────────────────

function PdfTable({
  rows,
  onDelete,
}: {
  rows: ResourceRow[]
  onDelete: (id: number) => void
}) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [, startTransition] = useTransition()

  if (rows.length === 0) {
    return (
      <div className="text-center py-14">
        <div className="w-12 h-12 bg-[#F4F3F0] rounded-2xl flex items-center justify-center mx-auto mb-3">
          <FileText size={20} className="text-[#1C1C1E]/20" />
        </div>
        <p className="text-sm font-medium text-[#1C1C1E]/50">No PDF resources yet</p>
        <p className="text-xs text-[#1C1C1E]/30 mt-1">Upload a PDF above to map it to a standard.</p>
      </div>
    )
  }

  const handleDelete = (id: number) => {
    if (!confirm('Delete this PDF resource? This cannot be undone.')) return
    setDeletingId(id)
    startTransition(async () => {
      await deletePdfResource(id)
      onDelete(id)
      setDeletingId(null)
    })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E2E1DD]">
            <th className="text-left text-[11px] font-semibold text-[#1C1C1E]/40 uppercase tracking-wider pb-2.5 pr-4">
              Title
            </th>
            <th className="text-left text-[11px] font-semibold text-[#1C1C1E]/40 uppercase tracking-wider pb-2.5 pr-4">
              Standard
            </th>
            <th className="text-left text-[11px] font-semibold text-[#1C1C1E]/40 uppercase tracking-wider pb-2.5 pr-4">
              Source
            </th>
            <th className="text-left text-[11px] font-semibold text-[#1C1C1E]/40 uppercase tracking-wider pb-2.5 pr-4">
              Status
            </th>
            <th className="text-right text-[11px] font-semibold text-[#1C1C1E]/40 uppercase tracking-wider pb-2.5">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E1DD]">
          {rows.map((row) => (
            <tr key={row.id} className="group hover:bg-[#F4F3F0]/60 transition-colors">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <FileText size={12} className="text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-[#1C1C1E] truncate max-w-[180px]">
                      {row.resourceTitle}
                    </p>
                    <p className="text-[11px] text-[#1C1C1E]/40 truncate max-w-[180px]">
                      {row.entry.entrySlug}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className="text-[13px] text-[#1C1C1E] font-medium line-clamp-1">
                  {row.entry.entryTitle}
                </span>
              </td>
              <td className="py-3 pr-4">{getSourceBadge(row.sourceType)}</td>
              <td className="py-3 pr-4">{getStatusDot(row.entry.status)}</td>
              <td className="py-3 text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <a
                    href={`/api/pdfs/${row.entry.entrySlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Preview PDF"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#2D5BE3] bg-[#2D5BE3]/5 hover:bg-[#2D5BE3]/10 rounded-md transition-colors border border-[#2D5BE3]/20"
                  >
                    <Eye size={11} />
                    Preview
                  </a>
                  <button
                    onClick={() => handleDelete(row.id)}
                    disabled={deletingId === row.id}
                    title="Delete PDF resource"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-100 disabled:opacity-50"
                  >
                    {deletingId === row.id ? (
                      <span className="w-2.5 h-2.5 rounded-full border border-red-400 border-t-transparent animate-spin" />
                    ) : (
                      <Trash2 size={11} />
                    )}
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Video List ───────────────────────────────────────────────────────────────

function VideoList({
  rows,
  onDelete,
}: {
  rows: ResourceRow[]
  onDelete: (id: number) => void
}) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [, startTransition] = useTransition()

  if (rows.length === 0) {
    return (
      <div className="text-center py-14">
        <div className="w-12 h-12 bg-[#F4F3F0] rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Video size={20} className="text-[#1C1C1E]/20" />
        </div>
        <p className="text-sm font-medium text-[#1C1C1E]/50">No video resources yet</p>
        <p className="text-xs text-[#1C1C1E]/30 mt-1">Videos can be linked from entry resource editors.</p>
      </div>
    )
  }

  const handleDelete = (id: number) => {
    if (!confirm('Delete this video resource? This cannot be undone.')) return
    setDeletingId(id)
    startTransition(async () => {
      await deletePdfResource(id) // reuses same delete action (works for any resource)
      onDelete(id)
      setDeletingId(null)
    })
  }

  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex items-center gap-4 p-3.5 border border-[#E2E1DD] rounded-xl bg-white hover:bg-[#F4F3F0]/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2D5BE3]/10 border border-[#2D5BE3]/20 flex items-center justify-center shrink-0">
            <Play size={14} className="text-[#2D5BE3]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1C1C1E] truncate">{row.resourceTitle}</p>
            <p className="text-xs text-[#1C1C1E]/50 mt-0.5 truncate">
              {row.entry.entryTitle}
              {row.videoChannel && (
                <span className="ml-2 text-[#1C1C1E]/30">· {row.videoChannel}</span>
              )}
            </p>
            {row.resourceUrl && (
              <p className="text-[11px] text-[#2D5BE3]/70 truncate mt-0.5">{row.resourceUrl}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {row.resourceUrl && (
              <a
                href={row.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#2D5BE3] bg-[#2D5BE3]/5 hover:bg-[#2D5BE3]/10 rounded-md transition-colors border border-[#2D5BE3]/20"
              >
                <ExternalLink size={11} />
                View
              </a>
            )}
            <button
              onClick={() => handleDelete(row.id)}
              disabled={deletingId === row.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-100 disabled:opacity-50"
            >
              {deletingId === row.id ? (
                <span className="w-2.5 h-2.5 rounded-full border border-red-400 border-t-transparent animate-spin" />
              ) : (
                <Trash2 size={11} />
              )}
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function MediaLibraryClient({ pdfs: initialPdfs, videos: initialVideos, standards }: Props) {
  const [tab, setTab] = useState<Tab>('all')
  const [search, setSearch] = useState('')
  const [pdfs, setPdfs] = useState<ResourceRow[]>(initialPdfs)
  const [videos, setVideos] = useState<ResourceRow[]>(initialVideos)
  const [refreshKey, setRefreshKey] = useState(0)

  const filterFn = (row: ResourceRow) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      row.resourceTitle.toLowerCase().includes(q) ||
      row.entry.entryTitle.toLowerCase().includes(q) ||
      row.entry.entrySlug.toLowerCase().includes(q)
    )
  }

  const filteredPdfs = pdfs.filter(filterFn)
  const filteredVideos = videos.filter(filterFn)
  const allCount = pdfs.length + videos.length

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: 'All Media', icon: <Layers size={13} />, count: allCount },
    { id: 'pdfs', label: 'PDFs', icon: <FileText size={13} />, count: pdfs.length },
    { id: 'videos', label: 'Videos', icon: <Video size={13} />, count: videos.length },
    { id: 'images', label: 'Images', icon: <ImageIcon size={13} />, count: 0 },
  ]

  return (
    <div className="min-h-screen bg-[#F4F3F0]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#2D5BE3]/10 border border-[#2D5BE3]/20 flex items-center justify-center">
              <Upload size={15} className="text-[#2D5BE3]" />
            </div>
            <h1 className="text-xl font-bold text-[#1C1C1E]">Media Library</h1>
          </div>
          <p className="text-sm text-[#1C1C1E]/50 ml-10">
            Manage all PDFs, videos, and media assets across the platform.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total Assets', value: allCount, icon: <Layers size={14} />, color: 'text-[#2D5BE3] bg-[#2D5BE3]/10' },
            { label: 'PDFs', value: pdfs.length, icon: <FileText size={14} />, color: 'text-red-600 bg-red-50' },
            { label: 'Videos', value: videos.length, icon: <Video size={14} />, color: 'text-[#2D5BE3] bg-[#2D5BE3]/10' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#E2E1DD] rounded-xl p-4 flex items-center gap-3"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E] leading-none">{stat.value}</p>
                <p className="text-xs text-[#1C1C1E]/50 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar + search */}
        <div className="bg-white border border-[#E2E1DD] rounded-xl mb-6 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#E2E1DD]">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 -mb-px transition-all ${
                  tab === t.id
                    ? 'border-[#2D5BE3] text-[#2D5BE3]'
                    : 'border-transparent text-[#1C1C1E]/50 hover:text-[#1C1C1E]'
                }`}
              >
                {t.icon}
                {t.label}
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    tab === t.id
                      ? 'bg-[#2D5BE3]/10 text-[#2D5BE3]'
                      : 'bg-[#F4F3F0] text-[#1C1C1E]/40'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="p-3 border-b border-[#E2E1DD]">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1C1E]/30"
              />
              <input
                type="text"
                placeholder="Search by title or standard name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border border-[#E2E1DD] rounded-lg bg-[#F4F3F0] focus:outline-none focus:bg-white focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3] placeholder:text-[#1C1C1E]/30 text-[#1C1C1E] transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C1C1E]/30 hover:text-[#1C1C1E] transition-colors"
                >
                  <XCircle size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-5">
            {/* All media */}
            {tab === 'all' && (
              <div className="space-y-8">
                {/* PDF section */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]/40 mb-3 flex items-center gap-1.5">
                    <FileText size={12} />
                    PDF Documents ({filteredPdfs.length})
                  </h3>
                  <PdfTable
                    rows={filteredPdfs}
                    onDelete={(id) => setPdfs((prev) => prev.filter((r) => r.id !== id))}
                  />
                </div>
                {/* Video section */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]/40 mb-3 flex items-center gap-1.5">
                    <Video size={12} />
                    Videos ({filteredVideos.length})
                  </h3>
                  <VideoList
                    rows={filteredVideos}
                    onDelete={(id) => setVideos((prev) => prev.filter((r) => r.id !== id))}
                  />
                </div>
                {/* Images placeholder */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]/40 mb-3 flex items-center gap-1.5">
                    <ImageIcon size={12} />
                    Images (0)
                  </h3>
                  <div className="text-center py-10 border border-dashed border-[#E2E1DD] rounded-xl">
                    <div className="w-10 h-10 bg-[#F4F3F0] rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <ImageIcon size={18} className="text-[#1C1C1E]/20" />
                    </div>
                    <p className="text-xs text-[#1C1C1E]/40">Image hosting coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* PDFs tab */}
            {tab === 'pdfs' && (
              <PdfTable
                rows={filteredPdfs}
                onDelete={(id) => setPdfs((prev) => prev.filter((r) => r.id !== id))}
              />
            )}

            {/* Videos tab */}
            {tab === 'videos' && (
              <VideoList
                rows={filteredVideos}
                onDelete={(id) => setVideos((prev) => prev.filter((r) => r.id !== id))}
              />
            )}

            {/* Images tab */}
            {tab === 'images' && (
              <div className="text-center py-14">
                <div className="w-12 h-12 bg-[#F4F3F0] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ImageIcon size={20} className="text-[#1C1C1E]/20" />
                </div>
                <p className="text-sm font-medium text-[#1C1C1E]/50">Image hosting coming soon</p>
                <p className="text-xs text-[#1C1C1E]/30 mt-1">
                  Direct image upload and management will be available in a future update.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload panel — always visible below the library */}
        {(tab === 'all' || tab === 'pdfs') && (
          <PdfUploadPanel
            standards={standards}
            onUploaded={() => setRefreshKey((k) => k + 1)}
          />
        )}

        {/* Info alert */}
        <div className="flex items-start gap-3 px-4 py-3.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
          <div>
            <p className="font-semibold text-amber-900 mb-0.5">PDF size limit — 4 MB</p>
            <p className="text-xs text-amber-700">
              Due to Vercel serverless payload limits, PDFs are restricted to 4 MB. Larger files will be
              rejected. PDFs are stored as Base64 in the database and served via{' '}
              <code className="font-mono bg-amber-100 px-1 rounded">/api/pdfs/[slug]</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
