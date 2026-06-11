'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Play
} from 'lucide-react'
import BackButton from '@/components/ui/BackButton'
import TableOfContents from '@/components/ui/TableOfContents'
import VerificationBadge from '@/components/ui/VerificationBadge'
import type { TableOfContentsItem } from '@/lib/types'

interface TopicPageClientProps {
  entry: {
    entryTitle: string
    summary: string
    publishedAt: string | null
    createdAt: string
    updatedAt: string
    wordCount: number | null
    verificationLevel: string
    authorityPrimary: string | null
    authorityPrimaryUrl: string | null
    authoritySecondary: string | null
    examLevelTags: any
    domain: {
      domainName: string
      domainSlug: string
      domainColorHex: string
      domainCode: string
    }
    subdomain: {
      subdomainName: string
      subdomainSlug: string
    }
    entryBody: any
  }
}

export default function TopicPageClient({ entry }: TopicPageClientProps) {
  const body = entry.entryBody
  const colorHex = entry.domain.domainColorHex

  // States for interactive components
  const [legalTab, setLegalTab] = useState<'act' | 'rules' | 'circulars'>('act')
  const [exampleIdx, setExampleIdx] = useState<number>(0)

  // 1. Table of Contents items matching page sections
  const tocItems: TableOfContentsItem[] = [
    { id: 'quick-answer', label: 'Quick Answer', level: 1 },
    { id: 'risk-and-warnings', label: 'Risk & Compliance', level: 1 },
    { id: 'practical-explanation', label: 'Practical Explanation', level: 1 },
    { id: 'practical-ca-notes', label: 'Practical CA Notes', level: 1 },
    { id: 'legal-support', label: 'Legal Support', level: 1 },
    { id: 'applicability-matrix', label: 'Applicability Matrix', level: 1 },
    { id: 'practical-examples', label: 'Practical Examples', level: 1 },
    { id: 'compliance-impact', label: 'Compliance Impact', level: 1 },
    { id: 'common-mistakes', label: 'Common Mistakes', level: 1 },
    { id: 'amendment-history', label: 'Amendment History', level: 1 },
    { id: 'official-sources', label: 'Official Sources', level: 1 },
  ]

  // Format date helper
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10 font-sans">
      
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <BackButton fallbackPath={`/${entry.domain.domainSlug}/${entry.subdomain.subdomainSlug}`} />
      </div>

      {/* Header section */}
      <header className="mb-8 pb-6 border-b border-[#E2E1DD] dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="text-xs font-bold tracking-widest px-2.5 py-0.5 rounded"
            style={{
              backgroundColor: `${colorHex}15`,
              color: colorHex,
            }}
          >
            {entry.domain.domainCode}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E8F7EE] text-[#1A7A4A] flex items-center gap-1">
            🟢 Active
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA]">
            AY 2026-27 Active
          </span>
          <VerificationBadge level={entry.verificationLevel as any} size="sm" />
          {entry.examLevelTags?.map((tag: string) => (
            <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F4F3F0] dark:bg-[#111726] text-[#4A4A52] dark:text-gray-300">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] dark:text-white tracking-tight leading-tight">
          {entry.entryTitle}
        </h1>
        <p className="mt-3 text-lg text-[#4A4A52] dark:text-gray-300 leading-relaxed max-w-3xl">
          {entry.summary}
        </p>

        {/* Audit / Review row */}
        {entry.authoritySecondary && (
          <div className="mt-4 flex items-center gap-2 text-xs text-[#76767E] dark:text-gray-400">
            <Clock size={12} />
            <span>Last reviewed: {formatDate(entry.updatedAt)} — {entry.authoritySecondary}</span>
          </div>
        )}
      </header>

      {/* Core Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        
        {/* Left Sticky Sidebar (TOC) */}
        <aside className="hidden lg:block">
          <TableOfContents items={tocItems} label="Topic Sections" />
        </aside>

        {/* Center Main Column */}
        <main className="min-w-0 max-w-4xl space-y-10">

          {/* Section 1: Topic Header & Risk Level near the top */}
          <section id="risk-and-warnings" className="scroll-mt-24">
            <div className="bg-[#FDEEEE] border border-[#F5C6C0] rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#C0392B] font-bold text-sm uppercase tracking-wider mb-2">
                <AlertTriangle size={18} />
                <span>Risk Level: {body.quickAnswer.riskLevel}</span>
              </div>
              <p className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans">
                {body.quickAnswer.riskReason}
              </p>
            </div>
          </section>

          {/* Section 2: Quick Answer as the primary visual block */}
          <section id="quick-answer" className="scroll-mt-24">
            <div className="bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-[#2D5BE3] rounded-full" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1C1C1E] dark:text-white">
                  Quick Answer Compliance Summary
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-4">
                  <span className="text-xs text-[#76767E] dark:text-gray-400 font-bold uppercase tracking-wider block mb-1">Applicability</span>
                  <p className="text-sm font-bold text-[#1C1C1E] dark:text-white leading-snug">{body.quickAnswer.applicability}</p>
                </div>
                
                <div className="bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-4">
                  <span className="text-xs text-[#76767E] dark:text-gray-400 font-bold uppercase tracking-wider block mb-1">TDS Threshold</span>
                  <p className="text-sm font-bold text-[#1C1C1E] dark:text-white leading-snug">{body.quickAnswer.threshold}</p>
                </div>
                
                <div className="bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-4">
                  <span className="text-xs text-[#76767E] dark:text-gray-400 font-bold uppercase tracking-wider block mb-1">TDS Rate</span>
                  <p className="text-sm font-bold text-[#2D5BE3] dark:text-[#60A5FA] leading-snug">{body.quickAnswer.rate}</p>
                </div>
                
                <div className="bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-4">
                  <span className="text-xs text-[#76767E] dark:text-gray-400 font-bold uppercase tracking-wider block mb-1">Effective Date</span>
                  <p className="text-sm font-bold text-[#1C1C1E] dark:text-white leading-snug">{body.quickAnswer.effectiveDate}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Practical Understanding */}
          <section id="practical-explanation" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Practical Understanding</h2>
            </div>
            <p className="text-base text-[#1C1C1E] dark:text-white leading-relaxed font-sans font-normal">
              {body.explanation.summary}
            </p>
            {body.explanation.paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans font-normal">
                {p}
              </p>
            ))}
          </section>

          {/* Section 4: Dedicated Practical CA Notes Section */}
          <section id="practical-ca-notes" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Practical CA Notes</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {body.practicalCaNotes.map((note: any, idx: number) => (
                <div key={idx} className="bg-[#FEF6E4] border-l-4 border-[#B45309] rounded-r-lg p-5 shadow-xs">
                  <h4 className="text-sm font-bold text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#B45309]" />
                    <span>{note.title}</span>
                  </h4>
                  <p className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans font-normal">
                    {note.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Legal Support Tabbed Section */}
          <section id="legal-support" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-3">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Legal Support</h2>
            </div>

            {/* Legal Tabs */}
            <div className="flex border-b border-[#E2E1DD] dark:border-gray-800 mb-4">
              <button
                onClick={() => setLegalTab('act')}
                className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-[2px] ${
                  legalTab === 'act'
                    ? 'border-[#2D5BE3] text-[#2D5BE3] dark:text-[#60A5FA]'
                    : 'border-transparent text-[#76767E] dark:text-gray-400 hover:text-[#1C1C1E] dark:text-white'
                }`}
              >
                Act Text (Statutory)
              </button>
              <button
                onClick={() => setLegalTab('rules')}
                className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-[2px] ${
                  legalTab === 'rules'
                    ? 'border-[#2D5BE3] text-[#2D5BE3] dark:text-[#60A5FA]'
                    : 'border-transparent text-[#76767E] dark:text-gray-400 hover:text-[#1C1C1E] dark:text-white'
                }`}
              >
                Rules
              </button>
              <button
                onClick={() => setLegalTab('circulars')}
                className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-[2px] ${
                  legalTab === 'circulars'
                    ? 'border-[#2D5BE3] text-[#2D5BE3] dark:text-[#60A5FA]'
                    : 'border-transparent text-[#76767E] dark:text-gray-400 hover:text-[#1C1C1E] dark:text-white'
                }`}
              >
                CBDT Circulars
              </button>
            </div>

            {/* Legal content output */}
            <div className="bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-5 space-y-4 shadow-sm">
              {legalTab === 'act' && (
                <div className="space-y-4">
                  {body.legalSupport.statutoryActText.map((act: any, idx: number) => (
                    <div key={idx} className="border-b border-[#F4F3F0] dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                      <h5 className="text-xs font-bold text-[#2D5BE3] dark:text-[#60A5FA] uppercase tracking-wide mb-1.5">
                        {act.clause}
                      </h5>
                      <p className="text-sm text-[#1C1C1E] dark:text-white leading-relaxed font-sans">
                        {act.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {legalTab === 'rules' && (
                <div className="space-y-4">
                  {body.legalSupport.rules.map((rule: any, idx: number) => (
                    <div key={idx}>
                      <h5 className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wide mb-1.5">
                        {rule.name}
                      </h5>
                      <p className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans">
                        {rule.details}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {legalTab === 'circulars' && (
                <div className="space-y-4">
                  {body.legalSupport.circulars.map((circ: any, idx: number) => (
                    <div key={idx} className="border-b border-[#F4F3F0] dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between gap-4 mb-1.5">
                        <h5 className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wide">
                          {circ.number} — {circ.authority}
                        </h5>
                        <span className="text-xs text-[#76767E] dark:text-gray-400">{circ.date}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#2D5BE3] dark:text-[#60A5FA] mb-1 font-sans">{circ.subject}</p>
                      <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans">{circ.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Section 6: Applicability Matrix */}
          <section id="applicability-matrix" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Applicability Decision Matrix</h2>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FAFAF8] dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800">
                    <th className="py-3 px-4 font-bold text-[#4A4A52] dark:text-gray-300 text-xs uppercase tracking-wider">Buyer Turnover (Prev FY)</th>
                    <th className="py-3 px-4 font-bold text-[#4A4A52] dark:text-gray-300 text-xs uppercase tracking-wider">Seller Turnover (Prev FY)</th>
                    <th className="py-3 px-4 font-bold text-[#4A4A52] dark:text-gray-300 text-xs uppercase tracking-wider">Purchase Value</th>
                    <th className="py-3 px-4 font-bold text-[#4A4A52] dark:text-gray-300 text-xs uppercase tracking-wider">Applicable Law</th>
                    <th className="py-3 px-4 font-bold text-[#4A4A52] dark:text-gray-300 text-xs uppercase tracking-wider">Priority Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {body.applicabilityMatrix.map((row: any, idx: number) => (
                    <tr key={idx} className="border-b border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:bg-[#0B0F19] last:border-0 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#1C1C1E] dark:text-white">{row.buyerTurnover}</td>
                      <td className="py-3.5 px-4 text-[#4A4A52] dark:text-gray-300">{row.sellerTurnover}</td>
                      <td className="py-3.5 px-4 text-[#4A4A52] dark:text-gray-300">{row.purchaseValue}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          row.applicableProvision.includes('TDS')
                            ? 'bg-[#E8F7EE] text-[#1A7A4A]'
                            : row.applicableProvision.includes('TCS')
                            ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA]'
                            : 'bg-[#F4F3F0] dark:bg-[#111726] text-[#76767E] dark:text-gray-400'
                        }`}>
                          {row.applicableProvision}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">{row.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Practical Examples */}
          <section id="practical-examples" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Practical Examples</h2>
            </div>

            {/* Example Selection Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {body.examples.map((ex: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setExampleIdx(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    exampleIdx === idx
                      ? 'bg-[#2D5BE3] border-[#2D5BE3] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1E2640] border-[#E2E1DD] dark:border-gray-800 text-[#4A4A52] dark:text-gray-300 hover:bg-[#FAFAF8] dark:bg-[#0B0F19]'
                  }`}
                >
                  Scenario {idx + 1}
                </button>
              ))}
            </div>

            {/* Selected Example Card */}
            <div className="bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
              <div>
                <h4 className="text-base font-bold text-[#1C1C1E] dark:text-white mb-2">
                  {body.examples[exampleIdx].title}
                </h4>
                <p className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans">
                  {body.examples[exampleIdx].scenario}
                </p>
              </div>

              {/* Calculations */}
              <div className="bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-4">
                <span className="text-xs text-[#76767E] dark:text-gray-400 font-bold uppercase tracking-wider block mb-2">Calculation steps:</span>
                <ul className="space-y-1.5 text-xs text-[#1C1C1E] dark:text-white font-mono">
                  {body.examples[exampleIdx].calculations.map((calc: string, idx: number) => (
                    <li key={idx} className="list-none">{calc}</li>
                  ))}
                </ul>
              </div>

              {/* Double-Entry Ledger Block */}
              {body.examples[exampleIdx].journalEntries.map((je: any, idx: number) => (
                <div key={idx} className="border border-[#E2E1DD] dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-[#1E2640]">
                  <div className="bg-[#F4F3F0] dark:bg-[#111726] px-4 py-2 border-b border-[#E2E1DD] dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider">
                      Ledger: {je.stage}
                    </span>
                    <span className="text-[10px] bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 px-2 py-0.5 rounded font-bold uppercase tracking-widest text-[#76767E] dark:text-gray-400">
                      Double Entry
                    </span>
                  </div>
                  
                  {/* Ledger entries rendered with system font-mono */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0B0F19] text-[#76767E] dark:text-gray-400">
                          <th className="py-2 px-4 uppercase font-semibold text-[10px]">Particulars</th>
                          <th className="py-2 px-4 text-right uppercase font-semibold text-[10px]">Dr Amount (₹)</th>
                          <th className="py-2 px-4 text-right uppercase font-semibold text-[10px]">Cr Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {je.rows.map((row: any, rIdx: number) => (
                          <tr key={rIdx} className="border-b border-[#F4F3F0] dark:border-gray-800 last:border-0 hover:bg-[#FAFAF8] dark:bg-[#0B0F19] transition-colors">
                            <td className="py-2.5 px-4">
                              {row.type === 'CR' ? (
                                <span className="pl-6 italic text-[#4A4A52] dark:text-gray-300">To {row.accountName}</span>
                              ) : (
                                <span className="font-semibold text-[#1C1C1E] dark:text-white">{row.accountName} ...Dr</span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-right text-sm font-semibold">{row.drAmount || '—'}</td>
                            <td className="py-2.5 px-4 text-right text-sm font-semibold">{row.crAmount || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-4 py-2 bg-[#FAFAF8] dark:bg-[#0B0F19] border-t border-[#E2E1DD] dark:border-gray-800 italic text-xs text-[#76767E] dark:text-gray-400">
                    <span>(Narration: {je.narration})</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Compliance Impact */}
          <section id="compliance-impact" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Compliance & Returns Timeline</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Due Date Table */}
              <div className="bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wide">
                  <Calendar size={15} />
                  <span>Quarterly Filing Calendar (Form {body.complianceImpact.returnForm})</span>
                </div>
                
                <div className="border border-[#E2E1DD] dark:border-gray-800 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#FAFAF8] dark:bg-[#0B0F19] border-b border-[#E2E1DD] dark:border-gray-800 text-[#76767E] dark:text-gray-400">
                        <th className="py-2 px-3 font-semibold">Quarter</th>
                        <th className="py-2 px-3 font-semibold text-right">Filing Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {body.complianceImpact.quarterlyDueDates.map((item: any, idx: number) => (
                        <tr key={idx} className="border-b border-[#F4F3F0] dark:border-gray-800 last:border-0 hover:bg-[#FAFAF8] dark:bg-[#0B0F19]">
                          <td className="py-2.5 px-3 text-[#4A4A52] dark:text-gray-300 font-semibold">{item.quarter}</td>
                          <td className="py-2.5 px-3 text-[#1C1C1E] dark:text-white font-bold text-right">{item.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Penalties & Payment frequency */}
              <div className="bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wide flex items-center gap-1.5">
                  <FileText size={15} />
                  <span>Monthly Payment Due Date</span>
                </h4>
                <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed">
                  {body.complianceImpact.paymentDueDates}
                </p>
                <div className="bg-[#FFF5F5] border border-[#FDE6E6] rounded-lg p-3">
                  <span className="text-[10px] text-[#C0392B] font-bold uppercase tracking-wider block mb-1">Delay Penalties:</span>
                  <p className="text-xs text-[#C0392B] leading-relaxed">
                    {body.complianceImpact.lateFeeDescription}
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Section 9: Common Mistakes */}
          <section id="common-mistakes" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Common Mistakes & Solutions</h2>
            </div>
            
            <div className="space-y-4">
              {body.commonMistakes.map((item: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b md:border-b-0 md:border-r border-[#E2E1DD] dark:border-gray-800 pb-3 md:pb-0 md:pr-4">
                    <span className="text-xs text-[#C0392B] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      ⚠️ Common Mistake
                    </span>
                    <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white font-sans">
                      {item.mistake}
                    </p>
                  </div>
                  <div className="pt-2 md:pt-0">
                    <span className="text-xs text-[#1A7A4A] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      ✓ Correct Treatment
                    </span>
                    <p className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed font-sans">
                      {item.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 10: Amendment History */}
          <section id="amendment-history" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Amendment History</h2>
            </div>

            <div className="border-l-2 border-[#E2E1DD] dark:border-gray-800 pl-6 space-y-6 ml-3">
              {body.amendmentTimeline.map((item: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white bg-[#2D5BE3]" />
                  <span className="text-xs font-bold text-[#2D5BE3] dark:text-[#60A5FA] block uppercase tracking-wider mb-1">
                    {item.year}
                  </span>
                  <p className="text-sm text-[#4A4A52] dark:text-gray-300 leading-relaxed max-w-2xl font-sans">
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 11: Official Sources */}
          <section id="official-sources" className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Official Sources</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {body.officialSources.map((src: any, idx: number) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#2D5BE3] hover:shadow-sm transition-all group"
                >
                  <div className="min-w-0 pr-4">
                    <span className="text-[10px] text-[#76767E] dark:text-gray-400 uppercase font-bold block mb-1">
                      Source: {src.source}
                    </span>
                    <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:text-[#60A5FA] transition-colors truncate">
                      {src.title}
                    </p>
                  </div>
                  <ExternalLink size={16} className="text-[#A0A0A8] group-hover:text-[#2D5BE3] dark:text-[#60A5FA] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </section>

          {/* Section 12: Related Topics */}
          {body.relatedTopics && body.relatedTopics.length > 0 && (
            <section id="related-topics" className="scroll-mt-24 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white mb-4 tracking-tight">
                Related Sections & Compliance Topics
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {body.relatedTopics.map((topic: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/${topic.domainSlug}/${topic.subdomainSlug}/${topic.slug}`}
                    className="flex flex-col justify-between p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#1E2640] hover:border-[#C8C7C2] hover:shadow-xs transition-all group"
                  >
                    <div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA] uppercase tracking-wider mb-2">
                        {topic.type}
                      </span>
                      <p className="text-sm font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:text-[#60A5FA] transition-colors leading-snug">
                        {topic.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#2D5BE3] dark:text-[#60A5FA] mt-3">
                      <span>Explore references</span>
                      <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 13: Curated Videos */}
          {body.curatedVideos && body.curatedVideos.length > 0 && (
            <section id="curated-videos" className="scroll-mt-24 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white mb-4 tracking-tight flex items-center gap-1.5">
                <Play size={16} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                <span>Curated Professional Explanatory Videos</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {body.curatedVideos.map((vid: any, idx: number) => (
                  <a
                    key={idx}
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#1E2640] block group hover:shadow-sm hover:border-[#C8C7C2] transition-all"
                  >
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] text-[#B45309] font-bold uppercase tracking-wider block">
                        Explanatory Lecture
                      </span>
                      <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] dark:text-[#60A5FA] leading-snug transition-colors">
                        {vid.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-[#76767E] dark:text-gray-400 pt-2 border-t border-[#F4F3F0] dark:border-gray-800">
                        <span>By {vid.channel}</span>
                        <span>Duration: {vid.duration}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

        </main>

      </div>
    </div>
  )
}
