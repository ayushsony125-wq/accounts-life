import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy | Accounts.Life',
  description: 'Privacy policy and data protection guidelines for Accounts.Life.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
        className="mb-6"
      />
      <main className="max-w-3xl min-w-0">
        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight mb-6">
          Privacy Policy
        </h1>
        <div className="prose prose-slate font-reading text-[#4A4A52] leading-relaxed space-y-4">
          <p>
            At Accounts.Life, we take privacy and data security seriously. This Privacy Policy describes how we collect, use, and protect your information.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] pt-4">1. Information We Collect</h2>
          <p>
            Accounts.Life is primarily an educational resources directory. We do not require users to create accounts or submit personal information to read our reference guides, standard checklists, or glossary database.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] pt-4">2. Cookies and Analytics</h2>
          <p>
            We may use minor cookies or local storage elements to save your reading preferences, such as system theme configurations or dashboard layout views. No tracking cookies are shared with external advertising platforms.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] pt-4">3. External Links</h2>
          <p>
            Our library contains references to external regulatory organizations like ICAI, MCA, and IASB. We are not responsible for the privacy setups of these third-party platforms.
          </p>
        </div>
      </main>
    </div>
  )
}
