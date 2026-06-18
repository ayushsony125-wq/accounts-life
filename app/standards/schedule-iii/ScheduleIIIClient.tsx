'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  FileText,
  Download,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'
import { SCHEDULE_III_DATA, ScheduleIIITopic } from './data'

export default function ScheduleIIIClient() {
  const [selectedDiv, setSelectedDiv] = useState<'div1' | 'div2' | 'div3'>('div1')
  const [selectedPart, setSelectedPart] = useState<'balanceSheet' | 'profitAndLoss' | 'cashFlow' | 'others'>('balanceSheet')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Retrieve current active topic
  const currentTopic: ScheduleIIITopic = SCHEDULE_III_DATA[selectedDiv][selectedPart]

  const handleBackClick = () => {
    // Navigate back to accounts
  }

  // Sidebar display logic
  const divisions = [
    { id: 'div1', label: 'Division I (AS Companies)' },
    { id: 'div2', label: 'Division II (Ind AS Companies)' },
    { id: 'div3', label: 'Division III (Ind AS NBFCs)' }
  ] as const

  const parts = [
    { id: 'balanceSheet', label: 'Balance Sheet', icon: FileText },
    { id: 'profitAndLoss', label: 'Statement of Profit & Loss', icon: Scale },
    { id: 'cashFlow', label: 'Cash Flow Statements', icon: BookOpen },
    { id: 'others', label: 'Others', icon: FileText }
  ] as const

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0B0F19] flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-xs z-35 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        ${isSidebarOpen ? 'fixed inset-y-0 left-0 top-16 z-40 w-[320px] shadow-2xl flex border-r' : 'hidden'}
        lg:flex lg:static lg:w-[320px] lg:shadow-none lg:z-auto lg:h-full
        bg-white dark:bg-[#111726] border-[#E2E1DD] dark:border-gray-800 flex flex-col shrink-0 lg:sticky lg:top-16 overflow-hidden
      `}>
        
        {/* Sidebar Header */}
        <div className="px-3.5 py-4 border-b border-[#E2E1DD] dark:border-gray-800 flex flex-col gap-3">
          <div className="flex items-center gap-2.5 pl-0.5 w-full overflow-visible">
            <BookOpen size={21} className="text-[#2D5BE3] dark:text-blue-400 shrink-0" />
            <span className="font-sans font-extrabold text-[15px] text-[#1C1C1E] dark:text-white uppercase tracking-widest whitespace-nowrap overflow-visible leading-tight">
              Schedule III Rules
            </span>
          </div>
        </div>

        {/* Division List */}
        <div className="flex-1 p-3 space-y-2.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {divisions.map((div) => {
            const isDivActive = selectedDiv === div.id
            return (
              <div key={div.id} className="flex flex-col border-b border-gray-100 dark:border-gray-800/30 last:border-b-0 pb-2.5 last:pb-0">
                <button
                  onClick={() => {
                    setSelectedDiv(div.id)
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full text-left h-[36px] px-3 rounded-lg flex items-center justify-between transition-all ${
                    isDivActive
                      ? 'bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-[#60A5FA] font-bold shadow-3xs'
                      : 'hover:bg-gray-50 dark:hover:bg-[#1E2640] text-[#4A4A52] dark:text-gray-300'
                  }`}
                >
                  <span className="text-[13.5px] font-bold truncate pr-2">
                    {div.label}
                  </span>
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-transform ${isDivActive ? 'rotate-90 text-[#2D5BE3] dark:text-[#60A5FA]' : 'text-[#A0A0A8]'}`}
                  />
                </button>

                {/* Sub-menu parts inside the active division */}
                {isDivActive && (
                  <div className="ml-4 pl-3.5 border-l-2 border-[#D5E1FB] dark:border-[#263765] mt-1.5 space-y-1">
                    {parts.map((part) => {
                      const isPartActive = selectedPart === part.id
                      const Icon = part.icon
                      return (
                        <button
                          key={part.id}
                          onClick={() => {
                            setSelectedPart(part.id)
                            setIsSidebarOpen(false)
                          }}
                          className={`w-full text-left py-1.5 px-3 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all ${
                            isPartActive
                              ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:bg-[#1A2542] dark:text-[#60A5FA] font-extrabold'
                              : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                          }`}
                        >
                          <Icon size={13} className="shrink-0" />
                          {part.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {/* ─── Main Content Wrapper ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col bg-[#FAFAF8] dark:bg-[#0B0F19] overflow-y-auto h-full">
        
        {/* Top Control Bar */}
        <div className="bg-white dark:bg-[#111726] border-b border-[#E2E1DD] dark:border-gray-800 p-2.5 sm:p-3 flex flex-row flex-nowrap items-center justify-between gap-3 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Link
              href="/accounts"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-[12.5px] font-bold text-[#1C1C1E] dark:text-white hover:bg-[#F4F3F0] transition-colors shrink-0"
            >
              <ArrowLeft size={15} />
              Back
            </Link>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-[12.5px] font-bold text-[#1C1C1E] dark:text-white hover:bg-[#F4F3F0] transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              <BookOpen size={15} />
              Menu
            </button>
            
            <h1 className="text-[16px] sm:text-[22px] md:text-[24px] font-semibold text-[#1C1C1E] dark:text-white tracking-tight border-l-2 border-[#2D5BE3] dark:border-blue-500 pl-2.5 sm:pl-3 truncate select-none leading-tight flex-1 min-w-0">
              {currentTopic.title}
            </h1>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 select-none">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-extrabold bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] dark:bg-[#2C1D1D] dark:text-red-400 shrink-0 transition-all shadow-xs cursor-pointer"
              title="Download print layout of content"
            >
              <Download size={15} className="shrink-0 text-[#E15252] dark:text-red-400" />
              Download Study PDF
            </button>
          </div>
        </div>

        {/* ─── Content Panel ─────────────────────────────────────────────────── */}
        <div className="p-4 md:p-6 flex-1 w-full max-w-none">
          <div className="w-full space-y-8 animate-fade-in font-sans">
            <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
              
              {/* Header with Source Link */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-gray-100 dark:border-gray-800 gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white leading-tight">
                    {currentTopic.title}
                  </h2>
                  <p className="text-xs text-[#76767E] dark:text-gray-400 mt-1 font-medium">
                    Companies Act, 2013 · Schedule III · {divisions.find(d => d.id === selectedDiv)?.label}
                  </p>
                </div>
                {currentTopic.sourceLink && (
                  <a
                    href={currentTopic.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FD] hover:bg-[#DCE6FF] dark:bg-[#1A2542] dark:hover:bg-[#23355E] border border-[#DCE6FF] dark:border-[#23355E] rounded-md text-xs font-bold text-[#2D5BE3] dark:text-blue-400 transition-colors shrink-0"
                  >
                    <span>{currentTopic.sourceLabel || 'Official MCA Source'}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Meaning & Scope */}
              <div className="space-y-4">
                <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                  {currentTopic.content.meaning}
                </p>
                <div className="bg-slate-50 dark:bg-[#181F30] border-l-4 border-slate-300 dark:border-slate-700 p-4 rounded-r-xl">
                  <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Scope &amp; Coverage</p>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {currentTopic.content.scope}
                  </p>
                </div>
              </div>

              {/* Classification Rules */}
              {currentTopic.content.classificationRules && currentTopic.content.classificationRules.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                    Key Classification &amp; Presentation Rules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTopic.content.classificationRules.map((rule, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-200 dark:border-gray-800 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2D5BE3] dark:bg-blue-400 shrink-0" />
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rule.title}</h4>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold pl-4">
                          {rule.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formats / Disclosures Tables */}
              {currentTopic.content.formats && currentTopic.content.formats.map((fmt, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider">
                    📋 {fmt.title}
                  </h3>
                  <div className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-gray-400 border-b border-[#E2E1DD] dark:border-gray-800">
                          {fmt.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E1DD] dark:divide-gray-800">
                        {fmt.rows.map((row, rIdx) => {
                          const isHeading = row[1] && row[1].toUpperCase() === row[1] && !row[0].includes('TOTAL')
                          return (
                            <tr key={rIdx} className={`hover:bg-slate-50/50 dark:hover:bg-slate-850/40 ${isHeading ? 'bg-slate-50/20 dark:bg-slate-900/10' : ''}`}>
                              {row.map((cell, cIdx) => (
                                <td 
                                  key={cIdx} 
                                  className={`p-3 text-slate-700 dark:text-gray-300 leading-relaxed font-semibold ${
                                    isHeading ? 'font-bold text-[#1C1C1E] dark:text-white' : ''
                                  } ${cIdx === 0 ? 'text-[10px] font-mono text-red-500' : ''}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Takeaways & Advice */}
              {currentTopic.content.takeaways && currentTopic.content.takeaways.length > 0 && (
                <div className="space-y-4">
                  {currentTopic.content.takeaways.map((takeaway, idx) => (
                    <div key={idx} className="bg-[#EEF2FD] dark:bg-[#1A2542] border-l-4 border-[#2D5BE3] p-5 rounded-r-xl">
                      <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-1.5">
                        💡 Key Requirement / Takeaway
                      </p>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{takeaway.title}</h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                        {takeaway.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Case Law Application */}
              {currentTopic.content.caseLaws && currentTopic.content.caseLaws.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                    ⚖️ Case Law &amp; Guidance
                  </h3>
                  {currentTopic.content.caseLaws.map((cl, idx) => (
                    <div key={idx} className="p-5 sm:p-6 rounded-xl bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#DCE6FF] dark:border-blue-900/50 mb-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-extrabold text-[#2D5BE3] dark:text-blue-400">{cl.title}</h4>
                        <span className="text-[10px] font-mono text-slate-500">{cl.citation}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                        {cl.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Exam Traps & Warnings */}
              {currentTopic.content.examTraps && currentTopic.content.examTraps.length > 0 && (
                <div className="space-y-4">
                  {currentTopic.content.examTraps.map((trap, idx) => (
                    <div key={idx} className="p-5 sm:p-6 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50">
                      <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <span>⚠️</span> EXAM TRAP / STUDY TIP
                      </p>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{trap.title}</h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                        {trap.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Practical Scenarios & Examples */}
              {currentTopic.content.examples && currentTopic.content.examples.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                    📋 Practical Examples &amp; Case Scenarios
                  </h3>
                  {currentTopic.content.examples.map((ex, idx) => (
                    <div key={idx} className="p-5 border border-[#E2E1DD] dark:border-gray-800 rounded-xl bg-[#FAFAF8] dark:bg-[#1E2640]/50 space-y-3">
                      <h4 className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400">Example: {ex.title}</h4>
                      <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        <strong>Scenario: </strong>{ex.scenario}
                      </div>
                      <div className="text-xs text-slate-700 dark:text-gray-350 leading-relaxed bg-white dark:bg-slate-950 p-4 rounded-lg border border-gray-150 dark:border-gray-900">
                        <strong>Treatment / Solution: </strong>{ex.solution}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
