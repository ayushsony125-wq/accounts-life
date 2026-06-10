import Link from 'next/link'

const DOMAINS_LINKS = [
  { label: 'Accounts', href: '/foundations' },
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

export default function Footer() {
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
              <svg className="w-[52px] h-[40px] shrink-0" viewBox="5 15 90 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="skewX(-10) translate(5, 0)">
                  <path d="M38 18 L10 85 H26 L32 68 H54 L60 85 H76 L48 18 H38 Z M43 36 L50 54 H36 Z" fill="#2D5BE3" fillRule="evenodd" />
                  <path d="M74 35 L60 45 V55 L72 46 V85 H86 V35 H74 Z" fill="#1A7A4A" />
                </g>
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
              {DOMAINS_LINKS.map((link) => (
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
              {RESOURCES_LINKS.map((link) => (
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
              {PLATFORM_LINKS.map((link) => (
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

        {/* ─── Citing Authorities Bar ─── */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.07)]">
          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#9EAFCE]">
              Official Citing Authorities
            </span>
            <div className="flex flex-wrap items-center gap-6 opacity-60 hover:opacity-90 transition-opacity">
              {CITING_AUTHORITIES.map((auth) => (
                <div
                  key={auth.name}
                  className="flex items-center gap-1.5 text-white font-bold text-xs tracking-wider"
                >
                  {auth.icon}
                  <span>{auth.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {/* Left: copyright */}
          <p className="text-xs text-[#9EAFCE]">
            © 2026 Accounts.One
          </p>

          {/* Right: source credits + legal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <p className="text-[10px] text-[#9EAFCE] tracking-wide">
              Built on Official Sources&nbsp;•&nbsp;ICAI&nbsp;•&nbsp;MCA&nbsp;•&nbsp;CBDT&nbsp;•&nbsp;CBIC&nbsp;•&nbsp;RBI
            </p>
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

      </div>
    </footer>
  )
}
