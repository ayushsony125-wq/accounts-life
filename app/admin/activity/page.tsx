import { verifyAdminSession } from '../session'
import prisma from '@/lib/db'
import {
  Activity,
  LogIn,
  LogOut,
  PlusCircle,
  Edit,
  Trash2,
  Upload,
  Eye,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const ACTION_META: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  LOGIN: { icon: LogIn, color: '#1A7A4A', bg: '#E8F7EE', label: 'Login' },
  LOGIN_FAILED: { icon: AlertTriangle, color: '#B45309', bg: '#FEF6E4', label: 'Failed Login' },
  LOGOUT: { icon: LogOut, color: '#5B6678', bg: '#F4F3F0', label: 'Logout' },
  CREATE: { icon: PlusCircle, color: '#2D5BE3', bg: '#EEF2FD', label: 'Created' },
  UPDATE: { icon: Edit, color: '#0F6B5E', bg: '#E6F4F1', label: 'Updated' },
  DELETE: { icon: Trash2, color: '#C0392B', bg: '#FEE9E7', label: 'Deleted' },
  PUBLISH: { icon: Eye, color: '#6B3FA0', bg: '#F0EAF9', label: 'Published' },
  PDF_UPLOAD: { icon: Upload, color: '#B45309', bg: '#FEF6E4', label: 'PDF Upload' },
  ROLLBACK: { icon: RefreshCw, color: '#5B6678', bg: '#F4F3F0', label: 'Rollback' },
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function ActivityLogPage() {
  await verifyAdminSession()

  let logs: any[] = []
  try {
    logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    })
  } catch (err) {
    // Database not available
  }

  const actionCounts = logs.reduce((acc: Record<string, number>, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] flex items-center gap-2">
          <Activity size={22} className="text-[#2D5BE3]" />
          Activity Log
        </h1>
        <p className="text-sm text-[#76767E] mt-1">
          Full audit trail of all admin actions — logins, edits, publishes, and deletes.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: logs.length, color: '#2D5BE3' },
          { label: 'Logins', value: (actionCounts['LOGIN'] || 0), color: '#1A7A4A' },
          { label: 'Publishes', value: (actionCounts['PUBLISH'] || 0), color: '#6B3FA0' },
          { label: 'Edits', value: (actionCounts['UPDATE'] || 0), color: '#0F6B5E' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E2E1DD] rounded-xl p-4"
          >
            <p className="text-xs text-[#76767E] font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Events list */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD]">
          <h2 className="text-sm font-semibold text-[#1C1C1E]">Recent Events</h2>
          <p className="text-xs text-[#76767E] mt-0.5">Showing last {Math.min(logs.length, 200)} events</p>
        </div>

        {logs.length === 0 ? (
          <div className="py-16 text-center">
            <Activity size={32} className="mx-auto mb-3 text-[#C8C7C2]" />
            <p className="text-sm text-[#76767E] font-medium">No activity recorded yet</p>
            <p className="text-xs text-[#A0A0A8] mt-1">
              Events will appear here as you use the admin panel.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F4F3F0]">
            {logs.map((log) => {
              const meta = ACTION_META[log.action] || {
                icon: Activity,
                color: '#5B6678',
                bg: '#F4F3F0',
                label: log.action,
              }
              const Icon = meta.icon

              return (
                <div
                  key={log.id}
                  className="flex items-start gap-4 px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors"
                >
                  {/* Icon badge */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: meta.bg }}
                  >
                    <Icon size={14} style={{ color: meta.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#1C1C1E]">
                          <span style={{ color: meta.color }} className="font-semibold">
                            {meta.label}
                          </span>
                          {log.entityType && log.entityType !== 'System' && (
                            <span className="text-[#76767E] font-normal">
                              {' '}— {log.entityType}
                            </span>
                          )}
                          {log.entityId && log.entityId !== 'AdminPortal' && (
                            <span className="text-[#1C1C1E] font-normal">
                              {' '}
                              <span className="font-mono text-xs bg-[#F4F3F0] px-1.5 py-0.5 rounded">
                                {log.entityId}
                              </span>
                            </span>
                          )}
                        </p>
                        {log.description && (
                          <p className="text-xs text-[#76767E] mt-0.5">{log.description}</p>
                        )}
                      </div>
                      <span className="text-[11px] text-[#A0A0A8] shrink-0 mt-0.5">
                        {formatRelativeTime(log.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] text-[#A0A0A8] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8C7C2] inline-block" />
                        {log.userEmail || 'Admin'}
                      </span>
                      {log.ipAddress && (
                        <span className="text-[11px] text-[#A0A0A8] font-mono">
                          {log.ipAddress}
                        </span>
                      )}
                    </div>
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
