'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, ChevronDown } from 'lucide-react'

interface DropdownEntry {
  label: string
  href: string | null
  description: string
  disabled?: boolean
}

interface NavEntry {
  label: string
  href: string
  dropdown?: DropdownEntry[]
}

const NAV_ITEMS: NavEntry[] = [
  { label: 'Foundations', href: '/foundations' },
  {
    label: 'Standards',
    href: '#',
    dropdown: [
      {
        label: 'AS Standards',
        href: '/standards/as',
        description: 'All 32 ICAI Accounting Standards',
      },
      {
        label: 'Ind AS',
        href: '/standards/ind-as',
        description: 'IFRS-aligned Indian standards',
      },
      {
        label: 'IFRS / IAS',
        href: null,
        description: 'Coming Soon',
        disabled: true,
      },
    ],
  },
  { label: 'Company Accounts', href: '/company-accounts' },
  { label: 'Reference', href: '/reference' },
  { label: 'Glossary', href: '/glossary' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [standardsOpen, setStandardsOpen] = useState(false)
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
        setStandardsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) =>
    href !== '#' && (pathname === href || pathname.startsWith(href + '/'))

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-[#E2E1DD]">
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center text-[#1C1C1E] hover:opacity-80 transition-opacity shrink-0"
          aria-label="Accounts.Life — Home"
        >
          <span className="font-sans font-bold text-lg tracking-tight">Accounts</span>
          <span className="font-sans font-bold text-lg tracking-tight text-[#4A4A52]">.</span>
          <span className="font-sans font-bold text-lg tracking-tight">Life</span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3] ml-1"
            style={{ marginBottom: '10px' }}
            aria-hidden="true"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-0.5"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setStandardsOpen(true)}
                onMouseLeave={() => setStandardsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith('/standards')
                      ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                      : 'text-[#4A4A52] hover:text-[#1C1C1E] hover:bg-[#F4F3F0]'
                  }`}
                  aria-expanded={standardsOpen}
                  aria-haspopup="listbox"
                  onClick={() => setStandardsOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-150 ${standardsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {standardsOpen && (
                  <div
                    className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-lg border border-[#E2E1DD] shadow-[0_4px_16px_rgba(0,0,0,0.12)] py-1.5 z-50"
                    role="listbox"
                  >
                    {item.dropdown.map((d) =>
                      d.disabled ? (
                        <div
                          key={d.label}
                          className="px-4 py-2.5 opacity-40 cursor-not-allowed"
                        >
                          <span className="block text-sm font-medium text-[#4A4A52]">
                            {d.label}
                          </span>
                          <span className="block text-xs text-[#76767E] mt-0.5">
                            {d.description}
                          </span>
                        </div>
                      ) : (
                        <Link
                          key={d.label}
                          href={d.href!}
                          className="block px-4 py-2.5 hover:bg-[#F4F3F0] transition-colors"
                          onClick={() => setStandardsOpen(false)}
                        >
                          <span className="block text-sm font-medium text-[#1C1C1E]">
                            {d.label}
                          </span>
                          <span className="block text-xs text-[#76767E] mt-0.5">
                            {d.description}
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
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
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="flex items-center justify-center w-10 h-10 rounded-md text-[#4A4A52] hover:bg-[#F4F3F0] hover:text-[#1C1C1E] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-[#4A4A52] hover:bg-[#F4F3F0] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-white overflow-y-auto">
          <nav
            className="px-4 py-6 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            <Link
              href="/foundations"
              className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                isActive('/foundations')
                  ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                  : 'text-[#1C1C1E] hover:bg-[#F4F3F0]'
              }`}
            >
              Foundations
            </Link>

            <div className="py-3 px-4">
              <p className="text-xs font-semibold text-[#76767E] uppercase tracking-wider mb-3">
                Standards
              </p>
              <div className="flex flex-col gap-1">
                <Link
                  href="/standards/as"
                  className="flex flex-col py-2.5 pl-3 pr-2 rounded-lg hover:bg-[#F4F3F0] transition-colors"
                >
                  <span className="text-sm font-medium text-[#1C1C1E]">AS Standards</span>
                  <span className="text-xs text-[#76767E] mt-0.5">All 32 ICAI Accounting Standards</span>
                </Link>
                <Link
                  href="/standards/ind-as"
                  className="flex flex-col py-2.5 pl-3 pr-2 rounded-lg hover:bg-[#F4F3F0] transition-colors"
                >
                  <span className="text-sm font-medium text-[#1C1C1E]">Ind AS</span>
                  <span className="text-xs text-[#76767E] mt-0.5">IFRS-aligned Indian standards</span>
                </Link>
                <div className="flex flex-col py-2.5 pl-3 pr-2 opacity-40 cursor-not-allowed">
                  <span className="text-sm font-medium text-[#4A4A52]">IFRS / IAS</span>
                  <span className="text-xs text-[#76767E] mt-0.5">Coming Soon</span>
                </div>
              </div>
            </div>

            <Link
              href="/company-accounts"
              className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                isActive('/company-accounts')
                  ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                  : 'text-[#1C1C1E] hover:bg-[#F4F3F0]'
              }`}
            >
              Company Accounts
            </Link>
            <Link
              href="/reference"
              className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                isActive('/reference')
                  ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                  : 'text-[#1C1C1E] hover:bg-[#F4F3F0]'
              }`}
            >
              Reference
            </Link>
            <Link
              href="/glossary"
              className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                isActive('/glossary')
                  ? 'text-[#2D5BE3] bg-[#EEF2FD]'
                  : 'text-[#1C1C1E] hover:bg-[#F4F3F0]'
              }`}
            >
              Glossary
            </Link>

            {/* Search CTA in mobile */}
            <div className="mt-4 pt-4 border-t border-[#E2E1DD]">
              <Link
                href="/search"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#4A4A52] hover:bg-[#F4F3F0] transition-colors"
              >
                <Search size={18} />
                Search
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
