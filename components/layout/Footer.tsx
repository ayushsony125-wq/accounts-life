import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
  disabled?: boolean
}

const FOOTER_LINKS: {
  foundations: FooterLink[]
  standards: FooterLink[]
  platform: FooterLink[]
} = {
  foundations: [
    { label: 'Depreciation Accounting', href: '/foundations/depreciation-accounting' },
    { label: 'Double Entry System', href: '/foundations/double-entry-system' },
    { label: 'Bank Reconciliation', href: '/foundations/bank-reconciliation' },
    { label: 'Provisions & Reserves', href: '/foundations/provisions-reserves' },
    { label: 'Partnership Accounting', href: '/foundations/partnership-accounting' },
    { label: 'Bills of Exchange', href: '/foundations/bills-of-exchange' },
  ],
  standards: [
    { label: 'AS Standards', href: '/standards/as' },
    { label: 'Ind AS Standards', href: '/standards/ind-as' },
    { label: 'IFRS (Coming Soon)', href: '/standards/ifrs', disabled: true },
    { label: 'Equivalence Map', href: '/standards/equivalence-map' },
  ],
  platform: [
    { label: 'Glossary', href: '/glossary' },
    { label: 'Search', href: '/search' },
    { label: 'Sitemap', href: '/sitemap' },
    { label: 'All Domains', href: '/sitemap' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1E2A] text-[#F0F0EF]">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-0 mb-4">
              <span className="font-sans font-bold text-xl tracking-tight text-white">Accounts</span>
              <span className="font-sans font-bold text-xl tracking-tight text-[#4A4A52]">.</span>
              <span className="font-sans font-bold text-xl tracking-tight text-white">Life</span>
              <span
                className="w-2 h-2 rounded-full bg-[#2D5BE3] ml-1.5"
                style={{ marginBottom: '12px' }}
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-[#76767E] leading-relaxed mb-2">
              The Accounting Operating System
            </p>
            <p className="text-sm text-[#4A4A52] leading-relaxed tracking-wide">
              Structured · Verified · Authoritative
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="text-xs text-[#4A4A52]">Built by AK</p>
              <p className="text-xs text-[#3A3E4A]">
                Content verified against official ICAI/MCA sources
              </p>
            </div>
          </div>

          {/* Foundations Column */}
          <div>
            <h3 className="text-xs font-semibold text-[#76767E] uppercase tracking-wider mb-4">
              Foundations
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.foundations.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A0A0A8] hover:text-[#F0F0EF] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards Column */}
          <div>
            <h3 className="text-xs font-semibold text-[#76767E] uppercase tracking-wider mb-4">
              Standards
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.standards.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-sm text-[#3A3E4A] cursor-default">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[#A0A0A8] hover:text-[#F0F0EF] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-xs font-semibold text-[#76767E] uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A0A0A8] hover:text-[#F0F0EF] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs text-[#4A4A52] text-center sm:text-left">
            © {new Date().getFullYear()} Accounts.Life · All content verified against official ICAI/MCA sources
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[#4A4A52] hover:text-[#76767E] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#4A4A52] hover:text-[#76767E] transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
