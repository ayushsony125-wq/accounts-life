import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { StaticDomainData } from '@/lib/types'

interface SubdomainNavProps {
  domain: StaticDomainData
  activeSub?: string
}

/**
 * Left-column subdomain navigator used on domain landing pages.
 * Sticky on desktop, collapsible on mobile.
 */
export default function SubdomainNav({ domain, activeSub }: SubdomainNavProps) {
  return (
    <nav aria-label={`${domain.domainName} sections`} className="w-full">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: domain.domainColorHex }}
      >
        {domain.domainCode}
      </p>
      <ul className="space-y-0.5">
        {domain.subdomains.map((sub) => {
          const isActive = activeSub === sub.slug
          return (
            <li key={sub.slug}>
              <Link
                href={`/${domain.domainSlug}/${sub.slug}`}
                className={`flex items-center justify-between group px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'font-semibold bg-[#EEF2FD] text-[#2D5BE3]'
                    : 'text-[#4A4A52] hover:bg-[#F4F3F0] hover:text-[#1C1C1E]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="truncate">{sub.name}</span>
                <span className="text-xs text-[#A0A0A8] shrink-0 ml-2">
                  {sub.entryCount > 0 ? sub.entryCount : ''}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Coming soon note */}
      {domain.domainStatus === 'PARTIAL' && (
        <div className="mt-4 flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF6E4] border border-[#FDE68A]">
          <Clock size={13} className="text-[#B45309] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-[#B45309] leading-relaxed">
            More subdomains being added. Check back soon.
          </p>
        </div>
      )}
    </nav>
  )
}
