import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-20 flex flex-col items-center text-center">
      <p className="text-8xl font-bold text-[#E2E1DD] mb-4" aria-hidden="true">404</p>
      <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight mb-3">
        Page not found
      </h1>
      <p className="text-base text-[#4A4A52] mb-8 max-w-md leading-relaxed">
        The entry, standard, or page you are looking for does not exist yet, or may have moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#2D5BE3] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#2450CC] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 border border-[#E2E1DD] text-[#1C1C1E] px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#F4F3F0] transition-colors"
        >
          <Search size={14} />
          Search Entries
        </Link>
      </div>
    </div>
  )
}
