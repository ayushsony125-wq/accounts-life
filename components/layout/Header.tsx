'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, ChevronDown, ShieldCheck, Clock, Bell } from 'lucide-react'

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
  {
    label: 'Accounts',
    dropdown: [
      { label: 'Foundations', href: '/foundations', description: 'Core accounting concepts & conventions' },
      { label: 'AS Standards', href: '/standards/as', description: 'All 32 ICAI Accounting Standards' },
      { label: 'Ind AS', href: '/standards/ind-as', description: 'IFRS-aligned Indian standards' },
    ],
  },
  { label: 'Audit', href: '/search?q=Audit' },
  { label: 'Income Tax', href: '/search?q=Income%20Tax' },
  { label: 'GST', href: '/search?q=GST' },
  { label: 'Law', href: '/search?q=Law' },
  {
    label: 'Financial Management & Other',
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
  {
    label: 'More',
    dropdown: [
      { label: 'Privacy Policy', href: '/privacy', description: 'Our data protection promise' },
      { label: 'Terms of Use', href: '/terms', description: 'Platform terms & guidelines' },
      { label: 'Admin Portal', href: '/admin/login', description: 'CMS management dashboard' },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 bg-white">
      {/* ─── Top Utility Bar (Desktop only) ─────────────────── */}
      <div className="hidden md:block h-8 bg-[#FAFAF8] border-b border-[#E2E1DD] text-[11px] text-[#76767E]">
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-[#4A4A52]">
            <ShieldCheck size={11} className="text-[#2D5BE3]" />
            Official Sources
          </span>
          <span className="text-[#E2E1DD] select-none">|</span>
          <a href="https://www.icai.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D5BE3]">ICAI</a>
          <span className="text-[#E2E1DD] select-none">|</span>
          <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D5BE3]">MCA</a>
          <span className="text-[#E2E1DD] select-none">|</span>
          <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D5BE3]">CBDT</a>
          <span className="text-[#E2E1DD] select-none">|</span>
          <a href="https://www.cbic.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D5BE3]">CBIC</a>
          <span className="text-[#E2E1DD] select-none">|</span>
          <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D5BE3]">RBI</a>
          <span className="text-[#E2E1DD] select-none">|</span>
          <span className="hover:text-[#2D5BE3] cursor-pointer">Other Authorities</span>
        </div>
      </div>

      {/* ─── Main Header ─────────────────────────────────────── */}
      <header className="h-16 border-b border-[#E2E1DD]">
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Accounts.One — Home"
          >
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="skewX(-10) translate(5, 0)">
                <path d="M38 18 L10 85 H26 L32 68 H54 L60 85 H76 L48 18 H38 Z M43 36 L50 54 H36 Z" fill="#2D5BE3" />
                <path d="M74 35 L60 45 V55 L72 46 V85 H86 V35 H74 Z" fill="#1A7A4A" />
              </g>
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-sans font-bold text-base tracking-tight text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors">Accounts</span>
                <span className="font-sans font-bold text-base tracking-tight text-[#2D5BE3]">.</span>
                <span className="font-sans font-bold text-base tracking-tight text-[#1C1C1E] group-hover:text-[#2D5BE3] transition-colors">One</span>
              </div>
              <span className="text-[9px] text-[#76767E] font-medium leading-none mt-0.5 whitespace-nowrap">
                The Operating System for Professional Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-0.5 px-2.5 py-2 rounded-md text-xs font-semibold transition-colors ${
                      isActive(item)
                        ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                        : 'text-[#4A4A52] hover:text-[#1C1C1E] hover:bg-[#F4F3F0]'
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
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg border border-[#E2E1DD] shadow-[0_4px_16px_rgba(0,0,0,0.12)] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="block px-4 py-2 hover:bg-[#F4F3F0] transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="block text-xs font-semibold text-[#1C1C1E]">{d.label}</span>
                          <span className="block text-[10px] text-[#76767E] mt-0.5">{d.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-2.5 py-2 rounded-md text-xs font-semibold transition-colors ${
                    isActive(item)
                      ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                      : 'text-[#4A4A52] hover:text-[#1C1C1E] hover:bg-[#F4F3F0]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Wider Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center">
              <Search size={14} className="absolute left-2.5 text-[#76767E] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="bg-[#FAFAF8] border border-[#E2E1DD] hover:border-[#C8C7C2] focus:border-[#2D5BE3] focus:bg-white text-xs font-medium pl-8 pr-3 py-1.5 w-56 lg:w-64 xl:w-72 rounded-md outline-none transition-all placeholder:text-[#A0A0A8]"
              />
            </form>

            <Link
              href="/admin/login"
              className="bg-[#2D5BE3] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-[#2450CC] transition-colors shadow-sm whitespace-nowrap"
            >
              Login
            </Link>


            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden flex items-center justify-center w-9 h-9 rounded-md text-[#4A4A52] hover:bg-[#F4F3F0] transition-colors"
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
        <div className="xl:hidden fixed inset-0 top-24 z-40 bg-white overflow-y-auto border-t border-[#E2E1DD]">
          <nav className="px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full mb-2">
              <Search size={14} className="absolute left-2.5 text-[#76767E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="bg-[#FAFAF8] border border-[#E2E1DD] text-xs font-medium pl-8 pr-3 py-2 w-full rounded-md outline-none"
              />
            </form>

            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-[#F4F3F0] pb-2">
                {item.dropdown ? (
                  <>
                    <p className="text-xs font-bold text-[#76767E] uppercase tracking-wider mb-1 px-2">{item.label}</p>
                    <div className="flex flex-col gap-1">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="flex flex-col py-1.5 px-2 rounded hover:bg-[#F4F3F0] transition-colors"
                        >
                          <span className="text-xs font-bold text-[#1C1C1E]">{d.label}</span>
                          <span className="text-[10px] text-[#76767E] mt-0.5">{d.description}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="block py-2 px-2 text-xs font-bold text-[#1C1C1E] hover:bg-[#F4F3F0] rounded"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
