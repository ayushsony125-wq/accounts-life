import { FileText, Video, Link as LinkIcon, ExternalLink } from 'lucide-react'
import type { EntryResource } from '@/lib/types'

interface ReferencesBlockProps {
  resources: EntryResource[]
  heading?: string
}

const TYPE_CONFIG: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  PDF: { icon: FileText, label: 'Official PDF', color: '#C0392B' },
  VIDEO: { icon: Video, label: 'Video', color: '#B45309' },
  REFERENCE: { icon: LinkIcon, label: 'Reference', color: '#2D5BE3' },
}

const SOURCE_LABEL: Record<string, string> = {
  ICAI_OFFICIAL: 'ICAI Official',
  MCA: 'MCA',
  IASB: 'IASB',
  EXTERNAL: 'External',
}

export default function ReferencesBlock({
  resources,
  heading = 'Official References & Resources',
}: ReferencesBlockProps) {
  if (resources.length === 0) return null

  return (
    <section aria-labelledby="references-heading" className="mt-10 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
      <h2
        id="references-heading"
        className="text-base font-bold text-[#1C1C1E] dark:text-white mb-5 tracking-tight"
      >
        {heading}
      </h2>
      <ul className="space-y-2" role="list">
        {resources.map((resource) => {
          const config = TYPE_CONFIG[resource.resourceType] ?? TYPE_CONFIG.REFERENCE
          const Icon = config.icon
          return (
            <li key={resource.id}>
              <div className="flex items-start gap-3 p-3.5 rounded-lg border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640]">
                <Icon
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ color: config.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    {resource.resourceUrl ? (
                      <a
                        href={resource.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#2D5BE3] dark:text-[#60A5FA] hover:underline inline-flex items-center gap-1"
                      >
                        {resource.resourceTitle}
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-[#1C1C1E] dark:text-white">{resource.resourceTitle}</span>
                    )}
                    <span className="text-xs text-[#A0A0A8] dark:text-gray-500 font-medium">
                      {SOURCE_LABEL[resource.sourceType] ?? resource.sourceType}
                    </span>
                    {resource.refYear && (
                      <span className="text-xs text-[#A0A0A8] dark:text-gray-500">({resource.refYear})</span>
                    )}
                  </div>
                  {resource.videoChannel && (
                    <p className="text-xs text-[#76767E] dark:text-gray-400 mt-0.5">Channel: {resource.videoChannel}</p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
