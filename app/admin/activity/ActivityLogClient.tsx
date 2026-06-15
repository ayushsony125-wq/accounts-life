'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  Search,
  RefreshCw,
  Download,
  ChevronDown,
} from 'lucide-react'

type AuditLog = {
  id: string
  action: string
  description: string | null
  entityType: string | null
  entityId: string | null
  userEmail: string | null
  ipAddress: string | null
  createdAt: Date | string
}

const ACTION_FILTER_OPTIONS = [
  'ALL',
  'PUBLISH',
  'SAVE_DRAFT',
  'LOGIN',
  'LOGOUT',
  'PDF_UPLOAD',
  'DELETE',
  'CREATE',
  'UPDATE',
  'ROLLBACK',
  'LOGIN_FAILED',
]

const ACTION_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  PUBLISH:     { dot: 'bg-[#1A7A4A]', badge: 'bg-[#E8F7EE] text-[#1A7A4A]',   label: 'Publish'     },
  SAVE_DRAFT:  { dot: 'bg-[#2D5BE3]', badge: 'bg-[#EEF2FD] text-[#2D5BE3]',   label: 'Save Draft'  },
  CREATE:      { dot: 'bg-[#2D5BE3]', badge: 'bg-[#EEF2FD] text-[#2D5BE3]',   label: 'Create'      },
  UPDATE:      { dot: 'bg-[#2D5BE3]', badge: 'bg-[#EEF2FD] text-[#2D5BE3]',   label: 'Update'      },
  LOGIN:       { dot: 'bg-[#6B3FA0]', badge: 'bg-[#F0EAF9] text-[#6B3FA0]',   label: 'Login'       },
  LOGOUT:      { dot: 'bg-[#76767E]', badge: 'bg-[#F4F3F0] text-[#76767E]',   label: 'Logout'      },
  DELETE:      { dot: 'bg-[#C0392B]', badge: 'bg-[#FDEEEE] text-[#C0392B]',   label: 'Delete'      },
  PDF_UPLOAD:  { dot: 'bg-[#B45309]', badge: 'bg-[#FEF6E4] text-[#B45309]',   label: 'PDF Upload'  },
  VIDEO:       { dot: 'bg-[#B45309]', badge: 'bg-[#FEF6E4] text-[#B45309]',   label: 'Video'       },
  ROLLBACK:    { dot: 'bg-[#76767E]', badge: 'bg-[#F4F3F0] text-[#76767E]',   label: 'Rollback'    },
  LOGIN_FAILED:{ dot: 'bg-[#C0392B]', badge: 'bg-[#FDEEEE] text-[#C0392B]',   label: 'Failed Login'},
}

const DEFAULT_STYLE = { dot: 'bg-[#C8C7C2]', badge: 'bg-[#F4F3F0] text-[#76767E]', label: '' }

function getStyle(action: string) {
  return ACTION_STYLES[action] ?? { ...DEFAULT_STYLE, label: action }
}

