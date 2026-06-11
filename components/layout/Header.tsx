'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, ChevronDown, ShieldCheck, Bell, Moon, Sun, FileText } from 'lucide-react'

interface DropdownItem {
  label: string
  href: string
  description: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Accounts',
    dropdown: [
      { label: 'Foundations', href: '/foundations', description: 'Core accounting concepts & conventions' },
      { label: 'AS Standards', href: '/standards/as', description: 'All 32 ICAI Accounting Standards' },
      { label: 'Ind AS', href: '/standards/ind-as', description: 'IFRS-aligned Indian standards' },
    ],
  },
  {
    label: 'Audit',
    dropdown: [
      { label: 'Standards on Auditing', href: '/search?q=Audit', description: 'ICAI Auditing Standards (SA)' },
      { label: 'Audit Procedures', href: '/search?q=Audit', description: 'CARO & internal audit guidance' },
    ],
  },
  { label: 'Income Tax', href: '/search?q=Income%20Tax' },
  { label: 'GST', href: '/search?q=GST' },
  { label: 'Corporate Law', href: '/search?q=Corporate+Law' },
  {
    label: 'Finance & Other',
    dropdown: [
      { label: 'Financial Analysis', href: '/financial-analysis', description: 'Analysis & decision-making tools' },
      { label: 'Company Accounts', href: '/company-accounts', description: 'Corporate accounting guidelines' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Standards Library', href: '/standards/as', description: 'Browse accounting frameworks' },
      { label: 'Glossary', href: '/glossary', description: 'Plain-language definitions' },
      { label: 'Search', href: '/search', description: 'Advanced full-text query search' },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    const nextDark = !darkMode
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setDarkMode(nextDark)
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    } else {
      window.location.href = '/search'
    }
  }

  const isActive = (item: NavItem) => {
    if (item.href && item.href !== '#') {
      return pathname === item.href || pathname.startsWith(item.href + '/')
    }
    if (item.dropdown) {
      return item.dropdown.some((d) => pathname === d.href || pathname.startsWith(d.href + '/'))
    }
    return false
  }

  // Hide global header on all admin routes
  if (pathname && pathname.startsWith('/admin')) {
    return null
  }

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 bg-white dark:bg-[#0B0F19]">
      {/* ─── Main Header ─────────────────────────────────────── */}
      <header className="h-16 border-b border-[#E2E1DD] dark:border-gray-800">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 mr-2 xl:mr-3 2xl:mr-4"
            aria-label="Accounts.One — Home"
          >
            {/* Premium A1 Geometric logo */}
            <svg className="w-[42px] h-[34px] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="logoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path d="M4 28L14 6H19L9 28H4Z" fill="url(#logoBlue)" />
              <path d="M10.5 19H20V23H8.5L10.5 19Z" fill="url(#logoBlue)" />
              <path d="M16 10L20 6H25V28H20V11L16 15V10Z" fill="url(#logoGreen)" />
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-sans font-bold text-[18px] tracking-tight text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] transition-colors">Accounts</span>
                <span className="font-sans font-bold text-[18px] tracking-tight text-[#2D5BE3] dark:text-[#60A5FA]">.</span>
                <span className="font-sans font-bold text-[18px] tracking-tight text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] transition-colors">One</span>
              </div>
              <span className="hidden text-[10px] text-[#76767E] dark:text-gray-400 font-medium leading-none mt-0.5 whitespace-nowrap">
                The Operating System for Professional Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-1 2xl:gap-1 flex-nowrap" aria-label="Main navigation">
            {NAV_ITEMS.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-2 xl:px-2 2xl:px-2 py-2 rounded-md text-[12.5px] xl:text-[13px] 2xl:text-[13px] font-semibold whitespace-nowrap transition-colors ${
                      isActive(item)
                        ? 'text-[#2D5BE3] bg-[#EEF2FD] dark:text-[#60A5FA] dark:bg-gray-800'
                        : 'text-[#4A4A52] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-150 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {activeDropdown === item.label && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-[#161C2C] rounded-lg border border-[#E2E1DD] dark:border-gray-800 shadow-[0_4px_16px_rgba(0,0,0,0.12)] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="block px-4 py-2 hover:bg-[#F4F3F0] dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="block text-xs font-semibold text-[#1C1C1E] dark:text-white">{d.label}</span>
                          <span className="block text-[10px] text-[#76767E] dark:text-gray-400 mt-0.5">{d.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-2 xl:px-2 2xl:px-2 py-2 rounded-md text-[12.5px] xl:text-[13px] 2xl:text-[13px] font-semibold whitespace-nowrap transition-colors ${
                    isActive(item)
                      ? 'text-[#2D5BE3] bg-[#EEF2FD] dark:text-[#60A5FA] dark:bg-gray-800'
                      : 'text-[#4A4A52] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 xl:gap-2 2xl:gap-2 shrink-0 ml-auto">
            {/* Search Bar Form (Homepage Only) */}
            {pathname === '/' && (
              <form onSubmit={handleSearchSubmit} className="hidden 2xl:flex relative items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 hover:border-[#C8C7C2] focus:border-[#2D5BE3] focus:bg-white dark:focus:bg-[#161C2C] text-xs font-medium pl-3 pr-8 py-1.5 w-32 xl:w-36 2xl:w-32 rounded-md outline-none transition-all placeholder:text-[#A0A0A8] dark:text-white"
                />
                <Search size={13} className="absolute right-2.5 text-[#76767E] dark:text-gray-400 pointer-events-none" />
              </form>
            )}

            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-1.5 rounded-md text-[#76767E] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={14} className="text-amber-500" /> : <Moon size={14} />}
            </button>
 
            <Link
              href="/admin/login"
              className="hidden sm:block bg-[#2D5BE3] text-white px-3 xl:px-3.5 py-1.5 xl:py-2 rounded-md text-xs font-bold hover:bg-[#2450CC] transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Sign Up / Login
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden flex items-center justify-center w-9 h-9 rounded-md text-[#4A4A52] hover:bg-[#F4F3F0] dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-16 z-40 bg-white dark:bg-[#0B0F19] overflow-y-auto border-t border-[#E2E1DD] dark:border-gray-800">
          <nav className="px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
            {/* Mobile Search */}
            {pathname === '/' && (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full mb-2">
                <Search size={14} className="absolute left-2.5 text-[#76767E] dark:text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 text-xs font-medium pl-8 pr-3 py-2 w-full rounded-md outline-none dark:text-white"
                />
              </form>
            )}

            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-[#F4F3F0] dark:border-gray-800 pb-2">
                {item.dropdown ? (
                  <>
                    <p className="text-xs font-bold text-[#76767E] dark:text-gray-400 uppercase tracking-wider mb-1 px-2">{item.label}</p>
                    <div className="flex flex-col gap-1">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="flex flex-col py-1.5 px-2 rounded hover:bg-[#F4F3F0] dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className="text-xs font-bold text-[#1C1C1E] dark:text-white">{d.label}</span>
                          <span className="text-[10px] text-[#76767E] dark:text-gray-400 mt-0.5">{d.description}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="block py-2 px-2 text-xs font-bold text-[#1C1C1E] dark:text-white hover:bg-[#F4F3F0] dark:hover:bg-gray-800 rounded"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            {/* Mobile-only Login button in drawer */}
            <div className="mt-4 px-2 sm:hidden">
              <Link
                href="/admin/login"
                className="w-full bg-[#2D5BE3] text-white py-2.5 rounded-md text-xs font-bold hover:bg-[#2450CC] transition-colors shadow-sm block text-center"
              >
                Sign Up / Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
