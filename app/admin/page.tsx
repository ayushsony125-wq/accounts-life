import Link from 'next/link'
import { verifyAdminSession } from './session'
import { getDashboardMetrics } from './actions'
import prisma from '@/lib/db'
import {
  BookOpen,
  Layers,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Globe,
  BookMarked,
  Activity,
  Edit,
  Clock,
  BarChart3,
  FileText,
  TrendingUp,
  Video,
  Home,
  Zap,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const actionColorMap: Record<string, string> = {
  PUBLISH: '#1A7A4A',
  LOGIN: '#2D5BE3',
  ROLLBACK: '#6B3FA0',
  UPDATE: '#B45309',
  DELETE_RESOURCE: '#C0392B',
  LOGOUT: '#76767E',
}

export default async function AdminDashboard() {
  await verifyAdminSession()

  const [metricsResult, recentEntries, domains] = await Promise.all([
    getDashboardMetrics(),
    prisma.entry.findMany({
      take: 8,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true, entryTitle: true, entryType: true, entrySlug: true,
        status: true, verificationLevel: true, updatedAt: true,
        domain: { select: { domainName: true, domainColorHex: true } }
      }
    }),
    prisma.domain.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { entries: true } } }
    })
  ])

  const m = metricsResult.metrics || {
    totalEntries: 0, publishedEntries: 0, draftEntries: 0,
    totalStandards: 0, publishedStandards: 0, draftStandards: 0,
    totalPdfs: 0, totalVideos: 0, glossaryCount: 0, domainsCount: 0,
    recentLogins: [], recentPublications: [], recentEdits: [],
    allRecentActivity: [],
  }

  const recentActivity = (m as any).allRecentActivity as any[] | undefined

  return (
    <div className="space-y-8 max-w-7xl">

      {/* ── Page Header ────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">Command Center</h1>
          <p className="text-sm text-[#76767E] mt-1">
            Real-time overview of your content platform.
          </p>
        </div>
        <Link
          href="/admin/entries/new"
          className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <PlusCircle size={15} />
          <span>New Entry</span>
        </Link>
      </div>

      {/* ── KPI Row 1 — Primary Stats ───────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Entries',
            value: m.totalEntries,
            sub: `${m.publishedEntries} published · ${m.draftEntries} draft`,
            icon: BookOpen,
            color: '#2D5BE3',
            bg: '#EEF2FD',
            href: '/admin/entries',
          },
          {
            label: 'Published',
            value: m.publishedEntries,
            sub: `${m.totalEntries > 0 ? Math.round((m.publishedEntries / m.totalEntries) * 100) : 0}% of total entries`,
            icon: CheckCircle2,
            color: '#1A7A4A',
            bg: '#E8F7EE',
            href: '/admin/entries?status=PUBLISHED',
          },
          {
            label: 'Drafts',
            value: m.draftEntries,
            sub: 'Pending review or editing',
            icon: AlertCircle,
            color: '#B45309',
            bg: '#FEF6E4',
            href: '/admin/entries?status=DRAFT',
          },
          {
            label: 'Total Standards',
            value: m.totalStandards,
            sub: `${m.publishedStandards} live · ${m.draftStandards} draft`,
            icon: BookMarked,
            color: '#6B3FA0',
            bg: '#F0EAF9',
            href: '/admin/standards',
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-[#E2E1DD] rounded-xl p-5 flex items-start justify-between hover:border-[#2D5BE3]/30 hover:shadow-md transition-all group"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#76767E]">{stat.label}</span>
                <p className="text-3xl font-bold tracking-tight text-[#1C1C1E]">{stat.value}</p>
                <p className="text-[11px] text-[#A0A0A8]">{stat.sub}</p>
              </div>
              <div className="p-2.5 rounded-lg mt-0.5" style={{ backgroundColor: stat.bg }}>
                <Icon size={18} style={{ color: stat.color }} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── KPI Row 2 — Secondary Stats ─────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total PDFs',
            value: m.totalPdfs,
            sub: 'Standard documents',
            icon: FileText,
            color: '#0F6B5E',
            bg: '#E6F4F1',
            href: '/admin/standards',
          },
          {
            label: 'Videos Linked',
            value: m.totalVideos,
            sub: 'Across all entries',
            icon: Video,
            color: '#B45309',
            bg: '#FEF6E4',
            href: '/admin/entries',
          },
          {
            label: 'Glossary Terms',
            value: m.glossaryCount,
            sub: 'Definitions indexed',
            icon: Layers,
            color: '#5B6678',
            bg: '#F4F3F0',
            href: '/admin/glossary',
          },
          {
            label: 'Activity Events',
            value: recentActivity?.length || 0,
            sub: 'Recent audit log entries',
            icon: Activity,
            color: '#2D5BE3',
            bg: '#EEF2FD',
            href: '/admin/activity',
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-[#E2E1DD] rounded-xl p-4 flex items-center justify-between hover:border-[#2D5BE3]/30 hover:shadow-sm transition-all"
            >
              <div>
                <p className="text-xs text-[#76767E] font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1C1C1E] mt-0.5">{stat.value}</p>
                <p className="text-[10px] text-[#A0A0A8] mt-0.5">{stat.sub}</p>
              </div>
              <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: stat.bg }}>
                <Icon size={16} style={{ color: stat.color }} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── Quick Actions ────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={13} className="text-[#76767E]" />
          <h2 className="text-xs font-semibold text-[#76767E] uppercase tracking-wider">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: 'New Entry', href: '/admin/entries/new', icon: PlusCircle, color: '#2D5BE3', bg: '#EEF2FD' },
            { label: 'New Standard', href: '/admin/entries/new?type=STANDARD', icon: BookMarked, color: '#6B3FA0', bg: '#F0EAF9' },
            { label: 'Homepage Config', href: '/admin/homepage', icon: Home, color: '#1A7A4A', bg: '#E8F7EE' },
            { label: 'Standards', href: '/admin/standards', icon: BookMarked, color: '#0F6B5E', bg: '#E6F4F1' },
            { label: 'Glossary', href: '/admin/glossary', icon: Layers, color: '#5B6678', bg: '#F4F3F0' },
            { label: 'Activity Log', href: '/admin/activity', icon: Activity, color: '#B45309', bg: '#FEF6E4' },
          ].map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E1DD] hover:border-[#2D5BE3]/40 hover:shadow-sm transition-all text-sm font-medium text-[#1C1C1E] group"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: action.bg }}>
                  <Icon size={11} style={{ color: action.color }} />
                </div>
                {action.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Main 2-column Grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recently Updated Entries — col-span-2 */}
        <div className="lg:col-span-2 bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E1DD]">
            <h2 className="text-sm font-semibold text-[#1C1C1E] flex items-center gap-2">
              <Clock size={14} className="text-[#76767E]" />
              Recently Updated
            </h2>
            <Link href="/admin/entries" className="text-xs text-[#2D5BE3] hover:underline font-semibold flex items-center gap-1">
              View All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#F4F3F0]">
            {recentEntries.length > 0 ? (
              recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: entry.status === 'PUBLISHED' ? '#1A7A4A' : '#C8C7C2' }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1C1C1E] truncate">{entry.entryTitle}</p>
                      <p className="text-[11px] text-[#A0A0A8] mt-0.5">
                        {entry.entryType}
                        {entry.domain?.domainName && (
                          <> · <span style={{ color: entry.domain.domainColorHex || '#76767E' }}>{entry.domain.domainName}</span></>
                        )}
                        {' · '}{formatRelativeTime(entry.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      entry.verificationLevel === 'VERIFIED'
                        ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                        : entry.verificationLevel === 'DRAFT'
                        ? 'bg-[#FEF6E4] text-[#B45309]'
                        : 'bg-[#F4F3F0] text-[#76767E]'
                    }`}>
                      {entry.verificationLevel}
                    </span>
                    <Link
                      href={`/admin/entries/${entry.id}/edit`}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-[#76767E] hover:text-[#2D5BE3] hover:bg-[#EEF2FD] transition-all"
                      title="Edit"
                    >
                      <Edit size={12} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-[#76767E] text-sm">
                <BookOpen size={32} className="mx-auto mb-3 text-[#E2E1DD]" />
                <p className="font-medium">No entries yet</p>
                <p className="text-[#A0A0A8] text-xs mt-1">
                  <Link href="/admin/entries/new" className="text-[#2D5BE3] hover:underline">Create your first entry</Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Domain Coverage */}
        <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E1DD]">
            <h2 className="text-sm font-semibold text-[#1C1C1E] flex items-center gap-2">
              <BarChart3 size={14} className="text-[#76767E]" />
              Domain Coverage
            </h2>
            <Link href="/admin/domains" className="text-xs text-[#2D5BE3] hover:underline font-semibold flex items-center gap-1">
              Manage <ArrowRight size={11} />
            </Link>
          </div>
          <div className="px-5 py-4 space-y-4">
            {domains.length > 0 ? (
              domains.map((dom) => {
                const count = dom._count.entries
                const target = (dom as any).plannedEntryCount || 50
                const pct = Math.min(Math.round((count / target) * 100), 100)
                return (
                  <div key={dom.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#1C1C1E] truncate max-w-[140px]">{dom.domainName}</span>
                      <span className="text-[#A0A0A8] font-mono shrink-0">{count}/{target}</span>
                    </div>
                    <div className="w-full bg-[#F4F3F0] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: (dom as any).domainColorHex || '#2D5BE3' }}
                      />
                    </div>
                    <div className="text-[10px] text-[#A0A0A8]">{pct}% complete</div>
                  </div>
                )
              })
            ) : (
              <div className="py-8 text-center text-[#A0A0A8] text-xs">
                No domains configured yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Recent Activity Feed ─────────────────────────────── */}
      {recentActivity && recentActivity.length > 0 && (
        <div className="bg-white border border-[#E2E1DD] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E1DD]">
            <h2 className="text-sm font-semibold text-[#1C1C1E] flex items-center gap-2">
              <Activity size={14} className="text-[#76767E]" />
              Recent Activity
            </h2>
            <Link href="/admin/activity" className="text-xs text-[#2D5BE3] hover:underline font-semibold flex items-center gap-1">
              Full Log <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#F4F3F0]">
            {recentActivity.slice(0, 8).map((log: any) => {
              const dotColor = actionColorMap[log.action] || '#C8C7C2'
              return (
                <div key={log.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[#FAFAF8] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1C1C1E] truncate">
                      <span className="font-semibold">{log.action}</span>
                      {log.entityId && log.entityId !== 'AdminPortal' && (
                        <span className="text-[#76767E] font-normal"> · {log.entityId}</span>
                      )}
                    </p>
                    {log.description && (
                      <p className="text-[11px] text-[#A0A0A8] truncate">{log.description}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-[#A0A0A8]">{formatRelativeTime(log.createdAt)}</span>
                    {log.userEmail && (
                      <p className="text-[10px] text-[#C8C7C2]">{log.userEmail}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Standards Breakdown — 3 stat cards ──────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Standards Published',
            value: m.publishedStandards,
            sub: 'Live on platform',
            icon: CheckCircle2,
            color: '#1A7A4A',
            bg: '#E8F7EE',
          },
          {
            label: 'Standards Draft',
            value: m.draftStandards,
            sub: 'In progress / review',
            icon: AlertCircle,
            color: '#B45309',
            bg: '#FEF6E4',
          },
          {
            label: 'Total PDFs in DB',
            value: m.totalPdfs,
            sub: 'Uploaded standard PDFs',
            icon: FileText,
            color: '#0F6B5E',
            bg: '#E6F4F1',
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white border border-[#E2E1DD] rounded-xl p-5 flex items-start justify-between hover:shadow-sm transition-all"
            >
              <div>
                <p className="text-xs text-[#76767E] font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[11px] text-[#A0A0A8] mt-0.5">{stat.sub}</p>
              </div>
              <div className="p-2.5 rounded-lg" style={{ backgroundColor: stat.bg }}>
                <Icon size={16} style={{ color: stat.color }} />
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
