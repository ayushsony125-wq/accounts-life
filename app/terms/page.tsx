import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Terms of Use | Accounts.Life',
  description: 'Terms of use and disclaimer policy for Accounts.Life.',
}

export default function TermsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Use' },
        ]}
        className="mb-6"
      />
      <main className="max-w-3xl min-w-0">
        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight mb-6">
          Terms of Use
        </h1>
        <div className="prose prose-slate font-reading text-[#4A4A52] leading-relaxed space-y-4">
          <p>
            Welcome to Accounts.Life. By accessing our website, you agree to comply with and be bound by the following terms.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] pt-4">1. Use of Content</h2>
          <p>
            The explanations, journal entries, illustrations, and commentary guides are prepared for educational reference only. They do not constitute official financial advisory statements.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] pt-4">2. Intellectual Property</h2>
          <p>
            All custom learning paths, taxonomies, and visual presentations belong to Accounts.Life. Official regulatory text and citations quoted remain the copyright of their respective bodies (ICAI, MCA, etc.).
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] pt-4">3. Disclaimers</h2>
          <p>
            While we strive for absolute accuracy and update content against standard modifications, we provide all materials on an &ldquo;as-is&rdquo; basis. Always cross-reference statutory regulations for official corporate auditing.
          </p>
        </div>
      </main>
    </div>
  )
}
