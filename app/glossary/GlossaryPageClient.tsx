'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, BookOpen, ExternalLink, Hash, ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import VerificationBadge from '@/components/ui/VerificationBadge'
import type { GlossaryEntry } from '@/lib/data/static-entries'

interface GlossaryPageClientProps {
  glossaryTerms: GlossaryEntry[]
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryPageClient({ glossaryTerms }: GlossaryPageClientProps) {
  const [activeLetter, setActiveLetter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Get all letters that contain at least one glossary term
  const occupiedLetters = useMemo(() => {
    const letters = new Set(glossaryTerms.map((t) => t.letter.toUpperCase()))
    return Array.from(letters)
  }, [glossaryTerms])

  // Filter terms by active letter and search query
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      // 1. Filter by letter
      if (activeLetter !== 'ALL' && term.letter.toUpperCase() !== activeLetter) {
        return false
      }

      // 2. Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const termName = term.term.toLowerCase()
        const definition = term.shortDefinition.toLowerCase()
        return termName.includes(query) || definition.includes(query)
      }

      return true
    })
  }, [glossaryTerms, activeLetter, searchQuery])

  // Group filtered terms by letter for dictionary-style rendering
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {}

    filteredTerms.forEach((term) => {
      const char = term.letter.toUpperCase()
      if (!groups[char]) {
        groups[char] = []
      }
      groups[char].push(term)
    })

    // Sort keys alphabetically
    return Object.keys(groups)
      .sort()
      .reduce<Record<string, GlossaryEntry[]>>((acc, key) => {
        // Sort terms within group alphabetically
        acc[key] = groups[key].sort((a, b) => a.term.localeCompare(b.term))
        return acc
      }, {})
  }, [filteredTerms])

  // Map related standard references to their route slug
  const getStandardUrl = (ref: string) => {
    const cleanRef = ref.trim().toLowerCase()
    if (cleanRef.startsWith('ind as')) {
      const num = cleanRef.replace('ind as', '').trim()
      return `/standards/ind-as/ind-as-${num}`
    } else if (cleanRef.startsWith('as')) {
      const num = cleanRef.replace('as', '').trim()
      return `/standards/as/as-${num}`
    }
    return `/search?query=${encodeURIComponent(ref)}`
  }

  const handleLetterClick = (letter: string) => {
    if (activeLetter === letter) {
      setActiveLetter('ALL') // Toggle off
    } else {
      setActiveLetter(letter)
    }
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Glossary' },
        ]}
        className="mb-6"
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C1C1E] leading-tight">
          Accounting Glossary
        </h1>
        <p className="mt-2 text-sm text-[#4A4A52]">
          Quick plain-English definitions of accounting vocabulary, each cited back to official AS/Ind AS standards.
        </p>
      </header>

      {/* Alphabet strip & Search row */}
      <div className="space-y-4 mb-8 bg-white p-5 rounded-lg border border-[#E2E1DD] shadow-xs">
        {/* Real-time Filter Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 text-[#76767E]" size={18} />
          <input
            type="text"
            placeholder="Filter terms by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 text-sm bg-white border border-[#E2E1DD] rounded-md focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3] text-[#1C1C1E]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#76767E] hover:text-[#1C1C1E]"
              aria-label="Clear filter query"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Alphabetical navigation A-Z */}
        <div className="flex flex-wrap items-center gap-1 pt-3 border-t border-[#F4F3F0]">
          <button
            onClick={() => setActiveLetter('ALL')}
            className={`text-xs font-semibold px-3 py-1.5 rounded transition-all ${
              activeLetter === 'ALL'
                ? 'bg-[#2D5BE3] text-white'
                : 'bg-[#F4F3F0] text-[#4A4A52] hover:bg-[#EEF2FD] hover:text-[#2D5BE3]'
            }`}
          >
            All
          </button>

          {ALPHABET.map((letter) => {
            const isOccupied = occupiedLetters.includes(letter)
            const isActive = activeLetter === letter

            return (
              <button
                key={letter}
                onClick={() => isOccupied && handleLetterClick(letter)}
                disabled={!isOccupied}
                className={`text-xs font-semibold w-7 h-7 flex items-center justify-center rounded transition-all ${
                  isActive
                    ? 'bg-[#2D5BE3] text-white shadow-xs'
                    : isOccupied
                    ? 'bg-[#F4F3F0] text-[#4A4A52] hover:bg-[#EEF2FD] hover:text-[#2D5BE3]'
                    : 'bg-[#FAFAF8] text-[#A0A0A8] cursor-not-allowed opacity-40'
                }`}
                aria-label={`Filter by letter ${letter}`}
                aria-disabled={!isOccupied}
              >
                {letter}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Glossary display */}
      <main aria-label="Glossary listings">
        {filteredTerms.length === 0 ? (
          <div className="p-8 rounded-lg border border-[#E2E1DD] bg-white text-center">
            <BookOpen size={36} className="text-[#A0A0A8] mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#1C1C1E]">No terms match your filters</h3>
            <p className="mt-2 text-xs text-[#76767E] max-w-sm mx-auto leading-relaxed">
              Try typing a different word, clearing the search query, or selecting a different letter from the A-Z bar.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveLetter('ALL')
              }}
              className="mt-4 text-xs font-semibold text-[#2D5BE3] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedTerms).map(([letter, terms]) => (
              <section key={letter} aria-label={`Terms starting with ${letter}`} className="scroll-mt-24">
                {/* Letter Index Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-[#E2E1DD] mb-6">
                  <span className="text-lg font-bold text-[#2D5BE3] w-8 h-8 flex items-center justify-center rounded-full bg-[#EEF2FD]">
                    {letter}
                  </span>
                  <div className="h-px bg-[#E2E1DD] flex-1 ml-2" />
                  <span className="text-xs text-[#76767E] font-medium">
                    {terms.length} {terms.length === 1 ? 'term' : 'terms'}
                  </span>
                </div>

                {/* Terms Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {terms.map((term) => (
                    <article
                      key={term.termSlug}
                      className="p-5 rounded-lg border border-[#E2E1DD] bg-white hover:border-[#C8C7C2] hover:shadow-xs transition-all flex flex-col gap-3 justify-between"
                      aria-labelledby={`term-${term.termSlug}`}
                    >
                      <div>
                        {/* Card header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3
                            id={`term-${term.termSlug}`}
                            className="text-base font-bold text-[#1C1C1E]"
                          >
                            {term.term}
                          </h3>
                          <VerificationBadge level="VERIFIED" size="sm" />
                        </div>

                        {/* Definition Text */}
                        <p className="text-sm text-[#4A4A52] leading-relaxed font-reading">
                          {term.shortDefinition}
                        </p>
                      </div>

                      {/* Card details / footer tags */}
                      <div className="pt-3 border-t border-[#F4F3F0] space-y-2 mt-auto">
                        {/* Authority Source */}
                        {term.authoritySource && (
                          <div className="flex items-center gap-1.5 text-xs text-[#76767E]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A7A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                            <span className="font-semibold uppercase tracking-widest text-[9px] text-[#4A4A52] shrink-0">Source:</span>
                            {term.authorityUrl ? (
                              <a
                                href={term.authorityUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2D5BE3] hover:underline inline-flex items-center gap-0.5 truncate"
                              >
                                {term.authoritySource} <ExternalLink size={10} className="shrink-0" />
                              </a>
                            ) : (
                              <span className="truncate">{term.authoritySource}</span>
                            )}
                          </div>
                        )}

                        {/* Related standards tags */}
                        {term.standardRefs && term.standardRefs.length > 0 && (
                          <div className="flex flex-wrap gap-1 items-center">
                            <span className="text-[9px] font-semibold uppercase tracking-widest text-[#76767E] mr-1">Standards:</span>
                            {term.standardRefs.map((ref) => (
                              <Link
                                key={ref}
                                href={getStandardUrl(ref)}
                                className="text-[10px] font-medium bg-[#E6F4F2] text-[#0F6B5E] px-2 py-0.5 rounded-sm hover:bg-[#0F6B5E] hover:text-white transition-colors"
                              >
                                {ref}
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Related terms tags */}
                        {term.relatedTermSlugs && term.relatedTermSlugs.length > 0 && (
                          <div className="flex flex-wrap gap-1 items-center">
                            <span className="text-[9px] font-semibold uppercase tracking-widest text-[#76767E] mr-1">Related:</span>
                            {term.relatedTermSlugs.map((slug) => {
                              // Find term name for label
                              const matched = glossaryTerms.find((t) => t.termSlug === slug)
                              const label = matched ? matched.term : slug.replace('-', ' ')

                              return (
                                <button
                                  key={slug}
                                  onClick={() => {
                                    setSearchQuery(label)
                                    setActiveLetter('ALL')
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                  }}
                                  className="text-[10px] font-medium bg-[#EEF2FD] text-[#2D5BE3] px-2 py-0.5 rounded-sm hover:bg-[#2D5BE3] hover:text-white transition-colors capitalize"
                                >
                                  {label}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
