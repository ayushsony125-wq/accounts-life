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
  Upload,
  LogIn,
  TrendingUp,
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

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">Dashboard</h1>
          <p className="text-sm text-[#76767E] mt-1">
            Here&apos;s the current state of your content platform.
          </p>
        </div>
        <Link
          href="/admin/entries/new"
          className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <PlusCircle size={15} />
          <span>New Entry</span>
        </Link>
      </div>

      {/* KPI Stats — primary */}
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
            label: 'Standards',
            value: m.totalStandards,
            sub: `${m.publishedStandards} live · ${m.draftStandards} draft`,
            icon: BookMarked,
            color: '#6B3FA0',
            bg: '#F0EAF9',
            href: '/admin/standards',
          },
          {
            label: 'PDFs Uploaded',
            value: m.totalPdfs,
            sub: `Across all standards`,
            icon: FileText,
            color: '#0F6B5E',
            bg: '#E6F4F1',
            href: '/admin/standards',
          },
          {
            label: 'Videos Linked',
            value: m.totalVideos,
            sub: `Across all entries`,
            icon: Upload,
            color: '#B45309',
            bg: '#FEF6E4',
            href: '/admin/entries',
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-[#E2E1DD] rounded-xl p-5 flex items-start justify-between hover:border-[#2D5BE3]/30 hover:shadow-sm transition-all group"
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#76767E]">{stat.label}</span>
                <p className="text-3xl font-bold tracking-tight text-[#1C1C1E]">{stat.value}</p>
                <p className="text-[11px] text-[#A0A0A8]">{stat.sub}</p>
              </div>
              <div className="p-2.5 rounded-lg mt-1" style={{ backgroundColor: stat.bg }}>
                <Icon size={18} style={{ color: stat.color }} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Glossary Terms', value: m.glossaryCount, icon: Layers, href: '/admin/glossary', color: '#5B6678' },
          { label: 'Domains', value: m.domainsCount, icon: Globe, href: '/admin/domains', color: '#0F6B5E' },
          { label: 'Drafts (all)', value: m.draftEntries, icon: AlertCircle, href: '/admin/entries?status=DRAFT', color: '#B45309' },
          { label: 'Activity Events', value: (m as any).allRecentActivity?.length || 0, icon: Activity, href: '/admin/activity', color: '#2D5BE3' },
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
                <p className="text-xl font-bold text-[#1C1C1E] mt-0.5">{stat.value}</p>
              </div>
              <Icon size={16} style={{ color: stat.color }} />
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-[#76767E] uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'New Entry', href: '/admin/entries/new', icon: PlusCircle, color: '#2D5BE3' },
            { label: 'Homepage', href: '/admin/homepage', icon: Globe, color: '#1A7A4A' },
            { label: 'Standards', href: '/admin/standards', icon: BookMarked, color: '#6B3FA0' },
            { label: 'Glossary', href: '/admin/glossary', icon: Layers, color: '#0F6B5E' },
            { label: 'New Standard', href: '/admin/entries/new?type=STANDARD', icon: PlusCircle, color: '#B45309' },
            { label: 'Activity Log', href: '/admin/activity', icon: Activity, color: '#5B6678' },
          ].map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white border border-[#E2E1DD] rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:border-[#2D5BE3]/40 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: action.color + '18' }}>
                  <Icon size={16} style={{ color: action.color }} />
                </div>
                <span className="text-[11px] font-semibold text-[#4A4A52]">{action.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent entries */}
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
                    <div className={`w-2 h-2 rounded-full shrink-0 ${entry.status === 'PUBLISHED' ? 'bg-[#1A7A4A]' : 'bg-[#C8C7C2]'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1C1C1E] truncate">{entry.entryTitle}</p>
                      <p className="text-[11px] text-[#A0A0A8] mt-0.5">
                        {entry.entryType} · {formatRelativeTime(entry.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      entry.verificationLevel === 'VERIFIED' ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                        : entry.verificationLevel === 'DRAFT' ? 'bg-[#FEF6E4] text-[#B45309]'
                        : 'bg-[#F4F3F0] text-[#76767E]'
                    }`}>
                      {entry.verificationLevel}
                    </span>
                    <Link href={`/admin/entries/${entry.id}/edit`} className="opacity-0 group-hover:opacity-100 p-1 text-[#76767E] hover:text-[#2D5BE3] transition-all" title="Edit">
                      <Edit size={13} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-[#76767E] text-sm">
                No entries yet.{' '}
                <Link href="/admin/entries/new" className="text-[#2D5BE3] hover:underline">Create your first entry</Link>
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
            {domains.map((dom) => {
              const count = dom._count.entries
              const target = dom.plannedEntryCount || 50
              const pct = Math.min(Math.round((count / target) * 100), 100)
              return (
                <div key={dom.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#1C1C1E] truncate max-w-[140px]">{dom.domainName}</span>
                    <span className="text-[#A0A0A8] font-mono shrink-0">{count}/{target}</span>
                  </div>
                  <div className="w-full bg-[#F4F3F0] h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: dom.domainColorHex || '#2D5BE3' }} />
                  </div>
                  <div className="text-[10px] text-[#A0A0A8]">{pct}% complete</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {((m as any).allRecentActivity?.length > 0) && (
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
            {((m as any).allRecentActivity as any[]).slice(0, 8).map((log: any) => (
              <div key={log.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[#FAFAF8] transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  log.action === 'PUBLISH' ? 'bg-[#1A7A4A]' :
                  log.action === 'LOGIN' ? 'bg-[#2D5BE3]' :
                  log.action === 'ROLLBACK' ? 'bg-[#6B3FA0]' :
                  'bg-[#C8C7C2]'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1C1C1E] truncate">
                    <span className="font-semibold">{log.action}</span>
                    {log.entityId && log.entityId !== 'AdminPortal' && (
                      <span className="text-[#76767E] font-normal"> · {log.entityId}</span>
                    )}
                  </p>
                  {log.description && <p className="text-[11px] text-[#A0A0A8] truncate">{log.description}</p>}
                </div>
                <span className="text-[11px] text-[#A0A0A8] shrink-0">{formatRelativeTime(log.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standards breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Standards Published', value: m.publishedStandards, icon: CheckCircle2, color: '#1A7A4A', bg: '#E8F7EE' },
          { label: 'Standards as Draft', value: m.draftStandards, icon: AlertCircle, color: '#B45309', bg: '#FEF6E4' },
          { label: 'Total PDFs in DB', value: m.totalPdfs, icon: FileText, color: '#0F6B5E', bg: '#E6F4F1' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white border border-[#E2E1DD] rounded-xl p-5 flex items-start justify-between">
              <div>
                <p className="text-xs text-[#76767E] font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
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
