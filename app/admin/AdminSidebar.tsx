'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from './actions'
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  LogOut,
  Home,
  BookMarked,
  Activity,
  Settings,
  ChevronRight,
  Globe,
  PlusCircle,
  Upload,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true, disabled: false },
      { label: 'Activity Log', href: '/admin/activity', icon: Activity, disabled: false },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'All Entries', href: '/admin/entries', icon: BookOpen, disabled: false },
      { label: 'Standards', href: '/admin/standards', icon: BookMarked, disabled: false },
      { label: 'Glossary', href: '/admin/glossary', icon: Layers, disabled: false },
      { label: 'Domains', href: '/admin/domains', icon: Globe, disabled: false },
    ],
  },
  {
    label: 'Website',
    items: [
      { label: 'Homepage Config', href: '/admin/homepage', icon: Home, disabled: false },
      { label: 'Media Library', href: '/admin/media', icon: Upload, disabled: false },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-56 bg-[#0F1117] text-white flex flex-col z-50 border-r border-white/5">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-white/5 flex items-center gap-2.5 shrink-0">
        <div className="w-7 h-7 rounded-md bg-[#2D5BE3] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 28L14 6H19L9 28H4Z" fill="white" />
            <path d="M10.5 19H20V23H8.5L10.5 19Z" fill="white" />
            <path d="M16 10L20 6H25V28H20V11L16 15V10Z" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold leading-tight">
            Accounts<span className="text-[#2D5BE3]">.</span>One
          </div>
          <div className="text-[10px] text-white/40 font-medium leading-tight">CMS Admin</div>
        </div>
      </div>

      {/* Quick create button */}
      <div className="px-3 py-3 border-b border-white/5 shrink-0">
        <Link
          href="/admin/entries/new"
          className="w-full flex items-center justify-center gap-1.5 bg-[#2D5BE3] hover:bg-[#3B6BF0] text-white px-3 py-2 rounded-md text-xs font-semibold transition-all shadow-sm"
        >
          <PlusCircle size={13} />
          New Entry
        </Link>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-2 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = !(item as any).disabled && isActive(item.href, (item as any).exact)

                if ((item as any).disabled) {
                  return (
                    <div
                      key={item.href}
                      title="Coming soon"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-white/20 cursor-not-allowed select-none"
                    >
                      <Icon size={14} className="text-white/15" />
                      <span>{item.label}</span>
                      <span className="ml-auto text-[9px] bg-white/10 text-white/30 px-1.5 py-0.5 rounded font-medium">
                        Soon
                      </span>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all group ${
                      active
                        ? 'bg-[#2D5BE3]/20 text-white'
                        : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                    }`}
                  >
                    <Icon
                      size={14}
                      className={active ? 'text-[#6B93F7]' : 'text-white/30 group-hover:text-white/60'}
                    />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={10} className="ml-auto text-[#6B93F7]" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-3 border-t border-white/5 space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
        >
          <Globe size={13} />
          <span>View Public Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={13} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
