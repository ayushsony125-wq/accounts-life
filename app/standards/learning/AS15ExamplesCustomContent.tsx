'use client'

import React, { useState } from 'react'
import { FileText, AlertTriangle, Info, HelpCircle } from 'lucide-react'
import {
  icaiIllustrations,
  businessCases,
  auditCases,
  regulatoryObservations,
  judicialCases,
  examCorner,
} from './AS15ExamplesData'

interface AS15ExamplesCustomContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

interface CardPanel {
  title: string;
  content: React.ReactNode;
}

interface CaseStudyCardProps {
  id: string;
  title: string;
  category: string;
  pdfPage?: number;
  navigateToPdfPage?: (page: number) => void;
  panels: CardPanel[];
  examFocus?: string;
  examFocusType?: 'trap' | 'focus' | 'trick' | 'concept' | 'adjustment';
  themeColor: 'blue' | 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose' | 'slate';
}

function CaseStudyCard({
  id,
  title,
  category,
  pdfPage,
  navigateToPdfPage,
  panels,
  examFocus,
  examFocusType = 'focus',
  themeColor,
}: CaseStudyCardProps) {
  const themeMap = {
    blue: {
      accent: 'from-blue-500 via-blue-600 to-indigo-600',
      leftBorder: 'border-blue-400 dark:border-blue-500/70',
      badge: 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/30',
      number: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200/40 dark:border-blue-800/40',
      panelHeader: 'bg-blue-50/40 dark:bg-blue-950/20',
      panelTitle: 'text-blue-700 dark:text-blue-400',
      panelBorder: 'border-blue-100 dark:border-blue-900/40',
    },
    indigo: {
      accent: 'from-indigo-500 via-indigo-600 to-purple-600',
      leftBorder: 'border-indigo-400 dark:border-indigo-500/70',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/30',
      number: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200/40 dark:border-indigo-800/40',
      panelHeader: 'bg-indigo-50/40 dark:bg-indigo-950/20',
      panelTitle: 'text-indigo-700 dark:text-indigo-400',
      panelBorder: 'border-indigo-100 dark:border-indigo-900/40',
    },
    emerald: {
      accent: 'from-emerald-500 via-emerald-600 to-teal-600',
      leftBorder: 'border-emerald-400 dark:border-emerald-500/70',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/30',
      number: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200/40 dark:border-emerald-800/40',
      panelHeader: 'bg-emerald-50/40 dark:bg-emerald-950/20',
      panelTitle: 'text-emerald-700 dark:text-emerald-400',
      panelBorder: 'border-emerald-100 dark:border-emerald-900/40',
    },
    amber: {
      accent: 'from-amber-500 via-amber-600 to-orange-600',
      leftBorder: 'border-amber-400 dark:border-amber-500/70',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/30',
      number: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200/40 dark:border-amber-800/40',
      panelHeader: 'bg-amber-50/40 dark:bg-amber-950/20',
      panelTitle: 'text-amber-700 dark:text-amber-400',
      panelBorder: 'border-amber-100 dark:border-amber-900/40',
    },
    violet: {
      accent: 'from-violet-500 via-violet-600 to-fuchsia-600',
      leftBorder: 'border-violet-400 dark:border-violet-500/70',
      badge: 'bg-violet-50 text-violet-700 border-violet-200/50 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/30',
      number: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200/40 dark:border-violet-800/40',
      panelHeader: 'bg-violet-50/40 dark:bg-violet-950/20',
      panelTitle: 'text-violet-700 dark:text-violet-400',
      panelBorder: 'border-violet-100 dark:border-violet-900/40',
    },
    rose: {
      accent: 'from-rose-500 via-rose-600 to-pink-600',
      leftBorder: 'border-rose-400 dark:border-rose-500/70',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/50 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/30',
      number: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200/40 dark:border-rose-800/40',
      panelHeader: 'bg-rose-50/40 dark:bg-rose-950/20',
      panelTitle: 'text-rose-700 dark:text-rose-400',
      panelBorder: 'border-rose-100 dark:border-rose-900/40',
    },
    slate: {
      accent: 'from-slate-500 via-slate-600 to-slate-700',
      leftBorder: 'border-slate-400 dark:border-slate-500/70',
      badge: 'bg-slate-50 text-slate-700 border-slate-200/50 dark:bg-slate-950/40 dark:text-slate-400 dark:border-slate-800/30',
      number: 'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300 border-slate-200/40 dark:border-slate-800/40',
      panelHeader: 'bg-slate-50/40 dark:bg-slate-950/20',
      panelTitle: 'text-slate-700 dark:text-slate-400',
      panelBorder: 'border-slate-100 dark:border-slate-900/40',
    },
  }

  const styles = themeMap[themeColor] || themeMap.blue
  const [activePanelIdx, setActivePanelIdx] = useState(0)

  const focusColors = {
    trap: 'bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950/20 dark:text-rose-200 dark:border-rose-900/40',
    focus: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/20 dark:text-blue-200 dark:border-blue-900/40',
    trick: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/20 dark:text-amber-200 dark:border-amber-900/40',
    concept: 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-200 dark:border-emerald-900/40',
    adjustment: 'bg-violet-50 text-violet-900 border-violet-200 dark:bg-violet-950/20 dark:text-violet-200 dark:border-violet-900/40',
  }

  return (
    <div id={id} className={`bg-white dark:bg-[#111726] border-l-4 ${styles.leftBorder} border-y border-r border-slate-200/80 dark:border-gray-800/60 rounded-r-2xl shadow-xs overflow-hidden scroll-mt-28 mb-8`}>
      <div className="p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${styles.badge}`}>
            {category}
          </span>
          {pdfPage && navigateToPdfPage && (
            <button
              onClick={() => navigateToPdfPage(pdfPage)}
              className="inline-flex items-center gap-1.5 text-xs text-red-655 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold transition-colors cursor-pointer"
            >
              <FileText size={12} />
              ICAI PDF Page {pdfPage}
            </button>
          )}
        </div>

        <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 dark:text-white leading-snug">
          {title}
        </h3>

        {/* Tab Panels Selector */}
        <div className="flex border-b border-slate-200 dark:border-gray-800 overflow-x-auto scrollbar-none gap-2">
          {panels.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePanelIdx(idx)}
              className={`text-xs font-bold pb-2.5 px-1 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activePanelIdx === idx
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Tab Panel Content */}
        <div className="text-[13.5px] sm:text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed min-h-[120px] py-2">
          {panels[activePanelIdx]?.content}
        </div>

        {/* Exam Focus Alert Box */}
        {examFocus && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${focusColors[examFocusType]}`}>
            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
            <div className="text-[12.5px] leading-relaxed">
              <span className="font-extrabold uppercase tracking-wide text-[9.5px] block mb-0.5">
                {examFocusType === 'trap'
                  ? 'Exam Trap Alert'
                  : examFocusType === 'trick'
                  ? 'Exam Trick / Shortcut'
                  : examFocusType === 'adjustment'
                  ? 'Key Accounting Adjustment'
                  : examFocusType === 'concept'
                  ? 'Core Conceptual Test'
                  : 'Exam Focus Point'}
              </span>
              {examFocus}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function AS15ExamplesCustomContent({
  navigateToPdfPage,
  renderTextWithReferences,
}: AS15ExamplesCustomContentProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'icai' | 'business' | 'audit' | 'reg' | 'judicial' | 'exam'>('all')

  const filterTabs = [
    { id: 'all',      label: 'All Case Studies' },
    { id: 'icai',     label: 'ICAI Illustrations' },
    { id: 'business', label: 'Business Examples' },
    { id: 'audit',    label: 'Audit Case Studies' },
    { id: 'reg',      label: 'Regulatory Obs' },
    { id: 'judicial', label: 'Landmark Cases' },
    { id: 'exam',     label: 'Exam Adjustments' },
  ] as const

  const getFilteredCases = () => {
    switch (activeTab) {
      case 'icai':     return icaiIllustrations.map(c => ({ ...c, themeColor: 'blue' as const }))
      case 'business': return businessCases.map(c => ({ ...c, themeColor: 'indigo' as const }))
      case 'audit':    return auditCases.map(c => ({ ...c, themeColor: 'emerald' as const }))
      case 'reg':      return regulatoryObservations.map(c => ({ ...c, themeColor: 'amber' as const }))
      case 'judicial': return judicialCases.map(c => ({ ...c, themeColor: 'violet' as const }))
      case 'exam':     return examCorner.map(c => ({ ...c, themeColor: 'rose' as const }))
      default:         return [
        ...icaiIllustrations.map(c => ({ ...c, themeColor: 'blue' as const })),
        ...businessCases.map(c => ({ ...c, themeColor: 'indigo' as const })),
        ...auditCases.map(c => ({ ...c, themeColor: 'emerald' as const })),
        ...regulatoryObservations.map(c => ({ ...c, themeColor: 'amber' as const })),
        ...judicialCases.map(c => ({ ...c, themeColor: 'violet' as const })),
        ...examCorner.map(c => ({ ...c, themeColor: 'rose' as const })),
      ]
    }
  }

  return (
    <div className="w-full font-sans space-y-6">
      {/* Intro Banner */}
      <div className="p-6 bg-gradient-to-r from-[#1E2640] to-[#111726] rounded-2xl text-white shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          <HelpCircle className="text-blue-400" />
          AS 15 Master Case Studies &amp; Examples
        </h2>
        <p className="text-[13px] sm:text-[14px] text-slate-350 leading-relaxed max-w-3xl">
          Understand employee benefits accounting under AS 15 using actuaries, DBO reconciliations, leave encashments, regulatory reports, and exam adjustments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-gray-800 overflow-x-auto scrollbar-none gap-2 py-1 select-none">
        {filterTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-655 dark:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Case Studies Cards List */}
      <div className="space-y-2">
        {getFilteredCases().map((c) => (
          <CaseStudyCard
            key={c.id}
            id={c.id}
            title={c.title}
            category={c.category}
            pdfPage={c.pdfPage}
            navigateToPdfPage={navigateToPdfPage}
            panels={c.panels}
            examFocus={c.examFocus}
            examFocusType={c.examFocusType}
            themeColor={c.themeColor}
          />
        ))}
      </div>
    </div>
  )
}
