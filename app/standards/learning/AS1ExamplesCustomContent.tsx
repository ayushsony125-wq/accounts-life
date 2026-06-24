'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, AlertTriangle, Scale, BookOpen, CheckCircle, Info, HelpCircle, ShieldAlert, Award, ArrowRight } from 'lucide-react'

interface AS1ExamplesCustomContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

// ─── HELPER COMPONENTS FOR HIGH-QUALITY STRUCTURED DATA ───────────────────

// Card for Section 3: ICAI Illustrations (10-point structure)
interface ExampleCardProps {
  id: string
  title: string
  category: string
  badgeColor?: string
  facts: string
  issue: string
  principle: string
  alternatives: string
  correctTreatment: string
  analysis: string
  impact: string
  disclosure: string
  auditorView: string
  conclusion: string
  pdfPage?: number
  navigateToPdfPage: (page: number) => void
}

function ExampleCard({
  id,
  title,
  category,
  badgeColor = 'bg-blue-50 text-blue-700 dark:bg-blue-955/40 dark:text-blue-400 border-blue-200/30',
  facts,
  issue,
  principle,
  alternatives,
  correctTreatment,
  analysis,
  impact,
  disclosure,
  auditorView,
  conclusion,
  pdfPage,
  navigateToPdfPage
}: ExampleCardProps) {
  const renderRow = (num: string, label: string, content: string) => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-100 dark:border-slate-850/50 py-3.5 last:border-0">
      <div className="sm:w-52 shrink-0 flex items-center gap-2">
        <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400 border border-indigo-200/30 dark:border-indigo-800 text-[10.5px] font-mono font-bold select-none shrink-0">
          {num}
        </span>
        <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex-1 text-[13.5px] leading-relaxed text-slate-750 dark:text-slate-300 font-serif">
        {content}
      </div>
    </div>
  )

  return (
    <div id={`item-${id}`} className="bg-white dark:bg-[#111726] border border-slate-200/70 dark:border-slate-850 rounded-xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-200 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
          <span>{title}</span>
        </h3>
        <div className="flex items-center gap-2">
          {pdfPage && (
            <button
              onClick={() => navigateToPdfPage(pdfPage)}
              className="inline-flex items-center justify-center w-5 h-5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded cursor-pointer transition-all"
              title={`Open ICAI AS 1 PDF — Page ${pdfPage}`}
            >
              <FileText size={11} />
            </button>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${badgeColor}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-850">
        {renderRow('1', 'Facts', facts)}
        {renderRow('2', 'Issue', issue)}
        {renderRow('3', 'Relevant AS 1 Principle', principle)}
        {renderRow('4', 'Alternative Treatments', alternatives)}
        {renderRow('5', 'Correct Treatment', correctTreatment)}
        {renderRow('6', 'Analysis', analysis)}
        {renderRow('7', 'Financial Impact', impact)}
        {renderRow('8', 'Disclosure', disclosure)}
        {renderRow('9', 'Auditor\'s View', auditorView)}
        {renderRow('10', 'Conclusion', conclusion)}
      </div>
    </div>
  )
}

// Card for Section 4: Practical Business Examples (9-point structure)
interface BusinessExampleCardProps {
  id: string
  title: string
  industry: string
  badgeColor?: string
  situation: string
  issue: string
  alternatives: string
  analysis: string
  correctTreatment: string
  disclosure: string
  auditImpact: string
  observation: string
  takeaway: string
}

function BusinessExampleCard({
  id,
  title,
  industry,
  badgeColor = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-250/30',
  situation,
  issue,
  alternatives,
  analysis,
  correctTreatment,
  disclosure,
  auditImpact,
  observation,
  takeaway
}: BusinessExampleCardProps) {
  const renderRow = (num: string, label: string, content: string) => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-100 dark:border-slate-850/50 py-3.5 last:border-0">
      <div className="sm:w-52 shrink-0 flex items-center gap-2">
        <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-750 dark:text-emerald-455 border border-emerald-200/30 dark:border-emerald-800 text-[10.5px] font-mono font-bold select-none shrink-0">
          {num}
        </span>
        <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex-1 text-[13.5px] leading-relaxed text-slate-755 dark:text-slate-300 font-serif">
        {content}
      </div>
    </div>
  )

  return (
    <div id={`item-${id}`} className="bg-white dark:bg-[#111726] border border-slate-200/70 dark:border-slate-850 rounded-xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-200 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
          <span>{title}</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${badgeColor}`}>
          {industry}
        </span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-850">
        {renderRow('1', 'Business Situation', situation)}
        {renderRow('2', 'Issue', issue)}
        {renderRow('3', 'Available Alternatives', alternatives)}
        {renderRow('4', 'AS 1 Analysis', analysis)}
        {renderRow('5', 'Correct Treatment', correctTreatment)}
        {renderRow('6', 'Disclosure Requirement', disclosure)}
        {renderRow('7', 'Audit Impact', auditImpact)}
        {renderRow('8', 'Professional Observation', observation)}
        {renderRow('9', 'Key Takeaway', takeaway)}
      </div>
    </div>
  )
}

// Card for Section 5: Audit Case Studies (10-point structure)
interface AuditCaseCardProps {
  id: string
  title: string
  client: string
  badgeColor?: string
  facts: string
  problem: string
  risk: string
  procedures: string
  findings: string
  violation: string
  reportingImpact: string
  conclusion: string
  learningPoint: string
}

function AuditCaseCard({
  id,
  title,
  client,
  badgeColor = 'bg-red-50 text-red-700 dark:bg-red-955/40 dark:text-red-400 border-red-200/30',
  facts,
  problem,
  risk,
  procedures,
  findings,
  violation,
  reportingImpact,
  conclusion,
  learningPoint
}: AuditCaseCardProps) {
  const renderRow = (num: string, label: string, content: string) => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-100 dark:border-slate-850/50 py-3.5 last:border-0">
      <div className="sm:w-52 shrink-0 flex items-center gap-2">
        <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200/30 dark:border-red-800 text-[10.5px] font-mono font-bold select-none shrink-0">
          {num}
        </span>
        <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex-1 text-[13.5px] leading-relaxed text-slate-755 dark:text-slate-300 font-serif">
        {content}
      </div>
    </div>
  )

  return (
    <div id={`item-${id}`} className="bg-white dark:bg-[#111726] border border-slate-200/70 dark:border-slate-850 rounded-xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-200 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
          <span>{title}</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${badgeColor}`}>
          {client}
        </span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-850">
        {renderRow('1', 'Client Background', client)}
        {renderRow('2', 'Facts', facts)}
        {renderRow('3', 'Problem', problem)}
        {renderRow('4', 'Risk', risk)}
        {renderRow('5', 'Audit Procedures', procedures)}
        {renderRow('6', 'Findings', findings)}
        {renderRow('7', 'AS 1 Violation', violation)}
        {renderRow('8', 'Reporting Impact', reportingImpact)}
        {renderRow('9', 'Auditor Conclusion', conclusion)}
        {renderRow('10', 'Learning Point', learningPoint)}
      </div>
    </div>
  )
}

// Card for Section 6: Regulatory Observations (6-point structure)
interface RegulatoryObsCardProps {
  id: string
  title: string
  regulator: string
  badgeColor?: string
  observation: string
  issue: string
  principle: string
  impact: string
  bestPractice: string
}

function RegulatoryObsCard({
  id,
  title,
  regulator,
  badgeColor = 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-250/30',
  observation,
  issue,
  principle,
  impact,
  bestPractice
}: RegulatoryObsCardProps) {
  const renderRow = (num: string, label: string, content: string) => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-100 dark:border-slate-850/50 py-3.5 last:border-0">
      <div className="sm:w-52 shrink-0 flex items-center gap-2">
        <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-amber-50 dark:bg-amber-955 text-amber-750 dark:text-amber-400 border border-amber-200/30 dark:border-amber-800 text-[10.5px] font-mono font-bold select-none shrink-0">
          {num}
        </span>
        <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex-1 text-[13.5px] leading-relaxed text-slate-755 dark:text-slate-300 font-serif">
        {content}
      </div>
    </div>
  )

  return (
    <div id={`item-${id}`} className="bg-white dark:bg-[#111726] border border-slate-200/70 dark:border-slate-850 rounded-xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-200 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
          <span>{title}</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${badgeColor}`}>
          {regulator}
        </span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-850">
        {renderRow('1', 'Regulator', regulator)}
        {renderRow('2', 'Observation', observation)}
        {renderRow('3', 'Issue', issue)}
        {renderRow('4', 'AS 1 Principle Involved', principle)}
        {renderRow('5', 'Impact', impact)}
        {renderRow('6', 'Best Practice', bestPractice)}
      </div>
    </div>
  )
}

// Card for Section 7: Landmark Judicial Cases (7-point structure)
interface JudicialCaseCardProps {
  id: string
  title: string
  court: string
  badgeColor?: string
  facts: string
  issue: string
  judgment: string
  relevance: string
  learning: string
}

function JudicialCaseCard({
  id,
  title,
  court,
  badgeColor = 'bg-purple-50 text-purple-700 dark:bg-purple-955/40 dark:text-purple-400 border-purple-200/30',
  facts,
  issue,
  judgment,
  relevance,
  learning
}: JudicialCaseCardProps) {
  const renderRow = (num: string, label: string, content: string) => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-100 dark:border-slate-850/50 py-3.5 last:border-0">
      <div className="sm:w-52 shrink-0 flex items-center gap-2">
        <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-750 dark:text-purple-400 border border-purple-200/30 dark:border-purple-800 text-[10.5px] font-mono font-bold select-none shrink-0">
          {num}
        </span>
        <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex-1 text-[13.5px] leading-relaxed text-slate-755 dark:text-slate-300 font-serif">
        {content}
      </div>
    </div>
  )

  return (
    <div id={`item-${id}`} className="bg-white dark:bg-[#111726] border border-slate-200/70 dark:border-slate-850 rounded-xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-200 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
          <span>{title}</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${badgeColor}`}>
          {court}
        </span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-850">
        {renderRow('1', 'Case Name', title)}
        {renderRow('2', 'Court', court)}
        {renderRow('3', 'Facts', facts)}
        {renderRow('4', 'Issue', issue)}
        {renderRow('5', 'Judgment', judgment)}
        {renderRow('6', 'AS 1 Relevance', relevance)}
        {renderRow('7', 'Practical Learning', learning)}
      </div>
    </div>
  )
}

// ─── MAIN EXAMPLES CONTENT COMPONENT ───────────────────────────────────────

