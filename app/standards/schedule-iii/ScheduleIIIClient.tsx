'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  FileText,
  Download,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ExternalLink,
  Video,
  Maximize,
  X,
  HelpCircle
} from 'lucide-react'
import { SCHEDULE_III_DATA, ScheduleIIITopic } from './data'

interface ScheduleIIIClientProps {
  initialData?: any
}

// YouTube video ID extractor
const getYouTubeId = (url: string) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

const getVimeoId = (url: string) => {
  if (!url) return ''
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : ''
}

const getVideoSrc = (url: string) => {
  if (url && (url.startsWith('/') || url.startsWith('http') && !url.includes('youtube.com') && !url.includes('youtu.be') && !url.includes('vimeo.com'))) {
    return url
  }
  return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
}

export default function ScheduleIIIClient({ initialData }: ScheduleIIIClientProps) {
  const mergedData = initialData || SCHEDULE_III_DATA

  const [selectedDiv, setSelectedDiv] = useState<'div1' | 'div2' | 'div3'>('div1')
  const [selectedPart, setSelectedPart] = useState<'balanceSheet' | 'profitAndLoss' | 'cashFlow' | 'others'>('balanceSheet')
  const [activeTab, setActiveTab] = useState<'standard' | 'lecture' | 'pdf'>('standard')
  const [lastActiveBaseTab, setLastActiveBaseTab] = useState<'standard'>('standard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Retrieve current active topic
  const currentTopic: ScheduleIIITopic & { id: string; lectureUrl?: string; resources?: any[]; faqs?: any[]; blocks?: any[] } =
    JSON.parse(JSON.stringify(mergedData[selectedDiv]?.[selectedPart] || SCHEDULE_III_DATA[selectedDiv][selectedPart]))

  if (!currentTopic.id) {
    const partSuffix = selectedPart === 'balanceSheet' ? 'balance-sheet' : 
                       selectedPart === 'profitAndLoss' ? 'profit-loss' :
                       selectedPart === 'cashFlow' ? 'cash-flow' : 'others'
    currentTopic.id = `schedule-iii-${selectedDiv}-${partSuffix}`
  }

  // Track video elements for custom control bar if needed
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getLectureUrl = (url?: string) => {
    if (!url || url.includes('mock_lecture')) {
      return 'https://www.youtube.com/watch?v=yYyP4RRO6t0'
    }
    return url
  }
  const lectureUrl = getLectureUrl(currentTopic.lectureUrl)

  // YouTube / Vimeo IDs
  const ytId = getYouTubeId(lectureUrl)
  const vimeoId = getVimeoId(lectureUrl)

  // Mapped uploaded PDF resource
  const uploadedPdf = currentTopic.resources?.find((r: any) => r.type === 'PDF' && r.url) || 
    (currentTopic.sourceLink ? { url: currentTopic.sourceLink, title: currentTopic.sourceLabel || 'Official MCA Source' } : null)

  useEffect(() => {
    if (activeTab === 'standard') {
      setLastActiveBaseTab(activeTab)
    }
  }, [activeTab])

  const handleBackClick = (e: React.MouseEvent) => {
    if (activeTab === 'lecture' || activeTab === 'pdf') {
      e.preventDefault()
      setActiveTab('standard')
    }
  }

  // Reset active tab to standard when topic changes
  useEffect(() => {
    setActiveTab('standard')
  }, [selectedDiv, selectedPart])

  const handlePrintStudyPdf = () => {
    if (typeof window !== 'undefined') {
      window.open(`/api/pdfs/${currentTopic.id}`, '_blank')
    }
  }

  // Sidebar display helper
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

  // Helper to resolve standard framework name
  const getFrameworkName = () => {
    if (selectedDiv === 'div1') return 'AS'
    return 'Ind AS'
  }

  // Helper to format text references
  const renderTextWithReferences = (text: string) => {
    if (!text) return ''
    
    // Replace bold formatting
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace italic formatting
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>')
    processed = processed.replace(/_(.*?)_/g, '<em>$1</em>')
    // Replace underline formatting
    processed = processed.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
    processed = processed.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
    // Replace highlight formatting
    processed = processed.replace(/\[highlight\](.*?)\[\/highlight\]/g, '<mark class="bg-amber-100 dark:bg-amber-900/40 text-inherit px-1 rounded">$1</mark>')
    // Replace [Page X] tags
    processed = processed.replace(/\[Page\s+(\d+)\]/g, '<span class="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-gray-800 px-1 rounded">(Page $1)</span>')

    return <span dangerouslySetInnerHTML={{ __html: processed }} />
  }

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
                  <div className="ml-4 pl-3.5 border-l-2 border-[#D5E1FB] dark:border-[#263765] mt-1.5 space-y-2">
                    {parts.map((part) => {
                      const isPartActive = selectedPart === part.id
                      const Icon = part.icon
                      return (
                        <div key={part.id} className="space-y-1">
                          <button
                            onClick={() => {
                              setSelectedPart(part.id)
                              setActiveTab('standard')
                              setIsSidebarOpen(false)
                            }}
                            className={`w-full text-left py-1.5 px-3 rounded-lg text-[13px] font-bold flex items-center justify-between transition-all ${
                              isPartActive
                                ? 'text-[#2D5BE3] dark:text-[#60A5FA] font-extrabold'
                                : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <Icon size={13} className="shrink-0" />
                              {part.label}
                            </span>
                          </button>
                        </div>
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
              onClick={handleBackClick}
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
            </button>
            
            <h1 className="text-[16px] sm:text-[22px] md:text-[24px] font-semibold text-[#1C1C1E] dark:text-white tracking-tight border-l-2 border-[#2D5BE3] dark:border-blue-500 pl-2.5 sm:pl-3 truncate select-none leading-tight flex-1 min-w-0">
              {selectedPart === 'others' ? 'Others' : currentTopic.title}
            </h1>
          </div>

          {/* Unified Action Buttons in Header to match AS layouts */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            {activeTab === 'lecture' && (
              <div className="flex items-center gap-1.5 flex-nowrap">
                {lectureUrl && (
                  <a
                    href={lectureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 bg-[#EEF2FD] hover:bg-[#DCE6FF] dark:bg-[#1A2542] dark:hover:bg-[#23355E] border border-[#DCE6FF] dark:border-[#23355E] rounded-md text-[12.5px] font-bold text-[#2D5BE3] dark:text-blue-400 transition-colors shrink-0"
                  >
                    Open Lecture Source
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                )}
                <button
                  onClick={() => {
                    if (lectureUrl) {
                      window.open(lectureUrl, '_blank');
                    }
                  }}
                  disabled={!lectureUrl}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-[12.5px] font-bold transition-colors shadow-xs shrink-0 ${
                    lectureUrl
                      ? 'text-white bg-[#3B82F6] hover:bg-[#2563EB] cursor-pointer'
                      : 'text-gray-400 bg-gray-200 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  }`}
                  title={lectureUrl ? 'Download Lecture' : 'No lecture download available'}
                >
                  <Download size={14} className="shrink-0" />
                  Download Lecture
                </button>
              </div>
            )}

            {activeTab === 'pdf' && (
              <div className="flex items-center gap-1.5 flex-nowrap">
                <a
                  href={`/api/pdfs/${currentTopic.id}`}
                  download
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-extrabold bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] dark:bg-[#2C1D1D] dark:text-red-400 shrink-0 transition-all shadow-xs cursor-pointer"
                  title="Download PDF"
                >
                  <Download size={14} className="shrink-0" />
                  Download PDF
                </a>
              </div>
            )}

            {activeTab === 'standard' && (
              <>
                {lectureUrl && (
                  <button
                    onClick={() => setActiveTab('lecture')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-semibold bg-[#EEF2FD] text-[#2D5BE3] hover:bg-[#DCE6FF] dark:bg-[#1A2542] dark:text-blue-400 shrink-0 transition-all shadow-xs"
                    title="Watch video lectures"
                  >
                    <Video size={14} className="shrink-0 text-[#2D5BE3] dark:text-blue-400" />
                    Lecture
                  </button>
                )}
                {uploadedPdf && (
                  <button
                    onClick={() => setActiveTab('pdf')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-semibold bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] dark:bg-[#2C1D1D] dark:text-red-400 shrink-0 transition-all shadow-xs"
                    title="View PDF"
                  >
                    <FileText size={14} className="shrink-0 text-[#E15252] dark:text-red-400" />
                    PDF View
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ─── Content Area ──────────────────────────────────────────────────── */}
        <div className={`flex-1 w-full max-w-none flex flex-col ${activeTab === 'pdf' || activeTab === 'lecture' ? 'p-2 sm:p-4 pt-1 sm:pt-2' : 'p-4 md:p-6'}`}>
          
          {/* 1. LECTURE VIDEO PLAYBACK VIEW */}
          {activeTab === 'lecture' && (
            <div className="w-full space-y-3 animate-fade-in pt-0">
              <div
                ref={videoContainerRef}
                className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl bg-[#090C15] overflow-hidden shadow-lg border border-gray-900 flex flex-col group/video"
              >
                {ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=0&controls=1&rel=0&enablejsapi=1`}
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&controls=1`}
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={getVideoSrc(lectureUrl)}
                    className="w-full h-full object-cover z-0 pointer-events-auto"
                    playsInline
                    controls
                  />
                )}
              </div>
              {!currentTopic.lectureUrl && (
                <div className="p-8 rounded-xl border border-dashed border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#111726]/30 text-center flex flex-col items-center justify-center">
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">No video lecture available</h3>
                  <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                    The video class for this topic is currently being prepared.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 2. STUDY CONTENT PDF PRINT VIEWER */}
          {activeTab === 'pdf' && (
            <div className="w-full h-[calc(100vh-130px)] min-h-[600px] bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden shadow-xs flex flex-col">
              <iframe
                ref={iframeRef}
                src={`/api/pdfs/${currentTopic.id}`}
                className="w-full flex-1 border-0"
                title={`PDF View for ${currentTopic.title}`}
              />
            </div>
          )}

          {/* 3. STANDARD / GUIDANCE VIEW */}
          {activeTab === 'standard' && (
            <div className="w-full space-y-8 animate-fade-in font-sans">
              <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
                
                {/* Header (No Part I / Part II badges rendering to match user item 5) */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-gray-100 dark:border-gray-800 gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white leading-tight">
                      {selectedPart === 'others' ? 'Others' : currentTopic.title}
                    </h2>
                    <p className="text-xs text-[#76767E] dark:text-gray-400 mt-1 font-medium">
                      {divisions.find(d => d.id === selectedDiv)?.label} {selectedPart === 'others' ? `· ${currentTopic.title}` : ''}
                    </p>
                  </div>
                </div>

                {/* If custom visual block database structure exists, render blocks */}
                {currentTopic.blocks && currentTopic.blocks.length > 0 ? (
                  <div className="space-y-6">
                    {currentTopic.blocks.map((block: any, blockIdx: number) => {
                      if (block.hidden) return null
                      switch (block.type) {
                        case 'HEADING':
                          return (
                            <h2 key={blockIdx} className="font-extrabold text-[#1C1C1E] dark:text-white uppercase tracking-wide border-b border-gray-250 dark:border-gray-800 pb-3.5 text-xl sm:text-2xl mb-6 mt-10 first:mt-0">
                              {renderTextWithReferences(block.content)}
                            </h2>
                          )
                        case 'SUB_HEADING':
                          return (
                            <h3 key={blockIdx} className="font-extrabold text-[#1C1C1E] dark:text-white mb-4 text-[17px] sm:text-[19px] mt-7">
                              {renderTextWithReferences(block.content)}
                            </h3>
                          )
                        case 'PARAGRAPH':
                          return (
                            <div key={blockIdx} className="text-slate-755 dark:text-gray-200 leading-relaxed text-[15.5px] sm:text-[16.5px] mb-5 font-medium">
                              {renderTextWithReferences(block.content)}
                            </div>
                          )
                        case 'NOTE':
                        case 'PRACTICAL_USE':
                          return (
                            <div key={blockIdx} className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-gray-800 bg-[#FAFAF8]/60 dark:bg-[#1E2640]/55 shadow-xs mb-6">
                              {block.title && <h3 className="font-extrabold text-[#1C1C1E] dark:text-white text-[15.5px] mb-2.5">{block.title}</h3>}
                              <div className="text-slate-700 dark:text-gray-300 leading-relaxed font-medium text-[14.5px] sm:text-[15.5px]">{renderTextWithReferences(block.body || block.content)}</div>
                            </div>
                          )
                        case 'EXAM_TRAP':
                          return (
                            <div key={blockIdx} className="p-5 sm:p-6 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50 mb-4">
                              <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                <span>⚠️</span> EXAM TRAP
                              </p>
                              {block.title && <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">{block.title}</h3>}
                              <div className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(block.body)}</div>
                            </div>
                          )
                        case 'CASE_LAW':
                          return (
                            <div key={blockIdx} className="p-5 sm:p-6 rounded-xl bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#DCE6FF] dark:border-blue-900/50 mb-4">
                              <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                <span>⚖️</span> CASE LAW
                              </p>
                              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{block.title}</h3>
                              {block.citation && <p className="text-[10px] text-slate-500 mb-2 font-semibold">Citation: {block.citation}</p>}
                              <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(block.body)}</div>
                            </div>
                          )
                        case 'EXAMPLE':
                        case 'ILLUSTRATION':
                          return (
                            <div key={blockIdx} className="border dark:border-gray-800 rounded-2xl bg-[#FAFAF8]/55 dark:bg-[#1E2640]/30 shadow-xs space-y-4 p-5 mb-4 border-[#E2E1DD]">
                              <h3 className="font-bold text-[#2D5BE3] dark:text-[#60A5FA] text-xs mb-2">📋 Example: {block.title}</h3>
                              <div className="text-slate-700 dark:text-gray-300 leading-relaxed text-xs">
                                <strong>Scenario: </strong>{renderTextWithReferences(block.scenario)}
                              </div>
                              {block.working && (
                                <div className="text-slate-650 dark:text-gray-400 leading-relaxed text-xs">
                                  <strong>Working: </strong>{renderTextWithReferences(block.working)}
                                </div>
                              )}
                              {block.answer && (
                                <div className="leading-relaxed font-medium bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
                                  <strong>Solution / Treatment: </strong>{renderTextWithReferences(block.answer)}
                                </div>
                              )}
                            </div>
                          )
                        case 'FAQ':
                          return (
                            <div key={blockIdx} className="p-5 border border-[#E2E1DD] dark:border-gray-800 rounded-xl bg-[#FAFAF8] dark:bg-[#1E2640]/50 mb-4">
                              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2">❓ Question: {block.question}</h3>
                              <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                                <strong>Answer: </strong> {renderTextWithReferences(block.answer)}
                              </div>
                            </div>
                          )
                        case 'TABLE':
                          return (
                            <div key={blockIdx} className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden mb-4">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-gray-400 border-b border-[#E2E1DD] dark:border-gray-800">
                                    {(block.headers || []).map((header: string, hIdx: number) => (
                                      <th key={hIdx} className="p-3 font-bold">{header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E2E1DD] dark:divide-gray-800">
                                  {(block.rows || []).map((row: string[], rIdx: number) => (
                                    <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                                      {row.map((cell: string, cIdx: number) => (
                                        <td key={cIdx} className="p-3 text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                                          {renderTextWithReferences(cell)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        case 'PDF_REFERENCE':
                          return (
                            <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640] mb-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText size={16} className="text-red-550" />
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title}</span>
                              </div>
                              <button
                                onClick={() => setActiveTab('pdf')}
                                className="text-xs font-bold text-[#2D5BE3] hover:underline"
                              >
                                View PDF
                              </button>
                            </div>
                          )
                        case 'VIDEO':
                          return (
                            <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640] mb-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Video size={16} className="text-blue-500" />
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title}</span>
                              </div>
                              <button
                                onClick={() => setActiveTab('lecture')}
                                className="text-xs font-bold text-[#2D5BE3] hover:underline"
                              >
                                Watch Video
                              </button>
                            </div>
                          )
                        case 'IMAGE':
                          return (
                            <div key={blockIdx} className="my-6 flex flex-col items-center justify-center gap-2">
                              {block.url && (
                                <img
                                  src={block.url}
                                  alt={block.caption || 'Image block'}
                                  className="max-w-full rounded-xl border border-[#E2E1DD] dark:border-gray-800 shadow-xs max-h-[450px] object-contain"
                                />
                              )}
                              {block.caption && (
                                <p className="text-[11px] text-slate-500 italic text-center font-medium">
                                  {block.caption}
                                </p>
                              )}
                            </div>
                          )
                        case 'DOWNLOAD_SECTION':
                          return (
                            <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-red-50 dark:bg-red-950/20 mb-4 flex items-center justify-between border-dashed">
                              <div className="flex items-center gap-3">
                                <Download size={16} className="text-red-550" />
                                <span className="text-xs font-bold text-red-700 dark:text-red-400">{block.title}</span>
                              </div>
                              <button
                                onClick={handlePrintStudyPdf}
                                className="text-xs font-bold text-red-700 dark:text-red-400 hover:underline"
                              >
                                Download content PDF
                              </button>
                            </div>
                          )
                        default:
                          return null
                      }
                    })}
                  </div>
                ) : (
                  /* Fallback to static text properties from data.ts */
                  <>
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
                  </>
                )}

              </div>
            </div>
          )}



        </div>

      </main>
    </div>
  )
}
