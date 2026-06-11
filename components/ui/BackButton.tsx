'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  fallbackPath?: string
  className?: string
}

export default function BackButton({ fallbackPath = '/', className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Safety check for window and history
    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackPath)
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-xs font-bold text-[#4A4A52] hover:text-[#1C1C1E] dark:text-gray-400 dark:hover:text-white transition-all py-1.5 px-3 rounded-md border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:bg-[#F4F3F0] dark:hover:bg-gray-800 hover:border-[#C8C7C2] dark:hover:border-gray-700 shadow-xs shrink-0 select-none ${className}`}
      type="button"
      aria-label="Go back"
    >
      <ArrowLeft size={14} className="stroke-[2.5]" />
      <span>Back</span>
    </button>
  )
}
