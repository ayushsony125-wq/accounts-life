'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  X, 
  Clock, 
  ArrowRight, 
  CornerDownLeft, 
  FileText, 
  Calculator, 
  BookOpen, 
  HelpCircle,
  TrendingUp
} from 'lucide-react'
import { searchGlobalIndex, SearchResultItem } from '@/app/search-actions'

interface SearchPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recent_searches')
      if (stored) {
        setRecentSearches(JSON.parse(stored))
      }
    } catch {}
  }, [])

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      setQuery('')
      setResults([])
      setActiveIndex(0)
    }
  }, [isOpen])

  // Poll for search results as query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const delayDebounce = setTimeout(async () => {
      try {
        const data = await searchGlobalIndex(query)
        setResults(data)
        setActiveIndex(0)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 150)

    return () => clearTimeout(delayDebounce)
  }, [query])

  // Save recent search helper
  const saveRecentSearch = (search: string) => {
    try {
      const clean = search.trim()
      if (!clean) return
      const updated = [clean, ...recentSearches.filter(s => s !== clean)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recent_searches', JSON.stringify(updated))
    } catch {}
  }

  // Handle item selection
  const handleSelect = (item: SearchResultItem) => {
    saveRecentSearch(item.title)
    onClose()
    router.push(`/${item.slug}`)
  }

  const handleRecentClick = (text: string) => {
    setQuery(text)
    inputRef.current?.focus()
  }

  // Handle Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length > 0) {
        setActiveIndex(prev => (prev + 1) % results.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length > 0) {
        setActiveIndex(prev => (prev - 1 + results.length) % results.length)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results.length > 0 && results[activeIndex]) {
        handleSelect(results[activeIndex])
      } else if (query.trim()) {
        saveRecentSearch(query)
        onClose()
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  // Handle overlay click to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'STANDARD':
        return BookOpen
      case 'JOURNAL_ENTRY':
        return FileText
      case 'GLOSSARY_TERM':
        return HelpCircle
      default:
        return FileText
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-[#0B0F19]/40 backdrop-blur-xs flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200"
    >
      <div 
        className="bg-white dark:bg-[#161C2C] w-full max-w-2xl rounded-xl border border-[#E2E1DD] dark:border-gray-800 shadow-[0_32px_64px_rgba(0,0,0,0.24)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-200"
        onKeyDown={handleKeyDown}
      >
        {/* Input box Header */}
        <div className="flex items-center border-b border-[#E2E1DD] dark:border-gray-800 px-4 py-3.5 gap-3">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, standards, sections, calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-sm font-medium text-[#1C1C1E] dark:text-white placeholder-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 border border-[#E2E1DD] dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[10px] px-1.5 py-0.5 rounded shadow-xs font-semibold text-gray-500">
            ESC
          </kbd>
        </div>

        {/* Results / Empty state body */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {loading && (
            <div className="flex items-center justify-center py-12 gap-2">
              <svg className="animate-spin h-5 w-5 text-[#2D5BE3]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-xs text-gray-400">Searching index...</span>
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="py-2">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <span className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">
                    Recent Searches
                  </span>
                  <div className="flex flex-col">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleRecentClick(term)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-[#EEF2FD] dark:hover:bg-gray-800 transition-colors"
                      >
                        <Clock size={13} className="text-gray-400 shrink-0" />
                        <span className="flex-1 truncate">{term}</span>
                        <ArrowRight size={11} className="text-gray-300 opacity-0 group-hover:opacity-100 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular links */}
              <div>
                <span className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">
                  Popular Topics
                </span>
                <div className="flex flex-col">
                  {[
                    { label: 'TDS on Purchase of Goods (194Q)', href: '/income-tax/tds-provisions/section-194q' },
                    { label: 'Ind AS 115 Revenue Framework', href: '/standards/ind-as/ind-as-115' },
                    { label: 'ICAI AS 2 Valuation of Inventories', href: '/standards/as/as-2' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onClose()
                        router.push(item.href)
                      }}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-[#EEF2FD] dark:hover:bg-gray-800 transition-colors"
                    >
                      <TrendingUp size={13} className="text-[#2D5BE3] shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      <ArrowRight size={11} className="text-gray-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="text-center py-12 px-4">
              <Search className="text-gray-300 dark:text-gray-600 mx-auto mb-3" size={28} />
              <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white">No results found</h3>
              <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                We couldn&apos;t find any entries matching &quot;{query}&quot;. Try adjusting your search query.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="flex flex-col">
              {results.map((item, idx) => {
                const ItemIcon = getResultIcon(item.type)
                const isSelected = activeIndex === idx
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors group ${
                      isSelected
                        ? 'bg-[#EEF2FD] dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div 
                      className={`flex items-center justify-center w-7 h-7 rounded-md shrink-0 mt-0.5 ${
                        isSelected 
                          ? 'bg-[#2D5BE3]/10 text-[#2D5BE3]' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}
                    >
                      <ItemIcon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span 
                          className="text-[9px] font-bold px-1 py-0.2 rounded uppercase"
                          style={{
                            backgroundColor: isSelected ? `${item.domainColorHex}20` : `${item.domainColorHex}12`,
                            color: item.domainColorHex
                          }}
                        >
                          {item.domainCode}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                          {item.type.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold mt-1 truncate ${
                        isSelected ? 'text-[#2D5BE3] dark:text-[#60A5FA]' : 'text-[#1C1C1E] dark:text-white'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate mt-0.5">{item.summary}</p>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold shrink-0 self-center">
                        <span>Select</span>
                        <CornerDownLeft size={10} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts help */}
        <div className="flex items-center justify-between border-t border-[#E2E1DD] dark:border-gray-800 px-4 py-2.5 bg-gray-50 dark:bg-[#111726] text-[10px] text-gray-400 font-medium select-none">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="border border-[#E2E1DD] dark:border-gray-700 bg-white dark:bg-gray-800 px-1 py-0.2 rounded shadow-2xs font-semibold">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-[#E2E1DD] dark:border-gray-700 bg-white dark:bg-gray-800 px-1 py-0.2 rounded shadow-2xs font-semibold">↵</kbd> to select
            </span>
          </div>
          <span>Search index is fully verified</span>
        </div>
      </div>
    </div>
  )
}
