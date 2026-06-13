'use client'

import { usePathname } from 'next/navigation'

interface FooterWrapperProps {
  children: React.ReactNode
}

export default function FooterWrapper({ children }: FooterWrapperProps) {
  const pathname = usePathname()
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/standards/learning') ||
    pathname.startsWith('/standards/as') ||
    pathname.startsWith('/standards/ind-as')
  ) {
    return null
  }
  return <>{children}</>
}
