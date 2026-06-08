'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface FormulaBlockProps {
  formula: string
  label?: string
  note?: string
  className?: string
}

export default function FormulaBlock({ formula, label, note, className = '' }: FormulaBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* silent */
    }
  }

  return (
    <div
      className={`rounded-lg border border-[#E2E1DD] overflow-hidden my-4 ${className}`}
      role="note"
      aria-label={label ?? 'Formula'}
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4F3F0] border-b border-[#E2E1DD]">
        <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-widest">
          {label ?? 'Formula'}
        </p>
        <button
          onClick={handleCopy}
          aria-label="Copy formula"
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#4A4A52] rounded hover:bg-[#EEECEA] transition-colors"
        >
          {copied ? <Check size={12} className="text-[#1A7A4A]" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Formula display */}
      <div className="px-4 py-4 bg-white">
        <pre className="font-mono-je text-base text-[#1C1C1E] whitespace-pre-wrap leading-relaxed text-center">
          {formula}
        </pre>
      </div>

      {/* Note */}
      {note && (
        <div className="px-4 py-2.5 bg-[#FAFAF8] border-t border-[#E2E1DD]">
          <p className="text-xs text-[#76767E] leading-relaxed">{note}</p>
        </div>
      )}
    </div>
  )
}