function formatTime(date: Date | string): string {
  const now = new Date()
  const d = new Date(date)
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatAbsoluteTime(date: Date | string): string {
  return new Date(date).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

interface Props {
  logs: AuditLog[]
}

export default function ActivityLogClient({ logs }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('ALL')
  const [refreshing, setRefreshing] = useState(false)

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const matchesAction = actionFilter === 'ALL' || log.action === actionFilter
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        log.action.toLowerCase().includes(q) ||
        (log.description?.toLowerCase().includes(q) ?? false) ||
        (log.entityType?.toLowerCase().includes(q) ?? false) ||
        (log.entityId?.toLowerCase().includes(q) ?? false) ||
        (log.userEmail?.toLowerCase().includes(q) ?? false) ||
        (log.ipAddress?.toLowerCase().includes(q) ?? false)
      return matchesAction && matchesSearch
    })
  }, [logs, search, actionFilter])

  const handleRefresh = async () => {
    setRefreshing(true)
    router.refresh()
    setTimeout(() => setRefreshing(false), 800)
  }

  const handleExport = () => {
    const data = JSON.stringify(
      filtered.map((log) => ({
        id: log.id,
        action: log.action,
        description: log.description,
        entityType: log.entityType,
        entityId: log.entityId,
        userEmail: log.userEmail,
        ipAddress: log.ipAddress,
        createdAt: log.createdAt,
      })),
      null,
      2
    )
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-log-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] flex items-center gap-2">
            <Activity size={22} className="text-[#2D5BE3]" />
            Activity Log
          </h1>
          <p className="text-sm text-[#76767E] mt-1">
            Full audit trail of all admin actions — logins, edits, publishes, and deletes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E1DD] bg-white text-xs font-medium text-[#4A4A52] hover:border-[#2D5BE3]/40 hover:text-[#2D5BE3] transition-all disabled:opacity-50"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E1DD] bg-white text-xs font-medium text-[#4A4A52] hover:border-[#2D5BE3]/40 hover:text-[#2D5BE3] transition-all"
          >
            <Download size={13} />
            Export JSON
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Events',  value: logs.length,                                          color: '#2D5BE3' },
          { label: 'Logins',        value: logs.filter(l => l.action === 'LOGIN').length,        color: '#6B3FA0' },
          { label: 'Publishes',     value: logs.filter(l => l.action === 'PUBLISH').length,      color: '#1A7A4A' },
          { label: 'Deletes',       value: logs.filter(l => l.action === 'DELETE').length,       color: '#C0392B' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E2E1DD] rounded-xl p-4">
            <p className="text-xs text-[#76767E] font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A8] pointer-events-none" />
          <input
            type="text"
            placeholder="Search action, description, entity, user, IP…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E2E1DD] rounded-lg focus:outline-none focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/10 transition-all text-[#1C1C1E] placeholder-[#A0A0A8]"
          />
        </div>

        {/* Action filter */}
        <div className="relative">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-white border border-[#E2E1DD] rounded-lg focus:outline-none focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/10 transition-all text-[#1C1C1E] cursor-pointer min-w-[160px]"
          >
            {ACTION_FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'ALL' ? 'All Actions' : opt}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#76767E] pointer-events-none" />
        </div>

        <span className="text-xs text-[#A0A0A8] shrink-0 py-2.5">
          {filtered.length} / {logs.length} events
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 px-5 py-3 border-b border-[#E2E1DD] bg-[#FAFAF8]">
          {['Action', 'Description', 'Entity', 'User', 'IP', 'Time'].map((col) => (
            <span key={col} className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A8] px-2 first:pl-0">
              {col}
            </span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Activity size={32} className="mx-auto mb-3 text-[#C8C7C2]" />
            <p className="text-sm text-[#76767E] font-medium">No activity recorded yet</p>
            <p className="text-xs text-[#A0A0A8] mt-1">
              {logs.length === 0
                ? 'Events will appear here as you use the admin panel.'
                : 'Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F4F3F0]">
            {filtered.map((log) => {
              const style = getStyle(log.action)
              return (
                <div
                  key={log.id}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 items-center px-5 py-3 hover:bg-[#FAFAF8] transition-colors"
                >
                  {/* Action badge with dot */}
                  <div className="flex items-center gap-2 pr-4">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${style.badge}`}>
                      {style.label || log.action}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="min-w-0 pr-4">
                    <p className="text-xs text-[#1C1C1E] truncate">
                      {log.description || <span className="text-[#C8C7C2] italic">—</span>}
                    </p>
                  </div>

                  {/* Entity */}
                  <div className="pr-4">
                    <span className="text-[11px] text-[#76767E] font-mono bg-[#F4F3F0] px-1.5 py-0.5 rounded whitespace-nowrap">
                      {log.entityType && log.entityType !== 'System'
                        ? log.entityType
                        : log.entityId && log.entityId !== 'AdminPortal'
                        ? log.entityId
                        : '—'}
                    </span>
                  </div>

                  {/* User */}
                  <div className="pr-4">
                    <span className="text-[11px] text-[#76767E] whitespace-nowrap">
                      {log.userEmail || 'Admin'}
                    </span>
                  </div>

                  {/* IP */}
                  <div className="pr-4">
                    <span className="text-[11px] font-mono text-[#A0A0A8] whitespace-nowrap">
                      {log.ipAddress || '—'}
                    </span>
                  </div>

                  {/* Time */}
                  <div>
                    <span
                      className="text-[11px] text-[#A0A0A8] whitespace-nowrap cursor-default"
                      title={formatAbsoluteTime(log.createdAt)}
                    >
                      {formatTime(log.createdAt)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
