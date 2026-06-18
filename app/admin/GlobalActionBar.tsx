'use client'

import { useState, useCallback } from 'react'
import {
  Save,
  Eye,
  Globe,
  Undo2,
  Redo2,
  ChevronDown,
  Clock,
  Check,
  Loader2,
} from 'lucide-react'

interface GlobalActionBarProps {
  title: string
  subtitle?: string
  isSaving?: boolean
  isPublishing?: boolean
  lastSaved?: string | null
  canUndo?: boolean
  canRedo?: boolean
  onSaveDraft?: () => void
  onPublish?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onPreview?: () => void
  viewLiveHref?: string
  status?: 'DRAFT' | 'PUBLISHED'
}

export default function GlobalActionBar({
  title,
  subtitle,
  isSaving,
  isPublishing,
  lastSaved,
  canUndo,
  canRedo,
  onSaveDraft,
  onPublish,
  onUndo,
  onRedo,
  onPreview,
  viewLiveHref,
  status,
}: GlobalActionBarProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handlePublishClick = () => {
    if (status !== 'PUBLISHED') {
      setShowConfirm(true)
    } else {
      onPublish?.()
    }
  }

  return (
    <>
      {/* Sticky top action bar — stays at top of scrollable content area */}
      <div className="sticky top-0 z-30 -mx-8 mb-6 bg-white border-b border-[#E2E1DD] shadow-sm">
        <div className="flex items-center justify-between px-8 py-3">
          {/* Left: title + status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-[#1C1C1E] truncate">{title}</h1>
              {subtitle && (
                <p className="text-[11px] text-[#76767E] truncate">{subtitle}</p>
              )}
            </div>
            {status && (
              <span
                className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  status === 'PUBLISHED'
                    ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                    : 'bg-[#FEF6E4] text-[#B45309]'
                }`}
              >
                {status === 'PUBLISHED' ? '● Live' : '○ Draft'}
              </span>
            )}
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Last saved indicator */}
            {lastSaved && (
              <span className="text-[11px] text-[#A0A0A8] flex items-center gap-1 mr-1 hidden sm:flex">
                <Clock size={10} />
                Saved {lastSaved}
              </span>
            )}

            {/* Undo / Redo */}
            {(onUndo || onRedo) && (
              <div className="flex items-center border border-[#E2E1DD] rounded-lg overflow-hidden">
                <button
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="p-2 hover:bg-[#F4F3F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Undo"
                >
                  <Undo2 size={13} className="text-[#4A4A52]" />
                </button>
                <div className="w-px h-4 bg-[#E2E1DD]" />
                <button
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="p-2 hover:bg-[#F4F3F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Redo"
                >
                  <Redo2 size={13} className="text-[#4A4A52]" />
                </button>
              </div>
            )}

            {/* Preview */}
            {onPreview && (
              <button
                onClick={onPreview}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-lg transition-colors"
              >
                <Eye size={13} />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}

            {/* View Live */}
            {viewLiveHref && (
              <a
                href={viewLiveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-lg transition-colors"
              >
                <Globe size={13} />
                <span className="hidden sm:inline">View Live</span>
              </a>
            )}

            {/* Save Draft */}
            {onSaveDraft && (
              <button
                onClick={onSaveDraft}
                disabled={isSaving || isPublishing}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1C1C1E] border border-[#C8C7C2] hover:bg-[#F4F3F0] rounded-lg transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
              </button>
            )}

            {/* Publish button */}
            {onPublish && (
              <button
                onClick={handlePublishClick}
                disabled={isSaving || isPublishing}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2D5BE3] hover:bg-[#2450CC] rounded-lg transition-all disabled:opacity-50 shadow-sm"
              >
                {isPublishing ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Check size={13} />
                )}
                <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Publish confirmation overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F7EE] flex items-center justify-center">
                <Globe size={18} className="text-[#1A7A4A]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1C1C1E]">Publish to Live Site?</h3>
                <p className="text-xs text-[#76767E]">This will make the content publicly visible.</p>
              </div>
            </div>
            <p className="text-sm text-[#4A4A52]">
              Are you sure you want to publish <strong>&ldquo;{title}&rdquo;</strong> to the live website?
            </p>
            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false)
                  onPublish?.()
                }}
                className="flex-1 px-4 py-2.5 text-xs font-bold text-white bg-[#2D5BE3] hover:bg-[#2450CC] rounded-xl transition-all shadow-sm"
              >
                Yes, Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
