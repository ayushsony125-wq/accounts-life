'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from './actions'
import { LayoutDashboard, BookOpen, Layers, LogOut, ArrowLeft } from 'lucide-react'

export default function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Content Manager', href: '/admin/entries', icon: BookOpen },
    { label: 'Glossary Manager', href: '/admin/glossary', icon: Layers },
    { label: 'Domains Config', href: '/admin/domains', icon: Layers },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#1A1E2A] text-[#F0F0EF] shadow-md px-6 flex items-center justify-between">
      {/* Brand logo & public site link */}
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="font-sans font-bold text-sm tracking-tight">Accounts</span>
          <span className="font-sans font-bold text-sm tracking-tight text-[#2D5BE3]">.</span>
          <span className="font-sans font-bold text-sm tracking-tight">Life</span>
          <span className="text-[10px] bg-[#2D5BE3] text-white px-1.5 py-0.5 rounded-sm font-semibold ml-2">CMS</span>
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
