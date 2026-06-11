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
      className={`rounded-lg border border-[#E2E1DD] dark:border-gray-800 overflow-hidden my-4 ${className}`}
      role="note"
      aria-label={label ?? 'Formula'}
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4F3F0] dark:bg-[#111726] border-b border-[#E2E1DD] dark:border-gray-800">
        <p className="text-xs font-semibold text-[#4A4A52] dark:text-gray-300 uppercase tracking-widest">
          {label ?? 'Formula'}
        </p>
        <button
          onClick={handleCopy}
          aria-label="Copy formula"
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#4A4A52] dark:text-gray-400 rounded hover:bg-[#EEECEA] dark:hover:bg-gray-800 transition-colors"
        >
          {copied ? <Check size={12} className="text-[#1A7A4A]" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Formula display */}
      <div className="px-4 py-4 bg-white dark:bg-[#1E2640]">
        <pre className="font-mono-je text-base text-[#1C1C1E] dark:text-white whitespace-pre-wrap leading-relaxed text-center">
          {formula}
        </pre>
      </div>

      {/* Note */}
      {note && (
        <div className="px-4 py-2.5 bg-[#FAFAF8] dark:bg-[#0B0F19] border-t border-[#E2E1DD] dark:border-gray-800">
          <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">{note}</p>
        </div>
      )}
    </div>
  )
}
