'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveGlossaryTerm, deleteGlossaryTerm } from '../actions'
import { Search, Plus, Trash2, Edit2, Check, X, BookOpen } from 'lucide-react'

interface GlossaryManagerClientProps {
  initialTerms: any[]
}

export default function GlossaryManagerClient({ initialTerms }: GlossaryManagerClientProps) {
  const router = useRouter()
  const [isTransitioning, startTransition] = useTransition()
  const [terms, setTerms] = useState(initialTerms)
  const [search, setSearch] = useState('')

  // Form edit / create modal state
  const [isEditing, setIsEditing] = useState(false)
  const [formId, setFormId] = useState<number | undefined>(undefined)
  const [term, setTerm] = useState('')
  const [termSlug, setTermSlug] = useState('')
  const [shortDefinition, setShortDefinition] = useState('')
  const [authoritySource, setAuthoritySource] = useState('')
  const [authorityUrl, setAuthorityUrl] = useState('')
  const [relatedTerms, setRelatedTerms] = useState('')
  const [standardRefs, setStandardRefs] = useState('')
  const [examLevelTags, setExamLevelTags] = useState('CA Foundation, CA Intermediate')
  const [status, setStatus] = useState<string>('DRAFT')

  const openCreate = () => {
    setFormId(undefined)
    setTerm('')
    setTermSlug('')
    setShortDefinition('')
    setAuthoritySource('')
    setAuthorityUrl('')
    setRelatedTerms('')
    setStandardRefs('')
    setExamLevelTags('CA Foundation, CA Intermediate')
    setStatus('DRAFT')
    setIsEditing(true)
  }

  const openEdit = (t: any) => {
    setFormId(t.id)
    setTerm(t.term || t.entryTitle || '')
    setTermSlug(t.termSlug || t.entrySlug || '')
    setShortDefinition(t.shortDefinition || t.summary || '')
    setAuthoritySource(t.authoritySource || t.authorityPrimary || '')
    setAuthorityUrl(t.authorityUrl || t.authorityPrimaryUrl || '')
    setRelatedTerms(t.relatedTerms ? t.relatedTerms.join(', ') : '')
    setStandardRefs(t.standardRefs ? t.standardRefs.join(', ') : '')
    setExamLevelTags(t.examLevelTags ? t.examLevelTags.join(', ') : '')
    setStatus(t.status || 'PUBLISHED')
    setIsEditing(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this glossary term?')) {
      return
    }
    startTransition(async () => {
      try {
        const res = await deleteGlossaryTerm(id)
        if (res.success) {
          setTerms((prev) => prev.filter((t) => t.id !== id))
          router.refresh()
        } else {
          alert('Failed to delete glossary term.')
        }
      } catch (e) {
        alert('An error occurred during deletion.')
      }
    })
  }

  const handleTermChange = (val: string) => {
    setTerm(val)
    if (!formId) {
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setTermSlug(slugified)
    }
  }

  const handleSave = () => {
    if (!term.trim() || !termSlug.trim() || !shortDefinition.trim()) {
      alert('Please fill out the Term, Slug, and Short Definition.')
      return
    }

    startTransition(async () => {
      const firstLetter = term.trim().charAt(0).toUpperCase()
      const payload = {
        id: formId,
        term,
        termSlug,
        letter: firstLetter,
        shortDefinition,
        authoritySource,
        authorityUrl,
        relatedTerms: relatedTerms.split(',').map((x) => x.trim()).filter((x) => x),
        standardRefs: standardRefs.split(',').map((x) => x.trim()).filter((x) => x),
        examLevelTags: examLevelTags.split(',').map((x) => x.trim()).filter((x) => x),
        status,
        // Match entry fields for sitemap/search consistency
        entryTitle: term,
        entrySlug: termSlug,
        entryType: 'GLOSSARY_TERM',
        summary: shortDefinition,
        verificationLevel: 'VERIFIED',
      }

      try {
        const res = await saveGlossaryTerm(payload)
        if (res.success) {
          const savedTerm = { ...payload, id: res.id, updatedAt: new Date().toISOString() }
          
          if (formId) {
            setTerms((prev) => prev.map((t) => (t.id === formId ? savedTerm : t)))
          } else {
            setTerms((prev) => [savedTerm, ...prev])
          }

          setIsEditing(false)
          router.refresh()
        } else {
          alert('Failed to save glossary term.')
        }
      } catch (e) {
        alert('An error occurred while saving glossary term.')
      }
    })
  }

  const filteredTerms = terms.filter((t) => {
    const name = t.term || t.entryTitle || ''
    const definition = t.shortDefinition || t.summary || ''
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      definition.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
            Glossary Manager
          </h1>
          <p className="text-xs text-[#76767E] mt-1">
            Build and refine definitions, authority links, and exam tags for the platform global glossary index.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors shadow-xs"
        >
          + Add Glossary Term
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#E2E1DD] p-4 rounded-lg flex items-center gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-[#A0A0A8]" size={14} />
          <input
            type="text"
            placeholder="Search glossary terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
          />
        </div>
      </div>

      {/* Editor Panel Overlay / Drawer */}
      {isEditing && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs relative">
          <button
            onClick={() => setIsEditing(false)}
            className="absolute right-4 top-4 text-[#76767E] hover:text-[#C0392B]"
          >
            <X size={16} />
          </button>
          
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#2D5BE3]">
            {formId ? `Edit Term: ${term}` : 'Create New Glossary Term'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                Glossary Term *
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => handleTermChange(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                placeholder="e.g. Asset"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                value={termSlug}
                onChange={(e) => setTermSlug(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] font-mono focus:outline-none focus:border-[#2D5BE3]"
                placeholder="e.g. asset"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
              Short Definition *
            </label>
            <textarea
              value={shortDefinition}
              onChange={(e) => setShortDefinition(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
              placeholder="Simple 1-2 sentence definition..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                Authority Citation Source
              </label>
              <input
                type="text"
                value={authoritySource}
                onChange={(e) => setAuthoritySource(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                placeholder="e.g. Framework for Presentation of Financial Statements"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                Authority Reference Link
              </label>
              <input
                type="url"
                value={authorityUrl}
                onChange={(e) => setAuthorityUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                Related Terms (Comma list)
              </label>
              <input
                type="text"
                value={relatedTerms}
                onChange={(e) => setRelatedTerms(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                placeholder="Equity, Liability"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                Related Standards (Comma list)
              </label>
              <input
                type="text"
                value={standardRefs}
                onChange={(e) => setStandardRefs(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                placeholder="AS 1, AS 10"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none"
              >
                <option value="DRAFT">Draft (Unpublished)</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2 border-t border-[#E2E1DD]">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-[#F4F3F0] hover:bg-[#EEECEA] border border-[#E2E1DD] rounded text-xs font-semibold text-[#76767E]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isTransitioning}
              className="px-4 py-2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white rounded text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {isTransitioning ? 'Saving...' : 'Save Term'}
            </button>
          </div>
        </div>
      )}

      {/* Terms Table */}
      <div className="bg-white border border-[#E2E1DD] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E1DD] bg-[#F4F3F0] text-[#76767E]">
                <th className="px-5 py-3 font-semibold w-1/4">Term Name</th>
                <th className="px-5 py-3 font-semibold w-1/2">Short Definition</th>
                <th className="px-5 py-3 font-semibold">Authority</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E1DD]">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((t) => {
                  const name = t.term || t.entryTitle || ''
                  const definition = t.shortDefinition || t.summary || ''
                  const authority = t.authoritySource || t.authorityPrimary || 'N/A'

                  return (
                    <tr key={t.id} className="text-[#1C1C1E] hover:bg-[#FAFAF8] transition-colors">
                      <td className="px-5 py-4 font-semibold text-sm">
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={13} className="text-[#5B6678] shrink-0" />
                          <span>{name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#4A4A52] leading-relaxed max-w-sm truncate">
                        {definition}
                      </td>
                      <td className="px-5 py-4 text-[#76767E] max-w-xs truncate">
                        {authority}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            t.status === 'PUBLISHED' ? 'bg-[#1A7A4A]' : 'bg-[#A0A0A8]'
                          }`}
                        />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => openEdit(t)}
                            className="p-1 text-[#76767E] hover:text-[#2D5BE3] transition-colors"
                            title="Edit Term"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            disabled={isTransitioning}
                            className="p-1 text-[#76767E] hover:text-[#C0392B] transition-colors disabled:opacity-50"
                            title="Delete Term"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[#76767E]">
                    No glossary terms found.
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
