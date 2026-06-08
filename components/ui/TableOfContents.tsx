'use client'

import { useEffect, useRef, useState } from 'react'
import type { TableOfContentsItem } from '@/lib/types'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  /** Label shown above the list. Defaults to "On this page" */
  label?: string
}

export default function TableOfContents({ items, label = 'On this page' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const allIds = flattenIds(items)
    if (allIds.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost entry that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0,
      }
    )

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-w-[220px] w-full"
    >
      <p className="text-xs font-semibold text-[#76767E] uppercase tracking-widest mb-3">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-snug py-1 transition-colors border-l-2 pl-3 ${
                item.level === 1
                  ? 'font-medium'
                  : item.level === 2
                  ? 'font-normal pl-5'
                  : 'font-normal pl-7 text-xs'
              } ${
                activeId === item.id
                  ? 'text-[#2D5BE3] border-[#2D5BE3]'
                  : 'text-[#76767E] border-transparent hover:text-[#1C1C1E] hover:border-[#C8C7C2]'
              }`}
            >
              {item.label}
            </a>
            {item.children && item.children.length > 0 && (
              <ul className="mt-0.5">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className={`block text-xs leading-snug py-1 transition-colors border-l-2 pl-7 ${
                        activeId === child.id
                          ? 'text-[#2D5BE3] border-[#2D5BE3]'
                          : 'text-[#76767E] border-transparent hover:text-[#1C1C1E] hover:border-[#C8C7C2]'
                      }`}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function flattenIds(items: TableOfContentsItem[]): string[] {
  const ids: string[] = []
  for (const item of items) {
    ids.push(item.id)
    if (item.children) ids.push(...flattenIds(item.children))
  }
  return ids
}
