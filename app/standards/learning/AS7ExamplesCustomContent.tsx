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
} from './AS7ExamplesData'

interface AS7ExamplesCustomContentProps {
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
      badge: 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/30',
      number: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200/40 dark:border-blue-800/40',
      panelHeader: 'bg-blue-50/40 dark:bg-blue-900/20',
      panelTitle: 'text-blue-700 dark:text-blue-400',
      panelBorder: 'border-blue-100 dark:border-blue-900/40',
    },
    indigo: {
      accent: 'from-indigo-500 via-indigo-600 to-purple-600',
      leftBorder: 'border-indigo-400 dark:border-indigo-500/70',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800/30',
      number: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200/40 dark:border-indigo-800/40',
      panelHeader: 'bg-indigo-50/40 dark:bg-indigo-900/20',
      panelTitle: 'text-indigo-700 dark:text-indigo-400',
      panelBorder: 'border-indigo-100 dark:border-indigo-900/40',
    },
    emerald: {
      accent: 'from-emerald-500 via-emerald-600 to-teal-600',
      leftBorder: 'border-emerald-400 dark:border-emerald-500/70',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/30',
      number: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200/40 dark:border-emerald-800/40',
      panelHeader: 'bg-emerald-50/40 dark:bg-emerald-900/20',
      panelTitle: 'text-emerald-700 dark:text-emerald-400',
      panelBorder: 'border-emerald-100 dark:border-emerald-900/40',
    },
    amber: {
      accent: 'from-amber-500 via-amber-600 to-orange-600',
      leftBorder: 'border-amber-400 dark:border-amber-500/70',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800/30',
      number: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200/40 dark:border-amber-800/40',
      panelHeader: 'bg-amber-50/40 dark:bg-amber-900/20',
      panelTitle: 'text-amber-700 dark:text-amber-400',
      panelBorder: 'border-amber-100 dark:border-amber-900/40',
    },
    violet: {
      accent: 'from-violet-500 via-violet-600 to-fuchsia-600',
      leftBorder: 'border-violet-400 dark:border-violet-500/70',
      badge: 'bg-violet-50 text-violet-700 border-violet-200/50 dark:bg-violet-900/40 dark:text-violet-400 dark:border-violet-800/30',
      number: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200/40 dark:border-violet-800/40',
      panelHeader: 'bg-violet-50/40 dark:bg-violet-900/20',
      panelTitle: 'text-violet-700 dark:text-violet-400',
      panelBorder: 'border-violet-100 dark:border-violet-900/40',
    },
    rose: {
      accent: 'from-rose-500 via-rose-600 to-pink-600',
      leftBorder: 'border-rose-400 dark:border-rose-500/70',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/50 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800/30',
      number: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200/40 dark:border-rose-800/40',
      panelHeader: 'bg-rose-50/40 dark:bg-rose-900/20',
      panelTitle: 'text-rose-700 dark:text-rose-400',
      panelBorder: 'border-rose-100 dark:border-rose-900/40',
    },
    slate: {
      accent: 'from-slate-500 via-slate-600 to-slate-700',
      leftBorder: 'border-slate-400 dark:border-slate-500/70',
      badge: 'bg-slate-50 text-slate-700 border-slate-200/50 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800/30',
      number: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200/40 dark:border-slate-700/40',
      panelHeader: 'bg-slate-50/40 dark:bg-slate-800/20',
      panelTitle: 'text-slate-700 dark:text-slate-400',
      panelBorder: 'border-slate-100 dark:border-slate-800/40',
    },
  }

  const c = themeMap[themeColor] || themeMap.blue
  const [activePanelIdx, setActivePanelIdx] = useState(0)

  return (
    <div id={`item-${id}`} className={`w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-5 sm:p-7 shadow-xs border-l-4 ${c.leftBorder} flex flex-col gap-5`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${c.badge}`}>
            {category}
          </span>
          {pdfPage && navigateToPdfPage && (
            <button
              onClick={() => navigateToPdfPage(pdfPage)}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100/70 dark:bg-red-900/30 px-2 py-0.5 border border-red-200/40 dark:border-red-900/30 rounded cursor-pointer transition-all"
            >
              <FileText size={10} />
              <span>PDF Reference (p. {pdfPage})</span>
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[17px] sm:text-[18.5px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
        {title}
      </h3>

      {/* Tabs Selector for Panels */}
      <div className="flex flex-row items-center gap-1 border-b border-slate-100 dark:border-gray-800 overflow-x-auto scrollbar-none pb-0.5">
        {panels.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setActivePanelIdx(idx)}
            className={`text-xs font-bold px-3.5 py-2 border-b-2 -mb-0.5 transition-all whitespace-nowrap cursor-pointer ${
              activePanelIdx === idx
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Selected Panel Content */}
      <div className="flex-1 text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed font-normal min-h-[120px] transition-all duration-100">
        {panels[activePanelIdx]?.content}
      </div>

      {/* Exam Focus Box */}
      {examFocus && (
        <div className="p-4 rounded-xl border border-rose-100 dark:border-red-900/40 bg-rose-50/20 dark:bg-[#2A1D1D]/30 space-y-2 mt-2">
          <h4 className="font-sans font-extrabold text-[10.5px] uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
            <AlertTriangle size={12.5} className="shrink-0" />
            <span>
              {examFocusType === 'trap'
                ? 'EXAM TRAP WARNING'
                : examFocusType === 'trick'
                ? 'EXAM TRICK NOTE'
                : examFocusType === 'adjustment'
                ? 'CRITICAL ADJUSTMENT'
                : 'EXAM ORIENTED CORNER'}
            </span>
          </h4>
          <p className="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed font-normal">
            {examFocus}
          </p>
        </div>
      )}
    </div>
  )
}

