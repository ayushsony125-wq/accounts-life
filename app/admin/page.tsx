import Link from 'next/link'
import { verifyAdminSession } from './session'
import { getAllEntries, getDomains, getGlossaryTerms } from '@/lib/queries'
import { BookOpen, Layers, CheckCircle2, AlertCircle, PlusCircle, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  verifyAdminSession()

  const [entries, domains, glossary] = await Promise.all([
    getAllEntries(),
    getDomains(),
    getGlossaryTerms(),
  ])

  const totalEntries = entries.length
  const draftEntries = entries.filter((e) => e.verificationLevel === 'DRAFT' || e.status === 'DRAFT')
  const placeholderEntries = entries.filter((e) => e.verificationLevel === 'PLACEHOLDER')
  const verifiedEntriesCount = totalEntries - draftEntries.length - placeholderEntries.length

  const stats = [
    { label: 'Total Entries', value: totalEntries, icon: BookOpen, color: 'text-[#2D5BE3] bg-[#EEF2FD]' },
    { label: 'Verified Entries', value: verifiedEntriesCount, icon: CheckCircle2, color: 'text-[#1A7A4A] bg-[#E8F7EE]' },
    { label: 'Draft / In-Review', value: draftEntries.length, icon: AlertCircle, color: 'text-[#B45309] bg-[#FEF6E4]' },
    { label: 'Glossary Terms', value: glossary.length, icon: Layers, color: 'text-[#5B6678] bg-[#F4F3F0]' },
  ]

  const recentDrafts = entries
    .filter((e) => e.status === 'DRAFT' || e.verificationLevel === 'DRAFT')
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
            CMS Dashboard
          </h1>
          <p className="text-xs text-[#76767E] mt-1">
            Welcome back, AK. Manage your accounting knowledge graph and content updates.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/entries/new"
            className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors shadow-xs"
          >
            <PlusCircle size={14} />
            <span>New Entry</span>
          </Link>
          <Link
            href="/admin/glossary"
            className="flex items-center gap-1.5 bg-white border border-[#E2E1DD] hover:bg-[#F4F3F0] text-[#1C1C1E] px-4 py-2 rounded-md text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Manage Glossary</span>
          </Link>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white border border-[#E2E1DD] rounded-lg p-5 flex items-center justify-between shadow-xs"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#76767E]">
                  {stat.label}
                </span>
                <p className="text-3xl font-bold tracking-tight text-[#1C1C1E]">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Drafts */}
        <div className="lg:col-span-2 bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#76767E]">
              Recent Draft Entries
            </h2>
            <Link
              href="/admin/entries?status=draft"
              className="text-xs text-[#2D5BE3] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {recentDrafts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E1DD] text-[#76767E]">
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Domain</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E1DD]">
                  {recentDrafts.map((draft) => (
                    <tr key={draft.id} className="text-[#1C1C1E]">
                      <td className="py-3.5 font-semibold truncate max-w-[200px]">
                        {draft.entryTitle}
                      </td>
                      <td className="py-3.5">
                        <span className="bg-[#F4F3F0] text-[#4A4A52] px-2 py-0.5 rounded font-mono font-medium">
                          {draft.entryType}
                        </span>
                      </td>
                      <td className="py-3.5 truncate max-w-[150px]">
                        {draft.domain?.domainName || 'General'}
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={`/admin/entries/${draft.id}/edit`}
                          className="text-[#2D5BE3] hover:underline font-semibold"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-[#76767E] text-xs">
              <CheckCircle2 size={32} className="mx-auto mb-2 text-[#1A7A4A] opacity-50" />
              <p>No draft entries found. Everything is reviewed and published!</p>
            </div>
          )}
        </div>

        {/* Right Column: Domain Coverage Summary */}
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#76767E]">
            Domain Coverage Metrics
          </h2>
          <div className="space-y-4">
            {domains.map((dom) => {
              const domEntries = entries.filter((e) => e.domain?.domainCode === dom.domainCode)
              const count = domEntries.length
              const target = dom.plannedEntryCount || 50
              const pct = Math.min(Math.round((count / target) * 100), 100)

              return (
                <div key={dom.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#1C1C1E] truncate max-w-[180px]">
                      {dom.domainName}
                    </span>
                    <span className="text-[#76767E] font-mono shrink-0">
                      {count} / {target} ({pct}%)
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-[#EEECEA] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: dom.domainColorHex || '#2D5BE3',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
