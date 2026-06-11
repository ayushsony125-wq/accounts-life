'use client'

import { usePathname } from 'next/navigation'

interface FooterWrapperProps {
  children: React.ReactNode
}

export default function FooterWrapper({ children }: FooterWrapperProps) {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) {
    return null
  }
  return <>{children}</>
}
