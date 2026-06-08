import { CheckCircle2, Clock, Circle } from 'lucide-react'
import type { VerificationLevel } from '@/lib/types'

interface VerificationBadgeProps {
  level: VerificationLevel
  size?: 'sm' | 'md'
}

const CONFIG: Record<
  VerificationLevel,
  {
    label: string
    icon: React.ElementType
    bg: string
    color: string
  }
> = {
  VERIFIED: {
    label: 'Verified',
    icon: CheckCircle2,
    bg: '#E8F7EE',
    color: '#1A7A4A',
  },
  DRAFT: {
    label: 'Draft',
    icon: Clock,
    bg: '#EEF2FD',
    color: '#2D5BE3',
  },
  PLACEHOLDER: {
    label: 'Placeholder',
    icon: Circle,
    bg: '#F4F3F0',
    color: '#76767E',
  },
}

export default function VerificationBadge({
  level,
  size = 'md',
}: VerificationBadgeProps) {
  const config = CONFIG[level]
  const Icon = config.icon
  const iconSize = size === 'sm' ? 10 : 12
  const paddingClass = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full text-xs font-medium font-sans ${paddingClass}`}
      style={{ backgroundColor: config.bg, color: config.color }}
      role="status"
      aria-label={`Verification status: ${config.label}`}
    >
      <Icon size={iconSize} aria-hidden="true" />
      {config.label}
    </span>
  )
}
