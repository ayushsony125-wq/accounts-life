'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateDomainMeta } from '../actions'
import { Edit3, Check, X, ShieldAlert } from 'lucide-react'

interface DomainsListClientProps {
  initialDomains: any[]
}

export default function DomainsListClient({ initialDomains }: DomainsListClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [domains, setDomains] = useState(initialDomains)
  const [editingCode, setEditingCode] = useState<string | null>(null)
  
  // Form edit fields
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')

  const startEditing = (dom: any) => {
    setEditingCode(dom.domainCode)
    setTagline(dom.domainTagline || '')
    setDescription(dom.domainDescription || '')
  }

  const cancelEditing = () => {
    setEditingCode(null)
  }

  const handleSave = (code: string) => {
    startTransition(async () => {
      try {
        const res = await updateDomainMeta(code, tagline, description)
        if (res.success) {
          setDomains((prev) =>
            prev.map((d) =>
              d.domainCode === code
                ? { ...d, domainTagline: tagline, domainDescription: description }
                : d
            )
          )
          setEditingCode(null)
          router.refresh()
        } else {
          alert('Failed to update domain.')
        }
      } catch (e) {
        alert('An error occurred while saving domain changes.')
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
          Domain Configurator
        </h1>
        <p className="text-xs text-[#76767E] mt-1">
          Customize taglines, explanations, and review subdomain mappings for the 12 curriculum domains.
        </p>
      </div>

      {/* Grid of domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((dom) => {
          const isEditing = editingCode === dom.domainCode

          return (
            <div
              key={dom.id}
              className="bg-white border border-[#E2E1DD] rounded-lg p-5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-xs relative"
            >
              {/* Domain Color border indicator */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-lg"
                style={{ backgroundColor: dom.domainColorHex || '#2D5BE3' }}
              />

              <div className="space-y-4 pt-1">
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span
                      className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded font-mono"
                      style={{
                        backgroundColor: `${dom.domainColorHex}12`,
                        color: dom.domainColorHex,
                      }}
                    >
                      {dom.domainCode}
                    </span>
                    <h2 className="text-base font-bold text-[#1C1C1E] mt-1.5">
                      {dom.domainName}
                    </h2>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => startEditing(dom)}
                      className="p-1 text-[#76767E] hover:text-[#2D5BE3] transition-colors"
                      title="Edit Metadata"
                    >
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>

                {/* Edit Form or Display */}
                {isEditing ? (
                  <div className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                        Domain Tagline
                      </label>
                      <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="w-full px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                        placeholder="Bedrock tagline..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                        Domain Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                        placeholder="Detail explanation..."
                      />
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={cancelEditing}
                        className="p-1 bg-[#F4F3F0] border border-[#E2E1DD] hover:bg-[#EEECEA] text-[#76767E] rounded transition-colors"
                        title="Cancel"
                      >
                        <X size={12} />
                      </button>
                      <button
                        onClick={() => handleSave(dom.domainCode)}
                        disabled={isPending}
                        className="p-1 bg-[#1A7A4A] text-white hover:bg-[#15613B] rounded transition-colors disabled:opacity-50"
                        title="Save Changes"
                      >
                        <Check size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-[#4A4A52] italic">
                      &ldquo;{dom.domainTagline || 'No tagline configured yet.'}&rdquo;
                    </p>
                    <p className="text-[#76767E] leading-relaxed">
                      {dom.domainDescription || 'No description configured yet.'}
                    </p>
                  </div>
                )}

                {/* Subdomains list */}
                <div className="border-t border-[#E2E1DD] pt-3.5 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#76767E]">
                    Subdomains & Sections ({dom.subdomains?.length || 0})
                  </p>
                  {dom.subdomains && dom.subdomains.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {dom.subdomains.map((sub: any, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="bg-[#F4F3F0] text-[#4A4A52] px-2 py-0.5 rounded text-[10px] font-medium"
                          title={sub.slug}
                        >
                          {sub.name || sub.subdomainName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-[#A0A0A8] italic">No subdomains associated.</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
