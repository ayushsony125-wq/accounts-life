import type { Metadata } from 'next'
import BackButton from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title: 'About Us | Accounts.One',
  description: 'Learn about Accounts.One, the operating system for professional excellence.',
}

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath="/" />
      </div>
      <main className="max-w-3xl min-w-0">
        <h1 className="text-3xl font-bold text-[#1C1C1E] dark:text-white tracking-tight mb-6">
          About Accounts.One
        </h1>
        <div className="prose prose-slate font-reading text-[#4A4A52] dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            Accounts.One is designed as the ultimate knowledge repository and operating system for professional excellence. We organize the vast, complex world of statutory regulations, standards, case laws, and guidelines into an easily searchable, highly structured platform.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">Our Mission</h2>
          <p>
            Our mission is to empower professionals (Chartered Accountants, Company Secretaries, Cost Accountants, and financial consultants) with trusted explanations, exact legal support, official sources, practical notes, and curated tools. By bringing official guidelines from bodies such as ICAI, MCA, CBDT, CBIC, RBI, and SEBI into a unified workspace, we help professionals save time and ensure compliance.
          </p>
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">Accuracy First</h2>
          <p>
            Every piece of guidance, standard, and checklist available on Accounts.One is mapped back to its original official source. We verify all regulatory changes in real-time to provide the most reliable resources for professional workflows.
          </p>
        </div>
      </main>
    </div>
  )
}
