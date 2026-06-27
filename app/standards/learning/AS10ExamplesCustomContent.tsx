'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, AlertTriangle, Scale, BookOpen, CheckCircle, Info, HelpCircle } from 'lucide-react'
import {
  icaiIllustrations,
  businessCases,
  auditCases,
  regulatoryObservations,
  judicialCases,
  examCorner,
  auditNotes,
} from './AS10ExamplesData'

interface AS10ExamplesCustomContentProps {
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
      badge: 'bg-slate-100 text-slate-700 border-slate-200/50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/30',
      number: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50',
      panelHeader: 'bg-slate-50/60 dark:bg-slate-800/40',
      panelTitle: 'text-slate-600 dark:text-slate-400',
      panelBorder: 'border-slate-200 dark:border-slate-700/60',
    },
  }

  const activeTheme = themeMap[themeColor] || themeMap.indigo

  return (
    <div id={`item-${id}`} className={`bg-white dark:bg-[#111827] border-t border-r border-b border-slate-200/80 dark:border-slate-800 border-l-4 ${activeTheme.leftBorder} rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-5 relative overflow-hidden`}>
      <div className={`absolute top-0 left-4 right-0 h-[2.5px] bg-gradient-to-r ${activeTheme.accent} opacity-70`} />
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4 pt-1">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15.5px] sm:text-[17px] font-sans font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          {pdfPage && navigateToPdfPage && (
            <button
              onClick={() => navigateToPdfPage(pdfPage)}
              className="inline-flex items-center justify-center w-5 h-5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded cursor-pointer transition-all"
              title={`Open ICAI AS 10 PDF — Page ${pdfPage}`}
            >
              <FileText size={11} />
            </button>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] uppercase tracking-wider font-extrabold border whitespace-nowrap ${activeTheme.badge}`}>
            {category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 font-sans mt-2">
        {panels.map((panel, idx) => {
          const isMono = panel.title.toLowerCase().includes('disclosure') || panel.title.toLowerCase().includes('journal') || panel.title.toLowerCase().includes('entry') || panel.title.toLowerCase().includes('calculation') || panel.title.toLowerCase().includes('working');
          const panelBg = isMono
            ? 'bg-[#FAFAF8] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 shadow-xs'
            : `bg-white dark:bg-slate-900/20 ${activeTheme.panelBorder || 'border-slate-200/70 dark:border-slate-800'}`;
          return (
            <div key={idx} className={`rounded-xl border overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700/80 ${panelBg}`}>
              <div className={`flex items-center gap-2.5 px-4 py-2.5 border-b ${isMono ? 'border-slate-200 bg-slate-100/60 dark:bg-slate-800/60' : `border-slate-200/60 dark:border-slate-800 ${activeTheme.panelHeader}`}`}>
                <span className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-[10.5px] font-bold font-mono shrink-0 ${activeTheme.number}`}>
                  {idx + 1}
                </span>
                <span className={`text-[10.5px] font-extrabold uppercase tracking-widest select-none ${isMono ? 'text-slate-600 dark:text-slate-400' : activeTheme.panelTitle}`}>
                  {panel.title}
                </span>
              </div>
              <div className={`px-4 py-4 ${isMono ? 'text-xs sm:text-[12.5px] leading-relaxed font-mono whitespace-pre-line text-slate-800 dark:text-slate-200' : 'text-[14.5px] sm:text-[15px] leading-relaxed font-serif text-slate-700 dark:text-slate-200'}`}>
                {panel.content}
              </div>
            </div>
          );
        })}

        {examFocus && (
          <div className="rounded-xl border border-amber-300/60 dark:border-amber-700/40 border-l-4 border-l-amber-500 overflow-hidden shadow-xs">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50/80 dark:bg-amber-900/20 border-b border-amber-300/40 dark:border-amber-700/30">
              <AlertTriangle size={12.5} className="text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-[10.5px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest select-none">
                {examFocusType === 'trap' ? 'Exam Trap Warning'
                  : examFocusType === 'trick' ? 'Mnemonic / Memory Trick'
                  : examFocusType === 'concept' ? 'Most Asked Concept'
                  : examFocusType === 'adjustment' ? 'Likely ICAI Adjustment'
                  : 'Exam Focus & Learning'}
              </span>
            </div>
            <div className="px-4 py-3.5 bg-amber-50/[0.25] dark:bg-amber-900/10">
              <div className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200 font-serif font-medium">{examFocus}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function AS10ExamplesCustomContent({ navigateToPdfPage, renderTextWithReferences }: AS10ExamplesCustomContentProps) {
  const [activeSection, setActiveSection] = useState('icai-illustrations')
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const exampleChapters = [
    { id: 'icai-illustrations', title: '1. ICAI Illustrations' },
    { id: 'business-cases',    title: '2. Business Case Studies' },
    { id: 'audit-cases',       title: '3. Audit Case Studies' },
    { id: 'regulatory-obs',    title: '4. Regulatory Observations' },
    { id: 'legal-cases',       title: '5. Landmark Judicial Cases' },
    { id: 'exam-oriented',     title: '6. Exam-Oriented Corner' },
    { id: 'audit-notes',       title: '7. Audit Notes & Reporting' },
  ]

  const handleChapterClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(`sec2-${id}`)
    const stickyToc = document.getElementById('as10-examples-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let stickyOffset = 98
      if (stickyToc) {
        const tocRect = stickyToc.getBoundingClientRect()
        stickyOffset = tocRect.bottom - containerRect.top
      }
      const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset - 10
      container.scrollTo({ top: targetScrollTop, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const scrollEl = tocScrollRef.current;
    const activeBtn = scrollEl.querySelector(`[data-toc-id="${activeSection}"]`) as HTMLElement | null;
    if (!activeBtn) return;
    const isFirst = exampleChapters[0]?.id === activeSection;
    if (isFirst) {
      scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      const scrollElRect = scrollEl.getBoundingClientRect();
      const activeBtnRect = activeBtn.getBoundingClientRect();
      const btnLeft = activeBtnRect.left - scrollElRect.left + scrollEl.scrollLeft;
      const btnWidth = activeBtnRect.width;
      const containerWidth = scrollElRect.width;
      const targetScrollLeft = btnLeft - containerWidth / 2 + btnWidth / 2;
      scrollEl.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    }
  }, [activeSection]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) { setTimeout(initObserver, 50); return; }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const secId = entry.target.id.replace('sec2-', '');
              setActiveSection(secId);
            }
          });
        },
        { root: scrollContainer, rootMargin: '-90px 0px -65% 0px', threshold: 0 }
      );
      exampleChapters.forEach((sec) => {
        const el = document.getElementById(`sec2-${sec.id}`);
        if (el) observer?.observe(el);
      });
    };
    initObserver();
    return () => { if (observer) observer.disconnect(); }
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { el.removeEventListener('wheel', handleWheel); }
  }, [])

  const renderSectionHeader = (num: string, title: string, description: string) => {
    const numColorMap: Record<string, string> = {
      '1': 'text-blue-600 dark:text-blue-400',
      '2': 'text-indigo-600 dark:text-indigo-400',
      '3': 'text-emerald-600 dark:text-emerald-400',
      '4': 'text-amber-600 dark:text-amber-400',
      '5': 'text-violet-600 dark:text-violet-400',
      '6': 'text-rose-600 dark:text-rose-400',
      '7': 'text-slate-600 dark:text-slate-400',
    }
    const borderColorMap: Record<string, string> = {
      '1': 'border-blue-400/60 dark:border-blue-500/40',
      '2': 'border-indigo-400/60 dark:border-indigo-500/40',
      '3': 'border-emerald-400/60 dark:border-emerald-500/40',
      '4': 'border-amber-400/60 dark:border-amber-500/40',
      '5': 'border-violet-400/60 dark:border-violet-500/40',
      '6': 'border-rose-400/60 dark:border-rose-500/40',
      '7': 'border-slate-400/60 dark:border-slate-500/40',
    }
    const numColor = numColorMap[num] || 'text-indigo-600 dark:text-indigo-400'
    const borderColor = borderColorMap[num] || 'border-indigo-400/60'
    return (
      <div className="w-full mb-5 mt-10 first:mt-2">
        <div className="flex items-baseline gap-2.5 mb-2">
          <h2 className="text-[18px] sm:text-[20px] font-sans font-semibold text-slate-800 dark:text-slate-100 tracking-tight leading-tight flex items-baseline gap-2">
            <span className={`${numColor} font-mono font-bold mr-0.5 select-none text-[15px] sm:text-[17px]`}>{num}.</span>
            <span>{title}</span>
          </h2>
        </div>
        <div className={`h-[1.5px] w-full border-b ${borderColor} mb-3`} />
        {description && (
          <p className="text-[13px] font-sans font-normal text-slate-400 dark:text-slate-500 mt-1 leading-relaxed tracking-wide">
            {description}
          </p>
        )}
      </div>
    )
  }

  // Helper: build panels from illustration data
  const buildIllusPanels = (illus: typeof icaiIllustrations[0]): CardPanel[] => [
    {
      title: `${illus.number} — Facts`,
      content: illus.facts,
    },
    {
      title: 'Issue / Requirement',
      content: illus.issue,
    },
    {
      title: 'Calculation & Working',
      content: illus.analysis,
    },
    {
      title: 'Conclusion & AS 10 Treatment',
      content: illus.conclusion,
    },
    {
      title: 'Audit Perspective',
      content: illus.auditNote,
    },
  ]

  return (
    <div
      className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const pdfBtn = target.closest('[data-pdf-page]');
        if (pdfBtn) {
          const page = parseInt(pdfBtn.getAttribute('data-pdf-page') || '', 10);
          if (page) { e.preventDefault(); e.stopPropagation(); navigateToPdfPage(page); }
        }
      }}
    >
      {/* Sticky Tab-Specific Navbar */}
      <div id="as10-examples-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-4 sm:px-8 lg:px-12 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {exampleChapters.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => handleChapterClick(sec.id)}
                className={`transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap ${
                  activeSection === sec.id
                    ? 'text-white shadow-sm font-bold ' + [
                        'bg-blue-600 dark:bg-blue-500',
                        'bg-indigo-600 dark:bg-indigo-500',
                        'bg-emerald-600 dark:bg-emerald-500',
                        'bg-amber-600 dark:bg-amber-500',
                        'bg-violet-600 dark:bg-violet-500',
                        'bg-rose-600 dark:bg-rose-500',
                        'bg-slate-600 dark:bg-slate-500',
                      ][exampleChapters.findIndex(c => c.id === sec.id)] || 'bg-indigo-600'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-16 relative my-4">

        {/* ── SECTION 1: ICAI Illustrations ── */}
        <section id="sec2-icai-illustrations" className="scroll-mt-36 space-y-8 w-full">
          {renderSectionHeader('1', 'ICAI Illustrations',
            'Official ICAI AS 10 illustrations (Illustration 10.1–10.9) covering capitalizable costs, dismantling provisions, replacement components, exchanges, revaluations, component depreciation, and estimate updates.')}
          <div className="space-y-12">
            {icaiIllustrations.map((illus) => (
              <CaseStudyCard
                key={illus.id}
                id={illus.id}
                title={`${illus.number}: ${illus.title}`}
                category={illus.topic}
                pdfPage={illus.pdfPage}
                navigateToPdfPage={navigateToPdfPage}
                panels={buildIllusPanels(illus)}
                examFocus={illus.examFocus}
                examFocusType={illus.examFocusType}
                themeColor="blue"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 2: Business Case Studies ── */}
        <section id="sec2-business-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('2', 'Business Case Studies',
            'Realistic business scenarios analyzing asset exchanges and commercial substance under AS 10.')}
          <div className="space-y-12">
            {businessCases.map((bc) => (
              <CaseStudyCard
                key={bc.id}
                id={bc.id}
                title={bc.title}
                category={bc.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={bc.panels}
                themeColor="indigo"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 3: Audit Case Studies ── */}
        <section id="sec2-audit-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('3', 'Audit Case Studies',
            'Statutory audit scenarios addressing capital vs. revenue expenditure classification and building overhauls.')}
          <div className="space-y-12">
            {auditCases.map((ac) => (
              <CaseStudyCard
                key={ac.id}
                id={ac.id}
                title={ac.title}
                category={ac.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={ac.panels}
                themeColor="emerald"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Regulatory Observations ── */}
        <section id="sec2-regulatory-obs" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('4', 'Regulatory Observations',
            'NFRA actions concerning BOT infrastructure developers failing to charge depreciation on concession toll assets.')}
          <div className="space-y-12">
            {regulatoryObservations.map((reg) => (
              <CaseStudyCard
                key={reg.id}
                id={reg.id}
                title={reg.title}
                category={reg.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={reg.panels}
                themeColor="amber"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 5: Judicial Cases ── */}
        <section id="sec2-legal-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('5', 'Landmark Judicial Cases',
            'Supreme Court rulings on pre-commencement interest capitalization (Challapalli Sugars).')}
          <div className="space-y-12">
            {judicialCases.map((jc) => (
              <CaseStudyCard
                key={jc.id}
                id={jc.id}
                title={jc.title}
                category={jc.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={jc.panels}
                themeColor="violet"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 6: Exam-Oriented Corner ── */}
        <section id="sec2-exam-oriented" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('6', 'Exam-Oriented Corner',
            'High-yield past exam questions, detailed answers, marks allocation, and paragraph references for AS 10.')}
          
          <div className="space-y-8">
            {examCorner.map((q) => (
              <div key={q.id} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle size={14} />
                    <span>Past Exam Question ({q.pastExamRef})</span>
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded text-[10px] font-bold">
                    {q.pointsAwarded}
                  </span>
                </div>
                <div className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200 font-serif whitespace-pre-line">
                  {q.question}
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Suggested Answer / Valuation Guide</span>
                  <div className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300 font-serif whitespace-pre-line">
                    {q.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 7: Audit Notes & Reporting ── */}
        <section id="sec2-audit-notes" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('7', 'Audit Notes & Reporting',
            'Practical checklists and testing guidance for auditors validating Property, Plant and Equipment.')}
          
          <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {auditNotes.map((note) => (
              <div key={note.id} className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                  <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={18} />
                  <span>{note.title}</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                  {note.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-[10.5px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
