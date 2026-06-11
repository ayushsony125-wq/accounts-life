'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { EntryFAQ } from '@/lib/types'

interface FAQBlockProps {
  faqs: EntryFAQ[]
  heading?: string
}

export default function FAQBlock({ faqs, heading = 'Frequently Asked Questions' }: FAQBlockProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  if (faqs.length === 0) return null

  return (
    <section aria-labelledby="faq-heading" className="mt-10 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
      <h2 id="faq-heading" className="text-base font-bold text-[#1C1C1E] dark:text-white mb-5 tracking-tight">
        {heading}
      </h2>
      <dl className="space-y-2">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div
              key={faq.id}
              className="border border-[#E2E1DD] dark:border-gray-800 rounded-lg overflow-hidden"
            >
              <dt>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-q-${faq.id}`}
                  className="flex items-center justify-between w-full px-4 py-3.5 text-left bg-white hover:bg-[#FAFAF8] dark:bg-[#1E2640] dark:hover:bg-gray-800 transition-colors gap-4"
                >
                  <span className="text-sm font-medium text-[#1C1C1E] dark:text-white leading-snug">
                    {faq.faqQuestion}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`shrink-0 text-[#76767E] dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              {isOpen && (
                <dd
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${faq.id}`}
                  className="px-4 py-3.5 text-sm text-[#4A4A52] dark:text-gray-300 font-reading leading-relaxed border-t border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#111726]"
                >
                  {faq.faqAnswer}
                  {faq.faqSourceRef && (
                    <p className="mt-2 text-xs text-[#A0A0A8] dark:text-gray-500 font-sans">Source: {faq.faqSourceRef}</p>
                  )}
                </dd>
              )}
            </div>
          )
        })}
      </dl>
    </section>
  )
}
