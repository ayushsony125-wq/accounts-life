'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, AlertTriangle, Scale, BookOpen, Check, Info } from 'lucide-react'
import {
  icaiIllustrations,
  businessCases,
  auditCases,
  regulatoryObservations,
  judicialCases,
  examCorner,
} from './AS3ExamplesData'

interface AS3ExamplesCustomContentProps {
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
      panelHeader: 'bg-blue-50/40 dark:bg-blue-955/20',
      panelTitle: 'text-blue-700 dark:text-blue-400',
      panelBorder: 'border-blue-100 dark:border-blue-900/40',
    },
    indigo: {
      accent: 'from-indigo-500 via-indigo-600 to-purple-600',
      leftBorder: 'border-indigo-400 dark:border-indigo-500/70',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-955/40 dark:text-indigo-400 dark:border-indigo-800/30',
      number: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200/40 dark:border-indigo-800/40',
      panelHeader: 'bg-indigo-50/40 dark:bg-indigo-955/20',
      panelTitle: 'text-indigo-700 dark:text-indigo-400',
      panelBorder: 'border-indigo-100 dark:border-indigo-900/40',
    },
    emerald: {
      accent: 'from-emerald-500 via-emerald-600 to-teal-600',
      leftBorder: 'border-emerald-400 dark:border-emerald-500/70',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-955/40 dark:text-emerald-400 dark:border-emerald-800/30',
      number: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200/40 dark:border-emerald-800/40',
      panelHeader: 'bg-emerald-50/40 dark:bg-emerald-955/20',
      panelTitle: 'text-emerald-700 dark:text-emerald-400',
      panelBorder: 'border-emerald-100 dark:border-emerald-900/40',
    },
    amber: {
      accent: 'from-amber-500 via-amber-600 to-orange-600',
      leftBorder: 'border-amber-400 dark:border-amber-500/70',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-955/40 dark:text-amber-400 dark:border-amber-800/30',
      number: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200/40 dark:border-amber-800/40',
      panelHeader: 'bg-amber-50/40 dark:bg-amber-955/20',
      panelTitle: 'text-amber-700 dark:text-amber-400',
      panelBorder: 'border-amber-100 dark:border-amber-900/40',
    },
    violet: {
      accent: 'from-violet-500 via-violet-600 to-fuchsia-600',
      leftBorder: 'border-violet-400 dark:border-violet-500/70',
      badge: 'bg-violet-50 text-violet-700 border-violet-200/50 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/30',
      number: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200/40 dark:border-violet-800/40',
      panelHeader: 'bg-violet-50/40 dark:bg-violet-955/20',
      panelTitle: 'text-violet-700 dark:text-violet-400',
      panelBorder: 'border-violet-100 dark:border-violet-900/40',
    },
    rose: {
      accent: 'from-rose-500 via-rose-600 to-pink-600',
      leftBorder: 'border-rose-400 dark:border-rose-500/70',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/50 dark:bg-rose-955/40 dark:text-rose-400 dark:border-rose-800/30',
      number: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200/40 dark:border-rose-800/40',
      panelHeader: 'bg-rose-50/40 dark:bg-rose-955/20',
      panelTitle: 'text-rose-700 dark:text-rose-400',
      panelBorder: 'border-rose-100 dark:border-rose-900/40',
    },
    slate: {
      accent: 'from-slate-500 via-slate-600 to-slate-700',
      leftBorder: 'border-slate-400 dark:border-slate-500/70',
      badge: 'bg-slate-50 text-slate-700 border-slate-200/50 dark:bg-slate-900/40 dark:text-slate-450 dark:border-slate-800/30',
      number: 'bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-300 border-slate-200/40 dark:border-slate-700/40',
      panelHeader: 'bg-slate-50/40 dark:bg-slate-800/20',
      panelTitle: 'text-slate-700 dark:text-slate-400',
      panelBorder: 'border-slate-100 dark:border-slate-800/40',
    },
  }

  const c = themeMap[themeColor] || themeMap.blue
  const [activePanelIdx, setActivePanelIdx] = useState(0)

  return (
    <div id={`item-${id}`} className={`w-full bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 sm:p-7 shadow-sm border-l-4 ${c.leftBorder} flex flex-col gap-5`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${c.badge}`}>
            {category}
          </span>
          {pdfPage && navigateToPdfPage && (
            <button
              onClick={() => navigateToPdfPage(pdfPage)}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100/70 dark:bg-red-955/30 px-2.5 py-0.5 border border-red-200/40 dark:border-red-900/30 rounded cursor-pointer transition-all"
            >
              <FileText size={10} />
              <span>PDF Reference (p. {pdfPage})</span>
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[17px] sm:text-[18.5px] font-extrabold text-slate-905 dark:text-white leading-tight tracking-tight">
        {title}
      </h3>

      {/* Tabs Selector for Panels */}
      <div className="flex flex-row items-center gap-1 border-b border-slate-150 dark:border-gray-800 overflow-x-auto scrollbar-none pb-0.5">
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
      <div className="flex-1 text-[14px] sm:text-[14.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal min-h-[120px] transition-all duration-150 font-serif">
        {panels[activePanelIdx]?.content}
      </div>

      {/* Exam Focus Box */}
      {examFocus && (
        <div className="p-4 rounded-xl border border-rose-100 dark:border-red-955/40 bg-rose-50/20 dark:bg-[#2A1D1D]/30 space-y-2 mt-2 font-sans">
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
          <p className="text-[13px] text-slate-600 dark:text-gray-405 leading-relaxed font-sans">
            {examFocus}
          </p>
        </div>
      )}
    </div>
  )
}

export function AS3ExamplesCustomContent({
  navigateToPdfPage,
  renderTextWithReferences,
}: AS3ExamplesCustomContentProps) {
  const [activeSection, setActiveSection] = useState('icai-illustrations')
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: 'icai-illustrations',  label: '1. ICAI Illustrations',   count: icaiIllustrations.length },
    { id: 'business-cases',      label: '2. Business Cases',       count: businessCases.length },
    { id: 'audit-cases',         label: '3. Audit Case Studies',   count: auditCases.length },
    { id: 'regulatory-obs',      label: '4. Regulatory Observations', count: regulatoryObservations.length },
    { id: 'legal-cases',         label: '5. Judicial Decisions',   count: judicialCases.length },
    { id: 'exam-oriented',       label: '6. Exam Corner',          count: examCorner.length },
  ]

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
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      sections.forEach((sec) => {
        const el = document.getElementById("sec-" + sec.id);
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
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector('[data-toc-id="' + activeSection + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const renderSectionHeader = (num: string, title: string, description: string) => (
    <div className="w-full mb-6 font-sans">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-blue-600 dark:text-blue-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-905 dark:text-white tracking-tight">{title}</h2>
      </div>
      <p className="text-[13.5px] text-slate-500 dark:text-slate-400 mt-1 font-sans leading-relaxed">
        {description}
      </p>
      <div className="h-[1.5px] w-full bg-slate-200 dark:bg-slate-800/80 mt-3" />
    </div>
  )

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Examples sub-navbar */}
      <div id="as3-examples-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {sections.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => {
                  const container = document.getElementById('as1-scroll-container');
                  const target = document.getElementById("sec-" + sec.id);
                  const stickyToc = document.getElementById('as3-examples-sticky-toc');
                  setActiveSection(sec.id);
                  if (container && target) {
                    const containerRect = container.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    let stickyOffset = 98;
                    if (stickyToc) {
                      const tocRect = stickyToc.getBoundingClientRect();
                      stickyOffset = tocRect.bottom - containerRect.top;
                    }
                    const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset + 2;
                    container.scrollTo({ top: targetScrollTop, behavior: 'auto' });
                  }
                }}
                className={"transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap " + (
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                )}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-16 relative my-4">

        {/* ── SECTION 1: ICAI Illustrations ── */}
        <section id="sec-icai-illustrations" className="scroll-mt-36 space-y-8 w-full">
          {renderSectionHeader('1', 'ICAI Illustrations',
            'Official ICAI AS 3 illustrations covering cash equivalent definitions, interest and dividend payouts, and cash flow statement preparation.')}
          <div className="space-y-12">
            {icaiIllustrations.map((illus) => (
              <CaseStudyCard
                key={illus.id}
                id={illus.id}
                title={illus.title}
                category={illus.category}
                pdfPage={illus.pdfPage}
                navigateToPdfPage={navigateToPdfPage}
                panels={illus.panels}
                examFocus={illus.examFocus}
                examFocusType={illus.examFocusType}
                themeColor="blue"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 2: Business Case Studies ── */}
        <section id="sec-business-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('2', 'Business Case Studies',
            'Commercial real-world scenarios applying AS 3 operating, investing, and financing guidelines to corporate activities.')}
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
        <section id="sec-audit-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('3', 'Audit Case Studies',
            'Statutory audit scenarios covering cash equivalents classification, bank reconciliation testing, and auditor responsibilities under SA 500.')}
          <div className="space-y-12">
            {auditCases.map((ac) => (
              <CaseStudyCard
                key={ac.id}
                id={ac.id}
                title={ac.title}
                category={ac.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={ac.panels}
                examFocus={ac.examFocus}
                examFocusType={ac.examFocusType as any}
                themeColor="emerald"
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Regulatory Observations ── */}
        <section id="sec-regulatory-obs" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('4', 'Regulatory Observations',
            'MCA, SEBI, and NFRA enforcement actions related to cash flow statement misstatements and classification errors.')}
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
        <section id="sec-legal-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('5', 'Landmark Judicial Cases',
            'Judicial rulings and legal principles addressing the classification and tax implications of cash receipts and payments.')}
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
        <section id="sec-exam-oriented" className="scroll-mt-36 space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
          {renderSectionHeader('6', 'Exam-Oriented Corner',
            'High-yield CA Inter/Final study aids, mnemonics, format outlines, and typical exam adjustments.')}
          <div className="space-y-12">
            {examCorner.map((ec) => (
              <CaseStudyCard
                key={ec.id}
                id={ec.id}
                title={ec.title}
                category={ec.category}
                navigateToPdfPage={navigateToPdfPage}
                panels={ec.panels}
                examFocus={ec.examFocus}
                examFocusType={ec.examFocusType}
                themeColor="rose"
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
