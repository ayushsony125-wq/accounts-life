import Link from 'next/link'
import { getHomepageConfig } from '@/app/admin/actions'

const DOMAINS_LINKS = [
  { label: 'Accounts', href: '/accounts' },
  { label: 'Audit', href: '/search?q=Audit' },
  { label: 'Income Tax', href: '/search?q=Income+Tax' },
  { label: 'GST', href: '/search?q=GST' },
  { label: 'Corporate & Laws', href: '/search?q=Corporate+Law' },
  { label: 'Finance & Other', href: '/financial-analysis' },
]

const RESOURCES_LINKS = [
  { label: 'Standards Library', href: '/standards/as' },
  { label: 'Section Finder', href: '/search' },
  { label: 'Case Laws', href: '/search?q=Case+Laws' },
  { label: 'Forms & Checklists', href: '/search?q=Forms' },
  { label: 'Calculators', href: '/search?q=Calculators' },
  { label: 'Latest Updates', href: '/search' },
]

const PLATFORM_LINKS = [
  { label: 'Search', href: '/search' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Sitemap', href: '/sitemap.xml' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const CITING_AUTHORITIES = [
  {
    name: 'ICAI',
    icon: (
      <svg className="w-5 h-5 text-[#9EAFCE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v10M8 12h8" />
      </svg>
    ),
  },
  {
    name: 'MCA',
    icon: (
      <svg className="w-5 h-5 text-[#9EAFCE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 21h16M4 10h16M12 3v7M8 21v-11M16 21v-11" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'CBDT',
    icon: (
      <svg className="w-5 h-5 text-[#9EAFCE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    ),
  },
  {
    name: 'CBIC',
    icon: (
      <svg className="w-5 h-5 text-[#9EAFCE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'RBI',
    icon: (
      <svg className="w-5 h-5 text-[#9EAFCE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6" />
      </svg>
    ),
  },
]

export default async function Footer() {
  const footerConfig = (await getHomepageConfig('footer_config', null)) as any
  const domainsLinks = footerConfig?.domainsLinks || DOMAINS_LINKS
  const resourcesLinks = footerConfig?.resourcesLinks || RESOURCES_LINKS
  const platformLinks = footerConfig?.platformLinks || PLATFORM_LINKS

  return (
    <footer className="bg-[#0B0F19] text-gray-400 border-t border-[#1E2640] font-sans">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        
        {/* ─── Main grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          
          {/* Column 1 — Brand & Details */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 group w-fit"
              aria-label="Accounts.One — Home"
            >
              {/* Premium A1 Geometric logo */}
              <svg className="w-[42px] h-[34px] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLogoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="footerLogoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M4 28L14 6H19L9 28H4Z" fill="url(#footerLogoBlue)" />
                <path d="M10.5 19H20V23H8.5L10.5 19Z" fill="url(#footerLogoBlue)" />
                <path d="M16 10L20 6H25V28H20V11L16 15V10Z" fill="url(#footerLogoGreen)" />
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-sans font-bold text-[18px] tracking-tight text-white group-hover:text-[#2D5BE3] transition-colors">Accounts</span>
                  <span className="font-sans font-bold text-[18px] tracking-tight text-[#2D5BE3]">.</span>
                  <span className="font-sans font-bold text-[18px] tracking-tight text-white group-hover:text-[#2D5BE3] transition-colors">One</span>
                </div>
                <span className="text-[10px] text-[#9EAFCE] font-medium leading-none mt-0.5 whitespace-nowrap">
                  The Operating System for Professional Excellence
                </span>
              </div>
            </Link>

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9EAFCE] mt-4 mb-3">
              Professional knowledge platform for
            </p>
            <ul className="flex flex-col gap-1.5">
              <li className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                <span className="w-1 h-1 rounded-full bg-[#2D5BE3] shrink-0" aria-hidden="true"></span>
                Accounts
              </li>
              <li className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                <span className="w-1 h-1 rounded-full bg-[#2D5BE3] shrink-0" aria-hidden="true"></span>
                Audit
              </li>
              <li className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                <span className="w-1 h-1 rounded-full bg-[#2D5BE3] shrink-0" aria-hidden="true"></span>
                Income Tax
              </li>
              <li className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                <span className="w-1 h-1 rounded-full bg-[#2D5BE3] shrink-0" aria-hidden="true"></span>
                GST
              </li>
              <li className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                <span className="w-1 h-1 rounded-full bg-[#2D5BE3] shrink-0" aria-hidden="true"></span>
                Corporate Laws
              </li>
              <li className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                <span className="w-1 h-1 rounded-full bg-[#2D5BE3] shrink-0" aria-hidden="true"></span>
                Finance & Other
              </li>
            </ul>
          </div>

          {/* Column 2 — Domains */}
          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">
              Domains
            </h3>
            <ul className="space-y-2.5">
              {domainsLinks.map((link: any) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9EAFCE] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourcesLinks.map((link: any) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9EAFCE] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Platform */}
          <div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link: any) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9EAFCE] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ─── Bottom bar ─── */}
        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {/* Left: copyright */}
          <p className="text-xs text-[#9EAFCE]">
            © {new Date().getFullYear()} Accounts.One
          </p>

          {/* Right: legal */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-[#9EAFCE] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#9EAFCE] hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
