'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, AlertTriangle, Scale, BookOpen, CheckCircle, Info, HelpCircle, Award } from 'lucide-react'
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
  bgClass?: string;
  borderClass?: string;
  textClass?: string;
}

interface CaseStudyCardProps {
  id: string;
  title: string;
  category: string;
  badgeColor?: string;
  pdfPage?: number;
  navigateToPdfPage?: (page: number) => void;
  panels: CardPanel[];
  examFocus?: string;
  examFocusType?: 'trap' | 'focus' | 'trick' | 'concept' | 'adjustment';
}

function CaseStudyCard({
  id,
  title,
  category,
  badgeColor = 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/30',
  pdfPage,
  navigateToPdfPage,
  panels,
  examFocus,
  examFocusType = 'focus'
}: CaseStudyCardProps) {
  return (
    <div id={`item-${id}`} className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 space-y-6 relative overflow-hidden">
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
      
      {/* Card Title & Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 pt-1">
        <h3 className="text-[16px] sm:text-[18px] font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {pdfPage && navigateToPdfPage && (
            <button
              onClick={() => navigateToPdfPage(pdfPage)}
              className="inline-flex items-center justify-center w-5 h-5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded cursor-pointer transition-all shrink-0"
              title={`Open ICAI AS 1 PDF — Page ${pdfPage}`}
            >
              <FileText size={11} />
            </button>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${badgeColor} shrink-0`}>
            {category}
          </span>
        </div>
      </div>

      {/* Panels Layout */}
      <div className="grid grid-cols-1 gap-5 font-sans">
        {panels.map((panel, idx) => {
          const isMono = panel.bgClass?.includes('font-mono') || panel.title.toLowerCase().includes('disclosure') || panel.title.toLowerCase().includes('draft') || panel.title.toLowerCase().includes('note');
          const panelBg = isMono 
            ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-850 dark:text-slate-250 font-mono' 
            : (panel.bgClass || 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/70 text-slate-700 dark:text-slate-300');
          const panelBorder = panel.borderClass || 'border';
          
          return (
            <div 
              key={idx} 
              className={`p-5 rounded-xl space-y-3 ${panelBg} ${panelBorder}`}
            >
              <div className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-wider select-none">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-850 text-[10px] text-slate-700 dark:text-slate-350 font-bold font-mono shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-850 dark:text-slate-200 font-bold font-sans">
                  {panel.title}
                </span>
              </div>
              <div className={`text-[13.5px] leading-relaxed font-serif ${isMono ? 'font-mono whitespace-pre-line' : ''}`}>
                {panel.content}
              </div>
            </div>
          );
        })}

        {/* Optional Exam Corner Box */}
        {examFocus && (
          <div className="p-4 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 rounded-xl space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider select-none">
              <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
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
            <div className="text-[13px] leading-relaxed text-slate-800 dark:text-slate-200 font-serif font-medium">{examFocus}</div>
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
    const activeBtn = tocScrollRef.current.querySelector(`[data-toc-id="${activeSection}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
    const doubleDigitNum = num.padStart(2, '0');
    return (
      <div className="w-full mb-10 mt-20 first:mt-4 font-sans relative border-l-4 border-indigo-650 dark:border-indigo-500 pl-5 sm:pl-7 py-2">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] sm:text-[12px] font-mono font-extrabold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block">
            Chapter {doubleDigitNum}
          </span>
          <h2 className="text-[22px] sm:text-[26px] font-sans font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-[14px] sm:text-[15px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed max-w-5xl font-serif italic">
            {description}
          </p>
        )}
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900/50 mt-6" />
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Tab-Specific Navbar */}
      <div id="as1-examples-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
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
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
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
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-650 dark:text-indigo-400 flex items-center gap-2">
                <Info size={14} />
                <span>AS 1 Core Quick-Reference</span>
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <li><strong>Fundamental Assumptions (GAC):</strong> Going Concern, Accrual, Consistency. If they are followed, no disclosure is required. If they are violated, disclosure is mandatory.</li>
                <li><strong>Selection Considerations (PSM):</strong> Prudence, Substance over Form, Materiality. The primary objective is a True and Fair View.</li>
                <li><strong>Manner of Disclosure:</strong> All significant policies must form part of the accounts and be disclosed in one place (normally as Note 1).</li>
                <li><strong>Para 23 Rule:</strong> Footnote disclosures cannot cure incorrect accounting. The entry must be corrected.</li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-6 rounded-xl border border-[#FFE1E1] dark:border-red-900/40 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-650 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>Common Exam Mistakes</span>
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <li><strong className="text-red-600 dark:text-red-400">Mistake:</strong> Claiming that Going Concern is always followed. <em>Fact:</em> If liquidation is imminent, it must be rejected and accounts prepared on NRV.</li>
                <li><strong className="text-red-600 dark:text-red-400">Mistake:</strong> Mislabeling estimate changes as policy changes. <em>Fact:</em> Useful life changes or provisions are estimate changes (AS 5), not policy changes (AS 1).</li>
                <li><strong className="text-red-600 dark:text-red-400">Mistake:</strong> Believing that disclosure cures incorrect accounting. <em>Fact:</em> Under Para 23, disclosure cannot justify incorrect accounting.</li>
              </ul>
            </div>

            {/* High-Yield One-Liners */}
            <div className="bg-[#F5FFF9] dark:bg-[#15251C] p-6 rounded-xl border border-[#D5F5E3] dark:border-emerald-900/40 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle size={14} />
                <span>High-Yield One-Liners</span>
              </h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <p><strong>1. Disclosure location:</strong> Policies must be in one place (usually Note 1), not scattered.</p>
                <p><strong>2. Fundamental assumptions status:</strong> They are assumed to be followed; disclosure is only required if NOT followed.</p>
                <p><strong>3. Policy change justification:</strong> Only allowed if required by statute, for compliance with standard, or for a better presentation.</p>
                <p><strong>4. Quantification:</strong> If a policy change has a material impact, the exact financial impact must be quantified and disclosed.</p>
              </div>
            </div>

            {/* Important Definitions */}
            <div className="bg-[#FBF5FF] dark:bg-[#20152C] p-6 rounded-xl border border-[#F1D5F5] dark:border-purple-900/40 space-y-4 font-sans">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2">
                <BookOpen size={14} />
                <span>Important Definitions</span>
              </h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-serif">
                <p><strong>1. Accounting Policies:</strong> Specific accounting principles and the methods of applying those principles adopted by the enterprise (AS 1 Para 11).</p>
                <p><strong>2. Accrual:</strong> Revenues and costs are accrued, i.e., recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate (AS 1 Para 13).</p>
                <p><strong>3. Prudence:</strong> A degree of caution in making estimates under conditions of uncertainty, such that assets or income are not overstated and liabilities or expenses are not understated.</p>
              </div>
            </div>
          </div>

          {/* Mnemonic and RTP/MTP references */}
          <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 font-serif">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-650 dark:text-indigo-400 flex items-center gap-2">
              <Info size={14} />
              <span>PYQ & Mnemonic Revision Trap</span>
            </h4>
            <div className="space-y-4 text-xs sm:text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
              <p>
                <strong>ICAI Exam Questions (PYQ):</strong> In almost every exam, a case study is asked where a company changes its policy (e.g. inventory formula or depreciation) but does not disclose the impact, or changes the policy to manage earnings. Always refer to **AS 1 Para 22** and **Para 23** in your answers.
              </p>
              <div className="p-4 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[12.5px] text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">Mnemonic Tricks:</span>
                <p>• <strong>G-A-C:</strong> Going Concern, Accrual, Consistency (Fundamental Assumptions)</p>
                <p>• <strong>P-S-M:</strong> Prudence, Substance over Form, Materiality (Selection Considerations)</p>
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
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans flex items-center gap-2">
              <HelpCircle className="text-indigo-650 dark:text-indigo-400" size={18} />
              <span>Audit Report Drafting: Deviation from AS 1 (Section 143(3))</span>
            </h3>

            <div className="space-y-4 text-[13.5px] leading-[1.7] text-slate-750 dark:text-slate-300 font-serif">
              <p>
                When an enterprise fails to disclose significant accounting policies, or changes them without valid justification, the auditor must issue a qualified or adverse opinion. Below is a standard template for an audit qualification:
              </p>

              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed space-y-3">
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
                  <span className="font-extrabold text-indigo-650 dark:text-indigo-400 block mb-1">AUDIT RED FLAGS</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>Inconsistencies between Note 1 disclosures and actual balances.</li>
                    <li>Failure to quantify the impact of accounting policy changes.</li>
                    <li>Mislabeled write-downs as estimate revisions.</li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <span className="font-extrabold text-indigo-650 dark:text-indigo-400 block mb-1">REPRESENTATION POINTS</span>
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
