'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteEntry } from '../actions'
import { Search, Filter, Trash2, Edit, CheckCircle, HelpCircle, FileText } from 'lucide-react'

interface EntriesListClientProps {
  initialEntries: any[]
}

export default function EntriesListClient({ initialEntries }: EntriesListClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [entries, setEntries] = useState(initialEntries)
  
  // Search and filter states
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [verificationFilter, setVerificationFilter] = useState('ALL')

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this entry? This action is permanent.')) {
      return
    }

    startTransition(async () => {
      try {
        const res = await deleteEntry(id)
        if (res.success) {
          setEntries((prev) => prev.filter((e) => e.id !== id))
          router.refresh()
        } else {
          alert('Failed to delete entry.')
        }
      } catch (e) {
        alert('An error occurred while deleting the entry.')
      }
    })
  }

  // Filter entries
  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.entryTitle.toLowerCase().includes(search.toLowerCase()) ||
      e.entrySlug.toLowerCase().includes(search.toLowerCase()) ||
      (e.summary && e.summary.toLowerCase().includes(search.toLowerCase()))

    const matchesType = typeFilter === 'ALL' || e.entryType === typeFilter
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter
    const matchesVerification =
      verificationFilter === 'ALL' || e.verificationLevel === verificationFilter

    return matchesSearch && matchesType && matchesStatus && matchesVerification
  })

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
            Content Manager
          </h1>
          <p className="text-xs text-[#76767E] mt-1">
            Search, filter, edit, or delete existing concept articles, accounting standards, and journal entries.
          </p>
        </div>
        <Link
          href="/admin/entries/new"
          className="bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors shadow-xs"
        >
          + Create New Entry
        </Link>
      </div>

      {/* Filters bar */}
      <div className="bg-white border border-[#E2E1DD] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 shadow-xs">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-[#A0A0A8]" size={14} />
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3]"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-[#76767E] shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
          >
            <option value="ALL">All Types</option>
            <option value="CONCEPT">Concepts</option>
            <option value="STANDARD">Standards</option>
            <option value="JOURNAL_ENTRY">Journal Entries</option>
            <option value="GLOSSARY_TERM">Glossary Terms</option>
            <option value="ILLUSTRATION">Illustrations</option>
            <option value="FAQ">FAQs</option>
            <option value="REFERENCE">References</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-[#76767E] shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        {/* Verification Filter */}
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-[#76767E] shrink-0" />
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
          >
            <option value="ALL">All Verifications</option>
            <option value="VERIFIED">Verified</option>
            <option value="DRAFT">Draft</option>
            <option value="PLACEHOLDER">Placeholder</option>
          </select>
        </div>
      </div>

      {/* Entries table */}
      <div className="bg-white border border-[#E2E1DD] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E1DD] bg-[#F4F3F0] text-[#76767E]">
                <th className="px-5 py-3 font-semibold">Title & Slug</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Domain / Subdomain</th>
                <th className="px-5 py-3 font-semibold">Verification</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E1DD]">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((e) => (
                  <tr key={e.id} className="text-[#1C1C1E] hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-sm text-[#1C1C1E]">
                          {e.entryTitle}
                        </p>
                        <p className="text-[10px] text-[#76767E] font-mono">
                          /{e.entrySlug}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-[#F4F3F0] text-[#4A4A52] px-2 py-0.5 rounded font-mono font-medium text-[10px] uppercase">
                        {e.entryType}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <p className="text-[#1C1C1E]">
                          {e.domain?.domainName || 'General'}
                        </p>
                        <p className="text-[10px] text-[#76767E]">
                          {e.subdomain?.subdomainName || 'Core Guidance'}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          e.verificationLevel === 'VERIFIED'
                            ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                            : e.verificationLevel === 'DRAFT'
                            ? 'bg-[#FEF6E4] text-[#B45309]'
                            : 'bg-[#F4F3F0] text-[#76767E]'
                        }`}
                      >
                        {e.verificationLevel === 'VERIFIED' ? (
                          <CheckCircle size={10} />
                        ) : e.verificationLevel === 'DRAFT' ? (
                          <FileText size={10} />
                        ) : (
                          <HelpCircle size={10} />
                        )}
                        <span>{e.verificationLevel}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          e.status === 'PUBLISHED' ? 'bg-[#1A7A4A]' : 'bg-[#A0A0A8]'
                        }`}
                        title={e.status}
                      />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/entries/${e.id}/edit`}
                          className="p-1 text-[#76767E] hover:text-[#2D5BE3] transition-colors"
                          title="Edit Entry"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(e.id)}
                          disabled={isPending}
                          className="p-1 text-[#76767E] hover:text-[#C0392B] transition-colors disabled:opacity-50"
                          title="Delete Entry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#76767E]">
                    No entries found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
