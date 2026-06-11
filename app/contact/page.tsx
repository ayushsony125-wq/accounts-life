import type { Metadata } from 'next'
import BackButton from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title: 'Contact Us | Accounts.One',
  description: 'Get in touch with the Accounts.One support and editorial team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath="/" />
      </div>
      <main className="max-w-3xl min-w-0">
        <h1 className="text-3xl font-bold text-[#1C1C1E] dark:text-white tracking-tight mb-6">
          Contact Accounts.One
        </h1>
        <div className="prose prose-slate font-reading text-[#4A4A52] dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            Have feedback on our reference guides? Spot an update that needs to be added? Or want to learn about professional career opportunities with us? Get in touch with our team.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">Email Support</h2>
          <p>
            For general inquiries, compliance questions, or editorial feedback, please email us at:
            <br />
            <a href="mailto:support@accounts.one" className="text-[#2D5BE3] hover:underline font-semibold mt-1 inline-block">
              support@accounts.one
            </a>
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">Careers</h2>
          <p>
            We are always looking for content editors, Chartered Accountants, and technical writers who are passionate about structuring professional accounting and tax knowledge. Write to us at <a href="mailto:careers@accounts.one" className="text-[#2D5BE3] hover:underline">careers@accounts.one</a> with your background and area of expertise.
          </p>
        </div>
      </main>
    </div>
  )
}
