import type { Metadata } from 'next'
import BackButton from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title: 'Finance & Financial Analysis | Accounts.One',
  description: 'Financial analysis, ratio analysis, capital budgeting, and decision-making tools.',
}

export default function FinancialAnalysisPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath="/" />
      </div>
      <main className="max-w-3xl min-w-0">
        <h1 className="text-3xl font-bold text-[#1C1C1E] dark:text-white tracking-tight mb-6">
          Financial Analysis & Decision Tools
        </h1>
        <div className="prose prose-slate font-reading text-[#4A4A52] dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            Welcome to the Finance and Financial Analysis resources hub. This section contains structured guidance, tools, and notes on critical corporate finance topics:
          </p>
          
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">1. Ratio Analysis & Benchmarks</h2>
          <p>
            Access definitions, formulas, and practical interpretations for key financial ratios including profitability ratios, liquidity ratios, leverage ratios, and efficiency metrics.
          </p>
          
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">2. Capital Budgeting & Cash Flow</h2>
          <p>
            Learn about project appraisal techniques such as Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period, and Capital Rationing with practical step-by-step examples.
          </p>
          
          <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white pt-4">3. Cost of Capital & Valuation</h2>
          <p>
            Understand the weighted average cost of capital (WACC), cost of equity (CAPM model), cost of debt, and basic business valuation methodologies used by financial professionals.
          </p>
        </div>
      </main>
    </div>
  )
}
