import { ExternalLink, ShieldCheck } from 'lucide-react'

interface AuthorityBlockProps {
  primary: string
  primaryUrl?: string | null
  secondary?: string | null
  paraRef?: string | null
  className?: string
}

export default function AuthorityBlock({
  primary,
  primaryUrl,
  secondary,
  paraRef,
  className = '',
}: AuthorityBlockProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg bg-[#F4F3F0] border border-[#E2E1DD] ${className}`}
      role="note"
      aria-label="Authority source"
    >
      <ShieldCheck size={16} className="text-[#1A7A4A] shrink-0 mt-0.5" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest mb-1">
          Authority Source
        </p>
        <div className="flex flex-wrap items-baseline gap-2">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#2D5BE3] hover:underline inline-flex items-center gap-1"
            >
              {primary}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          ) : (
            <span className="text-sm font-semibold text-[#1C1C1E]">{primary}</span>
          )}
          {paraRef && (
            <span className="text-xs text-[#76767E] font-medium">Para {paraRef}</span>
          )}
        </div>
        {secondary && (
          <p className="text-xs text-[#76767E] mt-1 leading-relaxed">{secondary}</p>
        )}
      </div>
    </div>
  )
}
