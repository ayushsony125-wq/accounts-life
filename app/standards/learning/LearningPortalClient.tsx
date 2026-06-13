'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  FileText,
  Search,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  Volume2,
  VolumeX,
  SkipForward,
  Settings,
  Maximize,
  ExternalLink,
  Download,
  Video,
  Highlighter,
  PenTool,
  Eraser,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ChevronDown
} from 'lucide-react'
import { Standard } from '@/lib/learning-loader'

interface LearningPortalClientProps {
  initialStandards: Standard[]
  defaultFramework: 'AS' | 'Ind AS'
  initialSelectedStandardId?: string
}

export default function LearningPortalClient({
  initialStandards,
  defaultFramework,
  initialSelectedStandardId
}: LearningPortalClientProps) {
  const [framework] = useState<'AS' | 'Ind AS'>(defaultFramework)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialSelectedStandardId || (defaultFramework === 'AS' ? 'intro-as' : 'intro-ind-as')
  )
  const [activeTab, setActiveTab] = useState<'standard' | 'examples' | 'lecture' | 'pdf'>('standard')
  const [lastActiveBaseTab, setLastActiveBaseTab] = useState<'standard' | 'examples'>('standard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (activeTab === 'standard' || activeTab === 'examples') {
      setLastActiveBaseTab(activeTab)
    }
  }, [activeTab])

  const currentStandard = initialStandards.find((s) => s.id === selectedStandardId) || initialStandards[0]

  // PDF Viewer states
  const [pdfPage, setPdfPage] = useState<number>(1)
  const [annotationMode, setAnnotationMode] = useState<'none' | 'highlight' | 'write' | 'erase' | 'note'>('none')
  const [highlightColor, setHighlightColor] = useState<string>('yellow')
  const [pdfNotes, setPdfNotes] = useState<{ id: number; page: number; x: number; y: number; text: string }[]>([])
  const [pdfHighlights, setPdfHighlights] = useState<{ id: number; page: number; elementId: string; color: string }[]>([])
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [searchInPdf, setSearchInPdf] = useState(false)
  const [pdfSearchQuery, setPdfSearchQuery] = useState('')
  const [isAnnotationPanelOpen, setIsAnnotationPanelOpen] = useState(false)

  // Drawing states
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Video states
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoTime, setVideoTime] = useState(0)
  const [videoVolume, setVideoVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showCC, setShowCC] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const [videoDuration, setVideoDuration] = useState(1125)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)

  const [showControls, setShowControls] = useState(true)
  const [videoQuality, setVideoQuality] = useState<string>('Auto')
  const controlsTimeoutRef = useRef<any>(null)

  const resetControlsTimeout = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }

  useEffect(() => {
    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying])

  const handleMouseMovePlayer = () => {
    resetControlsTimeout()
  }

  const handleMouseLeavePlayer = () => {
    if (isPlaying) {
      setShowControls(false)
    }
  }

  const handleFullscreenToggle = () => {
    const container = videoContainerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // YouTube video ID extractor
  const getYouTubeId = (url: string) => {
    if (!url) return ''
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : ''
  }

  // Handle sidebar wrapping and alignment cleanly
  const getSidebarItemDisplay = (std: Standard) => {
    if (std.id.includes('intro')) {
      return (
        <span className="text-[13px] font-bold leading-normal text-left block text-[#1C1C1E] dark:text-white">
          {std.title}
        </span>
      )
    }
    
    const code = std.code
    let title = std.shortTitle || std.title
    if (title.startsWith(code)) {
      title = title.substring(code.length).replace(/^\s*[\u2013-—–\s-]+\s*/, '')
    }

    return (
      <div className="flex items-start gap-1.5 text-[12.5px] leading-normal w-full">
        <span className="shrink-0 font-black w-[72px] text-slate-850 dark:text-slate-100 uppercase tracking-tight">
          {code}
        </span>
        <span className="text-left font-semibold leading-normal flex-1 break-words text-[#33333A] dark:text-gray-200">
          {title}
        </span>
      </div>
    )
  }

  // Sync state changes with native HTML5 video player
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = videoVolume / 100
    video.muted = isMuted
  }, [videoVolume, isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = playbackSpeed
  }, [playbackSpeed])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime(Math.floor(videoRef.current.currentTime))
    }
  }

  const handleDurationChange = () => {
    if (videoRef.current) {
      setVideoDuration(Math.floor(videoRef.current.duration) || 1125)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setVideoTime(0)
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setVideoTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const handlePlayPauseToggle = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, videoRef.current.currentTime - 10)
      videoRef.current.currentTime = newTime
      setVideoTime(Math.floor(newTime))
    }
  }

  const handleSkipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoDuration, videoRef.current.currentTime + 10)
      videoRef.current.currentTime = newTime
      setVideoTime(Math.floor(newTime))
    }
  }

  const handleBackClick = (e: React.MouseEvent) => {
    if (activeTab === 'lecture' || activeTab === 'pdf') {
      e.preventDefault()
      setActiveTab(lastActiveBaseTab)
    }
  }

  const getVideoSrc = (url: string) => {
    // Return sample direct MP4 video link for internal premium feel
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }

  // Filter list by search query and exclude outdated standards
  const excludedIds = ['as-6', 'as-30', 'as-31', 'as-32', 'ind-as-104']
  const filteredStandards = initialStandards
    .filter((s) => !excludedIds.includes(s.id))
    .filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const formatVideoTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Draw simple mark on Canvas for PDF Write tool
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (annotationMode !== 'write') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.strokeStyle = '#EF4444' // Red pencil
    ctx.lineWidth = 2
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || annotationMode !== 'write') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Handle PDF highlight simulation click
  const handleHighlightWord = (elementId: string) => {
    if (annotationMode !== 'highlight') return
    const exists = pdfHighlights.find((h) => h.elementId === elementId && h.page === pdfPage)
    if (exists) {
      setPdfHighlights((prev) => prev.filter((h) => h.elementId !== elementId || h.page !== pdfPage))
    } else {
      setPdfHighlights((prev) => [
        ...prev,
        { id: Date.now(), page: pdfPage, elementId, color: highlightColor }
      ])
    }
  }

  // Clear all annotations
  const clearAnnotations = () => {
    setPdfHighlights([])
    setPdfNotes([])
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const handleAddNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (annotationMode !== 'note') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const text = prompt('Enter annotation note text:')
    if (text) {
      setPdfNotes((prev) => [
        ...prev,
        { id: Date.now(), page: pdfPage, x, y, text }
      ])
    }
    setAnnotationMode('none')
  }

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0B0F19] flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-xs z-35 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        ${isSidebarOpen ? 'fixed inset-y-0 left-0 top-16 z-40 w-[260px] shadow-2xl flex border-r' : 'hidden'}
        lg:flex lg:static lg:w-[220px] lg:shadow-none lg:z-auto lg:h-full
        bg-white dark:bg-[#111726] border-[#E2E1DD] dark:border-gray-800 flex flex-col shrink-0 lg:sticky lg:top-16 overflow-hidden
      `}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#E2E1DD] dark:border-gray-800 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BookOpen size={22} className="text-[#2D5BE3] dark:text-blue-400 shrink-0" />
            <span className="font-sans font-black text-[18.5px] text-[#1C1C1E] dark:text-white uppercase tracking-wide">
              Accounting Standards
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76767E] dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] focus:bg-white dark:bg-[#0B0F19] dark:focus:bg-[#111726] border border-[#C5C3BC] dark:border-gray-750 focus:border-[#2D5BE3] rounded-lg pl-9 pr-3 py-2 text-[12.5px] font-semibold outline-none transition-all focus:ring-2 focus:ring-[#2D5BE3]/15 shadow-2xs text-[#1C1C1E] dark:text-white"
            />
          </div>
        </div>

        {/* Standards List */}
        <div className="flex-1 p-2 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredStandards.map((std) => {
            const isSelected = selectedStandardId === std.id
            return (
              <div key={std.id} className="flex flex-col animate-fade-in border-b border-[#F4F3F0] dark:border-gray-850 pb-1.5 last:border-b-0 last:pb-0">
                <button
                  onClick={() => {
                    setSelectedStandardId(std.id)
                    setActiveTab('standard')
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full text-left py-2 px-2.5 rounded-md flex items-start justify-between transition-all ${
                    isSelected
                      ? 'bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-[#60A5FA] font-bold shadow-2xs'
                      : 'hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52] dark:text-gray-300'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    {getSidebarItemDisplay(std)}
                  </div>
                  <ChevronRight
                    size={13}
                    className={`shrink-0 mt-0.5 transition-transform ${isSelected ? 'rotate-90 text-[#2D5BE3]' : 'text-[#A0A0A8]'}`}
                  />
                </button>

                {/* Sub-menu options for selected standard */}
                {isSelected && (
                  <div className="ml-4 pl-3 border-l border-[#D5E1FB] dark:border-[#263765] mt-1.5 space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('standard')
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-md text-[11.5px] font-bold flex items-center gap-2 ${
                        activeTab === 'standard'
                          ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA] font-extrabold'
                          : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <FileText size={12} />
                      Standard
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('examples')
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-md text-[11.5px] font-bold flex items-center gap-2 ${
                        activeTab === 'examples'
                          ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA] font-extrabold'
                          : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <Scale size={12} />
                      Examples &amp; Case Law
                    </button>
                  </div>
                )}
              </div>
            )
          })}
          {filteredStandards.length === 0 && (
            <div className="text-center py-8 text-xs text-[#76767E]">
              No accounting standards found.
            </div>
          )}
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
              aria-label="Toggle standards menu"
            >
              <BookOpen size={15} />
              Menu
            </button>
            
            {/* Prominent Standard Title */}
            <h1 className="text-[13px] sm:text-[15.5px] font-black text-[#1C1C1E] dark:text-white tracking-tight border-l-2 border-[#2D5BE3] dark:border-blue-500 pl-2 sm:pl-3 truncate select-none leading-tight flex-1 min-w-0">
              {currentStandard.id.includes('intro') ? 'Introduction to Accounting Standards and Their Applicability' : currentStandard.title}
            </h1>
          </div>

          {/* View Tab Buttons on Top Right */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            {activeTab === 'lecture' && (
              <div className="flex items-center gap-1.5 flex-nowrap">
                {currentStandard.lectureUrl && (
                  <a
                    href={currentStandard.lectureUrl}
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
                    if (currentStandard.lectureUrl) {
                      window.open(currentStandard.lectureUrl, '_blank');
                    } else {
                      alert('Lecture video download is simulated.');
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-[12.5px] font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-xs shrink-0"
                >
                  <Download size={14} className="shrink-0" />
                  Download Lecture
                </button>
              </div>
            )}

            {(activeTab === 'standard' || activeTab === 'examples') && (
              <>
                <button
                  onClick={() => setActiveTab('lecture')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-extrabold bg-[#EEF2FD] text-[#2D5BE3] hover:bg-[#DCE6FF] dark:bg-[#1A2542] dark:text-blue-400 shrink-0 transition-all shadow-xs"
                >
                  <Video size={15} className="shrink-0 text-[#2D5BE3] dark:text-blue-400" />
                  Lecture
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-extrabold bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] dark:bg-[#2C1D1D] dark:text-red-400 shrink-0 transition-all shadow-xs"
                >
                  <FileText size={15} className="shrink-0 text-[#E15252] dark:text-red-400" />
                  PDF View
                </button>
              </>
            )}
          </div>
        </div>

        {/* ─── Tab Content Views ──────────────────────────────────────────────── */}
        <div className={`flex-1 w-full max-w-none flex flex-col ${activeTab === 'pdf' || activeTab === 'lecture' ? 'p-2 sm:p-4 pt-1 sm:pt-2' : 'p-4 md:p-6'}`}>

          {/* 1. STANDARD VIEW */}
          {activeTab === 'standard' && (
            <div className="w-full space-y-6 animate-fade-in">
              {/* Standard text sections */}
              <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
                
                {/* Objective */}
                <div>
                  <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-3">
                    1. Objective
                  </h2>
                  <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                    {currentStandard.content.objective || 'Objective clauses are currently being prepared for this standard.'}
                  </p>
                </div>

                {/* Scope */}
                <div>
                  <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-3">
                    2. Scope
                  </h2>
                  <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed mb-4 font-semibold">
                    {currentStandard.content.scope.statement || 'Scope rules are currently being prepared for this standard.'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50">
                      <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-2.5">
                        Applies To
                      </p>
                      <ul className="space-y-2">
                        {currentStandard.content.scope.included.map((item, idx) => (
                          <li key={idx} className="text-xs text-[#4A4A52] dark:text-gray-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-[#1A7A4A] dark:text-emerald-400">✓</span>
                            {item}
                          </li>
                        ))}
                        {currentStandard.content.scope.included.length === 0 && (
                          <li className="text-xs text-gray-500 italic">No specific inclusions defined.</li>
                        )}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50">
                      <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-2.5">
                        Exempted / Excluded
                      </p>
                      <ul className="space-y-2">
                        {currentStandard.content.scope.excluded.map((item, idx) => (
                          <li key={idx} className="text-xs text-[#4A4A52] dark:text-gray-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-[#C0392B] dark:text-red-400">✗</span>
                            {item}
                          </li>
                        ))}
                        {currentStandard.content.scope.excluded.length === 0 && (
                          <li className="text-xs text-gray-500 italic">No specific exclusions defined.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Key Principles */}
                <div>
                  <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-4">
                    3. Key Principles &amp; Guidance
                  </h2>
                  <div className="space-y-4">
                    {currentStandard.content.keyPrinciples.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640]">
                        <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1.5">{item.title}</h3>
                        <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed font-semibold">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Large Blank Content Placeholder for future material */}
                {(!currentStandard.content.objective && currentStandard.examples.length === 0) && (
                  <div className="border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-[#FAFAF8] dark:bg-[#111726]/30">
                    <div className="w-12 h-12 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-full flex items-center justify-center shadow-2xs mb-3">
                      <FileText size={20} className="text-[#A0A0A8]" />
                    </div>
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">Content will be available here</h3>
                    <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                      We are preparing high quality learning material and official references for you.
                    </p>
                  </div>
                )}

                {/* 4. Official References & Resource Links */}
                {currentStandard.resources && currentStandard.resources.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
                    <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-4">
                      4. Official References &amp; Resource Links
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentStandard.resources.map((res, idx) => (
                        <a
                          key={idx}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640] hover:border-[#2D5BE3] transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 flex items-center justify-center text-[#2D5BE3] dark:text-blue-400 group-hover:scale-105 transition-transform">
                              {res.type === 'PDF' ? (
                                <FileText size={16} className="text-red-500" />
                              ) : res.type === 'VIDEO' ? (
                                <Video size={16} className="text-blue-500" />
                              ) : (
                                <ExternalLink size={16} className="text-emerald-500" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] transition-colors">
                                {res.title}
                              </p>
                              <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-0.5">
                                {res.type === 'PDF' ? 'Official PDF Document' : res.type === 'VIDEO' ? 'Video Lecture Class' : 'External Reference Link'}
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-[#A0A0A8] group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* 2. EXAMPLES & CASE LAW VIEW */}
          {activeTab === 'examples' && (
            <div className="w-full space-y-6 animate-fade-in">
              {/* Case list cards */}
              <div className="space-y-6">
                {currentStandard.examples.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                    <div className="flex items-center gap-2">
                      <Scale size={18} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                      <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="bg-[#FAFAF8] dark:bg-[#1E2640] p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800">
                      <p className="text-[11px] text-[#A0A0A8] dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                        Practical Scenario
                      </p>
                      <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                        {item.scenario}
                      </p>
                    </div>

                    <div className="bg-[#E8F7EE] dark:bg-[#1A2C22] p-4 rounded-xl border border-[#C5E9D4] dark:border-green-900/50">
                      <p className="text-[11px] text-[#1A7A4A] dark:text-emerald-400 font-bold uppercase tracking-wider mb-1.5">
                        Statutory Accounting Guidance &amp; Treatment
                      </p>
                      <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                        {item.guidance}
                      </p>
                    </div>
                  </div>
                ))}
                
                {currentStandard.examples.length === 0 && (
                  <div className="border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-white dark:bg-[#111726]/30">
                    <div className="w-12 h-12 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-full flex items-center justify-center shadow-2xs mb-3">
                      <Scale size={20} className="text-[#A0A0A8]" />
                    </div>
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">No examples available</h3>
                    <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                      Illustrations and specific case study files are currently being processed.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. LECTURE VIDEO PLAYBACK VIEW */}
          {activeTab === 'lecture' && (
            <div className="w-full space-y-3 animate-fade-in pt-0">
              {/* Premium native HTML5 video player integration */}
              <div
                ref={videoContainerRef}
                onMouseMove={handleMouseMovePlayer}
                onMouseLeave={handleMouseLeavePlayer}
                className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl bg-[#090C15] overflow-hidden shadow-lg border border-gray-900 flex flex-col group/video"
              >
                {/* Native HTML5 video tag */}
                <video
                  ref={videoRef}
                  src={getVideoSrc(currentStandard.lectureUrl)}
                  className="w-full h-full object-cover z-0 pointer-events-auto"
                  onTimeUpdate={handleTimeUpdate}
                  onDurationChange={handleDurationChange}
                  onEnded={handleVideoEnded}
                  playsInline
                />

                {/* Play screen backdrop */}
                {!isPlaying && videoTime === 0 ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/65 backdrop-blur-xs transition-opacity p-6 text-center select-none">
                    
                    {/* Mock Poster Artwork inside Player */}
                    <div className="mb-6 max-w-sm w-full bg-slate-950/90 border border-slate-800 p-6 rounded-xl text-left shadow-md">
                      <span className="text-[10px] font-bold text-[#60A5FA] bg-[#2D5BE3]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        LECTURE
                      </span>
                      <h2 className="text-lg font-bold text-white mt-2 leading-tight">
                        {currentStandard.code}
                      </h2>
                      <p className="text-xs font-semibold text-gray-300 mt-1">
                        {currentStandard.title}
                      </p>
                    </div>

                    <button
                      onClick={handlePlayPauseToggle}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#2D5BE3] hover:bg-[#2450CC] text-white hover:scale-105 transition-all shadow-md focus:outline-none"
                    >
                      <Play size={24} className="ml-1" />
                    </button>
                    <span className="text-xs font-bold text-white mt-3 uppercase tracking-wider">
                      Start Video Lecture
                    </span>
                  </div>
                ) : null}

                {/* Subtitles Overlay */}
                {showCC && isPlaying && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/80 rounded-md text-xs text-white max-w-lg text-center leading-normal border border-gray-800">
                    {videoTime < 5
                      ? `Welcome to our session on ${currentStandard.title}.`
                      : videoTime < 12
                      ? "In this chapter, we will discuss the primary objectives and legislative scope."
                      : videoTime < 25
                      ? "Note that complying with these disclosure criteria is essential for examination purposes."
                      : "Let's review the practical illustrations and adjustments in our work papers."}
                  </div>
                )}

                {/* Controls Bar at bottom */}
                <div className={`mt-auto w-full bg-gradient-to-t from-black/95 to-transparent p-4 flex flex-col gap-2 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  
                  {/* Progress timeline slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-semibold select-none">
                      {formatVideoTime(videoTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={videoDuration}
                      value={videoTime}
                      onChange={handleSeekChange}
                      className="flex-1 accent-[#2D5BE3] h-1 rounded-full bg-gray-700 cursor-pointer outline-none"
                    />
                    <span className="text-[10px] text-gray-400 font-semibold select-none">
                      {formatVideoTime(videoDuration)}
                    </span>
                  </div>

                  {/* Icon controllers row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handlePlayPauseToggle}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={handleSkipBackward}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                        title="Skip backward 10 seconds"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={handleSkipForward}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                        title="Skip forward 10 seconds"
                      >
                        <RotateCw size={16} />
                      </button>
                      <div className="flex items-center gap-1.5 group/volume">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:text-[#2D5BE3] transition-colors"
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : videoVolume}
                          onChange={(e) => {
                            setVideoVolume(Number(e.target.value))
                            setIsMuted(false)
                          }}
                          className="w-16 accent-[#2D5BE3] h-1 rounded-full bg-gray-700 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Playback speed selector */}
                      <div className="relative">
                        <select
                          value={playbackSpeed}
                          onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                          className="bg-[#1C1C1E] text-white text-[11px] font-bold rounded px-1.5 py-0.5 border border-gray-700 outline-none cursor-pointer"
                        >
                          <option value="0.9">0.9x</option>
                          <option value="1">1.0x</option>
                          <option value="1.25">1.25x</option>
                          <option value="1.5">1.5x</option>
                          <option value="1.75">1.75x</option>
                          <option value="2">2.0x</option>
                        </select>
                      </div>

                      {/* Quality menu */}
                      <div className="relative">
                        <select
                          value={videoQuality}
                          onChange={(e) => {
                            setVideoQuality(e.target.value)
                            alert(`Quality changed to ${e.target.value}`)
                          }}
                          className="bg-[#1C1C1E] text-white text-[11px] font-bold rounded px-1.5 py-0.5 border border-gray-700 outline-none cursor-pointer"
                        >
                          <option value="Auto">Auto</option>
                          <option value="1080p">1080p</option>
                          <option value="720p">720p</option>
                          <option value="480p">480p</option>
                        </select>
                      </div>

                      <button
                        onClick={handleFullscreenToggle}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                      >
                        <Maximize size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Fallback if no lecture source provided */}
              {!currentStandard.lectureUrl && (
                <div className="p-6 rounded-xl border border-dashed border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#111726]/30 text-center flex flex-col items-center justify-center">
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">Lecture video coming soon</h3>
                  <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                    Official video classes and lecture series for this standard are being recorded.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 4. PREMIUM DOCUMENT PDF VIEWER VIEW */}
          {activeTab === 'pdf' && (
            <div className="w-full flex flex-col lg:flex-row gap-2 min-h-[600px] select-none animate-fade-in p-0">
              
              {/* Central PDF Canvas area - occupying maximum available width without page thumbnails panel */}
              <div className="flex-1 bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl flex flex-col overflow-hidden relative">
                
                {/* PDF Control toolbar */}
                <div className="bg-[#FAFAF8] dark:bg-[#1E2640] border-b border-[#E2E1DD] dark:border-gray-800 p-2 flex items-center justify-between flex-wrap gap-2 shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
                      disabled={pdfPage <= 1}
                      className="w-7 h-7 rounded flex items-center justify-center bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-750 text-xs font-bold disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <ChevronLeft size={14} className="text-[#4A4A52] dark:text-gray-300" />
                    </button>
                    <span className="text-xs text-[#4A4A52] dark:text-gray-300 font-bold px-2 select-none">
                      Page {pdfPage} / 3
                    </span>
                    <button
                      onClick={() => setPdfPage((p) => Math.min(3, p + 1))}
                      disabled={pdfPage >= 3}
                      className="w-7 h-7 rounded flex items-center justify-center bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-750 text-xs font-bold disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <ChevronRight size={14} className="text-[#4A4A52] dark:text-gray-300" />
                    </button>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[#1C1C1E] dark:text-white select-none">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSearchInPdf(!searchInPdf)}
                      className={`p-1.5 rounded transition-colors ${searchInPdf ? 'bg-[#EEF2FD] text-[#2D5BE3]' : 'hover:bg-[#EEF2FD] text-[#4A4A52]'}`}
                    >
                      <Search size={14} />
                    </button>
                    <button
                      onClick={() => alert('Document rotated.')}
                      className="p-1.5 rounded hover:bg-[#EEF2FD] text-[#4A4A52] dark:text-gray-300"
                    >
                      <RotateCw size={14} />
                    </button>
                  </div>
                </div>

                {/* PDF Search Box inside viewer */}
                {searchInPdf && (
                  <div className="p-2 bg-[#EEF2FD] border-b border-[#D0DCFA] flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Find in document..."
                      value={pdfSearchQuery}
                      onChange={(e) => setPdfSearchQuery(e.target.value)}
                      className="bg-white border border-[#D0DCFA] rounded-md px-3 py-1 text-xs outline-none flex-1 max-w-sm"
                    />
                    <button
                      onClick={() => setPdfSearchQuery('')}
                      className="text-xs text-[#76767E] hover:text-[#1C1C1E]"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* PDF Sheet Canvas containing text content - expanded to 100% max-w-5xl */}
                <div
                  className="flex-1 overflow-y-auto pt-0 p-1 sm:p-2 relative flex justify-center bg-[#525659] select-none"
                  onClick={handleAddNoteClick}
                >
                  <div
                    className="bg-white relative shadow-md p-6 sm:p-10 w-full max-w-5xl min-h-[850px] border border-gray-300 select-none flex flex-col justify-start text-left origin-top transition-transform duration-150"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    {/* Drawing canvas layer on top for Pen Tool */}
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={900}
                      className={`absolute inset-0 z-10 ${annotationMode === 'write' ? 'cursor-crosshair' : 'pointer-events-none'}`}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />

                    {/* Page Content based on Page selection */}
                    {pdfPage === 1 && (
                      <div className="space-y-4 select-text z-0">
                        {currentStandard.id === 'as-1' ? (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                                AS 1
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Accounting Standard (AS) 1 — Disclosure of Accounting Policies
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p className="font-bold text-xs">Introduction &amp; Objective</p>
                              <p>
                                1. This Standard deals with the disclosure of significant accounting policies followed in preparing and presenting financial statements.
                              </p>
                              <p>
                                2. The view presented in the financial statements of an enterprise of its state of affairs and of its profit or loss can be significantly affected by the accounting policies followed.
                              </p>
                              <p className="font-bold text-xs mt-2">Fundamental Accounting Assumptions</p>
                              <p>
                                9. Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is necessary if they are not followed.
                              </p>
                              <div className="pl-3 border-l-2 border-slate-350 space-y-2">
                                <p><span className="font-bold">a. Going Concern:</span> The enterprise is normally viewed as a going concern, that is, as continuing in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation.</p>
                                <p><span className="font-bold">b. Consistency:</span> It is assumed that accounting policies are consistent from one period to another.</p>
                                <p><span className="font-bold">c. Accrual:</span> Revenues and costs are accrued, that is, recognised as they are earned or incurred (and not as money is received or paid) and recorded in the financial statements of the periods to which they relate.</p>
                              </div>
                            </div>
                          </>
                        ) : currentStandard.id === 'ind-as-1' ? (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#6B3FA0] border-b-2 border-[#6B3FA0] pb-1 uppercase tracking-wider">
                                Ind AS 1
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Indian Accounting Standard (Ind AS) 1 — Presentation of Financial Statements
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p className="font-bold text-xs">Objective</p>
                              <p>
                                This Standard prescribes the basis for presentation of general purpose financial statements to ensure comparability both with the entity’s financial statements of previous periods and with the financial statements of other entities. It sets out overall requirements for the presentation of financial statements, guidelines for their structure and minimum requirements for their content.
                              </p>
                              <p className="font-bold text-xs mt-2">General Features</p>
                              <p>
                                Financial statements shall present a true and fair view of the financial position, financial performance and cash flows of an entity. Presenting a true and fair view requires the faithful representation of the effects of transactions, other events and conditions in accordance with the definitions and recognition criteria for assets, liabilities, income and expenses set out in the Framework.
                              </p>
                              <p className="font-bold text-xs mt-2">Going Concern Assessment</p>
                              <p>
                                When preparing financial statements, management shall make an assessment of an entity’s ability to continue as a going concern. An entity shall prepare financial statements on a going concern basis unless management either intends to liquidate the entity or to cease trading, or has no realistic alternative but to do so.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                                {currentStandard.code}
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                {currentStandard.title}
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <div>
                                <span className="font-bold block mb-1 text-gray-800">1. Objective</span>
                                <p>
                                  <span
                                    onClick={() => handleHighlightWord('h1')}
                                    className={`cursor-pointer transition-colors p-0.5 rounded ${
                                      pdfHighlights.find((h) => h.elementId === 'h1')
                                        ? 'bg-yellow-250 text-black font-bold'
                                        : 'hover:bg-yellow-100'
                                      }`}
                                  >
                                    {currentStandard.content.objective || 'Objective treatment rules are currently under development.'}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <span className="font-bold block mb-1 text-gray-800">2. Scope</span>
                                <p>
                                  <span
                                    onClick={() => handleHighlightWord('h2')}
                                    className={`cursor-pointer transition-colors p-0.5 rounded ${
                                      pdfHighlights.find((h) => h.elementId === 'h2')
                                        ? 'bg-blue-200 text-black font-bold'
                                        : 'hover:bg-blue-100'
                                      }`}
                                  >
                                    {currentStandard.content.scope.statement || 'Scope statement details are currently under development.'}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {pdfPage === 2 && (
                      <div className="space-y-4 select-text z-0">
                        {currentStandard.id === 'as-1' ? (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                                AS 1
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Selection &amp; Nature of Accounting Policies
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p>
                                12. The differing circumstances in which enterprises operate make alternative accounting principles and methods acceptable. The choice of appropriate policies calls for judgement by management.
                              </p>
                              <p className="font-bold text-xs mt-2">Major Considerations Governing Selection</p>
                              <p>
                                16. The primary consideration is that financial statements represent a true and fair view of the state of affairs and of the profit or loss.
                              </p>
                              <div className="pl-3 border-l-2 border-slate-350 space-y-2">
                                <p><span className="font-bold">a. Prudence:</span> In view of the uncertainty attached to future events, profits are not anticipated but recognised only when realised. Provision is made for all known liabilities and losses.</p>
                                <p><span className="font-bold">b. Substance over Form:</span> The accounting treatment and presentation should be governed by their economic substance and not merely by legal form.</p>
                                <p><span className="font-bold">c. Materiality:</span> Financial statements should disclose all &quot;material&quot; items, i.e., items the knowledge of which might influence the decisions of the user.</p>
                              </div>
                              <p className="font-bold text-xs mt-2">Areas of Differing Accounting Policies</p>
                              <p>
                                14. Methods of depreciation, valuation of inventories, treatment of goodwill, fixed assets valuation, translation of foreign currency items, and treatment of retirement benefits.
                              </p>
                            </div>
                          </>
                        ) : currentStandard.id === 'ind-as-1' ? (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#6B3FA0] border-b-2 border-[#6B3FA0] pb-1 uppercase tracking-wider">
                                Ind AS 1
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Presentation Details &amp; Accounting Treatment
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p className="font-bold text-xs">Accrual Basis of Accounting</p>
                              <p>
                                An entity shall prepare its financial statements, except for cash flow information, using the accrual basis of accounting. When the accrual basis is used, items are recognised as assets, liabilities, equity, income and expenses when they satisfy the definitions and recognition criteria for those elements in the Framework.
                              </p>
                              <p className="font-bold text-xs mt-2">Materiality and Aggregation</p>
                              <p>
                                An entity shall present separately each material class of similar items. An entity shall present separately items of a dissimilar nature or function unless they are immaterial. Financial statements result from processing large numbers of transactions or other events that are aggregated into classes according to their nature or function.
                              </p>
                              <p className="font-bold text-xs mt-2">Offsetting</p>
                              <p>
                                An entity shall not offset assets and liabilities or income and expenses, unless required or permitted by an Ind AS. Measuring assets net of valuation allowances is not offsetting.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                                {currentStandard.code}
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Selection of Policies &amp; Practical Application
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p>
                                Primary consideration is that financial statements present a{' '}
                                <span
                                  onClick={() => handleHighlightWord('h3')}
                                  className={`cursor-pointer transition-colors p-0.5 rounded ${
                                    pdfHighlights.find((h) => h.elementId === 'h3')
                                      ? 'bg-green-250 text-black font-bold'
                                      : 'hover:bg-green-100'
                                  }`}
                                >
                                  true and fair view
                                </span>{' '}
                                of the state of affairs.
                              </p>
                              <div>
                                <span className="font-bold block mb-1 text-gray-800">Secondary Considerations:</span>
                                <ul className="list-disc pl-4 space-y-1.5">
                                  <li>
                                    <span className="font-bold">Prudence:</span> Provisions should be made for all known liabilities and losses.
                                  </li>
                                  <li>
                                    <span className="font-bold">Substance over Form:</span> Transactions should be accounted for in accordance with their commercial reality.
                                  </li>
                                  <li>
                                    <span className="font-bold">Materiality:</span> Disclose all material items which could influence user decisions.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {pdfPage === 3 && (
                      <div className="space-y-4 select-text z-0">
                        {currentStandard.id === 'as-1' ? (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                                AS 1
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Disclosure Principles &amp; Mandatory Rules
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p className="font-bold text-xs">Main Principles (Paras 24 - 27)</p>
                              <p>
                                <span className="font-bold">24. All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed.</span>
                              </p>
                              <p>
                                <span className="font-bold">25. The disclosure of the significant accounting policies as such should form part of the financial statements and the significant accounting policies should normally be disclosed in one place.</span>
                              </p>
                              <p>
                                <span className="font-bold">26. Any change in the accounting policies which has a material effect in the current period or which is reasonably expected to have a material effect in later periods should be disclosed.</span> In the case of a change which has a material effect in the current period, the amount by which any item is affected should also be disclosed to the extent ascertainable.
                              </p>
                              <p>
                                <span className="font-bold">27. If the fundamental accounting assumptions, viz. Going Concern, Consistency and Accrual are followed in financial statements, specific disclosure is not required. If a fundamental accounting assumption is not followed, the fact should be disclosed.</span>
                              </p>
                            </div>
                          </>
                        ) : currentStandard.id === 'ind-as-1' ? (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#6B3FA0] border-b-2 border-[#6B3FA0] pb-1 uppercase tracking-wider">
                                Ind AS 1
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Structure &amp; Complete Set of Financial Statements
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p className="font-bold text-xs">Complete Set of Financial Statements</p>
                              <p>A complete set of financial statements comprises:</p>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>a Balance Sheet as at the end of the period;</li>
                                <li>a Statement of Profit and Loss for the period;</li>
                                <li>a Statement of Changes in Equity for the period;</li>
                                <li>a Statement of Cash Flows for the period;</li>
                                <li>Notes, comprising significant accounting policies and other explanatory information.</li>
                              </ul>
                              <p className="font-bold text-xs mt-2">Other Comprehensive Income (OCI)</p>
                              <p>
                                The Statement of Profit and Loss shall present line items that present the profit or loss and other comprehensive income sections. OCI comprises items of income and expense (including reclassification adjustments) that are not recognised in profit or loss as required or permitted by other Ind AS.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                                {currentStandard.code}
                              </span>
                              <h2 className="text-xl font-bold text-[#1C1C1E] mt-3">
                                Exemptions and Disclosure Norms
                              </h2>
                              <div className="h-0.5 bg-gray-200 mt-2"></div>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#1C1C1E] leading-relaxed">
                              <p>
                                Accounting policies must be disclosed in a single place (typically as Note 1 of the Notes to Accounts).
                              </p>
                              <p>
                                Any change in accounting policies which has a material effect in the current period, or is reasonably expected to have a material effect in later periods, must be disclosed.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Rendering Sticky Notes placed by user */}
                    {pdfNotes
                      .filter((n) => n.page === pdfPage)
                      .map((note) => (
                        <div
                          key={note.id}
                          style={{ left: note.x, top: note.y }}
                          className="absolute z-20 w-36 p-2 bg-yellow-100 border border-yellow-300 rounded shadow-sm text-[10px] text-gray-800 animate-fade-in"
                          title="Click note to delete"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPdfNotes((prev) => prev.filter((n) => n.id !== note.id))
                          }}
                        >
                          <div className="font-bold border-b border-yellow-200 pb-0.5 mb-1 flex items-center justify-between">
                            <span>Sticky Note</span>
                            <span className="text-red-500 font-bold hover:scale-105 cursor-pointer">×</span>
                          </div>
                          <p className="font-medium leading-relaxed">{note.text}</p>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

              {/* Right Side Annotation Toolbar Panel */}
              <div className={`w-full bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-4 flex flex-col gap-4 shrink-0 shadow-xs h-fit sticky top-[80px] z-20 transition-all duration-300 ${isAnnotationPanelOpen ? 'lg:w-[220px]' : 'lg:w-[64px]'}`}>
                {/* Download PDF button (Always on top of annotation tools area) */}
                <button
                  onClick={() => alert('PDF downloaded successfully with annotations.')}
                  className={`w-full py-2.5 px-3 rounded-md text-[12.5px] font-bold flex items-center justify-center gap-2 text-white bg-[#E15252] hover:bg-[#C83D3D] transition-colors shadow-xs shrink-0 ${!isAnnotationPanelOpen ? 'lg:px-0' : ''}`}
                  title="Download PDF"
                >
                  <Download size={15} className="shrink-0" />
                  <span className={isAnnotationPanelOpen ? 'inline' : 'inline lg:hidden'}>Download PDF</span>
                </button>

                {/* Divider */}
                <div className="h-px bg-[#E2E1DD] dark:bg-gray-850 w-full" />

                <button
                  onClick={() => setIsAnnotationPanelOpen(!isAnnotationPanelOpen)}
                  className="w-full py-2 px-1 rounded-md text-left text-xs font-bold flex items-center justify-between text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white transition-colors"
                >
                  <span className={`text-[11.5px] font-extrabold uppercase tracking-wider ${isAnnotationPanelOpen ? 'block' : 'hidden lg:hidden'}`}>
                    Annotation Tools
                  </span>
                  <div className="flex items-center gap-1 mx-auto lg:mx-0">
                    <Highlighter size={15} className={isAnnotationPanelOpen ? 'hidden lg:hidden' : 'block shrink-0'} />
                    {isAnnotationPanelOpen ? (
                      <ChevronDown size={15} className="rotate-90 shrink-0" />
                    ) : (
                      <ChevronDown size={15} className="-rotate-90 hidden lg:block shrink-0" />
                    )}
                  </div>
                </button>

                <div className={`flex flex-col gap-3 transition-all duration-200 ${isAnnotationPanelOpen ? 'block' : 'hidden lg:hidden'}`}>
                  {/* Highlight tool */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setAnnotationMode(annotationMode === 'highlight' ? 'none' : 'highlight')}
                      className={`w-full py-2 px-3 rounded-md text-[12.5px] font-bold flex items-center gap-2 border transition-all ${
                        annotationMode === 'highlight'
                          ? 'border-[#E15252] bg-[#FFF0F0] text-[#E15252]'
                          : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]'
                      }`}
                    >
                      <Highlighter size={15} className="shrink-0" />
                      Highlight
                    </button>

                    {/* Highlight Color Pickers */}
                    {annotationMode === 'highlight' && (
                      <div className="flex items-center justify-around bg-[#FAFAF8] dark:bg-gray-800 p-2 rounded border border-[#E2E1DD] dark:border-gray-750">
                        <button
                          onClick={() => setHighlightColor('yellow')}
                          className={`w-4 h-4 rounded-full bg-yellow-300 border ${highlightColor === 'yellow' ? 'ring-2 ring-[#E15252]' : ''}`}
                        />
                        <button
                          onClick={() => setHighlightColor('green')}
                          className={`w-4 h-4 rounded-full bg-green-300 border ${highlightColor === 'green' ? 'ring-2 ring-[#E15252]' : ''}`}
                        />
                        <button
                          onClick={() => setHighlightColor('pink')}
                          className={`w-4 h-4 rounded-full bg-pink-300 border ${highlightColor === 'pink' ? 'ring-2 ring-[#E15252]' : ''}`}
                        />
                        <button
                          onClick={() => setHighlightColor('blue')}
                          className={`w-4 h-4 rounded-full bg-blue-300 border ${highlightColor === 'blue' ? 'ring-2 ring-[#E15252]' : ''}`}
                        />
                        <button
                          onClick={() => setHighlightColor('purple')}
                          className={`w-4 h-4 rounded-full bg-purple-300 border ${highlightColor === 'purple' ? 'ring-2 ring-[#E15252]' : ''}`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Draw Pencil tool */}
                  <button
                    onClick={() => setAnnotationMode(annotationMode === 'write' ? 'none' : 'write')}
                    className={`w-full py-2 px-3 rounded-md text-[12.5px] font-bold flex items-center gap-2 border transition-all ${
                      annotationMode === 'write'
                        ? 'border-[#E15252] bg-[#FFF0F0] text-[#E15252]'
                        : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]'
                    }`}
                  >
                    <PenTool size={15} className="shrink-0" />
                    Write
                  </button>

                  {/* Eraser tool */}
                  <button
                    onClick={() => {
                      clearAnnotations()
                      setAnnotationMode('none')
                    }}
                    className="w-full py-2 px-3 rounded-md text-[12.5px] font-bold flex items-center gap-2 border border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]"
                  >
                    <Eraser size={15} className="shrink-0" />
                    Erase
                  </button>

                  {/* Sticky Note tool */}
                  <button
                    onClick={() => setAnnotationMode(annotationMode === 'note' ? 'none' : 'note')}
                    className={`w-full py-2 px-3 rounded-md text-[12.5px] font-bold flex items-center gap-2 border transition-all ${
                      annotationMode === 'note'
                        ? 'border-[#E15252] bg-[#FFF0F0] text-[#E15252]'
                        : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]'
                    }`}
                  >
                    <MessageSquare size={15} className="shrink-0" />
                    Add Note
                  </button>
                </div>

                {/* For collapsed view on desktop, show a button to open when clicked */}
                {!isAnnotationPanelOpen && (
                  <div className="hidden lg:flex flex-col items-center gap-3">
                    <button
                      onClick={() => setIsAnnotationPanelOpen(true)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-gray-800 text-[#4A4A52] dark:text-gray-300"
                      title="Open Annotation Tools"
                    >
                      <ChevronDown size={15} className="-rotate-90 shrink-0" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  )
}
