'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from './actions'
import { LayoutDashboard, BookOpen, Layers, LogOut, ArrowLeft, Home } from 'lucide-react'

export default function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Homepage Config', href: '/admin/homepage', icon: Home },
    { label: 'Content Manager', href: '/admin/entries', icon: BookOpen },
    { label: 'Glossary Manager', href: '/admin/glossary', icon: Layers },
    { label: 'Domains Config', href: '/admin/domains', icon: Layers },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 h-14 bg-[#1A1E2A] text-[#F0F0EF] shadow-md px-6 flex items-center justify-between">
      {/* Brand logo & public site link */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-[30px] h-[24px] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="adminLogoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="adminLogoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path d="M4 28L14 6H19L9 28H4Z" fill="url(#adminLogoBlue)" />
            <path d="M10.5 19H20V23H8.5L10.5 19Z" fill="url(#adminLogoBlue)" />
            <path d="M16 10L20 6H25V28H20V11L16 15V10Z" fill="url(#adminLogoGreen)" />
          </svg>
          <div className="flex items-center">
            <span className="font-sans font-bold text-sm tracking-tight">Accounts</span>
            <span className="font-sans font-bold text-sm tracking-tight text-[#2D5BE3]">.</span>
            <span className="font-sans font-bold text-sm tracking-tight">One</span>
            <span className="text-[10px] bg-[#2D5BE3] text-white px-1.5 py-0.5 rounded-sm font-semibold ml-2">CMS</span>
          </div>
        </div>
        <Link
          href="/"
          className="text-xs text-[#A0A0A8] hover:text-[#F0F0EF] transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={10} /> Public Site
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                active
                  ? 'bg-[#2D5BE3] text-white'
                  : 'text-[#A0A0A8] hover:text-[#F0F0EF] hover:bg-white/5'
              }`}
            >
              <Icon size={12} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Actions */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-[#A0A0A8] hover:text-[#C0392B] text-xs font-semibold px-2 py-1 rounded transition-colors"
          aria-label="Log out of CMS"
        >
          <LogOut size={12} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