export function AS7ExamplesCustomContent({
  navigateToPdfPage,
  renderTextWithReferences,
}: AS7ExamplesCustomContentProps) {
  const [activeTab, setActiveTab] = useState<'icai' | 'business' | 'audit' | 'regulatory' | 'judicial' | 'exam'>('icai')

  const tabs = [
    { id: 'icai',       label: 'ICAI Illustrations',  count: icaiIllustrations.length },
    { id: 'business',   label: 'Business Examples',    count: businessCases.length },
    { id: 'audit',      label: 'Audit Case Studies',   count: auditCases.length },
    { id: 'regulatory', label: 'Regulatory Observations', count: regulatoryObservations.length },
    { id: 'judicial',   label: 'Judicial Decisions',   count: judicialCases.length },
    { id: 'exam',       label: 'Exam Corner',          count: examCorner.length },
  ]

  const activeIllustrations =
    activeTab === 'icai'
      ? icaiIllustrations
      : activeTab === 'business'
      ? businessCases
      : activeTab === 'audit'
      ? auditCases
      : activeTab === 'regulatory'
      ? regulatoryObservations
      : activeTab === 'judicial'
      ? judicialCases
      : examCorner

  const themeColors: Record<string, 'blue' | 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose' | 'slate'> = {
    icai: 'blue',
    business: 'indigo',
    audit: 'emerald',
    regulatory: 'amber',
    judicial: 'violet',
    exam: 'rose',
  }

  const activeColor = themeColors[activeTab] || 'blue'

  return (
    <div className="w-full space-y-6 animate-fade-in font-sans">
      {/* Examples Categories Navbar */}
      <div className="flex flex-row items-center gap-1.5 border-b border-slate-200 dark:border-gray-800 overflow-x-auto scrollbar-none pb-0.5 shrink-0 select-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs font-bold px-3 py-1.5 rounded-t-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border-t border-x ${
              activeTab === tab.id
                ? 'bg-slate-50 border-slate-200 border-b-transparent text-blue-600 dark:bg-slate-900/40 dark:border-gray-800 dark:border-b-transparent dark:text-blue-400'
                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-900/20'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-gray-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Rendering list of cards */}
      <div className="space-y-6">
        {activeIllustrations.length === 0 ? (
          <div className="w-full text-center py-12 border border-dashed border-slate-200 dark:border-gray-800 rounded-2xl bg-slate-50/20 dark:bg-slate-900/10">
            <HelpCircle size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 dark:text-gray-400 text-sm font-semibold">No case studies available under this category.</p>
          </div>
        ) : (
          activeIllustrations.map((item, idx) => (
            <CaseStudyCard
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              pdfPage={item.pdfPage}
              navigateToPdfPage={navigateToPdfPage}
              panels={item.panels}
              examFocus={item.examFocus}
              examFocusType={item.examFocusType}
              themeColor={activeColor}
            />
          ))
        )}
      </div>

      {/* Static Quick-Reference Card */}
      <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
        <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Info size={14} />
          <span>AS 7 Construction Contracts Reference Guide</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] leading-relaxed">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 dark:text-blue-400 block mb-2">Percentage of Completion Method (POCM):</span>
            <p className="text-slate-600 dark:text-gray-400 text-[12px] leading-relaxed">
              Revenue is recognized proportionately based on actual costs incurred relative to estimated total costs. Milestone billings and advance collections are ignored for calculation.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-amber-600 dark:text-amber-400 block mb-2">Expected Total Loss Rules (Para 35):</span>
            <p className="text-slate-600 dark:text-gray-400 text-[12px] leading-relaxed">
              Expected loss (Total Cost exceed Total Revenue) must be recognized as an expense in the Statement of Profit and Loss immediately, irrespective of stage of completion or work status.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
