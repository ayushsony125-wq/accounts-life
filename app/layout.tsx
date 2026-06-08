import type { Metadata } from 'next'
import { Inter, Lora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://accounts.life'),
  title: {
    template: '%s | Accounts.Life',
    default: 'Accounts.Life — The Accounting Operating System',
  },
  description:
    'The most complete, structured, and verified accounting knowledge platform. Organized concepts, all 32 AS standards, Ind AS, journal entries, glossary, and official sources — in one place.',
  keywords: [
    'accounting',
    'AS standards',
    'Ind AS',
    'ICAI',
    'CA',
    'journal entries',
    'accounting concepts',
    'Indian GAAP',
  ],
  authors: [{ name: 'AK' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://accounts.life',
    siteName: 'Accounts.Life',
    title: 'Accounts.Life — The Accounting Operating System',
    description:
      'The most complete, structured, and verified accounting knowledge platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounts.Life — The Accounting Operating System',
    description: 'Structured. Verified. Authoritative. Accounting knowledge organized.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-[#FAFAF8] text-[#1C1C1E] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2D5BE3] focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
