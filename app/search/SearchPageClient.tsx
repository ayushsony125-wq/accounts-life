'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Search, X, Filter, BookOpen, SlidersHorizontal, ArrowRight, Tag } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import EntryTypeBadge from '@/components/ui/EntryTypeBadge'
import VerificationBadge from '@/components/ui/VerificationBadge'
import { getDomainColor, getDomainLightColor, getEntryTypeLabel } from '@/lib/utils'
import type { SearchResult, EntryType } from '@/lib/types'

interface SearchPageClientProps {
  searchIndex: SearchResult[]
}

const POPULAR_SEARCHES = ['Accrual', 'AS 1', 'Going Concern', 'Inventory', 'Premium', 'Goodwill']

export default function SearchPageClient({ searchIndex }: SearchPageClientProps) {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL')
  const [groupByDomain, setGroupByDomain] = useState(false)

  // Configure Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'summary', weight: 0.3 },
        { name: 'domainName', weight: 0.1 },
      ],
      includeMatches: true,
      threshold: 0.35,
      ignoreLocation: true,
    })
  }, [searchIndex])

  // Perform client-side search and filtering
  const results = useMemo(() => {
    if (!query.trim()) {
      // Return empty results if query is blank
      return []
    }

    let searchResults = fuse.search(query)

    // Filter by Entry Type
    if (selectedType !== 'ALL') {
      searchResults = searchResults.filter(
        (r) => r.item.type === selectedType
      )
    }

    // Filter by Domain
    if (selectedDomain !== 'ALL') {
      searchResults = searchResults.filter(
        (r) => r.item.domainSlug === selectedDomain
      )
    }

    return searchResults
  }, [fuse, query, selectedType, selectedDomain])

  // Get unique list of domains represented in the search index
  const availableDomains = useMemo(() => {
    const map = new Map<string, string>()
    searchIndex.forEach((item) => {
      map.set(item.domainSlug, item.domainName)
    })
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }))
  }, [searchIndex])

  // Grouped results if requested
  const groupedResults = useMemo(() => {
    if (!groupByDomain) return null

    const groups: Record<string, typeof results> = {}
    results.forEach((r) => {
      const domainName = r.item.domainName
      if (!groups[domainName]) {
        groups[domainName] = []
      }
      groups[domainName].push(r)
    })

    return groups
  }, [results, groupByDomain])

  // Highlight matched ranges in text
  const highlightText = (text: string, indices: [number, number][] | undefined) => {
    if (!indices || indices.length === 0) return text

    const parts: React.ReactNode[] = []
    let lastIndex = 0

    // Sort indices by start point
    const sorted = [...indices].sort((a, b) => a[0] - b[0])

    sorted.forEach(([start, end], idx) => {
      // Append text before matching segment
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start))
      }
      // Wrap matching segment in mark tag with design system coloring
      parts.push(
        <mark
          key={idx}
          className="bg-[#FEF6E4] text-[#B45309] font-medium rounded-xs px-0.5"
        >
          {text.slice(start, end + 1)}
        </mark>
      )
      lastIndex = end + 1
    })

    // Append remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return <>{parts}</>
  }

  // Find match indices for specific keys
  const getFieldIndices = (matches: readonly any[] | undefined, key: string) => {
    const match = matches?.find((m) => m.key === key)
    return match?.indices as [number, number][] | undefined
  }

  const handleClearFilters = () => {
    setSelectedType('ALL')
    setSelectedDomain('ALL')
  }

  const hasActiveFilters = selectedType !== 'ALL' || selectedDomain !== 'ALL'

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Search' },
        ]}
        className="mb-6"
      />

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C1C1E] leading-tight">
          Operating System Search
        </h1>
        <p className="mt-2 text-sm text-[#4A4A52]">
          Search across {searchIndex.length} concepts, standards, journal entries, and glossary definitions.
        </p>
      </header>

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 items-start">
        {/* Left Column: Sidebar Filters */}
        <aside className="lg:sticky lg:top-24 bg-white p-5 rounded-lg border border-[#E2E1DD] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E1DD] mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E] flex items-center gap-1.5">
              <SlidersHorizontal size={12} /> Filters
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-[#2D5BE3] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filter by Entry Type */}
          <div className="mb-6">
            <label htmlFor="type-filter" className="block text-xs font-semibold uppercase tracking-wider text-[#76767E] mb-2">
              Entry Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3]"
            >
              <option value="ALL">All Types</option>
              <option value="CONCEPT">Concepts</option>
              <option value="STANDARD">Standards</option>
              <option value="JOURNAL_ENTRY">Journal Entries</option>
              <option value="GLOSSARY_TERM">Glossary Terms</option>
            </select>
          </div>

          {/* Filter by Domain */}
          <div className="mb-6">
            <label htmlFor="domain-filter" className="block text-xs font-semibold uppercase tracking-wider text-[#76767E] mb-2">
              Domain
            </label>
            <select
              id="domain-filter"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full text-xs bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3] truncate"
            >
              <option value="ALL">All Domains</option>
              {availableDomains.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grouping Toggle */}
          <div className="pt-4 border-t border-[#E2E1DD]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={groupByDomain}
                onChange={(e) => setGroupByDomain(e.target.checked)}
                className="w-3.5 h-3.5 rounded-xs border-[#E2E1DD] text-[#2D5BE3] focus:ring-[#2D5BE3]"
              />
              <span className="text-xs font-medium text-[#4A4A52]">Group results by domain</span>
            </label>
          </div>
        </aside>

        {/* Right Column: Search bar and results list */}
        <div className="space-y-6">
          {/* Search Bar Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-[#76767E]" size={20} />
            <input
              id="search-input"
              type="text"
              aria-label="Search concepts, standards, journal entries, or definitions"
              placeholder="Search concepts, standards (e.g. 'AS 1'), journal entries, or definitions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 text-sm bg-white border border-[#E2E1DD] rounded-lg shadow-sm focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3] font-reading text-[#1C1C1E]"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-4 text-[#76767E] hover:text-[#1C1C1E]"
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Results Display */}
          <main aria-label="Search results">
            {/* Case 1: Empty Query / Introductory State */}
            {!query.trim() && (
              <div className="p-8 rounded-lg border border-[#E2E1DD] bg-white text-center">
                <Search size={36} className="text-[#A0A0A8] mx-auto mb-4" />
                <h3 className="text-base font-bold text-[#1C1C1E]">Begin searching the operating system</h3>
                <p className="mt-2 text-xs text-[#76767E] max-w-sm mx-auto leading-relaxed">
                  Type standard numbers, concept names, or specific accounting principles. Full-text search queries will index everything.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="text-xs text-[#76767E] font-medium py-1.5">Try searching:</span>
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs bg-[#F4F3F0] hover:bg-[#EEF2FD] hover:text-[#2D5BE3] text-[#4A4A52] font-semibold px-3 py-1 rounded-full transition-all border border-transparent hover:border-[#2D5BE3]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Case 2: Query entered, but 0 results */}
            {query.trim() && results.length === 0 && (
              <div className="p-8 rounded-lg border border-[#E2E1DD] bg-white text-center">
                <Tag size={36} className="text-[#A0A0A8] mx-auto mb-4" />
                <h3 className="text-base font-bold text-[#1C1C1E]">No results found</h3>
                <p className="mt-2 text-xs text-[#76767E] max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any entries matching &quot;{query}&quot;. Try checking your spelling or clearing active filters.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5BE3] hover:underline"
                  >
                    Clear Filters <ArrowRight size={12} />
                  </button>
                )}
              </div>
            )}

            {/* Case 3: Flat listing of results */}
            {query.trim() && results.length > 0 && !groupByDomain && (
              <div className="space-y-3">
                <p className="text-xs text-[#76767E] font-medium px-1 mb-2">
                  Found {results.length} {results.length === 1 ? 'match' : 'matches'} for &quot;{query}&quot;
                </p>
                {results.map((res) => (
                  <ResultCard
                    key={res.item.slug}
                    result={res}
                    highlightText={highlightText}
                    getFieldIndices={getFieldIndices}
                  />
                ))}
              </div>
            )}

            {/* Case 4: Grouped results by domain */}
            {query.trim() && results.length > 0 && groupByDomain && groupedResults && (
              <div className="space-y-8">
                <p className="text-xs text-[#76767E] font-medium px-1 mb-2">
                  Found {results.length} {results.length === 1 ? 'match' : 'matches'} grouped by domain
                </p>
                {Object.entries(groupedResults).map(([domainName, items]) => {
                  const domainCode = items[0].item.domainCode
                  const domainColor = getDomainColor(domainCode)

                  return (
                    <section key={domainName} aria-label={`Matches in ${domainName}`}>
                      {/* Section Domain Header */}
                      <div className="flex items-center gap-2 pb-2 border-b border-[#E2E1DD] mb-4">
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${domainColor}15`,
                            color: domainColor,
                          }}
                        >
                          {domainCode}
                        </span>
                        <h2 className="text-sm font-bold text-[#1C1C1E]">
                          {domainName}
                        </h2>
                        <span className="text-xs text-[#76767E] font-medium ml-auto">
                          {items.length} {items.length === 1 ? 'match' : 'matches'}
                        </span>
                      </div>

                      {/* Domain cards */}
                      <div className="space-y-3">
                        {items.map((res) => (
                          <ResultCard
                            key={res.item.slug}
                            result={res}
                            highlightText={highlightText}
                            getFieldIndices={getFieldIndices}
                          />
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// ─── Result Card Component ───────────────────────────────────────────────────

function ResultCard({
  result,
  highlightText,
  getFieldIndices,
}: {
  result: any
  highlightText: (text: string, indices: [number, number][] | undefined) => React.ReactNode
  getFieldIndices: (matches: any[] | undefined, key: string) => [number, number][] | undefined
}) {
  const { item, matches } = result
  const domainColor = getDomainColor(item.domainCode)
  const isGlossary = item.type === 'GLOSSARY_TERM'

  return (
    <Link
      href={`/${item.slug}`}
      className="group block p-5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-xs transition-all relative overflow-hidden"
      style={{
        borderLeft: `3px solid ${domainColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Title & Domain Tagline */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center flex-wrap gap-2 mb-1.5">
            <span
              className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded uppercase"
              style={{
                backgroundColor: `${domainColor}15`,
                color: domainColor,
              }}
            >
              {item.domainCode}
            </span>
            <EntryTypeBadge type={item.type as EntryType} size="sm" />
            <VerificationBadge level="VERIFIED" size="sm" />
          </div>

          <h3 className="text-base font-bold text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors leading-tight">
            {highlightText(item.title, getFieldIndices(matches, 'title'))}
          </h3>

          <p className="mt-2 text-xs text-[#76767E] leading-relaxed line-clamp-2 font-reading">
            {highlightText(item.summary, getFieldIndices(matches, 'summary'))}
          </p>
        </div>

        {/* Hover Arrow indicator */}
        <ArrowRight
          size={16}
          className="text-[#A0A0A8] group-hover:text-[#2D5BE3] transition-colors self-center shrink-0"
        />
      </div>
    </Link>
  )
}