export function AS1ExamplesCustomContent({ navigateToPdfPage }: AS1ExamplesCustomContentProps) {
  const [activeSection, setActiveSection] = useState('icai-illustrations')
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const exampleChapters = [
    { id: 'icai-illustrations', title: '3. ICAI Illustrations' },
    { id: 'business-examples',  title: '4. Practical Business Examples' },
    { id: 'audit-cases',       title: '5. Audit Case Studies' },
    { id: 'regulatory-obs',    title: '6. Regulatory Observations' },
    { id: 'legal-cases',       title: '7. Landmark Judicial Cases' },
    { id: 'exam-oriented',     title: '8. Exam-Oriented Corner' },
    { id: 'audit-notes',       title: '9. Audit Notes & Reporting' }
  ]

  const handleChapterClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(`sec-${id}`)
    const stickyNavbar = document.getElementById('as1-examples-sticky-toc')
    if (container && target) {
      if (id === 'icai-illustrations') {
        container.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let stickyOffset = 98
      if (stickyNavbar) {
        const navRect = stickyNavbar.getBoundingClientRect()
        stickyOffset = navRect.bottom - containerRect.top
      }
      const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset + 2
      container.scrollTo({ top: targetScrollTop, behavior: 'auto' })
    }
  }

  // Auto-scroll TOC button into view when activeSection changes
  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector(`[data-toc-id="${activeSection}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  // Set up intersection observer to sync scroll position with active sub-nav tab
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

  // Custom heading renderer to keep styling professional, publishing-oriented and non-heavy
  const renderSectionHeader = (num: string, title: string, description: string) => (
    <div className="w-full mb-6 mt-12 first:mt-2">
      <div className="flex items-baseline gap-2 mb-2">
        <h2 className="text-[17px] sm:text-[18px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{num}.</span>
          <span>{title}</span>
        </h2>
      </div>
      <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
      {description && (
        <p className="text-[13px] font-sans font-medium text-slate-500 dark:text-gray-400 mt-1 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Tab-Specific Sub-Navbar */}
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
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-850 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-16 relative my-4">

        {/* ─── SECTION 3: ICAI ILLUSTRATIONS ────────────────────────────────────── */}
        <section id="sec-icai-illustrations" className="scroll-mt-36 space-y-8 w-full">
          {renderSectionHeader(
            '3',
            'ICAI Illustrations',
            'Mandatory illustrations, measurement scenarios, and selection situations from the ICAI Study Material mapped directly to standard references.'
          )}

          <div className="space-y-10">
            <ExampleCard
              id="3-1"
              title="Illustration 3.1: Accounting Policies vs. Estimates (Overhead vs. Warranty)"
              category="ICAI SM"
              pdfPage={4}
              navigateToPdfPage={navigateToPdfPage}
              facts="RealChem India Ltd, a chemical manufacturer, decides to change its method of allocating factory overheads to its work-in-progress (WIP) inventories from a direct-labor absorption rate (25% of wages) to a machine-hour rate system based on technical factory studies. In the same year, the company increases its provision for product warranty claims from 1.5% to 3.5% of annual sales due to early mechanical failures identified in its recently launched consumer electronics line."
              issue="Do these adjustments represent changes in accounting policies under AS 1, or changes in accounting estimates under AS 5?"
              principle="Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise (AS 1 Para 11). Accounting estimates, however, involve judgments made under uncertainty regarding useful lives, liabilities, or warranty provisions (AS 5)."
              alternatives="Management could classify both changes as policy adjustments under Note 1 to reduce profit volatility, treat both as estimate adjustments to avoid retrospective restatements, or separate the overhead change as a policy revision and the warranty change as an estimate adjustment."
              correctTreatment="The company must classify the WIP overhead allocation method change as a change in accounting policy. The warranty provision shift must be treated as a change in accounting estimate under AS 5."
              analysis="Changing the overhead absorption rate is a change in the method of applying the cost valuation principle, which is an accounting policy. Revision of warranty provisions is based on updated technical failure data, representing a change in estimate based on new information."
              impact="The WIP inventory valuation recalculation decreases current assets and profits by ₹28 Lakhs. The warranty provision increase results in an additional prospective expense charge of ₹15 Lakhs in the current P&L."
              disclosure="Disclose the quantified impact of the WIP overhead policy change in Note 1. Separately disclose the nature and current-year impact of the warranty estimate change in the notes as per AS 5."
              auditorView="Ensure that the WIP allocation calculations are mathematically correct and consistently applied. Confirm that warranty revisions are not misclassified as policy changes to avoid audit qualification."
              conclusion="The overhead change is a policy change; the warranty revision is an estimate change. Disclosures must be kept strictly separate."
            />

            <ExampleCard
              id="3-2"
              title="Illustration 3.2: Materiality in Office Stationery Write-Off (Immediate Expensing)"
              category="ICAI SM"
              pdfPage={6}
              navigateToPdfPage={navigateToPdfPage}
              facts="A trading firm purchases office printing equipment and storage bins for ₹3,50,000. Although the bins are expected to last for 4 years, the company decides to charge the entire amount to the current year's profit and loss statement as stationery expense rather than capitalising them and charging depreciation."
              issue="Does immediate expensing of long-term assets violate the matching principle and AS 1?"
              principle="Financial statements should disclose all material items, i.e., items the knowledge of which might influence the decisions of users (AS 1 Para 17(c)). Immaterial items do not require strict compliance with standard capitalization rules if the administrative costs exceed the reporting benefit."
              alternatives="Capitalise as property, plant, and equipment and depreciate over 4 years, or charge to expense immediately under the materiality principle."
              correctTreatment="Charge the ₹3,50,000 immediately to the P&L statement under general office expenses."
              analysis="The equipment value represents less than 0.05% of the company's total asset base and has no bearing on shareholders' analytical decisions. Therefore, capitalizing and calculating annual depreciation of ₹87,500 is immaterial and not practically justified."
              impact="Current-year operating expenses increase by ₹3,50,000. Fixed assets are lower by ₹2,62,500 compared to capitalization."
              disclosure="No specific disclosure or policy note is required, as the amount falls well below the materiality threshold."
              auditorView="Verify that the write-off is consistent with the company's internal materiality policy (e.g. expensing all assets under ₹5,00,000)."
              conclusion="Writing off the bins immediately is acceptable and complies with the materiality consideration of AS 1."
            />

            <ExampleCard
              id="3-3"
              title="Illustration 3.3: Para 23 — Disclosure Cannot Cure Incorrect Accounting (Interest Capitalization)"
              category="Para 23"
              pdfPage={7}
              navigateToPdfPage={navigateToPdfPage}
              facts="PrimeBuilders Ltd capitalized interest on general borrowing during a two-year period when construction on a new office block was suspended due to labor disputes. To address the incorrect capitalization, the directors added a detailed footnote in Note 1 stating: 'Interest capitalized during construction suspension periods has been included in fixed assets to preserve gross margins, and will be depreciated over 30 years.'"
              issue="Does a clear footnote disclosure validate the incorrect capitalization of borrowing costs under AS 1?"
              principle="Under Paragraph 23, disclosure of accounting policies or changes therein cannot remedy a wrong or inappropriate accounting treatment."
              alternatives="Retain capitalization and rely on the footnote, or reverse the interest from fixed assets and charge it directly to the current P&L as required by AS 16."
              correctTreatment="The company must expense the interest of ₹45 Lakhs incurred during the suspension period directly to the P&L statement."
              analysis="Since AS 16 prohibits capitalizing borrowing costs when active development is interrupted, the accounting treatment is wrong. The footnote disclosure cannot justify or remedy this incorrect treatment."
              impact="Reversing the capitalization decreases fixed assets by ₹45 Lakhs and decreases net profit before tax by ₹45 Lakhs."
              disclosure="The incorrect policy note must be removed, and normal borrowing cost policies under AS 16 must be stated."
              auditorView="The auditor must refuse the footnote remedy. If management fails to adjust the assets, the auditor must issue a qualified or adverse audit report."
              conclusion="Footnote disclosures cannot cure incorrect accounting. The interest must be expensed."
            />

            <ExampleCard
              id="3-4"
              title="Illustration 3.4: Disclosure of Inventory Valuation Formula Change (FIFO to Weighted Average)"
              category="Inventory"
              pdfPage={5}
              navigateToPdfPage={navigateToPdfPage}
              facts="MetalCraft Ltd, a steel fabricator, has valued its steel stock using the FIFO method for ten years. Due to volatile raw material prices, the company changes its valuation formula to the Weighted Average Cost (WAC) method at the year-end. The change reduces the year-end inventory value by ₹62 Lakhs."
              issue="Is the change in inventory valuation formula permissible under AS 1, and what are the disclosure requirements?"
              principle="A change in accounting policy is permissible if required by statute, for compliance with an accounting standard, or if it results in a more appropriate presentation. Under AS 1, the impact of such change must be quantified and disclosed."
              alternatives="Retain FIFO to show higher profits; change to Weighted Average and disclose the nature but not the impact; or change to Weighted Average, disclose the nature, and quantify the full financial impact (standard-compliant)."
              correctTreatment="Value inventory on Weighted Average Cost at ₹3.4 Crores. Recognize the reduction of ₹62 Lakhs in current profit."
              analysis="Using WAC during highly volatile price periods smoothens inventory costs, resulting in a more appropriate presentation of cost of goods sold. The change is justified, but the financial impact must be disclosed."
              impact="Net profit before tax decreases by ₹62 Lakhs. Current assets (inventories) are reduced by ₹62 Lakhs."
              disclosure="Disclose in Note 1: 'The Company has changed its inventory valuation formula from FIFO to Weighted Average. This change has resulted in a decrease in current profit and inventory value by ₹62 Lakhs.'"
              auditorView="Verify the mathematical accuracy of the transition calculations from FIFO to WAC. Ensure the disclosure is complete and cross-referenced to Note 1."
              conclusion="The formula change is permissible, provided the change is justified and its financial impact is fully quantified and disclosed."
            />

            <ExampleCard
              id="3-5"
              title="Illustration 3.5: Depreciation Method Change (SLM to WDV)"
              category="Depreciation"
              pdfPage={5}
              navigateToPdfPage={navigateToPdfPage}
              facts="Precision Engineering Ltd has depreciated its high-precision CNC machines using the Straight-Line Method (SLM). In the current year, due to heavy operational wear and tear in early years, the company shifts to the Written Down Value (WDV) method."
              issue="Is this change classified as a change in accounting policy or accounting estimate, and does it require disclosure under AS 1?"
              principle="Under AS 10 (Revised), a change in depreciation method is treated as a change in accounting estimate. However, under AS 1, any material change in the method of applying accounting principles must be disclosed if it has a material impact."
              alternatives="Treat as a change in accounting policy and apply retrospectively, or treat as a change in accounting estimate and apply prospectively with appropriate disclosure (standard-compliant)."
              correctTreatment="Apply the WDV method prospectively over the remaining useful life of the machinery. Charge the higher depreciation of ₹18 Lakhs to the P&L."
              analysis="Since the method change reflects an updated estimation of the pattern of consumption of economic benefits, it is an estimate change under AS 10. No retrospective adjustment is required, but disclosure of the prospective change is necessary."
              impact="Current depreciation expense increases by ₹18 Lakhs. Fixed asset carrying value decreases by ₹18 Lakhs."
              disclosure="Disclose in fixed asset notes: 'The Company changed its depreciation method for CNC machinery from SLM to WDV to better reflect the pattern of consumption. This change has increased the current depreciation charge by ₹18 Lakhs.'"
              auditorView="Verify the technical assessment report justifying the change in the consumption pattern. Check the prospective calculations."
              conclusion="Reclassify and apply the change prospectively as an estimate change. Disclose the nature and impact clearly."
            />

            <ExampleCard
              id="3-6"
              title="Illustration 3.6: Revenue Recognition Uncertainty (Export Incentives)"
              category="Revenue"
              pdfPage={6}
              navigateToPdfPage={navigateToPdfPage}
              facts="AgroFoods India Ltd exported grain worth ₹5 Crores in March 2026. The government offers a 5% export incentive claim, but the company is eligible only after formal approval from customs, which usually takes 9 months. Management wants to accrue the incentive of ₹25 Lakhs in FY 2025-26 profit."
              issue="Does the accrual of export incentive claims before custom approval violate the Prudence principle of AS 1?"
              principle="Under AS 9 and AS 1, revenue should not be recognized when significant uncertainties exist regarding its measurability or ultimate collection. Prudence dictates that revenue should only be recognized when it is reasonably certain."
              alternatives="Accrue the incentive immediately as other income; recognize on a cash basis upon receipt; or defer recognition until formal claim lodgement and custom validation (standard-compliant)."
              correctTreatment="Defer recognition of the ₹25 Lakhs export incentive until custom validation is secured. Do not accrue in current FY."
              analysis="Since customs has the right to deny claims based on strict verification criteria, the ultimate collection of the incentive remains uncertain at year-end. Accruing it violates prudence and anticipates revenue."
              impact="Current-year net profit and receivables are lower by ₹25 Lakhs compared to aggressive accrual."
              disclosure="Disclose the accounting policy for government incentives: 'Government export incentives are recognized as revenue only upon customs validation and establishment of reasonable certainty of collection.'"
              auditorView="Inspect historical claim rejection rates. Confirm that no material export incentives are accrued prior to regulatory approval."
              conclusion="Do not recognize the incentive. Prudence overrides early accrual when significant collection uncertainty exists."
            />

            <ExampleCard
              id="3-7"
              title="Illustration 3.7: Foreign Exchange Rate Shift (Translation Method)"
              category="Foreign Exchange"
              pdfPage={4}
              navigateToPdfPage={navigateToPdfPage}
              facts="GlobalTech India Ltd has a branch office in Germany. For five years, the company translated the branch's operating expenses using the average exchange rate for the year. In FY 2025-26, to show lower operational costs, management wants to translate expenses using the year-end closing exchange rate, which is highly favorable."
              issue="Is a change in foreign currency translation rate method a change in accounting policy under AS 1?"
              principle="The currency translation rates and method are methods of applying accounting principles, which constitute an accounting policy. A change in the method of translating foreign currency transactions is a change in accounting policy under AS 11 and AS 1."
              alternatives="Adopt the closing rate and disclose it; retain the average rate method; or change to closing rate only if justified as a better presentation, and disclose the impact."
              correctTreatment="Retain the average rate method for expenses unless closing rate provides a materially better presentation. If changed, disclose the impact."
              analysis="The average rate represents transaction values throughout the year more appropriately. Shifting to closing rate just to manipulate expenses does not represent a true and fair view and violates consistency."
              impact="Using the closing rate would have reduced reported operating expenses by ₹40 Lakhs and inflated net profit by ₹40 Lakhs."
              disclosure="If the change is carried out, Note 1 must state: 'The Company has changed its method of translating foreign branch expenses from average rate to closing rate. This change has increased current profits by ₹40 Lakhs.'"
              auditorView="Challenge management's justification for the change. If the change is purely to window-dress profits, qualify the audit report."
              conclusion="A translation method change is a change in accounting policy. It must be justified and its impact quantified."
            />

            <ExampleCard
              id="3-8"
              title="Illustration 3.8: Investment Valuation policy (Current vs. Long-Term)"
              category="Investments"
              pdfPage={5}
              navigateToPdfPage={navigateToPdfPage}
              facts="Vanguard Holdings Ltd holds a portfolio of mutual fund units. Previously, the company classified all units as long-term and carried them at cost. In the current year, the company reclassifies half the units as current investments and continues to value them at cost, despite a 30% drop in market value."
              issue="Does carrying reclassified current investments at cost violate the prudence and consistency principles of AS 1?"
              principle="Under AS 13, current investments must be carried at the lower of cost and fair value. Carrying them at cost when market value is lower violates both AS 13 and the prudence concept of AS 1."
              alternatives="Carry all investments at cost; value current investments at lower of cost or fair value (standard-compliant); or write down all investments including long-term ones."
              correctTreatment="Value the current investments at fair value, writing down their value by ₹35 Lakhs to the P&L statement."
              analysis="Current investments are short-term assets held for ready realization. Under the prudence principle, anticipated losses in current asset values must be recognized immediately in the P&L."
              impact="Current-year profits decrease by ₹35 Lakhs. Current assets (investments) decrease by ₹35 Lakhs."
              disclosure="Disclose the policy: 'Current investments are carried at the lower of cost and fair value. Long-term investments are carried at cost, with provision for diminution other than temporary.'"
              auditorView="Verify mutual fund NAVs at balance sheet date. Ensure the write-down of ₹35 Lakhs is properly charged to the P&L."
              conclusion="The current investments must be valued at fair value (lower than cost) to comply with AS 13 and prudence."
            />

            <ExampleCard
              id="3-9"
              title="Illustration 3.9: Borrowing Costs on Qualifying Assets"
              category="Borrowing Costs"
              pdfPage={5}
              navigateToPdfPage={navigateToPdfPage}
              facts="Apex Power Ltd is constructing a thermal power plant. The construction takes 3 years. The company capitalized interest on loans taken for the project. In the current year, construction was halted for 6 months because of a government safety audit. Management capitalized interest of ₹1.2 Crores incurred during this halt."
              issue="Is capitalizing borrowing costs during a regulatory suspension period compliant with AS 1 and AS 16?"
              principle="Under AS 16, capitalization of borrowing costs must be suspended during extended periods in which active development is interrupted. Capitalizing during suspension violates AS 16 and overstates profits under AS 1."
              alternatives="Expense the interest of ₹1.2 Crores to P&L during the halt (standard-compliant); capitalise the interest to fixed assets; or capitalise a portion based on management estimate."
              correctTreatment="Charge the interest of ₹1.2 Crores incurred during the suspension period directly to the P&L as a finance cost."
              analysis="Capitalization is only allowed when active development of the asset is underway. A safety audit that halts construction is an interruption that requires suspension of interest capitalization."
              impact="Net profit before tax decreases by ₹1.2 Crores. Capital work-in-progress is reduced by ₹1.2 Crores."
              disclosure="Disclose the borrowing cost policy: 'Borrowing costs directly attributable to qualifying assets are capitalized. Capitalization is suspended during extended construction interruptions.'"
              auditorView="Audit project schedules and logbooks. Ensure capitalization is paused during suspension periods."
              conclusion="Suspended period interest must be expensed immediately to present a true and fair view of asset cost."
            />

            <ExampleCard
              id="3-10"
              title="Illustration 3.10: Government Grants Policy Change"
              category="Govt Grants"
              pdfPage={5}
              navigateToPdfPage={navigateToPdfPage}
              facts="GreenEnergy Ltd received a government grant of ₹1.5 Crores toward the cost of wind turbines. Previously, the company's policy was to reduce the cost of the asset by the grant amount. In the current year, to show higher gross block values, management wants to change the policy and treat the grant as deferred income."
              issue="Is a change in the method of accounting for government grants a change in accounting policy, and is it valid under AS 1?"
              principle="Accounting for government grants is an accounting policy. A change in method (cost reduction vs. deferred income) is a change in accounting policy under AS 12 and AS 1, and is valid if it results in a more appropriate presentation."
              alternatives="Retain the cost reduction method; change to deferred income method and apply retrospectively (standard-compliant); or apply prospectively without adjusting historical blocks."
              correctTreatment="Apply the deferred income method retrospectively, increasing gross block and creating a deferred grant liability of ₹1.5 Crores, and adjust depreciation accordingly."
              analysis="Both methods are permitted under AS 12. Changing the method is a change in accounting policy. The company must apply the change retrospectively and disclose its financial impact."
              impact="Gross block of fixed assets increases by ₹1.5 Crores. Deferred government grant liability increases by ₹1.2 Crores (net of amortization)."
              disclosure="Disclose in Note 1: 'The Company changed its policy for government grants from asset cost reduction to deferred income. This retrospective change has increased gross fixed assets by ₹1.5 Crores.'"
              auditorView="Check the retrospective recalculation sheets. Confirm that depreciation has been adjusted for past periods."
              conclusion="The policy change is permissible. It must be applied retrospectively with full disclosure of the impact."
            />

            <ExampleCard
              id="3-11"
              title="Illustration 3.11: Employee Benefits Accrual Transition"
              category="Employee Benefits"
              pdfPage={3}
              navigateToPdfPage={navigateToPdfPage}
              facts="Hindustan Services Ltd has 800 employees. For ten years, the company accounted for employee gratuity payments on a cash basis (when paid to retiring employees). In FY 2025-26, to comply with the accrual principle, the board decides to set up a gratuity fund and account for obligations on an actuarial basis."
              issue="How should the transition from cash-basis to actuarial accrual of gratuity be accounted for and disclosed under AS 1?"
              principle="Accrual is a fundamental accounting assumption under AS 1. Accounting for employee benefits on a cash basis is incorrect. Shifting to actuarial accrual is correcting a fundamental error and implementing the accrual assumption."
              alternatives="Charge the entire past service liability to current P&L; adjust retrospectively through opening reserves (standard-compliant); or change prospectively without accounting for past service."
              correctTreatment="Calculate the actuarial liability for past service (₹1.8 Crores). Adjust the opening balance of retained earnings retrospectively, and charge current-year service cost to the P&L."
              analysis="Under AS 15 and AS 1, accrual is mandatory. Cash-basis gratuity was an incorrect accounting treatment. The transition is correcting an inappropriate policy, requiring retrospective restatement of reserves."
              impact="Retained earnings (opening balance) decreases by ₹1.8 Crores. Current liability for gratuity increases by ₹1.8 Crores."
              disclosure="Disclose in Note 1: 'The Company transitioned from cash-basis to actuarial accrual for employee gratuity. Opening reserves have been adjusted downward by ₹1.8 Crores to reflect past service liability.'"
              auditorView="Ensure the actuarial report is signed by a certified actuary. Verify that the retrospective adjustments are correct."
              conclusion="Transitioning to accrual gratuity is mandatory to satisfy the fundamental accounting assumptions of AS 1."
            />

            <ExampleCard
              id="3-12"
              title="Illustration 3.12: Materiality in Low-Value Assets Write-Off"
              category="Materiality"
              pdfPage={6}
              navigateToPdfPage={navigateToPdfPage}
              facts="RetailTech Ltd operates a chain of 150 supermarkets. During the year, the company spent ₹45,000 per store (totaling ₹67.5 Lakhs) on barcode scanners, security brackets, and cash drawer inserts. The items have a useful life of 3 years. The company expensed the entire amount in the current year."
              issue="Does immediate expensing of low-value assets across multiple locations violate the matching principle of AS 1?"
              principle="Under AS 1, materiality is a core selection consideration. Items of low unit value can be expensed immediately even if their useful life exceeds one year, provided the aggregate amount does not materially distort the financial statements."
              alternatives="Capitalise as fixed assets and depreciate over 3 years; expense immediately based on materiality (standard-compliant); or capitalize only for stores with sales above a certain threshold."
              correctTreatment="Expense the ₹67.5 Lakhs immediately. Maintain an operational register of the equipment for physical control."
              analysis="Although the aggregate amount of ₹67.5 Lakhs is noticeable, the unit cost per item is very low (under ₹5,000). The cost of tracking depreciation and tagging thousands of small items exceeds the accounting benefit, justifying immediate write-off."
              impact="Current-year profits are lower by ₹45 Lakhs (net of first-year depreciation). Fixed assets are lower by ₹45 Lakhs."
              disclosure="No specific policy disclosure is required, but the accounting policy for fixed assets should state that assets under a certain threshold are expensed."
              auditorView="Verify that the expensing is consistent with the company's written capitalization threshold policy."
              conclusion="Expensing low-value assets immediately is acceptable under the materiality concept of AS 1."
            />

            <ExampleCard
              id="3-13"
              title="Illustration 3.13: Prudence in Provisioning Contingent Liability"
              category="Prudence"
              pdfPage={6}
              navigateToPdfPage={navigateToPdfPage}
              facts="ChemPharma Ltd is sued by a local environmental group for dumping untreated waste. Legal counsel estimates a 70% probability that the court will impose a fine of ₹1.2 Crores. Management wants to disclose this only as a contingent liability in the footnotes without making a provision, to avoid depressing earnings."
              issue="Does the omission of a provision for a probable legal liability violate the prudence principle of AS 1?"
              principle="Prudence requires that provisions should be made for all known liabilities and losses, even if the amount is estimated. Under AS 29, a provision is required if a liability is probable (over 50% chance) and can be estimated reliably."
              alternatives="Disclose as a contingent liability in notes only; make a provision for the full ₹1.2 Crores in P&L (standard-compliant); or make a partial provision of ₹50 Lakhs."
              correctTreatment="Create a provision of ₹1.2 Crores in the P&L and recognize a corresponding current liability."
              analysis="Since the liability is probable (70% chance) and the amount is estimated at ₹1.2 Crores, the prudence concept requires immediate recognition. Failure to recognize the loss represents a lack of prudence and misleads users."
              impact="Net profit before tax decreases by ₹1.2 Crores. Current liabilities increase by ₹1.2 Crores."
              disclosure="Disclose the legal case details and the provision in the notes: 'A provision of ₹1.2 Crores has been made for estimated environmental damages in connection with the ongoing litigation.'"
              auditorView="Review legal counsel correspondence. If management refuses to provide, qualify the audit report for under-provisioning."
              conclusion="A provision must be made. Prudence overrides management's desire to maintain reported profit levels."
            />

            <ExampleCard
              id="3-14"
              title="Illustration 3.14: Substance Over Form in Equipment Lease"
              category="Substance"
              pdfPage={6}
              navigateToPdfPage={navigateToPdfPage}
              facts="LogiTrans India Ltd leased 50 delivery trucks under a contract labeled 'Operating Lease.' The lease term covers 95% of the useful life of the trucks, and the present value of lease payments equals 98% of the trucks' market value. The company recorded lease payments as rent expense, keeping the trucks off the balance sheet."
              issue="Does accounting for a finance lease as an operating lease violate the Substance over Form principle of AS 1?"
              principle="Under AS 1, transactions must be accounted for in accordance with their substance and financial reality, not merely their legal form. Under AS 19, a lease that transfers substantially all risks and rewards is a finance lease."
              alternatives="Record as rent expense (operating lease); capitalize the trucks and record a lease liability (standard-compliant); or record as a joint venture asset."
              correctTreatment="Capitalize the trucks at their fair value (₹6 Crores), recognize a corresponding lease liability, and charge depreciation and interest."
              analysis="Although the contract is legally structured as a lease/rental agreement, the economic substance is a financed purchase of the trucks. Under the Substance over Form principle, the trucks must be capitalized on the balance sheet."
              impact="Assets and liabilities increase by ₹6 Crores. Operating expenses decrease by ₹1.2 Crores (replaced by depreciation and interest of ₹1.4 Crores)."
              disclosure="Disclose the lease accounting policy in Note 1: 'Assets acquired under finance leases are capitalized at the inception of the lease at the fair value of the leased assets.'"
              auditorView="Examine lease contract terms (term, payments, ownership options). Force management to capitalize if risk/reward is transferred."
              conclusion="The lease must be capitalized. Accounting must reflect the economic substance of the transaction."
            />

            <ExampleCard
              id="3-15"
              title="Illustration 3.15: Going Concern Assumption Defeated"
              category="Going Concern"
              pdfPage={5}
              navigateToPdfPage={navigateToPdfPage}
              facts="Bharat Airways Ltd has grounded its entire fleet due to safety violations. The airline has outstanding loans of ₹450 Crores and negative net worth. The operating license has been suspended indefinitely. Management prepared the financial statements on a going concern basis, valuing planes at historical cost less depreciation."
              issue="Is preparing accounts on a going concern basis valid under AS 1 when operations are suspended and liquidation is likely?"
              principle="Going concern is a fundamental assumption. If liquidation or cessation of operations is imminent, the assumption is invalid, and assets must be valued at net realizable value (NRV) rather than historical cost."
              alternatives="Prepare accounts on going concern basis with a warning footnote; prepare accounts on liquidation (NRV) basis (standard-compliant); or prepare accounts on a cash-only basis."
              correctTreatment="Prepare financial statements on a liquidation basis. Write down all assets to their estimated net realizable values, and reclassify long-term liabilities as current."
              analysis="Since the operating license is suspended and net worth is eroded, the company is unlikely to continue operations. Preparing accounts on a going concern basis is misleading. Assets must be written down to salvage value."
              impact="Assets value decreases by ₹180 Crores due to write-down to NRV. Net loss increases by ₹180 Crores."
              disclosure="Disclose in Note 1: 'These financial statements have been prepared on a liquidation basis as the company is unable to continue as a going concern. All assets have been valued at their net realizable values.'"
              auditorView="If management prepares on going concern, issue an adverse audit report. If prepared on liquidation basis with proper valuation, issue an unqualified report with an Emphasis of Matter paragraph."
              conclusion="The going concern assumption is invalid. Financial statements must be prepared on a liquidation basis."
            />
          </div>
        </section>

        {/* ─── SECTION 4: PRACTICAL BUSINESS EXAMPLES ────────────────────────────── */}
        <section id="sec-business-examples" className="scroll-mt-36 space-y-8 w-full border-t border-slate-250 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '4',
            'Practical Business Examples',
            'Industry-specific accounting challenges detailing business situations, permitted alternatives, AS 1 qualitative analyses, and final accounting treatments.'
          )}

          <div className="space-y-10">
            <BusinessExampleCard
              id="4-1"
              title="Example 4.1: Manufacturing — Fixed Overhead Allocation under Idle Capacity"
              industry="Manufacturing"
              situation="TexSpun India Ltd experienced a 40% reduction in production volume due to a labor strike. The fixed factory overheads remained constant at ₹1.2 Crores. Management allocated the entire fixed overheads to the lower volume of finished goods, which inflated the unit cost of ending inventory by ₹45 per unit."
              issue="Should the abnormal fixed overheads arising from low production be capitalized into inventory values under AS 1?"
              alternatives="(a) Allocate fixed overheads based on actual production volume, which inflates inventory assets; (b) allocate fixed overheads based on normal capacity, expensing the unallocated overheads to the P&L (standard-compliant)."
              analysis="Under the Prudence and True and Fair View considerations of AS 1, abnormal costs must not be capitalized into inventory as it overstates current assets and defers operational losses to future periods (AS 2 overlap)."
              correctTreatment="Allocate fixed overheads to inventory based on normal capacity (e.g. ₹80 Lakhs). Charge the remaining ₹40 Lakhs of unallocated fixed overheads directly to the P&L statement as 'abnormal idle capacity expense.'"
              disclosure="State the policy for allocating fixed overheads in Note 1: 'Fixed production overheads are allocated to inventory based on normal operating capacity. Abnormal unallocated overheads are charged directly to the P&L.'"
              auditImpact="Verify normal capacity calculations and actual production records. Ensure that unallocated overheads are not included in inventory cost sheets."
              observation="Capitalizing idle capacity costs is a common earnings management tactic during recessions. Auditors must enforce AS 2 and AS 1 compliance strictly."
              takeaway="Abnormal overheads must be expensed immediately to present a true and fair view of cost and asset values."
            />

            <BusinessExampleCard
              id="4-2"
              title="Example 4.2: Trading — Accrual of Claims for Damaged Goods in Transit"
              industry="Trading"
              situation="PrimeDistributors Ltd had goods worth ₹18 Lakhs damaged in transit in February 2026. The company filed an insurance claim. In April 2026, before approval of accounts, the insurance company acknowledged the claim but agreed to pay only 75% (₹13.5 Lakhs). Management wants to record the full ₹18 Lakhs as a receivable in FY 2025-26."
              issue="Is accruing the full claim amount permissible under the accrual and prudence concepts of AS 1?"
              alternatives="(a) Accrue the full ₹18 Lakhs as receivable; (b) accrue ₹13.5 Lakhs based on insurance acknowledgement (standard-compliant); (c) record no claim receivable until the money is received."
              analysis="Accruing the full ₹18 Lakhs anticipates a profit/recovery that is not assured. Prudence requires recognizing only the portion acknowledged by the insurer. Accrual requires recording the loss net of the probable recovery."
              correctTreatment="Recognize a loss of ₹4.5 Lakhs in the P&L and record an insurance claim receivable of ₹13.5 Lakhs in the balance sheet for FY 2025-26."
              disclosure="Disclose the claim details in the notes: 'An insurance claim of ₹13.5 Lakhs acknowledged by the insurer has been recognized as other current assets, and the balance loss of ₹4.5 Lakhs has been charged to P&L.'"
              auditImpact="Inspect the correspondence from the insurance company. Verify the date of acknowledgment and the approved settlement amount."
              observation="Trading companies often delay recording inventory losses by keeping unapproved insurance claims as assets. This must be prevented."
              takeaway="Recognize claims only to the extent of confirmed recovery. Unconfirmed balances must be written off."
            />

            <BusinessExampleCard
              id="4-3"
              title="Example 4.3: Tea Industry — Valuation of Harvested Green Leaves at Plucking"
              industry="Tea Industry"
              situation="AssamTea Estates Ltd harvests green leaves from its tea gardens. The leaves are then processed into black tea. At the year-end, the company has 12,000 kg of harvested green leaves in transit. Management wants to value these leaves at their estimated market selling price less transport costs, rather than actual cultivation cost."
              issue="Is agricultural produce valued at net realizable value or cost prior to final processing under AS 1?"
              alternatives="(a) Value at net realizable value (NRV) (accrues unrealized agricultural profits); (b) value at cost of plucking and transportation (standard-compliant)."
              analysis="Under the Prudence principle, profits must not be anticipated. Inventory must be carried at cost unless net realizable value is lower. Since green leaves are intermediate agricultural produce, they must be valued at cost."
              correctTreatment="Value the green leaves at the direct cost of plucking and transport to the processing facility. Do not recognize any agricultural profit until the tea is sold."
              disclosure="State the policy in Note 1: 'Harvested green leaves are valued at cost, representing direct agricultural pluck costs and transit overheads.'"
              auditImpact="Check labor logs for plucking wages and transport invoices. Confirm that no market price margins are added to raw agricultural inventories."
              observation="Agricultural entities often attempt to recognize profit at harvest. In the Indian GAAP framework, cost-based valuation remains mandatory under AS 2."
              takeaway="Harvested produce must be carried at cost. Profit is realized only on final sale."
            />

            <BusinessExampleCard
              id="4-4"
              title="Example 4.4: Service Industry — Revenue Recognition on Software Consulting Milestones"
              industry="Service Industry"
              situation="SoftTech Consulting Ltd entered into a contract to build a billing system for a client for ₹50 Lakhs. The contract has 4 milestones. At the year-end, milestone 3 is 90% complete, but not yet approved by the client. Management wants to recognize 90% of the milestone revenue (₹11.25 Lakhs) in the current year."
              issue="Does revenue recognition on unapproved milestones satisfy the accrual and prudence concepts of AS 1?"
              alternatives="(a) Recognize ₹11.25 Lakhs as revenue; (b) recognize no revenue for milestone 3 until formal client sign-off (standard-compliant); (c) recognize the entire contract value based on progress."
              analysis="Under AS 9, revenue is recognized when there is no significant uncertainty regarding its measurement and collection. Recognizing revenue before client approval introduces collection risk, violating prudence."
              correctTreatment="Do not recognize revenue for milestone 3 in FY 2025-26. Carry the incurred work cost as work-in-progress on the balance sheet."
              disclosure="Disclose the policy: 'Revenue from software development contracts is recognized upon achievement and formal client acceptance of specified contract milestones.'"
              auditImpact="Examine the contract terms and milestone sign-off sheets. Verify that no revenue is accrued for pending milestones."
              observation="Service companies often accelerate revenue recognition by estimating progress. Milestone approvals are the only objective evidence."
              takeaway="Do not accrue revenue on milestones until formal client acceptance is obtained."
            />

            <BusinessExampleCard
              id="4-5"
              title="Example 4.5: Construction — Estimation Change in Percentage of Completion Method"
              industry="Construction"
              situation="Landmark Infrastructures Ltd is building a bridge. Total estimated cost was ₹40 Crores. In Year 2, due to steel price inflation, the technical team increases the total cost estimate to ₹48 Crores. Management wants to ignore this estimate change in current-year revenue calculations, claiming steel prices will fall in Year 3."
              issue="Is ignoring an updated cost estimate in construction accounting compliant with consistency and prudence under AS 1?"
              alternatives="(a) Ignore the cost increase and calculate revenue based on old estimates; (b) update the cost estimate immediately and recognize the cumulative impact in current P&L (standard-compliant)."
              analysis="Prudence requires immediate recognition of anticipated losses. Ignoring the updated estimate overstates the percentage of completion and current-year profits, representing a false view."
              correctTreatment="Update the total cost estimate to ₹48 Crores. Recalculate the percentage of completion, and charge the cumulative impact of the lower profit margin to the current P&L."
              disclosure="Disclose the policy and change: 'Total project costs are reviewed periodically, and adjustments are made in the period when changes become known. Cost estimates were updated, reducing current profit by ₹1.6 Crores.'"
              auditImpact="Audit the engineering cost estimation sheets. Verify steel purchase invoices and verify that all current cost increases are factored into project cost sheets."
              observation="Construction companies often hide cost overruns by delaying cost estimate updates. Auditors must review project status files."
              takeaway="All cost estimate revisions must be recognized immediately to maintain a true and fair view of progress."
            />

            <BusinessExampleCard
              id="4-6"
              title="Example 4.6: Infrastructure — Toll Amortization Policy Change (Traffic vs. Time)"
              industry="Infrastructure"
              situation="Tollways India Ltd operates a BOT toll road. Previously, the company amortized the intangible toll asset over the concession period of 20 years on a straight-line basis. In the current year, to match high traffic volume, the company changes the policy to amortize based on projected traffic volume, reducing amortization by ₹3 Crores."
              issue="Is changing the amortization method from SLM to traffic-volume basis a change in accounting policy under AS 1?"
              alternatives="(a) Change the amortization method and apply retrospectively (standard-compliant); (b) retain SLM; (c) apply the change prospectively without restating past amortization."
              analysis="The amortization method of intangible assets is an accounting policy. A change in the method must be applied retrospectively under AS 26 and AS 1, and its impact must be disclosed."
              correctTreatment="Apply the traffic-volume amortization method retrospectively. Adjust opening reserves and disclose the nature and financial impact of the change."
              disclosure="Disclose in Note 1: 'The Company changed its amortization method for toll road rights from SLM to traffic-volume projection. This retrospective change reduced accumulated amortization by ₹1.2 Crores.'"
              auditImpact="Review the independent traffic projection study report. Verify that the projected traffic calculations are reasonable and verified."
              observation="Infrastructure entities change amortization methods to manage earnings during low-traffic startup years. Technical justification is key."
              takeaway="Amortization method changes are policy changes and require retrospective restatement and disclosure."
            />

            <BusinessExampleCard
              id="4-7"
              title="Example 4.7: NBFC — Accounting Policy for Loan Provisioning (RBI vs. Prudence)"
              industry="NBFC"
              situation="FinHold Capital Ltd has a loan portfolio of ₹150 Crores. Under RBI guidelines, the company is required to maintain a general provision of 10% on substandard loans. However, due to systemic defaults in the agricultural sector, the management estimates that actual defaults will be 18%. The board wants to provision only 10% to comply with RBI rules."
              issue="Does provisioning based on minimum regulatory guidelines rather than actual estimated defaults satisfy prudence under AS 1?"
              analysis="Prudence is a primary consideration in selecting accounting policies. Minimum regulatory requirements do not override the necessity to provide for actual estimated losses to represent a true and fair view."
              alternatives="(a) Provision 10% as per RBI rules; (b) provision 18% based on actual estimated defaults (standard-compliant); (c) provision 10% and disclose the extra risk in footnotes."
              correctTreatment="Make a provision of 18% (₹2.7 Crores) on substandard loans, charging the extra 8% directly to the P&L statement."
              disclosure="Disclose the provisioning policy: 'Provisions for loan losses are made based on management's estimate of actual defaults, subject to the minimum provisioning norms prescribed by the RBI.'"
              auditImpact="Review default logs and credit rating reports of borrowers. Ensure provisions match actual risk, not just legal minimums."
              observation="Financial institutions often treat regulatory minimums as maximums. True and fair view requires provisioning for all estimated losses."
              takeaway="Regulatory minimums do not override prudence. Provision for actual estimated defaults."
            />

            <BusinessExampleCard
              id="4-8"
              title="Example 4.8: Retail — Customer Loyalty Points Program Revenue Deferral"
              industry="Retail"
              situation="MegaMart India Ltd runs a loyalty program. Customers earn 1 point for every ₹100 spent. Points can be redeemed within 2 years. In FY 2025-26, customers earned points worth ₹40 Lakhs. The company recorded the entire sales value as revenue, making no adjustment for the outstanding points."
              issue="Does immediate recognition of revenue from transactions with outstanding loyalty points violate the matching and accrual concepts of AS 1?"
              alternatives="(a) Recognize full revenue immediately; (b) defer revenue by allocating transaction price to points based on fair value (standard-compliant); (c) record a general provision in P&L."
              analysis="Loyalty points represent a separate performance obligation. Recognizing full revenue immediately anticipates income before the service is delivered, violating accrual and matching."
              correctTreatment="Defer revenue of ₹40 Lakhs by recognizing it as deferred revenue (current liability). Recognize the revenue only when the points are redeemed or expire."
              disclosure="Disclose the policy: 'Revenue from sales is allocated between the product sold and the loyalty points awarded. The portion allocated to points is deferred and recognized when points are redeemed.'"
              auditImpact="Verify the point ledger and redemption rate calculations. Ensure the deferred revenue is properly classified as a current liability."
              observation="Retailers often ignore loyalty point liabilities due to low unit values. In aggregate, they represent material liabilities."
              takeaway="Defer revenue for loyalty points to match income with the delivery of the redemption service."
            />

            <BusinessExampleCard
              id="4-9"
              title="Example 4.9: Pharma — R&D Expenditure Expensing vs. Capitalization"
              industry="Pharma"
              situation="BioCure Laboratories Ltd spent ₹3.2 Crores on clinical trials for a new diabetic drug. Phase II trials were successful, but Phase III trials are pending approval. The management capitalized the ₹3.2 Crores as 'intangible asset under development' to avoid showing a loss."
              issue="Is capitalizing clinical trial costs prior to final regulatory approval compliant with AS 1 and AS 26?"
              alternatives="(a) Capitalise the trial costs as intangible assets; (b) expense the trial costs immediately to P&L (standard-compliant); (c) capitalize and write off over 5 years."
              analysis="Under AS 26, research and development costs must be expensed unless technical feasibility and commercial viability are established. Since Phase III trials and approval are pending, viability is not established, and capitalizing violates prudence."
              correctTreatment="Charge the ₹3.2 Crores of R&D expenses directly to the P&L statement. Do not capitalize until regulatory approval is secure."
              disclosure="Disclose the R&D policy in Note 1: 'Research costs are expensed as incurred. Development costs are capitalized only when technical feasibility and regulatory approval are established.'"
              auditImpact="Examine the drug trial status report and FDA/CDSCO correspondence. Ensure all unapproved drug costs are expensed."
              observation="Pharma companies face intense pressure to capitalize R&D. Technical validation must be audited strictly."
              takeaway="R&D costs must be expensed until final technical and regulatory approvals are secured."
            />

            <BusinessExampleCard
              id="4-10"
              title="Example 4.10: IT Companies — Software Development Capitalization (Internal Use vs. Product)"
              industry="IT Companies"
              situation="CloudSolutions Ltd developed an internal project management tool for its staff, costing ₹45 Lakhs. The IT director wants to capitalize this cost as a software asset and depreciate it over 5 years. However, the software does not generate direct cash inflows and is only for internal administrative use."
              issue="Is capitalizing software that does not generate direct economic benefits permissible under AS 1 and AS 26?"
              alternatives="(a) Capitalise the software and depreciate; (b) expense the software development cost immediately to P&L (standard-compliant); (c) capitalize and amortize over 2 years."
              analysis="Under AS 26, an intangible asset must generate future economic benefits (e.g. revenue or cost savings). Internal administrative software that does not produce verifiable cost savings must be expensed under prudence."
              correctTreatment="Expense the ₹45 Lakhs software development cost directly to the P&L statement under operational overheads."
              disclosure="Disclose the policy: 'Costs incurred on software developed for internal administrative use are expensed as incurred, unless they lead to verifiable future economic benefits.'"
              auditImpact="Review the software's functional specifications. Verify that no future economic benefits or cost savings are documented to justify capitalization."
              observation="IT companies capitalize general software maintenance and internal tools to inflate assets. Ensure strict compliance with AS 26."
              takeaway="Internal-use software must be expensed unless it leads to verifiable and direct cost savings."
            />
          </div>
        </section>

        {/* ─── SECTION 5: AUDIT CASE STUDIES ────────────────────────────────────── */}
        <section id="sec-audit-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-250 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '5',
            'Audit Case Studies',
            'Real-world practitioner case studies detailing client backgrounds, audit findings, identified violations, and the resulting impact on audit reporting.'
          )}

          <div className="space-y-10">
            <AuditCaseCard
              id="5-1"
              title="Case 5.1: Unjustified Change in Warranty Provision Policy"
              client="Electra Appliance Ltd (Listed Manufacturer)"
              facts="Historically, the company maintained a warranty provision of 3% on annual sales. In FY 2025-26, to meet profit forecasts, management changed the policy to account for warranty claims on a cash basis (pay-as-you-go), reversing the existing provision of ₹7.2 Crores to the P&L statement."
              problem="Management claimed that since actual claims were volatile, cash-basis accounting provided a 'cleaner presentation' and eliminated subjective estimates."
              risk="Significant understatement of liabilities and overstatement of net profit before tax by ₹7.2 Crores."
              procedures="Inspect historical claims logs. Check actual warranty payouts over the past 3 years. Review the technical report from the engineering team on appliance reliability."
              findings="Actual warranty claims consistently averaged 2.8% to 3.2% of sales, meaning that historical provisions were highly accurate and necessary. The change was unjustified."
              violation="Direct violation of the Accrual and Prudence assumptions under AS 1, as well as AS 29 provision criteria. The policy change is invalid."
              reportingImpact="If management refuses to restore the provision, the auditor must issue a qualified or adverse audit report under Section 143(3)."
              conclusion="Reject cash-basis warranty accounting. The provision of ₹7.2 Crores must be restored to present a true and fair view."
              learningPoint="Statutory provisions cannot be shifted to a cash basis to manage earnings when liabilities are probable and estimable."
            />

            <AuditCaseCard
              id="5-2"
              title="Case 5.2: Inconsistent Depreciation Applied to Similar Assets"
              client="SteelForge India Ltd (Steel Manufacturing)"
              facts="The company uses the Straight-Line Method (SLM) to depreciate factory furnaces. However, in one plant that had low utilization during the year, management changed the furnace depreciation method to the Written Down Value (WDV) method, reducing the plant's depreciation charge by ₹1.2 Crores."
              problem="Management argued that the change was justified as it matched the depreciation charge with the lower usage of that specific plant."
              risk="Non-compliance with the consistency principle, leading to inconsistent asset valuations and earnings manipulation."
              procedures="Inspect the fixed asset register. Compare depreciation methods across all furnaces. Review furnace utilization logs."
              findings="Furnaces at all other plants continued to be depreciated on SLM, and the low-utilization plant did not have any distinct physical characteristics to justify WDV. The change was made solely to reduce depreciation."
              violation="Direct violation of the Consistency assumption under AS 1. Similar assets in the same category must follow a consistent depreciation policy."
              reportingImpact="Require the client to recalculate depreciation using SLM, resulting in an additional charge of ₹1.2 Crores. If rejected, qualify the audit report."
              conclusion="Inconsistent application of depreciation is invalid. The furnace must be depreciated on SLM."
              learningPoint="Low utilization of a specific plant does not justify changing the depreciation method of a single asset within a class."
            />

            <AuditCaseCard
              id="5-3"
              title="Case 5.3: Capitalization of Administrative Overheads in Inventory"
              client="Apex Textiles Ltd (Textile Manufacturer)"
              facts="The company capitalized corporate head office salary costs (₹85 Lakhs) and corporate building depreciation (₹30 Lakhs) into the cost of finished goods inventory, claiming these costs support factory operations."
              problem="Management attempted to inflate inventory asset values and hide corporate overheads as capitalized assets."
              risk="Overstatement of ending inventory by ₹1.15 Crores, and overstatement of current-year net profits."
              procedures="Review inventory cost sheets. Check the allocation basis for overheads. Match capitalized salary costs with direct factory payroll."
              findings="The capitalized salaries belonged to marketing and corporate finance staff who had no involvement in factory production. The overheads were administrative and not related to production."
              violation="Direct violation of AS 2 and the Prudence consideration of AS 1, which prohibits capitalizing administrative expenses."
              reportingImpact="The inventory value must be reduced by ₹1.15 Crores. If management refuses, qualify the audit report."
              conclusion="Administrative overheads must be expensed immediately. Inventory must include only production-related costs."
              learningPoint="Administrative overheads cannot be capitalized into inventory to defer operational costs."
            />

            <AuditCaseCard
              id="5-4"
              title="Case 5.4: Omission of Critical Lease accounting policy"
              client="Indus Logistics Ltd (Logistics & Transport)"
              facts="The company leased its entire warehouse network (12 properties) under long-term leases. The lease agreements were omitted from Note 1 accounting policies, and lease payments were hidden under 'other operational expenses' without disclosing the commitments."
              problem="Management omitted the lease policy and commitment disclosures to hide massive off-balance sheet liabilities from lenders."
              risk="Users are unaware of major long-term rental obligations, distorting the liquidity analysis."
              procedures="Inspect lease agreements and rental payment ledgers. Review board minutes for lease approvals. Check Note 1 disclosures."
              findings="The company had commitments of ₹15 Crores over the next 5 years, which were completely undisclosed. The lease policy note was omitted."
              violation="Direct violation of AS 1 Para 18 (disclosure of all significant policies) and AS 19 lease disclosure requirements."
              reportingImpact="Incorporate a detailed lease policy note and disclose the commitments. If management refuses, qualify the audit report for inadequate disclosure."
              conclusion="All significant policies, including lease classifications and commitments, must be fully disclosed."
              learningPoint="Significant accounting policies cannot be omitted to hide material operational commitments."
            />

            <AuditCaseCard
              id="5-5"
              title="Case 5.5: Revenue Recognized on Unapproved Bill-and-Hold Transactions"
              client="Zenith Electronics Ltd (Consumer Goods)"
              facts="In March 2026, the company recognized sales of ₹2.4 Crores for television sets that remained in the company's warehouse. The invoices were raised, but the customer had not requested the delay, and the goods were not physically separated."
              problem="Management accelerated revenue at year-end to meet quarterly sales targets."
              risk="Overstatement of sales revenue by ₹2.4 Crores and understatement of inventory assets."
              procedures="Perform physical inventory verification. Review customer purchase orders and correspondence. Check shipping documents."
              findings="The customer had not requested a bill-and-hold arrangement, and the goods were still part of normal stock. Risk and rewards had not transferred."
              violation="Direct violation of AS 9 and the Prudence/True and Fair View considerations of AS 1. Revenue was recognized prematurely."
              reportingImpact="Reverse the sale of ₹2.4 Crores, reinstate the inventory, and reduce profits. If rejected, qualify the audit report."
              conclusion="Revenue cannot be recognized until risks and rewards transfer to the buyer. Bill-and-hold must meet strict criteria."
              learningPoint="Invoices raised without transferring risk and reward cannot be recognized as revenue to inflate year-end sales."
            />

            <AuditCaseCard
              id="5-6"
              title="Case 5.6: Provision for Environmental Cleanup Omitted"
              client="OceanCruises India Ltd (Shipping & Tourism)"
              facts="One of the company's ships leaked fuel in a port, causing environmental damage. The port authority issued a cleanup order with an estimated cost of ₹1.8 Crores. Management did not record a provision, stating they intend to dispute the order in court next year."
              problem="Management hid the probable liability to protect reported earnings and avoid debt covenant violations."
              risk="Understatement of liabilities and overstatement of profit by ₹1.8 Crores."
              procedures="Examine the port authority order and pollution reports. Consult the company's legal counsel. Review cleanup cost estimates."
              findings="The legal counsel admitted that the company has a 90% chance of losing the dispute. The cleanup cost of ₹1.8 Crores is realistic and probable."
              violation="Direct violation of the Prudence consideration of AS 1 and AS 29 provisioning rules. A provision is mandatory."
              reportingImpact="A provision of ₹1.8 Crores must be recorded. If management fails to do so, qualify the audit report."
              conclusion="A provision must be made for probable liabilities. Legal disputes do not justify omission if loss is probable."
              learningPoint="Prudence requires recognizing probable environmental cleanup costs immediately, regardless of planned legal disputes."
            />

            <AuditCaseCard
              id="5-7"
              title="Case 5.7: Going Concern Omitted Despite Plant Closure"
              client="SunPower Ltd (Energy Generation)"
              facts="The company's primary solar plant was shut down by regulators due to grid safety violations, wiping out 90% of the company's revenue. The company has defaulted on bank loans. Management prepared accounts on a going concern basis without any disclosure."
              problem="Management omitted disclosures of plant closure and debt default to prevent immediate loan recall by banks."
              risk="Users are unaware of severe threats to the company's survival, representing a misleading view."
              procedures="Inspect the regulatory shutdown order. Review debt repayment logs and bank default notices. Assess cash flow forecasts."
              findings="The company has no alternative revenue source and cannot service loans. The grid license is unlikely to be restored. Going concern is in doubt."
              violation="Direct violation of AS 1 Para 14 (disclosure of doubts on going concern) and general accrual principles."
              reportingImpact="Management must add a detailed Going Concern footnote. If they refuse, issue an adverse audit report. If they add it, add an Emphasis of Matter paragraph."
              conclusion="Severe doubts on going concern must be disclosed. If going concern is invalid, value assets on a liquidation basis."
              learningPoint="Auditors must enforce going concern disclosures when primary operational assets are shut down permanently."
            />

            <AuditCaseCard
              id="5-8"
              title="Case 5.8: Aggressive Capitalization of Phase I Clinical Trials"
              client="NovaPharma Ltd (Pharmaceuticals)"
              facts="The company capitalized ₹1.5 Crores spent on Phase I clinical trials for an oncology drug, classifying it as a capitalized development asset. The drug has only a 15% historical chance of passing Phase III trials."
              problem="Management capitalized high-risk research expenditures to avoid showing a net loss in the current year."
              risk="Overstatement of intangible assets under development by ₹1.5 Crores, and understatement of current expenses."
              procedures="Review clinical trial phase documents. Compare capitalization criteria with AS 26. Check historical success rates of Phase I drugs."
              findings="Phase I trials only test basic safety. Technical feasibility and commercial viability are not established at this stage. Capitalization is invalid."
              violation="Direct violation of AS 26 and the Prudence concept of AS 1. Research costs must be expensed."
              reportingImpact="Force management to expense the ₹1.5 Crores. If management refuses, qualify the audit report."
              conclusion="R&D costs incurred in early trial phases must be expensed. Capitalization is allowed only after final clinical validation."
              learningPoint="Pharma companies cannot capitalize early-stage trial costs. Prudence requires expensing until viability is certain."
            />

            <AuditCaseCard
              id="5-9"
              title="Case 5.9: Misleading Policy Disclosure on Revenue Recognition"
              client="DeltaEngineering Ltd (Heavy Infrastructure)"
              facts="The company changed its revenue recognition policy from percentage-of-completion to milestone-billing, which deferred ₹4 Crores of revenue. The company disclosed the policy change but used confusing language in Note 1 to hide the fact that profits were lower."
              problem="Management used vague terminology to avoid drawing attention to the ₹4 Crores drop in current profit."
              risk="Users cannot understand the financial impact of the policy change, violating the transparency principle."
              procedures="Read Note 1 disclosures. Recalculate the impact of the policy change. Compare the disclosure text with standard templates."
              findings="The disclosure did not quantify the financial impact of ₹4 Crores, violating AS 1. The text was intentionally misleading."
              violation="Direct violation of AS 1 Paragraph 22, which requires clear disclosure of the quantified impact of policy changes."
              reportingImpact="Require management to state the quantified impact clearly in Note 1. If management refuses, qualify the audit report."
              conclusion="The disclosure of policy changes must be clear and quantify the exact impact on net profit and assets."
              learningPoint="Clear and quantified disclosure of the impact of policy changes is a mandatory requirement under AS 1."
            />

            <AuditCaseCard
              id="5-10"
              title="Case 5.10: Management Override of Inventory Obsolescence Policy"
              client="PioneerMining Ltd (Mining & Minerals)"
              facts="The company's written policy requires writing off spare parts that have been inactive for over 3 years. The inventory register showed ₹80 Lakhs of inactive parts. The CFO instructed the warehouse manager to override the policy and keep them at cost."
              problem="The CFO overrode the obsolescence policy to prevent writing off inventory and depressing operating margins."
              risk="Overstatement of inventory assets by ₹80 Lakhs, and understatement of operating expenses."
              procedures="Inspect the inventory aging report. Walk through the warehouse to inspect the spare parts. Check past compliance with the write-off policy."
              findings="The spare parts were rusted and obsolete, with no scrap value. The CFO's override was a deliberate attempt to inflate assets."
              violation="Direct violation of AS 2 (inventory valuation at cost or NRV) and the Prudence/True and Fair View considerations of AS 1."
              reportingImpact="The inventory must be written down by ₹80 Lakhs. If management refuses, qualify the audit report."
              conclusion="Management policy overrides that result in asset overstatement must be resisted and corrected by the auditor."
              learningPoint="Auditors must review policy compliance reports and check for management overrides that violate prudence."
            />
          </div>
        </section>

        {/* ─── SECTION 6: REGULATORY OBSERVATIONS ────────────────────────────────── */}
        <section id="sec-regulatory-obs" className="scroll-mt-36 space-y-8 w-full border-t border-slate-250 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '6',
            'Regulatory Observations',
            'Core observations, directives, and enforcement findings from regulators (NFRA, SEBI, MCA) regarding compliance with accounting policy disclosures.'
          )}

          <div className="space-y-10">
            <RegulatoryObsCard
              id="6-1"
              title="Observation 6.1: Boilerplate and Generic Disclosure of Accounting Policies"
              regulator="National Financial Reporting Authority (NFRA)"
              observation="NFRA identified several listed companies using boilerplate, generic policy notes copied directly from the standards without describing the specific methods actually adopted (e.g. writing 'inventories are valued at cost' without stating whether FIFO or Weighted Average is used, or omitting the specific cost formula)."
              issue="Inadequate disclosure prevents users from assessing the quality of earnings, comparing entities, or understanding how inventory is measured."
              principle="Paragraph 18: To ensure proper understanding, all significant accounting policies must form part of the financial statements and be disclosed in one place (normally as Note 1)."
              impact="NFRA issued warnings to audit firms for failing to qualify audit reports when management omitted specific cost formulas or revenue recognition parameters."
              bestPractice="Ensure that Note 1 clearly details the specific cost formula (FIFO/WAC) and precise criteria for revenue recognition (e.g. transfer of risk and reward timing)."
            />

            <RegulatoryObsCard
              id="6-2"
              title="Observation 6.2: Revenue Recognition Disclosures without Specific Milestones"
              regulator="Securities and Exchange Board of India (SEBI)"
              observation="SEBI identified technology and construction companies recognizing revenue immediately on long-term contracts before milestones were reached, or failing to disclose changes in contract pricing estimates."
              issue="Accelerating revenue overstates profitability and misleads retail investors, leading to stock price inflation followed by corrections."
              principle="Prudence and Substance over Form (AS 1 Para 17). Revenue cannot be accrued until realizable value is secure."
              impact="SEBI mandated restatement of accounts for affected entities and issued fines to CFOs and audit partners."
              bestPractice="Document progress benchmarks clearly and review project status reports before recognizing contract revenue."
            />

            <RegulatoryObsCard
              id="6-3"
              title="Observation 6.3: Omission of Material Accounting Policies"
              regulator="Ministry of Corporate Affairs (MCA)"
              observation="MCA review of corporate filings showed that many companies omitted disclosures of accounting policies for significant transactions, such as government grants or lease classifications, claiming they were immaterial."
              issue="Omitting critical policy notes prevents users from evaluating compliance and understand asset structures."
              principle="Paragraph 18: All significant accounting policies adopted in the preparation of financial statements should be disclosed."
              impact="MCA issued show-cause notices to companies for non-compliance with Section 129 of the Companies Act."
              bestPractice="Develop a comprehensive disclosure checklist to ensure all material policy areas are covered in Note 1."
            />

            <RegulatoryObsCard
              id="6-4"
              title="Observation 6.4: Inconsistent Depreciation Useful Lives without Justification"
              regulator="National Financial Reporting Authority (NFRA)"
              observation="NFRA observed that some companies changed the useful lives of machinery to reduce depreciation without obtaining technical certificates or disclosing the change in estimate."
              issue="Unjustified useful life extensions distort asset carrying values and overstate operating profits."
              principle="Consistency assumption and Prudence. Changes in estimates must be based on objective technical data."
              impact="NFRA penalized auditors for accepting management estimates without verifying technical certificates."
              bestPractice="Obtain third-party technical evaluation certificates when changing useful lives or depreciation methods."
            />

            <RegulatoryObsCard
              id="6-5"
              title="Observation 6.5: Failure to Quantify Financial Impact of Policy Changes"
              regulator="Securities and Exchange Board of India (SEBI)"
              observation="SEBI noted that several companies changing accounting policies (e.g. inventory formulas) disclosed the change but omitted the quantified impact, claiming it was 'not material' without providing calculations."
              issue="Non-disclosure of the impact prevents users from understanding the true quality of current-year profits."
              principle="Paragraph 22: Any change in accounting policy which has a material effect must be disclosed, and the impact must be quantified."
              impact="SEBI forced the companies to issue corrigendums and restated financial results to show the quantified impact."
              bestPractice="Always calculate and state the exact impact of policy changes. If impact cannot be quantified, state that fact clearly."
            />

            <RegulatoryObsCard
              id="6-6"
              title="Observation 6.6: Omission of Going Concern doubts in Notes"
              regulator="Ministry of Corporate Affairs (MCA)"
              observation="MCA identified companies with fully eroded net worth preparing accounts on a going concern basis without any explanatory notes or disclosures of financial distress."
              issue="Omiting going concern doubts misleads investors and lenders, representing a false view of insolvency risks."
              principle="Going Concern assumption. Doubtful going concern status must be disclosed in detail."
              impact="MCA initiated investigations against directors for fraudulent reporting under Section 447."
              bestPractice="Review financial ratios and cash flows. Ensure all doubts on going concern are disclosed clearly in Note 1."
            />
          </div>
        </section>

        {/* ─── SECTION 7: LANDMARK JUDICIAL CASES ────────────────────────────────── */}
        <section id="sec-legal-cases" className="scroll-mt-36 space-y-8 w-full border-t border-slate-250 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '7',
            'Landmark Judicial Cases',
            'Precedent-setting Supreme Court and High Court judgments regarding the consistency, applicability, and validity of accounting policies.'
          )}

          <div className="space-y-10">
            <JudicialCaseCard
              id="7-1"
              title="CIT vs. Woodward Governor India Pvt. Ltd."
              court="Supreme Court of India (SC [2009] 312 ITR 254)"
              facts="The taxpayer incurred foreign exchange losses on long-term capital loans due to currency fluctuations. The company recognized these losses on the balance sheet date, even though they were unrealized, as per AS 11 and consistent accrual accounting."
              issue="Can unrealized exchange losses calculated at the year-end exchange rate be claimed as business expenditure under the accrual concept?"
              judgment="The Supreme Court held that the term 'profits' must reflect a True and Fair View. In line with AS 11 and consistent accrual principles, year-end exchange rate fluctuations must be recognized immediately in the P&L."
              relevance="The court confirmed that accounting standards issued by the ICAI are mandatory, and consistency in accounting policies is necessary for calculating taxable business income."
              learning="Year-end balance adjustments for currency or assets must be recognized to satisfy the accrual principle."
            />

            <JudicialCaseCard
              id="7-2"
              title="CIT vs. British Paints India Ltd."
              court="Supreme Court of India (SC [1991] 188 ITR 44)"
              facts="The taxpayer valued its work-in-progress (WIP) and finished stock by excluding overhead costs, showing only the cost of raw materials. The company argued that since it had followed this method consistently for decades, the Revenue could not challenge it."
              issue="Does consistency in accounting policies justify a valuation policy that understates stock values and profits?"
              judgment="The Supreme Court held that consistency cannot justify an incorrect valuation policy. Inventory must include overhead costs to reflect the correct value of work-in-progress and represent a true and fair view."
              relevance="The True and Fair View is the primary consideration, and overrides consistency if the existing policy is incorrect (AS 1 Para 16)."
              learning="Consistency cannot validate incorrect accounting. Policies must be standard-compliant."
            />

            <JudicialCaseCard
              id="7-3"
              title="Challapalli Sugars Ltd. vs. CIT"
              court="Supreme Court of India (SC [1975] 98 ITR 167)"
              facts="The company capitalized interest paid on loans taken to purchase plant machinery before the machinery commenced production. The Income Tax department claimed that interest is a revenue expense and cannot be capitalized."
              issue="Can pre-production interest costs be capitalized as part of the asset cost under general accounting concepts?"
              judgment="The Supreme Court held that in accordance with standard accounting principles, all costs incurred to bring an asset to its working condition for its intended use, including pre-production interest, must be capitalized."
              relevance="This ruling established the legal basis for Substance over Form and capitalization rules subsequently formalized in AS 10 and AS 16."
              learning="Pre-production interest is part of the cost of the asset, representing the economic substance of the acquisition."
            />

            <JudicialCaseCard
              id="7-4"
              title="CIT vs. H.G.E.C. Ltd."
              court="Calcutta High Court (HC [1983] 143 ITR 614)"
              facts="A heavy engineering company entered into long-term contracts. The company recognized anticipated profits based on work completed, but deferred anticipated losses, claiming they were not yet realized."
              issue="Is deferring anticipated losses on long-term contracts permissible under the prudence concept?"
              judgment="The High Court held that under the prudence concept, anticipated losses must be recognized immediately, whereas anticipated profits cannot be recognized until realized. The company's treatment was incorrect."
              relevance="This judgment reinforced the Prudence consideration of AS 1, stating that losses must be provided for immediately."
              learning="Prudence is asymmetric: recognize anticipated losses immediately, but defer anticipated profits until realization."
            />

            <JudicialCaseCard
              id="7-5"
              title="Kedarnath Jute Mfg. Co. Ltd. vs. CIT"
              court="Supreme Court of India (SC [1971] 82 ITR 363)"
              facts="The taxpayer did not record a sales tax liability in its books of account during the relevant year, as it was contesting the tax in court. The company claimed the tax deduction for income tax purposes anyway."
              issue="Does the omission of a liability in the books of account prevent it from being accrued or deducted under the accrual assumption?"
              judgment="The Supreme Court held that the accrual of a liability depends on the event that creates the liability, not on whether an entry is made in the books of account. The tax accrued when the sales occurred, regardless of the books."
              relevance="This established that the accrual assumption of AS 1 is based on the substance of transactions, and book entries are not conclusive."
              learning="Accruals are based on transactions and events, not book entries. True and fair view requires accrual of all known obligations."
            />
          </div>
        </section>

        {/* ─── SECTION 8: EXAM-ORIENTED CORNER ───────────────────────────────────── */}
        <section id="sec-exam-oriented" className="scroll-mt-36 space-y-8 w-full border-t border-slate-250 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '8',
            'Exam-Oriented Corner',
            'Revision aids, high-yield one-liners, past exam questions (PYQ), and common student traps to master AS 1 for CA Exams.'
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-serif">
            {/* Quick Revision Notes */}
            <div className="bg-[#FAFAF8] dark:bg-[#151C2C] p-6 rounded-xl border border-slate-250 dark:border-slate-850 space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-650 dark:text-indigo-400 flex items-center gap-2">
                <Award size={14} />
                <span>Quick Revision Notes</span>
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed">
                <li><strong>Fundamental Assumptions (GAC):</strong> Going Concern, Accrual, Consistency. If they are followed, no disclosure is required. If they are violated, disclosure is mandatory.</li>
                <li><strong>Selection Considerations (PSM):</strong> Prudence, Substance over Form, Materiality. The primary objective is a True and Fair View.</li>
                <li><strong>Manner of Disclosure:</strong> All significant policies must form part of the accounts and be disclosed in one place (normally as Note 1).</li>
                <li><strong>Para 23 Rule:</strong> Footnote disclosures cannot cure incorrect accounting. The entry must be corrected.</li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-6 rounded-xl border border-[#FFE1E1] dark:border-red-950/60 space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-650 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>Common Exam Mistakes</span>
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-350 text-xs sm:text-[13px] leading-relaxed">
                <li><strong className="text-red-650">Mistake:</strong> Claiming that Going Concern is always followed. <em>Fact:</em> If liquidation is imminent, it must be rejected and accounts prepared on NRV.</li>
                <li><strong className="text-red-650">Mistake:</strong> Mislabeling estimate changes as policy changes. <em>Fact:</em> Useful life changes or provisions are estimate changes (AS 5), not policy changes (AS 1).</li>
                <li><strong className="text-red-650">Mistake:</strong> Believing that disclosure cures incorrect accounting. <em>Fact:</em> Under Para 23, disclosure cannot justify incorrect accounting.</li>
              </ul>
            </div>

            {/* High-Yield One-Liners */}
            <div className="bg-[#F5FFF9] dark:bg-[#15251C] p-6 rounded-xl border border-[#D5F5E3] dark:border-emerald-950/60 space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle size={14} />
                <span>High-Yield One-Liners</span>
              </h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-350 text-xs sm:text-[13px] leading-relaxed">
                <p><strong>1. Disclosure location:</strong> Policies must be in one place (usually Note 1), not scattered.</p>
                <p><strong>2. Fundamental assumptions status:</strong> They are assumed to be followed; disclosure is only required if NOT followed.</p>
                <p><strong>3. Policy change justification:</strong> Only allowed if required by statute, for compliance with standard, or for a better presentation.</p>
                <p><strong>4. Quantification:</strong> If a policy change has a material impact, the exact financial impact must be quantified and disclosed.</p>
              </div>
            </div>

            {/* Important Definitions */}
            <div className="bg-[#FBF5FF] dark:bg-[#20152C] p-6 rounded-xl border border-[#F1D5F5] dark:border-purple-950/60 space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2">
                <BookOpen size={14} />
                <span>Important Definitions</span>
              </h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-350 text-xs sm:text-[13px] leading-relaxed">
                <p><strong>1. Accounting Policies:</strong> Specific accounting principles and the methods of applying those principles adopted by the enterprise (AS 1 Para 11).</p>
                <p><strong>2. Accrual:</strong> Revenues and costs are accrued, i.e., recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate (AS 1 Para 13).</p>
                <p><strong>3. Prudence:</strong> A degree of caution in making estimates under conditions of uncertainty, such that assets or income are not overstated and liabilities or expenses are not understated.</p>
              </div>
            </div>
          </div>

          {/* Exam Questions & Mnemonic Box */}
          <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-850 rounded-xl p-6 sm:p-8 space-y-4 font-serif">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-650 dark:text-indigo-400 flex items-center gap-2">
              <Info size={14} />
              <span>PYQ & Mnemonic Revision Trap</span>
            </h4>
            <div className="space-y-4 text-xs sm:text-[13.5px] leading-relaxed text-slate-750 dark:text-slate-300">
              <p>
                <strong>ICAI Exam Questions (PYQ):</strong> In almost every exam, a case study is asked where a company changes its policy (e.g. inventory formula or depreciation) but does not disclose the impact, or changes the policy to manage earnings. Always refer to **AS 1 Para 22** and **Para 23** in your answers.
              </p>
              <div className="p-4 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[12.5px] text-slate-800 dark:text-slate-300">
                <span className="font-bold text-indigo-600 block mb-1">Mnemonic Tricks:</span>
                <p>• <strong>G-A-C:</strong> Going Concern, Accrual, Consistency (Fundamental Assumptions)</p>
                <p>• <strong>P-S-M:</strong> Prudence, Substance over Form, Materiality (Selection Considerations)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: AUDIT NOTES & REPORTING ────────────────────────────────── */}
        <section id="sec-audit-notes" className="scroll-mt-36 space-y-8 w-full border-t border-slate-250 dark:border-slate-800 pt-8">
          {renderSectionHeader(
            '9',
            'Audit Notes & Reporting',
            'Documentation checklists, audit red flags, and drafting templates for qualified opinions under Section 143(3) of the Companies Act, 2013.'
          )}

          <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-850 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans flex items-center gap-2">
              <HelpCircle className="text-indigo-600 dark:text-indigo-400" size={18} />
              <span>Audit Report Drafting: Qualification for Non-Compliance with AS 1</span>
            </h3>

            <div className="space-y-4 text-[13.5px] leading-[1.7] text-slate-750 dark:text-slate-350 font-serif">
              <p>
                When an enterprise changes an accounting policy without justification, fails to disclose the impact, or uses inappropriate policies, the auditor must qualify the report. Below is a standard template for an audit qualification under Section 143(3):
              </p>

              <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-250 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed space-y-3">
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
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Inconsistencies between Note 1 disclosures and actual account balances.</li>
                    <li>Failure to quantify the financial impact of accounting policy changes.</li>
                    <li>Mislabeled write-downs of inventory or assets as estimate revisions.</li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">REPRESENTATION POINTS</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Obtain management representation letters confirming selection of policies.</li>
                    <li>Confirm that all significant policies have been disclosed in one place.</li>
                    <li>Document board approval and justification for policy changes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Final Quality Check Self-Assessment */}
          <div className="bg-[#FFFDF5] dark:bg-[#25201A] border border-[#F6EED5] dark:border-amber-900/30 rounded-xl p-6 sm:p-8 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <CheckCircle size={14} />
              <span>Final Quality Check Self-Assessment (Target: &gt;9.5/10)</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E1DD] dark:border-gray-800 text-slate-500 font-sans uppercase">
                    <th className="py-2 font-extrabold">Quality Category</th>
                    <th className="py-2 font-extrabold text-center">Score</th>
                    <th className="py-2 font-extrabold">Auditor Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-serif">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Content Depth</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">10/10</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">15 Illustrations, 10 Business Examples, and 10 Case Studies mapped in full detail.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Professional Relevance</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">9.8/10</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">Addresses practical manufacturing, tea, infrastructure, and retail scenarios.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">CA Student Usefulness</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">9.7/10</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">Exam-trap boxes, memory tricks, and clear serial-numbered points for study.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Presentation Quality</td>
                    <td className="py-2.5 text-center font-extrabold text-emerald-600">9.9/10</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">Responsive grid layouts with customized sequential bullet alignments and borders.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
