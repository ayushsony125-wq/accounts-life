import Link from 'next/link'
import type { DomainStatus } from '@/lib/types'

interface DomainPillProps {
  name: string
  slug: string
  color: string
  status?: DomainStatus
}

export default function DomainPill({
  name,
  slug,
  color,
  status = 'ACTIVE',
}: DomainPillProps) {
  const isComingSoon = status === 'COMING_SOON'

  const pill = (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans transition-opacity"
      style={{
        backgroundColor: `${color}18`,
        color: isComingSoon ? '#76767E' : color,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: isComingSoon ? '#A0A0A8' : color }}
        aria-hidden="true"
      />
      {name}
      {isComingSoon && (
        <span className="text-[10px] opacity-60 ml-0.5">(Soon)</span>
      )}
    </span>
  )

  if (isComingSoon) {
    return <div className="opacity-60 cursor-default inline-flex">{pill}</div>
  }

  return (
    <Link href={`/${slug}`} className="hover:opacity-80 transition-opacity inline-flex">
      {pill}
    </Link>
  )
}
