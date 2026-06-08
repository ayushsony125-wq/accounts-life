import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'
import type { NoteType } from '@/lib/types'

interface CalloutProps {
  type: NoteType
  title?: string
  children: React.ReactNode
  className?: string
}

const CONFIG: Record<
  NoteType,
  { icon: React.ElementType; label: string; cls: string }
> = {
  IMPORTANT: {
    icon: AlertCircle,
    label: 'Important',
    cls: 'callout callout-important',
  },
  NOTE: {
    icon: Info,
    label: 'Note',
    cls: 'callout callout-note',
  },
  TIP: {
    icon: Lightbulb,
    label: 'Tip',
    cls: 'callout callout-tip',
  },
  CAUTION: {
    icon: AlertTriangle,
    label: 'Caution',
    cls: 'callout callout-caution',
  },
}

export default function Callout({ type, title, children, className = '' }: CalloutProps) {
  const { icon: Icon, label, cls } = CONFIG[type]

  return (
    <div className={`${cls} ${className}`} role="note" aria-label={title ?? label}>
      <Icon
        size={18}
        className="shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div className="min-w-0">
        {title && (
          <p className="text-sm font-semibold mb-1">{title}</p>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
