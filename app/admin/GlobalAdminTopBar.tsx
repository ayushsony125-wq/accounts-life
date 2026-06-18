'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Save,
  Check,
  Undo2,
  Redo2,
  Eye,
  History,
  Activity,
  Loader2,
  Clock,
  Globe,
} from 'lucide-react'

interface EditorState {
  title: string
  isEditing: boolean
  isSaving: boolean
  isPublishing: boolean
  lastSaved: string | null
  canUndo: boolean
  canRedo: boolean
  status: 'DRAFT' | 'PUBLISHED'
  viewLiveHref?: string
}

export default function GlobalAdminTopBar() {
  const pathname = usePathname()
  const router = useRouter()

  // Default state for non-editing pages
  const getPageTitle = (path: string) => {
    if (path === '/admin') return 'Command Center'
    if (path === '/admin/settings') return 'Settings'
    if (path === '/admin/entries') return 'Content Manager'
    if (path === '/admin/glossary') return 'Glossary Manager'
    if (path === '/admin/domains') return 'Domains Configuration'
    if (path === '/admin/activity') return 'Activity & Audit Log'
    if (path.includes('/new')) return 'Create New Standard'
    if (path.includes('/edit')) return 'Edit Standard'
    return 'Admin CMS'
  }

  const [state, setState] = useState<EditorState>({
    title: getPageTitle(pathname),
    isEditing: false,
    isSaving: false,
    isPublishing: false,
    lastSaved: null,
    canUndo: false,
    canRedo: false,
    status: 'DRAFT',
  })

  const [showConfirm, setShowConfirm] = useState(false)

  // Listen to state updates from active editor pages
  useEffect(() => {
    const handleStateUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Partial<EditorState>>
      if (customEvent.detail) {
        setState((prev) => ({
          ...prev,
          ...customEvent.detail,
          isEditing: true,
        }))
      }
    }

    window.addEventListener('cms-editor-state', handleStateUpdate)
    return () => {
      window.removeEventListener('cms-editor-state', handleStateUpdate)
    }
  }, [])

  // Reset state on navigation
  useEffect(() => {
    setState({
      title: getPageTitle(pathname),
      isEditing: pathname.includes('/edit') || pathname.includes('/new'),
      isSaving: false,
      isPublishing: false,
      lastSaved: null,
      canUndo: false,
      canRedo: false,
      status: 'DRAFT',
    })
  }, [pathname])

  const triggerAction = (action: string) => {
    window.dispatchEvent(new CustomEvent(action))
  }

  const handlePublishClick = () => {
    if (state.status !== 'PUBLISHED') {
      setShowConfirm(true)
    } else {
      triggerAction('cms-publish')
    }
  }

  return (
    <>
      <div className="sticky top-0 z-45 w-full bg-white border-b border-[#E2E1DD] shadow-xs shrink-0 select-none">
        <div className="flex items-center justify-between px-6 py-2.5 h-14">
          
          {/* Left: Brand / Title / Status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-[#1C1C1E] truncate tracking-tight">
                {state.title}
              </h1>
              <p className="text-[10px] text-[#76767E] truncate font-semibold uppercase tracking-wider">
                {state.isEditing ? 'Interactive CMS Visual Editor' : 'Global Admin Control'}
              </p>
            </div>
            {state.isEditing && (
              <span
                className={`shrink-0 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  state.status === 'PUBLISHED'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                    : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                }`}
              >
                {state.status === 'PUBLISHED' ? '● Live' : '○ Draft'}
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Last saved indicator */}
            {state.lastSaved && (
              <span className="text-[11px] text-[#A0A0A8] flex items-center gap-1.5 mr-2 font-medium">
                <Clock size={11} className="text-[#A0A0A8]" />
                Saved {state.lastSaved}
              </span>
            )}

            {/* Undo / Redo */}
            <div className="flex items-center border border-[#E2E1DD] rounded-lg overflow-hidden bg-slate-50/50">
              <button
                onClick={() => triggerAction('cms-undo')}
                disabled={!state.canUndo || !state.isEditing}
                className="p-2 hover:bg-[#F4F3F0] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 size={13} className="text-[#4A4A52]" />
              </button>
              <div className="w-px h-4 bg-[#E2E1DD]" />
              <button
                onClick={() => triggerAction('cms-redo')}
                disabled={!state.canRedo || !state.isEditing}
                className="p-2 hover:bg-[#F4F3F0] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 size={13} className="text-[#4A4A52]" />
              </button>
            </div>

            {/* Preview (View Changes) */}
            <button
              onClick={() => triggerAction('cms-preview')}
              disabled={!state.isEditing}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-lg transition-colors disabled:opacity-35 disabled:cursor-not-allowed bg-white"
              title="Preview changes in real time"
            >
              <Eye size={13} />
              <span>View Changes</span>
            </button>

            {/* View Live */}
            {state.viewLiveHref && (
              <a
                href={state.viewLiveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-lg transition-colors bg-white"
              >
                <Globe size={13} />
                <span>View Live</span>
              </a>
            )}

            {/* Version History */}
            <button
              onClick={() => {
                if (state.isEditing) {
                  triggerAction('cms-history')
                } else {
                  router.push('/admin/activity')
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-lg transition-colors bg-white"
              title="View revision snapshots and restore points"
            >
              <History size={13} />
              <span>Version History</span>
            </button>

            {/* Activity Log */}
            <button
              onClick={() => router.push('/admin/activity')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-lg transition-colors bg-white"
              title="View system audit trails"
            >
              <Activity size={13} />
              <span>Activity Log</span>
            </button>

            <div className="w-px h-6 bg-[#E2E1DD] mx-1" />

            {/* Save Draft */}
            <button
              onClick={() => triggerAction('cms-save-draft')}
              disabled={state.isSaving || state.isPublishing || !state.isEditing}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1C1C1E] border border-[#C8C7C2] hover:bg-[#F4F3F0] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
            >
              {state.isSaving ? (
                <Loader2 size={13} className="animate-spin text-[#2D5BE3]" />
              ) : (
                <Save size={13} />
              )}
              <span>{state.isSaving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            {/* Publish button */}
            <button
              onClick={handlePublishClick}
              disabled={state.isSaving || state.isPublishing || !state.isEditing}
              className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-extrabold text-white bg-[#2D5BE3] hover:bg-[#1E48C4] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              {state.isPublishing ? (
                <Loader2 size={13} className="animate-spin text-white" />
              ) : (
                <Check size={13} className="stroke-[3px]" />
              )}
              <span>{state.isPublishing ? 'Publishing...' : 'Publish'}</span>
            </button>

          </div>
        </div>
      </div>

      {/* Publish confirmation overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 space-y-4 border border-[#E2E1DD]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-250">
                <Globe size={18} className="text-[#1A7A4A]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1C1C1E]">Publish to Live Site?</h3>
                <p className="text-[11px] text-[#76767E] font-medium">This will make the content public immediately.</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              Are you sure you want to publish the changes to the live website?
            </p>
            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 text-xs font-bold text-[#4A4A52] border border-[#E2E1DD] hover:bg-[#F4F3F0] rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false)
                  triggerAction('cms-publish')
                }}
                className="flex-1 px-4 py-2.5 text-xs font-extrabold text-white bg-[#2D5BE3] hover:bg-[#1E48C4] rounded-xl transition-all shadow-sm"
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
