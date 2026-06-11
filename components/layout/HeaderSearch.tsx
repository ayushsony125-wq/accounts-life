'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Clock, ArrowRight, CornerDownLeft, FileText, BookOpen, HelpCircle, TrendingUp } from 'lucide-react'
import { searchGlobalIndex, SearchResultItem } from '@/app/search-actions'

export default function HeaderSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recent_searches')
      if (stored) {
        setRecentSearches(JSON.parse(stored))
      }
    } catch {}
  }, [])

  // Listen for Ctrl+K / Cmd+K global shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Fetch results on query changes (debounced)
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

  // Handle select navigation
  const handleSelect = (item: SearchResultItem) => {
    saveRecentSearch(item.title)
    setIsFocused(false)
    inputRef.current?.blur()
    router.push(`/${item.slug}`)
  }

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false)
      inputRef.current?.blur()
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
        setIsFocused(false)
        inputRef.current?.blur()
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

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

  const showDropdown = isFocused && (query.trim() !== '' || recentSearches.length > 0)

  return (
    <div ref={containerRef} className="relative z-50">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search topics, calculators..."
          className={`bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 hover:border-[#C8C7C2] dark:hover:border-gray-700 focus:border-[#2D5BE3] dark:focus:border-[#60A5FA] focus:bg-white dark:focus:bg-[#161C2C] text-xs font-semibold pl-8 pr-12 py-1.5 rounded-md outline-none transition-all duration-300 ease-in-out placeholder:text-[#A0A0A8] dark:text-gray-400 ${
            isFocused ? 'w-56 xl:w-72' : 'w-36 xl:w-44'
          }`}
        />
        <Search size={13} className="absolute left-2.5 text-[#76767E] dark:text-gray-400 pointer-events-none" />
        
        {query && isFocused ? (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Clear query"
          >
            <X size={13} />
          </button>
        ) : (
          <kbd className="absolute right-2.5 hidden sm:inline-flex items-center gap-0.5 border border-[#E2E1DD] dark:border-gray-700 bg-white dark:bg-[#111726] text-[9px] px-1 py-0.2 rounded shadow-3xs font-bold text-gray-400 select-none pointer-events-none">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Floating Suggestions Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-white dark:bg-[#161C2C] border border-[#E2E1DD] dark:border-gray-800 rounded-lg shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.36)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="max-h-[320px] overflow-y-auto p-1.5 scrollbar-thin">
            {loading && (
              <div className="flex items-center justify-center py-8 gap-2">
                <svg className="animate-spin h-4 w-4 text-[#2D5BE3]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-[10px] text-gray-400 font-semibold">Searching...</span>
              </div>
            )}

            {!loading && !query.trim() && recentSearches.length > 0 && (
              <div>
                <span className="block text-[9px] font-bold text-[#A0A0A8] uppercase tracking-widest px-2.5 py-1">
                  Recent Searches
                </span>
                <div className="flex flex-col mt-1">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(term)
                        inputRef.current?.focus()
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-2.5 py-1.5 rounded-md text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-[#EEF2FD] dark:hover:bg-gray-800 transition-colors"
                    >
                      <Clock size={12} className="text-gray-400 shrink-0" />
                      <span className="flex-1 truncate">{term}</span>
                      <ArrowRight size={10} className="text-gray-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!loading && query.trim() && results.length === 0 && (
              <div className="text-center py-8 px-4">
                <Search className="text-gray-300 dark:text-gray-600 mx-auto mb-2" size={20} />
                <h4 className="text-[11px] font-bold text-[#1C1C1E] dark:text-white">No results found</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  No matches found for &quot;{query}&quot;
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
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex items-start gap-2.5 w-full text-left px-2.5 py-2 rounded-md transition-colors ${
                        isSelected
                          ? 'bg-[#EEF2FD] dark:bg-gray-800 text-[#2D5BE3] dark:text-[#60A5FA]'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-6 h-6 rounded shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#2D5BE3]/10' : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <ItemIcon size={12} className={isSelected ? 'text-[#2D5BE3]' : 'text-gray-400'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span 
                            className="text-[8px] font-bold px-1 py-0.2 rounded uppercase"
                            style={{
                              backgroundColor: `${item.domainColorHex}15`,
                              color: item.domainColorHex
                            }}
                          >
                            {item.domainCode}
                          </span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">
                            {item.type.replace('_', ' ')}
                          </span>
                        </div>
                        <h5 className={`text-[11.5px] font-bold mt-0.5 truncate ${
                          isSelected ? 'text-[#2D5BE3] dark:text-[#60A5FA]' : 'text-[#1C1C1E] dark:text-white'
                        }`}>
                          {item.title}
                        </h5>
                      </div>
                      {isSelected && (
                        <CornerDownLeft size={10} className="text-[#2D5BE3] shrink-0 self-center" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="border-t border-[#E2E1DD] dark:border-gray-800 bg-gray-50 dark:bg-[#111726] px-3 py-1.5 text-[9px] text-gray-400 font-bold flex justify-between">
            <span>↑↓ to navigate, ↵ to select</span>
            <span>ESC to close</span>
          </div>
        </div>
      )}
    </div>
  )
}
