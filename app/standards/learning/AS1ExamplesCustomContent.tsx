'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, AlertTriangle, Scale, BookOpen, CheckCircle, Info, HelpCircle } from 'lucide-react'
import {
  icaiIllustrations,
  businessExamples,
  auditCases,
  regulatoryObservations,
  judicialCases
} from './AS1ExamplesData'

interface AS1ExamplesCustomContentProps {
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
  themeColor
}: CaseStudyCardProps) {
  // Theme styling configurations
  const themeMap = {
    blue: {
      accent: 'from-blue-500 via-blue-600 to-indigo-600',
      leftBorder: 'border-blue-400 dark:border-blue-500/70',
      badge: 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/30',
      number: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200/40 dark:border-blue-800/40',
      panelHeader: 'bg-blue-50/40 dark:bg-blue-900/20',
      panelTitle: 'text-blue-700 dark:text-blue-400',
      panelBorder: 'border-blue-100 dark:border-blue-900/40'
    },
    indigo: {
      accent: 'from-indigo-500 via-indigo-600 to-purple-600',
      leftBorder: 'border-indigo-400 dark:border-indigo-500/70',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800/30',
      number: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200/40 dark:border-indigo-800/40',
      panelHeader: 'bg-indigo-50/40 dark:bg-indigo-900/20',
      panelTitle: 'text-indigo-700 dark:text-indigo-400',
      panelBorder: 'border-indigo-100 dark:border-indigo-900/40'
    },
    emerald: {
      accent: 'from-emerald-500 via-emerald-600 to-teal-600',
      leftBorder: 'border-emerald-400 dark:border-emerald-500/70',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/30',
      number: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200/40 dark:border-emerald-800/40',
      panelHeader: 'bg-emerald-50/40 dark:bg-emerald-900/20',
      panelTitle: 'text-emerald-700 dark:text-emerald-400',
      panelBorder: 'border-emerald-100 dark:border-emerald-900/40'
    },
    amber: {
      accent: 'from-amber-500 via-amber-600 to-orange-600',
      leftBorder: 'border-amber-400 dark:border-amber-500/70',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800/30',
      number: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200/40 dark:border-amber-800/40',
      panelHeader: 'bg-amber-50/40 dark:bg-amber-900/20',
      panelTitle: 'text-amber-700 dark:text-amber-400',
      panelBorder: 'border-amber-100 dark:border-amber-900/40'
    },
    violet: {
      accent: 'from-violet-500 via-violet-600 to-fuchsia-600',
      leftBorder: 'border-violet-400 dark:border-violet-500/70',
      badge: 'bg-violet-50 text-violet-700 border-violet-200/50 dark:bg-violet-900/40 dark:text-violet-400 dark:border-violet-800/30',
      number: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200/40 dark:border-violet-800/40',
      panelHeader: 'bg-violet-50/40 dark:bg-violet-900/20',
      panelTitle: 'text-violet-700 dark:text-violet-400',
      panelBorder: 'border-violet-100 dark:border-violet-900/40'
    },
    rose: {
      accent: 'from-rose-500 via-rose-600 to-pink-600',
      leftBorder: 'border-rose-400 dark:border-rose-500/70',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/50 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800/30',
      number: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200/40 dark:border-rose-800/40',
      panelHeader: 'bg-rose-50/40 dark:bg-rose-900/20',
      panelTitle: 'text-rose-700 dark:text-rose-400',
      panelBorder: 'border-rose-100 dark:border-rose-900/40'
    },
    slate: {
      accent: 'from-slate-500 via-slate-600 to-slate-700',
      leftBorder: 'border-slate-400 dark:border-slate-500/70',
      badge: 'bg-slate-100 text-slate-700 border-slate-200/50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/30',
      number: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50',
      panelHeader: 'bg-slate-50/60 dark:bg-slate-800/40',
      panelTitle: 'text-slate-600 dark:text-slate-400',
      panelBorder: 'border-slate-200 dark:border-slate-700/60'
    }
  }

  const activeTheme = themeMap[themeColor] || themeMap.indigo

  return (
    <div id={`item-${id}`} className={`bg-white dark:bg-[#111827] border-t border-r border-b border-slate-200/80 dark:border-slate-800 border-l-4 ${activeTheme.leftBorder} rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-5 relative overflow-hidden`}>
      {/* Top Banner Accent */}
      <div className={`absolute top-0 left-4 right-0 h-[2.5px] bg-gradient-to-r ${activeTheme.accent} opacity-70`} />
      
      {/* Card Title & Meta Header — title + badge on one flex row */}
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
              title={`Open ICAI AS 1 PDF — Page ${pdfPage}`}
            >
              <FileText size={11} />
            </button>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] uppercase tracking-wider font-extrabold border whitespace-nowrap ${activeTheme.badge}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Panels Layout */}
      <div className="grid grid-cols-1 gap-4 font-sans mt-2">
        {panels.map((panel, idx) => {
          const isMono = panel.title.toLowerCase().includes('disclosure') || panel.title.toLowerCase().includes('draft') || panel.title.toLowerCase().includes('note') || panel.title.toLowerCase().includes('journal') || panel.title.toLowerCase().includes('entry');
          const panelBg = isMono 
            ? 'bg-[#FAFAF8] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 shadow-xs' 
            : `bg-white dark:bg-slate-900/20 ${activeTheme.panelBorder || 'border-slate-200/70 dark:border-slate-800'}`;
          
          return (
            <div 
              key={idx} 
              className={`rounded-xl border overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700/80 ${panelBg}`}
            >
              {/* Panel header strip */}
              <div className={`flex items-center gap-2.5 px-4 py-2.5 border-b ${isMono ? 'border-slate-200 bg-slate-100/60 dark:bg-slate-800/60' : `border-slate-200/60 dark:border-slate-800 ${activeTheme.panelHeader}`}`}>
                <span className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-[10.5px] font-bold font-mono shrink-0 ${activeTheme.number}`}>
                  {idx + 1}
                </span>
                <span className={`text-[10.5px] font-extrabold uppercase tracking-widest select-none ${isMono ? 'text-slate-600 dark:text-slate-400' : activeTheme.panelTitle}`}>
                  {panel.title}
                </span>
              </div>
              {/* Panel body */}
              <div className={`px-4 py-4 ${isMono ? 'text-xs sm:text-[12.5px] leading-relaxed font-mono whitespace-pre-line text-slate-800 dark:text-slate-200' : 'text-[14.5px] sm:text-[15px] leading-relaxed font-serif text-slate-700 dark:text-slate-200'}`}>
                {panel.content}
              </div>
            </div>
          );
        })}

        {/* Optional Exam Corner Box */}
        {examFocus && (
          <div className="rounded-xl border border-amber-300/60 dark:border-amber-700/40 border-l-4 border-l-amber-500 overflow-hidden shadow-xs">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50/80 dark:bg-amber-900/20 border-b border-amber-300/40 dark:border-amber-700/30">
              <AlertTriangle size={12.5} className="text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-[10.5px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest select-none">
                {examFocusType === 'trap'
                  ? 'Exam Trap Warning'
                  : examFocusType === 'trick'
                  ? 'Mnemonic / Memory Trick'
                  : examFocusType === 'concept'
                  ? 'Most Asked Concept'
                  : examFocusType === 'adjustment'
                  ? 'Likely ICAI Adjustment'
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

export function AS1ExamplesCustomContent({ navigateToPdfPage, renderTextWithReferences }: AS1ExamplesCustomContentProps) {
  const [activeSection, setActiveSection] = useState('icai-illustrations')
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const exampleChapters = [
    { id: 'icai-illustrations', title: '1. ICAI Illustrations' },
    { id: 'business-examples',  title: '2. Practical Business Examples' },
    { id: 'audit-cases',       title: '3. Audit Case Studies' },
    { id: 'regulatory-obs',    title: '4. Regulatory Observations' },
    { id: 'legal-cases',       title: '5. Landmark Judicial Cases' },
    { id: 'exam-oriented',     title: '6. Exam-Oriented Corner' },
    { id: 'audit-notes',       title: '7. Audit Notes & Reporting' }
  ]

  const handleChapterClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(`sec-${id}`)
    const stickyToc = document.getElementById('as1-examples-sticky-toc')
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
    // For the first item: always reset to scrollLeft=0 so it is never clipped off-screen
    const isFirst = exampleChapters[0]?.id === activeSection;
    if (isFirst) {
      scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // For other items: scroll so the button is centred in the strip using bounding client rects to bypass offsetParent bugs
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
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const secId = entry.target.id.replace('sec-', '');
              setActiveSection(secId);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -65% 0px',
          threshold: 0
        }
      );

      exampleChapters.forEach((sec) => {
        const el = document.getElementById(`sec-${sec.id}`);
        if (el) {
          observer?.observe(el);
        }
      });
    };

    initObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
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
    return () => {
      el.removeEventListener('wheel', handleWheel);
    }
  }, [])

  const renderSectionHeader = (num: string, title: string, description: string) => {
    const numColorMap: Record<string, string> = {
      '1': 'text-blue-600 dark:text-blue-400',
      '2': 'text-indigo-600 dark:text-indigo-400',
      '3': 'text-emerald-600 dark:text-emerald-400',
      '4': 'text-amber-600 dark:text-amber-400',
      '5': 'text-violet-600 dark:text-violet-400',
      '6': 'text-rose-600 dark:text-rose-400',
      '7': 'text-slate-600 dark:text-slate-400'
    }
    const borderColorMap: Record<string, string> = {
      '1': 'border-blue-400/60 dark:border-blue-500/40',
      '2': 'border-indigo-400/60 dark:border-indigo-500/40',
      '3': 'border-emerald-400/60 dark:border-emerald-500/40',
      '4': 'border-amber-400/60 dark:border-amber-500/40',
      '5': 'border-violet-400/60 dark:border-violet-500/40',
      '6': 'border-rose-400/60 dark:border-rose-500/40',
      '7': 'border-slate-400/60 dark:border-slate-500/40'
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

  return (
    <div 
      className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8"
      onClick={(e) => {
        // Event delegation to catch clicks on inline PDF reference buttons
        const target = e.target as HTMLElement;
        const pdfBtn = target.closest('[data-pdf-page]');
        if (pdfBtn) {
          const page = parseInt(pdfBtn.getAttribute('data-pdf-page') || '', 10);
          if (page) {
            e.preventDefault();
            e.stopPropagation();
            navigateToPdfPage(page);
          }
        }
      }}
    >
      {/* Sticky Tab-Specific Navbar */}
      <div id="as1-examples-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
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
                        'bg-blue-600 dark:bg-blue-500',    // 1 icai-illustrations
                        'bg-indigo-600 dark:bg-indigo-500', // 2 business-examples
                        'bg-emerald-600 dark:bg-emerald-500', // 3 audit-cases
                        'bg-amber-600 dark:bg-amber-500',   // 4 regulatory-obs
                        'bg-violet-600 dark:bg-violet-500', // 5 legal-cases
                        'bg-rose-600 dark:bg-rose-500',     // 6 exam-oriented
                        'bg-slate-600 dark:bg-slate-500',   // 7 audit-notes
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

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-16 relative my-4">

        {/* ─── SECTION 1: ICAI ILLUSTRATIONS ────────────────────────────────────── */}
        <section id="sec-icai-illustrations" className="scroll-mt-36 space-y-8 w-full">
          {renderSectionHeader(
            '1',
            'ICAI Illustrations',
            'Authentic illustrations, selection considerations, and measurement decisions mapped directly to the ICAI Study Material.'
          )}

          <div className="space-y-12">
            {icaiIllustrations.map((card) => (
              <CaseStudyCard
                key={card.id}
                id={card.id}
                title={card.title}
                category={card.category}
                pdfPage={card.pdfPage}
                navigateToPdfPage={navigateToPdfPage}
                panels={card.panels}
                examFocus={card.examFocus}
                examFocusType={card.examFocusType}
                themeColor="blue"
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION 2: PRACTICAL BUSINESS EXAMPLES ────────────────────────────── */}
        <section id="sec-business-examples" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '2',
            'Practical Business Examples',
            'Realistic commercial scenarios showing the selection and application of accounting policies across diverse industrial sectors.'
          )}
          
          <div className="space-y-12">
            {businessExamples.map((card) => (
              <CaseStudyCard
                key={card.id}
                id={card.id}
                title={card.title}
                category={card.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={card.panels}
                examFocus={card.examFocus}
                examFocusType={card.examFocusType}
                themeColor="indigo"
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION 3: AUDIT CASE STUDIES ────────────────────────────────────── */}
        <section id="sec-audit-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '3',
            'Audit Case Studies',
            'In-depth statutory audit case studies detailing management treatments, violations, audit programs, and reporting impact.'
          )}
          
          <div className="space-y-12">
            {auditCases.map((card) => (
              <CaseStudyCard
                key={card.id}
                id={card.id}
                title={card.title}
                category={card.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={card.panels}
                examFocus={card.examFocus}
                examFocusType={card.examFocusType}
                themeColor="emerald"
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: REGULATORY OBSERVATIONS ────────────────────────────────── */}
        <section id="sec-regulatory-obs" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '4',
            'Regulatory Observations',
            'NFRA, SEBI, and MCA directives regarding compliance failures in accounting policy disclosures.'
          )}
          
          <div className="space-y-12">
            {regulatoryObservations.map((card) => (
              <CaseStudyCard
                key={card.id}
                id={card.id}
                title={card.title}
                category={card.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={card.panels}
                examFocus={card.examFocus}
                examFocusType={card.examFocusType}
                themeColor="amber"
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: LANDMARK JUDICIAL CASES ────────────────────────────────── */}
        <section id="sec-legal-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '5',
            'Landmark Judicial Cases',
            'Landmark Supreme Court and High Court judgments clarifying the application of accounting principles under tax and corporate law.'
          )}
          
          <div className="space-y-12">
            {judicialCases.map((card) => (
              <CaseStudyCard
                key={card.id}
                id={card.id}
                title={card.title}
                category={card.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={card.panels}
                examFocus={card.examFocus}
                examFocusType={card.examFocusType}
                themeColor="violet"
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION 6: EXAM-ORIENTED CORNER ───────────────────────────────────── */}
        <section id="sec-exam-oriented" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '6',
            'Exam-Oriented Corner',
            'Quick-reference summaries, common errors, high-yield concepts, and key definitions for ICAI exam preparation.'
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Summary Card */}
            <div className="bg-[#FAFAF8] dark:bg-[#151C2C] p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <Info size={14} />
                <span>AS 1 Core Quick-Reference</span>
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <li><strong>Fundamental Assumptions (GAC):</strong> Going Concern, Accrual, Consistency. If they are followed, no disclosure is required. If they are violated, disclosure is mandatory. <button data-pdf-page={13} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
                <li><strong>Selection Considerations (PSM):</strong> Prudence, Substance over Form, Materiality. The primary objective is a True and Fair View. <button data-pdf-page={9} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
                <li><strong>Manner of Disclosure:</strong> All significant policies must form part of the accounts and be disclosed in one place (normally as Note 1). <button data-pdf-page={11} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
                <li><strong>Para 23 Rule:</strong> Footnote disclosures cannot cure incorrect accounting. The entry must be corrected. <button data-pdf-page={7} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-6 rounded-xl border border-[#FFE1E1] dark:border-red-900/40 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>Common Exam Mistakes</span>
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <li><strong className="text-red-600 dark:text-red-400">Mistake:</strong> Claiming that Going Concern is always followed. <em>Fact:</em> If liquidation is imminent, it must be rejected and accounts prepared on NRV. <button data-pdf-page={13} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
                <li><strong className="text-red-600 dark:text-red-400">Mistake:</strong> Mislabeling estimate changes as policy changes. <em>Fact:</em> Useful life changes or provisions are estimate changes (AS 5), not policy changes (AS 1).</li>
                <li><strong className="text-red-600 dark:text-red-400">Mistake:</strong> Believing that disclosure cures incorrect accounting. <em>Fact:</em> Under Para 23, disclosure cannot justify incorrect accounting. <button data-pdf-page={7} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
              </ul>
            </div>

            {/* High-Yield One-Liners */}
            <div className="bg-[#F5FFF9] dark:bg-[#15251C] p-6 rounded-xl border border-[#D5F5E3] dark:border-emerald-900/40 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle size={14} />
                <span>High-Yield One-Liners</span>
              </h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <p><strong>1. Disclosure location:</strong> Policies must be in one place (usually Note 1), not scattered. <button data-pdf-page={11} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
                <p><strong>2. Fundamental assumptions status:</strong> They are assumed to be followed; disclosure is only required if NOT followed. <button data-pdf-page={13} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
                <p><strong>3. Policy change justification:</strong> Only allowed if required by statute, for compliance with standard, or for a better presentation. <button data-pdf-page={12} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
                <p><strong>4. Quantification:</strong> If a policy change has a material impact, the exact financial impact must be quantified and disclosed. <button data-pdf-page={12} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
              </div>
            </div>

            {/* Important Definitions */}
            <div className="bg-[#FBF5FF] dark:bg-[#20152C] p-6 rounded-xl border border-[#F1D5F5] dark:border-purple-900/40 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2">
                <BookOpen size={14} />
                <span>Important Definitions</span>
              </h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <p><strong>1. Accounting Policies:</strong> Specific accounting principles and the methods of applying those principles adopted by the enterprise (AS 1 Para 11). <button data-pdf-page={9} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
                <p><strong>2. Accrual:</strong> Revenues and costs are accrued, i.e., recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate (AS 1 Para 13). <button data-pdf-page={9} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
                <p><strong>3. Prudence:</strong> A degree of caution in making estimates under conditions of uncertainty, such that assets or income are not overstated and liabilities or expenses are not understated. <button data-pdf-page={9} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
              </div>
            </div>
          </div>

          {/* Mnemonic and RTP/MTP references */}
          <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 font-serif">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Info size={14} />
              <span>PYQ & Mnemonic Revision Trap</span>
            </h4>
            <div className="space-y-4 text-xs sm:text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
              <p>
                <strong>ICAI Exam Questions (PYQ):</strong> In almost every exam, a case study is asked where a company changes its policy (e.g. inventory formula or depreciation) but does not disclose the impact, or changes the policy to manage earnings. Always refer to **AS 1 Para 22** <button data-pdf-page={12} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button> and **Para 23** <button data-pdf-page={7} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button> in your answers.
              </p>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[12.5px] text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">Mnemonic Tricks:</span>
                <p>• <strong>G-A-C:</strong> Going Concern, Accrual, Consistency (Fundamental Assumptions) <button data-pdf-page={13} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
                <p>• <strong>P-S-M:</strong> Prudence, Substance over Form, Materiality (Selection Considerations) <button data-pdf-page={9} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: AUDIT NOTES & REPORTING ────────────────────────────────── */}
        <section id="sec-audit-notes" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '7',
            'Audit Notes & Reporting',
            'Audit checklist, red flags, and drafting templates for statutory auditor reports under Section 143(3).'
          )}

          <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <HelpCircle className="text-indigo-600 dark:text-indigo-400" size={18} />
              <span>Audit Report Drafting: Deviation from AS 1 (Section 143(3))</span>
            </h3>

            <div className="space-y-4 text-[13.5px] leading-[1.7] text-slate-700 dark:text-slate-300 font-serif">
              <p>
                When an enterprise fails to disclose significant accounting policies, or changes them without valid justification, the auditor must issue a qualified or adverse opinion. Below is a standard template for an audit qualification:
              </p>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed space-y-3">
                <p className="font-extrabold text-slate-900 dark:text-white">BASIS FOR QUALIFIED OPINION</p>
                <p className="italic">
                  "Note [X] to the financial statements describes a change in the Company's accounting policy for inventory valuation from FIFO to Weighted Average. However, the Company has failed to disclose the quantified impact of this change on the current year's financial performance. Based on our audit procedures, had the Company valued its inventory on WAC, the closing inventory would have been lower by ₹70 Lakhs, and the profit before tax would have been lower by ₹70 Lakhs.
                </p>
                <p className="italic">
                  Consequently, the profit before tax and current assets are overstated by ₹70 Lakhs. The Company has also failed to comply with the disclosure requirements of Accounting Standard 1 (AS 1), 'Disclosure of Accounting Policies'."
                </p>
                <p className="font-extrabold text-slate-900 dark:text-white mt-4">QUALIFIED OPINION</p>
                <p className="italic">
                  "In our opinion and to the best of our information and according to the explanations given to us, except for the effects of the matter described in the Basis for Qualified Opinion paragraph, the aforesaid financial statements give a true and fair view in conformity with the accounting principles generally accepted in India..."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-sans">
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">AUDIT RED FLAGS</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>Inconsistencies between Note 1 disclosures and actual balances.</li>
                    <li>Failure to quantify the impact of accounting policy changes. <button data-pdf-page={12} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-50 text-red-600 rounded border border-red-200"><FileText size={8}/></button></li>
                    <li>Mislabeled write-downs as estimate revisions.</li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">REPRESENTATION POINTS</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>Obtain management representation letters confirming policy selection.</li>
                    <li>Confirm that all significant policies have been disclosed.</li>
                    <li>Document board approvals for any policy changes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
