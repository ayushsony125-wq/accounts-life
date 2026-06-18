'use client'

import { useState, useTransition, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveEntry, getEntryRevisions, getRevisionSnapshot } from '../actions'
import {
  Info, Book, Image, Video, CheckCircle, ArrowRight, ArrowLeft, Plus,
  Trash2, HelpCircle, History, FileText, Link2, ExternalLink, X,
  ArrowUp, ArrowDown, Eye, EyeOff, Copy, RefreshCw, Columns, Maximize2, Sparkles, ChevronRight
} from 'lucide-react'
import GlobalActionBar from '../GlobalActionBar'

interface EntryFormProps {
  initialEntry?: any
  domains: any[]
}

export default function EntryForm({ initialEntry, domains }: EntryFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  // Local undo/redo history stack maintained as a unified state to prevent React state updater side-effects
  const [historyState, setHistoryState] = useState<{ list: any[], pointer: number }>({ list: [], pointer: -1 })
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'identity' | 'content' | 'resources' | 'history' | 'publish'>('identity')
  const [previewTab, setPreviewTab] = useState<'standard' | 'examples' | 'lecture' | 'pdf'>('standard')

  // --- FORM STATES ---
  const [id, setId] = useState<number | undefined>(initialEntry?.id)
  const [entryTitle, setEntryTitle] = useState(initialEntry?.entryTitle || '')
  const [entrySlug, setEntrySlug] = useState(initialEntry?.entrySlug || '')
  const [entryType, setEntryType] = useState<string>(initialEntry?.entryType || 'CONCEPT')
  const [domainId, setDomainId] = useState<number>(initialEntry?.domainId || domains[0]?.id || 1)

  const currentDomain = domains.find((d) => d.id === Number(domainId))
  const subdomains = currentDomain?.subdomains || []
  const [subdomainId, setSubdomainId] = useState<number>(
    initialEntry?.subdomainId || subdomains[0]?.id || 1
  )

  const [summary, setSummary] = useState(initialEntry?.summary || '')
  const [verificationLevel, setVerificationLevel] = useState<string>(initialEntry?.verificationLevel || 'DRAFT')
  const [status, setStatus] = useState<string>(initialEntry?.status || 'DRAFT')
  const [examLevelTags, setExamLevelTags] = useState<string>(
    initialEntry?.examLevelTags
      ? Array.isArray(initialEntry.examLevelTags)
        ? initialEntry.examLevelTags.join(', ')
        : String(initialEntry.examLevelTags)
      : 'CA Intermediate'
  )
  const [authorityPrimary, setAuthorityPrimary] = useState(initialEntry?.authorityPrimary || '')
  const [authorityPrimaryUrl, setAuthorityPrimaryUrl] = useState(initialEntry?.authorityPrimaryUrl || '')
  const [authoritySecondary, setAuthoritySecondary] = useState(initialEntry?.authoritySecondary || '')
  const [isFeatured, setIsFeatured] = useState<boolean>(initialEntry?.isFeatured || false)
  const [seoTitle, setSeoTitle] = useState(initialEntry?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(initialEntry?.seoDescription || '')

  // Standard Metadata
  const formatDate = (d: any) => {
    if (!d) return ''
    try {
      const dateObj = new Date(d)
      if (isNaN(dateObj.getTime())) return ''
      return dateObj.toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  const [standardCode, setStandardCode] = useState(
    initialEntry?.standardDetail?.standardCode || initialEntry?.standardCode || ''
  )
  const [standardFramework, setStandardFramework] = useState<string>(
    initialEntry?.standardDetail?.standardFramework || initialEntry?.standardFramework || 'AS'
  )
  const [standardStatus, setStandardStatus] = useState<string>(
    initialEntry?.standardDetail?.standardStatus || initialEntry?.standardStatus || 'ACTIVE'
  )
  const [issuingBody, setIssuingBody] = useState(
    initialEntry?.standardDetail?.issuingBody || initialEntry?.issuingBody || 'ICAI'
  )
  const [dateIssued, setDateIssued] = useState(
    formatDate(initialEntry?.standardDetail?.dateIssued || initialEntry?.dateIssued)
  )
  const [dateEffective, setDateEffective] = useState(
    formatDate(initialEntry?.standardDetail?.dateEffective || initialEntry?.dateEffective)
  )
  const [applicabilitySummary, setApplicabilitySummary] = useState(
    initialEntry?.standardDetail?.applicabilitySummary || initialEntry?.applicabilitySummary || ''
  )

  // Resources (Linked videos and PDFs)
  const [videos, setVideos] = useState<any[]>(
    initialEntry?.resources?.filter((r: any) => r.resourceType === 'VIDEO') || []
  )
  const [references, setReferences] = useState<any[]>(
    initialEntry?.resources?.filter((r: any) => r.resourceType !== 'VIDEO') || []
  )

  // --- VISUAL BLOCKS SYSTEM ---
  const [blocks, setBlocks] = useState<any[]>(() => {
    if (initialEntry?.entryBody) {
      try {
        const bodyObj = typeof initialEntry.entryBody === 'string'
          ? JSON.parse(initialEntry.entryBody)
          : initialEntry.entryBody
        if (bodyObj && bodyObj.blocks && Array.isArray(bodyObj.blocks)) {
          return bodyObj.blocks
        }
      } catch (err) {}
    }

    // Fallback block generation from legacy fields
    const generated: any[] = []
    const objText = initialEntry?.standardDetail?.objectiveText || initialEntry?.objective?.text || ''
    if (objText) {
      generated.push({ id: 'obj-heading', type: 'HEADING', content: '1. Objective' })
      generated.push({ id: 'obj-para', type: 'PARAGRAPH', content: objText })
    }

    const scopeText = initialEntry?.standardDetail?.scopeStatement || initialEntry?.scope?.statement || ''
    if (scopeText) {
      generated.push({ id: 'scope-heading', type: 'HEADING', content: '2. Scope' })
      generated.push({ id: 'scope-para', type: 'PARAGRAPH', content: scopeText })
    }

    const definitionsList = initialEntry?.standardDetail?.definitions ?? initialEntry?.definitions
    if (definitionsList && definitionsList.length > 0) {
      generated.push({ id: 'def-heading', type: 'HEADING', content: 'Key Definitions' })
      definitionsList.forEach((def: any, idx: number) => {
        generated.push({
          id: `def-${idx}`,
          type: 'NOTE',
          title: `Definition: ${def.defTerm || def.term || ''}`,
          body: `Official Text:\n${def.defOfficialText || def.officialText || ''}\n\nExplanation:\n${def.defPlainExplanation || def.plainExplanation || ''}`
        })
      })
    }

    const notesList = initialEntry?.notes || []
    if (notesList.length > 0) {
      notesList.forEach((n: any, idx: number) => {
        generated.push({
          id: `note-${idx}`,
          type: 'NOTE',
          title: n.noteTitle || n.title || '',
          body: n.noteBody || n.body || ''
        })
      })
    }

    if (generated.length === 0) {
      generated.push({ id: 'block-1', type: 'HEADING', content: '1. Objective' })
      generated.push({ id: 'block-2', type: 'PARAGRAPH', content: 'Define the objective of this standard here...' })
    }

    return generated
  })

  // Auto-slugify
  const handleTitleChange = (val: string) => {
    setEntryTitle(val)
    if (!id) {
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setEntrySlug(slugified)
    }
  }

  // Visual Block editing functions
  const addBlock = (type: string) => {
    const id = `block-${Date.now()}`
    let newBlock: any = { id, type }
    if (type === 'HEADING' || type === 'SUB_HEADING' || type === 'PARAGRAPH') {
      newBlock.content = ''
    } else if (type === 'NOTE' || type === 'EXAM_TRAP' || type === 'PRACTICAL_USE') {
      newBlock.title = ''
      newBlock.body = ''
    } else if (type === 'CASE_LAW') {
      newBlock.title = ''
      newBlock.citation = ''
      newBlock.verdict = ''
    } else if (type === 'EXAMPLE' || type === 'ILLUSTRATION') {
      newBlock.title = ''
      newBlock.scenario = ''
      newBlock.working = ''
      newBlock.answer = ''
      newBlock.note = ''
    } else if (type === 'FAQ') {
      newBlock.question = ''
      newBlock.answer = ''
      newBlock.faqCategory = 'GENERAL'
      newBlock.sourceRef = ''
    } else if (type === 'PDF_REFERENCE' || type === 'VIDEO') {
      newBlock.title = ''
      newBlock.url = ''
    } else if (type === 'IMAGE') {
      newBlock.url = ''
      newBlock.caption = ''
    } else if (type === 'TABLE') {
      newBlock.headers = ['Item Description', 'AS Treatment', 'Ind AS Equivalent']
      newBlock.rows = [
        ['Example row 1', 'Treatment under AS GAAP rules', 'Treatment under Ind AS rules']
      ]
    } else if (type === 'DOWNLOAD_SECTION') {
      newBlock.title = 'Download content PDF'
      newBlock.url = ''
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (idx: number, field: string, val: any) => {
    const next = [...blocks]
    next[idx][field] = val
    setBlocks(next)
  }

  const removeBlock = (idx: number) => {
    setBlocks(blocks.filter((_, i) => i !== idx))
  }

  const moveBlockUp = (idx: number) => {
    if (idx === 0) return
    const next = [...blocks]
    const temp = next[idx]
    next[idx] = next[idx - 1]
    next[idx - 1] = temp
    setBlocks(next)
  }

  const moveBlockDown = (idx: number) => {
    if (idx === blocks.length - 1) return
    const next = [...blocks]
    const temp = next[idx]
    next[idx] = next[idx + 1]
    next[idx + 1] = temp
    setBlocks(next)
  }

  const duplicateBlock = (idx: number) => {
    const block = blocks[idx]
    const dup = { ...block, id: `block-${Date.now()}` }
    const next = [...blocks]
    next.splice(idx + 1, 0, dup)
    setBlocks(next)
  }

  const toggleBlockHidden = (idx: number) => {
    const next = [...blocks]
    next[idx].hidden = !next[idx].hidden
    setBlocks(next)
  }

  const insertFormattingTag = (idx: number, field: 'content' | 'body', type: 'bold' | 'italic' | 'underline' | 'highlight' | 'color' | 'size' | 'page') => {
    const block = blocks[idx]
    const text = block[field] || ''
    let startTag = ''
    let endTag = ''
    
    switch (type) {
      case 'bold':
        startTag = '**'
        endTag = '**'
        break;
      case 'italic':
        startTag = '*'
        endTag = '*'
        break;
      case 'underline':
        startTag = '[u]'
        endTag = '[/u]'
        break;
      case 'highlight':
        startTag = '[highlight]'
        endTag = '[/highlight]'
        break;
      case 'color':
        startTag = '[color=#2D5BE3]'
        endTag = '[/color]'
        break;
      case 'size':
        startTag = '[size=lg]'
        endTag = '[/size]'
        break;
      case 'page':
        startTag = '[Page '
        endTag = ']'
        break;
    }
    
    const textarea = document.getElementById(`textarea-block-${idx}-${field}`) as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = text.substring(start, end)
      const replacement = startTag + (selectedText || (type === 'page' ? '1' : 'text')) + endTag
      const newText = text.substring(0, start) + replacement + text.substring(end)
      
      updateBlock(idx, field, newText)
      
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(
          start + startTag.length,
          start + startTag.length + (selectedText || (type === 'page' ? '1' : 'text')).length
        )
      }, 50)
    } else {
      updateBlock(idx, field, text + startTag + (type === 'page' ? '1' : 'text') + endTag)
    }
  }

  // --- REVISIONS HISTORY SYSTEM ---
  const [revisionHistory, setRevisionHistory] = useState<any[]>([])
  const [isLoadingRevisions, setIsLoadingRevisions] = useState(false)
  const [comparingRevision, setComparingRevision] = useState<any | null>(null)

  const ensureRevisionsLoaded = useCallback(async () => {
    if (!id || revisionHistory.length > 0 || isLoadingRevisions) return
    setIsLoadingRevisions(true)
    try {
      const result = await getEntryRevisions(id)
      if (result.success && result.revisions.length > 0) {
        const loaded = await Promise.all(
          result.revisions.map(async (rev: any) => {
            const snapResult = await getRevisionSnapshot(rev.id)
            return {
              ...rev,
              snapshot: snapResult.success ? (snapResult as any).revision?.snapshot : null,
            }
          })
        )
        setRevisionHistory(loaded.filter(r => r.snapshot !== null))
      }
    } catch (err) {
      console.error('Failed loading revisions:', err)
    } finally {
      setIsLoadingRevisions(false)
    }
  }, [id, revisionHistory.length, isLoadingRevisions])

  useEffect(() => {
    if (id) {
      ensureRevisionsLoaded()
    }
  }, [id, ensureRevisionsLoaded])

  const applySnapshot = (snapshot: any) => {
    if (!snapshot) return
    setEntryTitle(snapshot.entryTitle || '')
    setEntrySlug(snapshot.entrySlug || '')
    setSummary(snapshot.summary || '')
    setStatus(snapshot.status || 'DRAFT')
    setVerificationLevel(snapshot.verificationLevel || 'DRAFT')
    setAuthorityPrimary(snapshot.authorityPrimary || '')
    setAuthorityPrimaryUrl(snapshot.authorityPrimaryUrl || '')
    setSeoTitle(snapshot.seoTitle || '')
    setSeoDescription(snapshot.seoDescription || '')
    setIsFeatured(!!snapshot.isFeatured)
    setStandardCode(snapshot.standardCode || '')
    setStandardFramework(snapshot.standardFramework || 'AS')
    setStandardStatus(snapshot.standardStatus || 'ACTIVE')
    if (snapshot.entryBody?.blocks) {
      setBlocks(snapshot.entryBody.blocks)
    } else if (snapshot.sections) {
      // Import from older legacy section structures if needed
      setBlocks(snapshot.sections.map((s: any) => ({
        id: `sec-${s.id || Date.now()}`,
        type: 'HEADING',
        content: s.heading
      })))
    }
  }

  // In-memory debounced watcher to push states to the local undo/redo history stack
  useEffect(() => {
    const timer = setTimeout(() => {
      const snap = {
        entryTitle,
        entrySlug,
        summary,
        verificationLevel,
        status,
        examLevelTags,
        authorityPrimary,
        authorityPrimaryUrl,
        authoritySecondary,
        isFeatured,
        seoTitle,
        seoDescription,
        standardCode,
        standardFramework,
        standardStatus,
        issuingBody,
        dateIssued,
        dateEffective,
        applicabilitySummary,
        videos,
        references,
        blocks
      }
      setHistoryState(prev => {
        const nextHist = prev.list.slice(0, prev.pointer + 1)
        const last = nextHist[nextHist.length - 1]
        if (last && JSON.stringify(last) === JSON.stringify(snap)) {
          return prev
        }
        const updated = [...nextHist, snap]
        if (updated.length > 50) {
          updated.shift()
        }
        return {
          list: updated,
          pointer: updated.length - 1
        }
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [
    entryTitle,
    entrySlug,
    summary,
    verificationLevel,
    status,
    examLevelTags,
    authorityPrimary,
    authorityPrimaryUrl,
    authoritySecondary,
    isFeatured,
    seoTitle,
    seoDescription,
    standardCode,
    standardFramework,
    standardStatus,
    issuingBody,
    dateIssued,
    dateEffective,
    applicabilitySummary,
    videos,
    references,
    blocks
  ])

  const restoreFormStateSnapshot = (snap: any) => {
    if (!snap) return
    setEntryTitle(snap.entryTitle || '')
    setEntrySlug(snap.entrySlug || '')
    setSummary(snap.summary || '')
    setVerificationLevel(snap.verificationLevel || 'DRAFT')
    setStatus(snap.status || 'DRAFT')
    setExamLevelTags(snap.examLevelTags || '')
    setAuthorityPrimary(snap.authorityPrimary || '')
    setAuthorityPrimaryUrl(snap.authorityPrimaryUrl || '')
    setAuthoritySecondary(snap.authoritySecondary || '')
    setIsFeatured(!!snap.isFeatured)
    setSeoTitle(snap.seoTitle || '')
    setSeoDescription(snap.seoDescription || '')
    setStandardCode(snap.standardCode || '')
    setStandardFramework(snap.standardFramework || 'AS')
    setStandardStatus(snap.standardStatus || 'ACTIVE')
    setIssuingBody(snap.issuingBody || 'ICAI')
    setDateIssued(snap.dateIssued || '')
    setDateEffective(snap.dateEffective || '')
    setApplicabilitySummary(snap.applicabilitySummary || '')
    setVideos(snap.videos || [])
    setReferences(snap.references || [])
    setBlocks(snap.blocks || [])
  }

  const handleUndo = () => {
    if (historyState.pointer > 0) {
      const newPointer = historyState.pointer - 1
      setHistoryState(prev => ({ ...prev, pointer: newPointer }))
      restoreFormStateSnapshot(historyState.list[newPointer])
    }
  }

  const handleRedo = () => {
    if (historyState.pointer < historyState.list.length - 1) {
      const newPointer = historyState.pointer + 1
      setHistoryState(prev => ({ ...prev, pointer: newPointer }))
      restoreFormStateSnapshot(historyState.list[newPointer])
    }
  }

  const canUndo = historyState.pointer > 0
  const canRedo = historyState.pointer < historyState.list.length - 1

  // Coordination hooks for GlobalAdminTopBar
  const submitRef = useRef<any>()
  submitRef.current = {
    handleSubmitInner,
    handleUndo,
    handleRedo,
    setActiveTab
  }

  // Listen to actions from the global control bar
  useEffect(() => {
    const handleSaveDraft = () => submitRef.current.handleSubmitInner(false)
    const handlePublish = () => submitRef.current.handleSubmitInner(true)
    const handlePreview = () => submitRef.current.handleSubmitInner(false, true)
    const handleUndoAction = () => submitRef.current.handleUndo()
    const handleRedoAction = () => submitRef.current.handleRedo()
    const handleHistoryAction = () => submitRef.current.setActiveTab('history')

    window.addEventListener('cms-save-draft', handleSaveDraft)
    window.addEventListener('cms-publish', handlePublish)
    window.addEventListener('cms-preview', handlePreview)
    window.addEventListener('cms-undo', handleUndoAction)
    window.addEventListener('cms-redo', handleRedoAction)
    window.addEventListener('cms-history', handleHistoryAction)

    return () => {
      window.removeEventListener('cms-save-draft', handleSaveDraft)
      window.removeEventListener('cms-publish', handlePublish)
      window.removeEventListener('cms-preview', handlePreview)
      window.removeEventListener('cms-undo', handleUndoAction)
      window.removeEventListener('cms-redo', handleRedoAction)
      window.removeEventListener('cms-history', handleHistoryAction)
    }
  }, [])

  // Push latest editor states to the global top bar
  useEffect(() => {
    const dispatchState = () => {
      window.dispatchEvent(new CustomEvent('cms-editor-state', {
        detail: {
          title: id ? `Editing: ${entryTitle}` : 'New Entry',
          isEditing: true,
          isSaving,
          isPublishing,
          lastSaved,
          canUndo,
          canRedo,
          status,
          viewLiveHref: entrySlug ? `/standards/${standardFramework.toLowerCase() === 'as' ? 'as' : 'ind-as'}/${entrySlug}` : undefined
        }
      }))
    }
    dispatchState()
  }, [id, entryTitle, isSaving, isPublishing, lastSaved, canUndo, canRedo, status, entrySlug, standardFramework])

  // --- SUBMIT / SAVE ---
  async function handleSubmitInner(publishNow = false, isPreview = false) {
    if (!entryTitle.trim() || !entrySlug.trim() || !summary.trim()) {
      alert('Please fill out the Title, Slug, and Summary in the Identity tab.')
      setActiveTab('identity')
      return
    }

    const payload = {
      id,
      entryTitle,
      entrySlug,
      entryType,
      domainId: Number(domainId),
      subdomainId: Number(subdomainId),
      summary,
      verificationLevel,
      status: publishNow ? 'PUBLISHED' : status,
      examLevelTags: examLevelTags.split(',').map((x: string) => x.trim()).filter((x: string) => x),
      authorityPrimary,
      authorityPrimaryUrl,
      authoritySecondary,
      isFeatured,
      seoTitle: seoTitle || entryTitle,
      seoDescription: seoDescription || summary.substring(0, 155),
      resources: [
        ...videos.map(v => ({ ...v, resourceType: 'VIDEO' })),
        ...references
      ],
      entryBody: {
        blocks: blocks
      },
      standardCode,
      standardFramework,
      standardStatus,
      issuingBody,
      dateIssued,
      dateEffective,
      applicabilitySummary,
      definitions: initialEntry?.standardDetail?.definitions || [],
      disclosureGroups: initialEntry?.standardDetail?.disclosureGroups || [],
      comparisonRows: initialEntry?.standardDetail?.comparisonRows || [],
      objective: {
        text: blocks.find(b => b.type === 'PARAGRAPH' && b.id?.includes('obj'))?.content || initialEntry?.standardDetail?.objectiveText || '',
        sourcePara: initialEntry?.standardDetail?.objectiveSourcePara || 'Paragraph 1',
        commentary: initialEntry?.standardDetail?.objectiveCommentary || '',
        keyIssues: initialEntry?.standardDetail?.objectiveKeyIssues || []
      },
      scope: {
        statement: blocks.find(b => b.type === 'PARAGRAPH' && b.id?.includes('scope'))?.content || initialEntry?.standardDetail?.scopeStatement || '',
        included: initialEntry?.standardDetail?.scopeIncluded || [],
        excluded: initialEntry?.standardDetail?.scopeExcluded || []
      }
    }

    try {
      const res = await saveEntry(payload)
      if (res.success) {
        setLastSaved(new Date().toLocaleTimeString())
        if (isPreview) {
          if (entrySlug.startsWith('schedule-iii-')) {
            window.open(`/standards/schedule-iii`, '_blank')
          } else {
            window.open(`/standards/${standardFramework.toLowerCase() === 'as' ? 'as' : 'ind-as'}/${entrySlug}`, '_blank')
          }
        } else {
          router.push('/admin/entries')
          router.refresh()
        }
      } else {
        alert('Error saving: ' + (res.error || 'Server error'))
      }
    } catch (e: any) {
      alert('Submission failed: ' + e.message)
    }
  }

  // --- PDF & VIDEO FILE UPLOADS ---
  const handlePdfUpload = async (idx: number, file: File) => {
    if (!entrySlug) {
      alert('Please enter a Slug in the Identity tab first.')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('entrySlug', entrySlug)
    formData.append('type', 'pdf')

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        updateReference(idx, 'resourceUrl', data.url)
        updateReference(idx, 'resourceTitle', file.name)
        updateReference(idx, 'mediaFileId', data.mediaFileId)
      } else {
        alert('Upload failed: ' + data.error)
      }
    } catch (e) {
      alert('Upload failed.')
    }
  }

  const handleVideoUpload = async (idx: number, file: File) => {
    if (!entrySlug) {
      alert('Please enter a Slug in the Identity tab first.')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('entrySlug', entrySlug)
    formData.append('type', 'video')

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        updateVideo(idx, 'resourceUrl', data.url)
        updateVideo(idx, 'resourceTitle', file.name)
        updateVideo(idx, 'mediaFileId', data.mediaFileId)
      } else {
        alert('Upload failed: ' + data.error)
      }
    } catch (e) {
      alert('Upload failed.')
    }
  }

  // Helper additions for state lists
  const addVideo = () => setVideos([...videos, { resourceTitle: '', resourceUrl: '', videoChannel: '', sourceType: 'EXTERNAL' }])
  const updateVideo = (idx: number, field: string, val: any) => {
    const next = [...videos]
    next[idx][field] = val
    setVideos(next)
  }
  const removeVideo = (idx: number) => setVideos(videos.filter((_, i) => i !== idx))

  const addReference = (type: 'PDF' | 'REFERENCE') => setReferences([...references, { resourceType: type, resourceTitle: '', resourceUrl: '', sourceType: 'ICAI_OFFICIAL' }])
  const updateReference = (idx: number, field: string, val: any) => {
    const next = [...references]
    next[idx][field] = val
    setReferences(next)
  }
  const removeReference = (idx: number) => setReferences(references.filter((_, i) => i !== idx))

  // Render citation button helper
  const renderTextWithReferences = (text: string) => {
    if (!text) return ''
    const regex = /\[(?:Source:\s*ICAI\s*AS\s*1\s*PDF\s*Page\s*|Page\s*|ICAI\s*Ref:\s*Page\s*4\.|PDF\s*|Official\s*|Ref\s*|Citation\s*:\s*|Official\s*Ref\s*:\s*Page\s*|MCA\s*Ref\s*:\s*Page\s*|ICAI\s*Ref\s*:\s*Page\s*)(\d+)(?:\s*[^\]]*)?\]/gi
    const parts = []
    let lastIndex = 0
    let match
    
    const formatInlineTags = (str: string) => {
      let html = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
      html = html.replace(/_(.*?)_/g, '<em>$1</em>')
      html = html.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
      html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      html = html.replace(/\[highlight\](.*?)\[\/highlight\]/g, '<mark class="bg-amber-100 dark:bg-amber-900/40 text-inherit px-1.5 py-0.5 rounded font-bold">$1</mark>')
      return html
    }

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index
      const pageNum = parseInt(match[1], 10)
      if (matchIndex > lastIndex) {
        const txt = text.substring(lastIndex, matchIndex)
        parts.push(<span key={`txt-${matchIndex}`} dangerouslySetInnerHTML={{ __html: formatInlineTags(txt) }} />)
      }
      parts.push(
        <span key={matchIndex} className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded text-[9px] font-bold">
          <FileText size={8} /> Page {pageNum}
        </span>
      )
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) {
      const txt = text.substring(lastIndex)
      parts.push(<span key={`txt-end`} dangerouslySetInnerHTML={{ __html: formatInlineTags(txt) }} />)
    }
    return parts.length > 0 ? parts : text
  }

  // Pre-publish checklist
  const checks = [
    { name: 'Standard Code is defined', passed: standardCode.trim().length > 0 },
    { name: 'Title is complete', passed: entryTitle.trim().length > 0 },
    { name: 'Slug is defined', passed: entrySlug.trim().length > 0 },
    { name: 'Summary is completed (min 20 chars)', passed: summary.trim().length >= 20 },
    { name: 'Primary source citation present', passed: authorityPrimary.trim().length > 0 },
  ]
  const allChecksPassed = checks.every(c => c.passed)

  return (
    <div className="w-full flex flex-col h-[calc(100vh-105px)] overflow-hidden font-sans bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl shadow-xs">
      {/* Side-by-Side Split Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Notion-style Form Editor */}
        <div className="w-1/2 flex flex-col border-r border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#111726] overflow-y-auto">
          {/* Visual Tabs Header */}
          <div className="flex border-b border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0D121F]">
            {(['identity', 'content', 'resources', 'history', 'publish'] as const).map((tab) => {
              const active = activeTab === tab
              const Icon = {
                identity: Info,
                content: Book,
                resources: Video,
                history: History,
                publish: CheckCircle
              }[tab]

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 -mb-px transition-all uppercase tracking-wider ${
                    active
                      ? 'border-[#2D5BE3] text-[#2D5BE3] bg-white dark:bg-[#111726]'
                      : 'border-transparent text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                  }`}
                >
                  <Icon size={12} />
                  <span>{tab}</span>
                </button>
              )
            })}
          </div>

          <div className="p-6 space-y-6 flex-1">
            {/* TAB 1: IDENTITY METADATA */}
            {activeTab === 'identity' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Standard Code</label>
                    <input
                      type="text"
                      value={standardCode}
                      onChange={(e) => setStandardCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                      placeholder="e.g. AS 1"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Framework</label>
                    <select
                      value={standardFramework}
                      onChange={(e) => setStandardFramework(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    >
                      <option value="AS">Accounting Standards (AS)</option>
                      <option value="IND_AS">Indian Accounting Standards (Ind AS)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Entry Title</label>
                    <input
                      type="text"
                      value={entryTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                      placeholder="e.g. Disclosure of Accounting Policies"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Slug URL</label>
                    <input
                      type="text"
                      value={entrySlug}
                      onChange={(e) => setEntrySlug(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs font-mono"
                      placeholder="e.g. as-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Domain</label>
                    <select
                      value={domainId}
                      onChange={(e) => setDomainId(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    >
                      {domains.map(d => (
                        <option key={d.id} value={d.id}>{d.domainCode} - {d.domainName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Subdomain</label>
                    <select
                      value={subdomainId}
                      onChange={(e) => setSubdomainId(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    >
                      {subdomains.map((s: any) => (
                        <option key={s.id} value={s.id}>{s.subdomainName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Status Badge</label>
                    <select
                      value={standardStatus}
                      onChange={(e) => setStandardStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="WITHDRAWN">Withdrawn</option>
                      <option value="REVISED">Revised</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Applicability Summary</label>
                  <textarea
                    value={applicabilitySummary}
                    onChange={(e) => setApplicabilitySummary(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    placeholder="Describe standard scope limits or applicability guidelines..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Summary Outline (Hover Preview / Meta)</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    placeholder="Short meta description or summary outline..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Primary Source Title</label>
                    <input
                      type="text"
                      value={authorityPrimary}
                      onChange={(e) => setAuthorityPrimary(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                      placeholder="e.g. ICAI AS 1 Official Publication"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Primary Source URL</label>
                    <input
                      type="url"
                      value={authorityPrimaryUrl}
                      onChange={(e) => setAuthorityPrimaryUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Issuing Body</label>
                    <input
                      type="text"
                      value={issuingBody}
                      onChange={(e) => setIssuingBody(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Date Issued</label>
                    <input
                      type="date"
                      value={dateIssued}
                      onChange={(e) => setDateIssued(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Date Effective</label>
                    <input
                      type="date"
                      value={dateEffective}
                      onChange={(e) => setDateEffective(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-gray-800 pt-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                      placeholder="Defaults to title"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">SEO Description</label>
                    <input
                      type="text"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                      placeholder="Defaults to summary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VISUAL BLOCK EDITOR */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Curriculum Visual Blocks</h3>
                  <div className="flex flex-wrap gap-1">
                    {(['HEADING', 'SUB_HEADING', 'PARAGRAPH', 'IMAGE', 'NOTE', 'EXAM_TRAP', 'PRACTICAL_USE', 'CASE_LAW', 'ILLUSTRATION', 'TABLE', 'FAQ', 'PDF_REFERENCE', 'VIDEO', 'DOWNLOAD_SECTION'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => addBlock(type)}
                        className="text-[9px] bg-slate-100 hover:bg-[#EEF2FD] hover:text-[#2D5BE3] dark:bg-gray-800 dark:hover:bg-gray-700 px-2 py-1 rounded font-bold transition-all"
                      >
                        + {type.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {blocks.map((block, idx) => {
                    const blockTypeColor = {
                      HEADING: 'border-l-4 border-slate-900 dark:border-white',
                      SUB_HEADING: 'border-l-4 border-slate-400',
                      PARAGRAPH: 'border-l-4 border-emerald-400',
                      IMAGE: 'border-l-4 border-teal-400 bg-teal-50/20',
                      NOTE: 'border-l-4 border-amber-400 bg-amber-50/20',
                      EXAM_TRAP: 'border-l-4 border-red-400 bg-red-50/20',
                      PRACTICAL_USE: 'border-l-4 border-green-400 bg-green-50/20',
                      CASE_LAW: 'border-l-4 border-blue-400 bg-blue-50/20',
                      ILLUSTRATION: 'border-l-4 border-purple-400 bg-purple-50/20',
                      TABLE: 'border-l-4 border-pink-400 bg-pink-50/20',
                      FAQ: 'border-l-4 border-violet-400 bg-violet-50/20',
                      PDF_REFERENCE: 'border-l-4 border-rose-450 bg-rose-50/20',
                      VIDEO: 'border-l-4 border-indigo-400 bg-indigo-50/20',
                      DOWNLOAD_SECTION: 'border-l-4 border-red-500 bg-red-50/30'
                    }[block.type as string] || 'border-l-4 border-gray-300'

                    return (
                      <div
                        key={block.id || idx}
                        className={`p-4 border border-slate-200 dark:border-gray-800 rounded-xl relative space-y-3 transition-all ${blockTypeColor} ${block.hidden ? 'opacity-40' : ''}`}
                      >
                        {/* Block Control Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800/50 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase bg-slate-200 dark:bg-gray-850 px-2 py-0.5 rounded text-slate-800 dark:text-gray-300">
                              {block.type}
                            </span>
                            {block.hidden && <span className="text-[8px] font-bold text-red-500 dark:text-red-400 uppercase tracking-widest">Hidden</span>}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => moveBlockUp(idx)}
                              disabled={idx === 0}
                              className="p-1 text-slate-500 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-gray-800 rounded transition-all"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveBlockDown(idx)}
                              disabled={idx === blocks.length - 1}
                              className="p-1 text-slate-500 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-gray-800 rounded transition-all"
                            >
                              <ArrowDown size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => duplicateBlock(idx)}
                              className="p-1 text-slate-500 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-gray-800 rounded transition-all"
                              title="Duplicate Block"
                            >
                              <Copy size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBlockHidden(idx)}
                              className="p-1 text-slate-500 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-gray-800 rounded transition-all"
                              title="Toggle Visibility"
                            >
                              {block.hidden ? <EyeOff size={11} /> : <Eye size={11} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeBlock(idx)}
                              className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-all"
                              title="Delete Block"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>

                        {/* Block Type Fields */}
                        {(block.type === 'HEADING' || block.type === 'SUB_HEADING' || block.type === 'PARAGRAPH') && (
                          <div className="space-y-1 w-full">
                            <div className="flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-100 dark:border-gray-800 w-fit select-none">
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'bold')}
                                className="px-1.5 py-0.5 text-[10px] font-bold bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#1C1C1E] dark:text-white"
                                title="Bold: **text**"
                              >
                                B
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'italic')}
                                className="px-1.5 py-0.5 text-[10px] italic bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#1C1C1E] dark:text-white font-serif"
                                title="Italic: *text*"
                              >
                                I
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'underline')}
                                className="px-1.5 py-0.5 text-[10px] underline bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#1C1C1E] dark:text-white"
                                title="Underline: [u]text[/u]"
                              >
                                U
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'highlight')}
                                className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-900 border border-amber-250 rounded-sm hover:bg-amber-200 font-bold"
                                title="Highlight: [highlight]text[/highlight]"
                              >
                                Highlight
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'color')}
                                className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#2D5BE3] font-semibold"
                                title="Color: [color=hex]text[/color]"
                              >
                                Color
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'size')}
                                className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-slate-700 dark:text-gray-300 font-semibold"
                                title="Size: [size=lg]text[/size]"
                              >
                                Size
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'content', 'page')}
                                className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-slate-650 dark:text-gray-300 font-semibold"
                                title="Page link: [Page X]"
                              >
                                Page Link
                              </button>
                            </div>
                            <textarea
                              id={`textarea-block-${idx}-content`}
                              value={block.content || ''}
                              onChange={(e) => updateBlock(idx, 'content', e.target.value)}
                              className="w-full p-2 bg-transparent text-xs outline-hidden border-b border-slate-100 dark:border-gray-800 focus:border-blue-500 font-mono"
                              placeholder="Enter text content here... supports [Page X] references"
                              rows={block.type === 'PARAGRAPH' ? 3 : 1}
                            />
                          </div>
                        )}

                        {(block.type === 'NOTE' || block.type === 'EXAM_TRAP' || block.type === 'PRACTICAL_USE') && (
                          <div className="space-y-2 w-full">
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) => updateBlock(idx, 'title', e.target.value)}
                              className="w-full p-1 bg-transparent text-xs font-bold border-b border-slate-100 dark:border-gray-800 focus:border-blue-500"
                              placeholder="Optional Headline"
                            />
                            <div className="flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-100 dark:border-gray-800 w-fit select-none">
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'bold')}
                                className="px-1.5 py-0.5 text-[10px] font-bold bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#1C1C1E] dark:text-white"
                                title="Bold: **text**"
                              >
                                B
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'italic')}
                                className="px-1.5 py-0.5 text-[10px] italic bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#1C1C1E] dark:text-white font-serif"
                                title="Italic: *text*"
                              >
                                I
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'underline')}
                                className="px-1.5 py-0.5 text-[10px] underline bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#1C1C1E] dark:text-white"
                                title="Underline: [u]text[/u]"
                              >
                                U
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'highlight')}
                                className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-900 border border-amber-250 rounded-sm hover:bg-amber-200 font-bold"
                                title="Highlight: [highlight]text[/highlight]"
                              >
                                Highlight
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'color')}
                                className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-[#2D5BE3] font-semibold"
                                title="Color: [color=hex]text[/color]"
                              >
                                Color
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'size')}
                                className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-slate-700 dark:text-gray-300 font-semibold"
                                title="Size: [size=lg]text[/size]"
                              >
                                Size
                              </button>
                              <button
                                type="button"
                                onClick={() => insertFormattingTag(idx, 'body', 'page')}
                                className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-sm hover:bg-slate-100 text-slate-650 dark:text-gray-300 font-semibold"
                                title="Page link: [Page X]"
                              >
                                Page Link
                              </button>
                            </div>
                            <textarea
                              id={`textarea-block-${idx}-body`}
                              value={block.body || ''}
                              onChange={(e) => updateBlock(idx, 'body', e.target.value)}
                              className="w-full p-2 bg-transparent text-xs border-b border-slate-100 dark:border-gray-800 focus:border-blue-500 font-mono"
                              placeholder="Enter message body..."
                              rows={2}
                            />
                          </div>
                        )}

                        {block.type === 'IMAGE' && (
                          <div className="space-y-2 w-full">
                            <input
                              type="text"
                              value={block.url || ''}
                              onChange={(e) => updateBlock(idx, 'url', e.target.value)}
                              className="w-full p-1.5 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs"
                              placeholder="Image URL (e.g. /images/example.png or external link)"
                            />
                            <input
                              type="text"
                              value={block.caption || ''}
                              onChange={(e) => updateBlock(idx, 'caption', e.target.value)}
                              className="w-full p-1.5 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg text-xs italic"
                              placeholder="Optional Caption / Description"
                            />
                          </div>
                        )}

                        {block.type === 'CASE_LAW' && (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => updateBlock(idx, 'title', e.target.value)}
                                className="w-full p-1 bg-transparent text-xs font-bold border-b border-slate-100 dark:border-gray-800 focus:border-blue-500"
                                placeholder="Case Name / Title"
                              />
                              <input
                                type="text"
                                value={block.citation || ''}
                                onChange={(e) => updateBlock(idx, 'citation', e.target.value)}
                                className="w-full p-1 bg-transparent text-xs border-b border-slate-100 dark:border-gray-800 focus:border-blue-500"
                                placeholder="Citation (e.g. 2024 SC 12)"
                              />
                            </div>
                            <textarea
                              value={block.verdict || ''}
                              onChange={(e) => updateBlock(idx, 'verdict', e.target.value)}
                              className="w-full p-2 bg-transparent text-xs border-b border-slate-100 dark:border-gray-800 focus:border-blue-500"
                              placeholder="Verdict / Court Outcome..."
                              rows={2}
                            />
                          </div>
                        )}

                        {(block.type === 'EXAMPLE' || block.type === 'ILLUSTRATION') && (
                          <div className="space-y-2 bg-[#FAFAF8] dark:bg-[#0D121F] p-3 rounded-lg">
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) => updateBlock(idx, 'title', e.target.value)}
                              className="w-full p-1 bg-transparent text-xs font-bold border-b border-slate-200 dark:border-gray-800 focus:border-blue-500"
                              placeholder="Illustration Title"
                            />
                            <textarea
                              value={block.scenario || ''}
                              onChange={(e) => updateBlock(idx, 'scenario', e.target.value)}
                              className="w-full p-1.5 bg-white dark:bg-gray-850 text-xs border border-slate-200 dark:border-gray-850 rounded"
                              placeholder="Transaction scenario question..."
                              rows={2}
                            />
                            <textarea
                              value={block.working || ''}
                              onChange={(e) => updateBlock(idx, 'working', e.target.value)}
                              className="w-full p-1.5 bg-white dark:bg-gray-850 text-xs border border-slate-200 dark:border-gray-850 rounded"
                              placeholder="Show step-by-step working notes..."
                              rows={2}
                            />
                            <textarea
                              value={block.answer || ''}
                              onChange={(e) => updateBlock(idx, 'answer', e.target.value)}
                              className="w-full p-1.5 bg-white dark:bg-gray-850 text-xs border border-slate-200 dark:border-gray-850 rounded"
                              placeholder="Final guidance / conclusion outcome..."
                              rows={2}
                            />
                          </div>
                        )}

                        {block.type === 'FAQ' && (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <select
                                value={block.faqCategory || 'GENERAL'}
                                onChange={(e) => updateBlock(idx, 'faqCategory', e.target.value)}
                                className="w-full px-2 py-1 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-800 rounded text-[11px]"
                              >
                                <option value="GENERAL">General Guidance</option>
                                <option value="APPLICABILITY">Applicability & Limits</option>
                                <option value="RECOGNITION">Recognition rules</option>
                                <option value="MEASUREMENT">Measurement bases</option>
                              </select>
                              <input
                                type="text"
                                value={block.sourceRef || ''}
                                onChange={(e) => updateBlock(idx, 'sourceRef', e.target.value)}
                                className="w-full px-2 py-1 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-800 rounded text-[11px]"
                                placeholder="Source Clause (e.g. Para 12)"
                              />
                            </div>
                            <input
                              type="text"
                              value={block.question || ''}
                              onChange={(e) => updateBlock(idx, 'question', e.target.value)}
                              className="w-full p-1.5 bg-white dark:bg-gray-850 text-xs border border-slate-200 dark:border-gray-800 rounded font-bold"
                              placeholder="FAQ Question"
                            />
                            <textarea
                              value={block.answer || ''}
                              onChange={(e) => updateBlock(idx, 'answer', e.target.value)}
                              className="w-full p-1.5 bg-white dark:bg-gray-850 text-xs border border-slate-200 dark:border-gray-800 rounded"
                              placeholder="FAQ Answer"
                              rows={2}
                            />
                          </div>
                        )}

                        {block.type === 'TABLE' && (
                          <div className="space-y-2 overflow-x-auto">
                            <table className="w-full border-collapse text-left text-[11px]">
                              <thead>
                                <tr className="bg-slate-100 dark:bg-gray-800">
                                  {block.headers.map((h: string, hIdx: number) => (
                                    <th key={hIdx} className="p-1 border border-slate-200 dark:border-gray-700">
                                      <input
                                        type="text"
                                        value={h}
                                        onChange={(e) => {
                                          const nextHeaders = [...block.headers]
                                          nextHeaders[hIdx] = e.target.value
                                          updateBlock(idx, 'headers', nextHeaders)
                                        }}
                                        className="bg-transparent font-bold w-full focus:outline-hidden"
                                      />
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {block.rows.map((row: string[], rIdx: number) => (
                                  <tr key={rIdx}>
                                    {row.map((cell: string, cIdx: number) => (
                                      <td key={cIdx} className="p-1 border border-slate-200 dark:border-gray-700">
                                        <input
                                          type="text"
                                          value={cell}
                                          onChange={(e) => {
                                            const nextRows = [...block.rows]
                                            nextRows[rIdx][cIdx] = e.target.value
                                            updateBlock(idx, 'rows', nextRows)
                                          }}
                                          className="bg-transparent w-full focus:outline-hidden"
                                        />
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const nextRows = [...block.rows, Array(block.headers.length).fill('')]
                                  updateBlock(idx, 'rows', nextRows)
                                }}
                                className="text-[10px] bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 px-2 py-0.5 rounded font-semibold"
                              >
                                + Add Row
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (block.rows.length > 1) {
                                    updateBlock(idx, 'rows', block.rows.slice(0, -1))
                                  }
                                }}
                                className="text-[10px] bg-slate-100 dark:bg-gray-800 hover:bg-red-50 text-red-600 px-2 py-0.5 rounded font-semibold"
                              >
                                - Remove Row
                              </button>
                            </div>
                          </div>
                        )}

                        {(block.type === 'PDF_REFERENCE' || block.type === 'VIDEO' || block.type === 'DOWNLOAD_SECTION') && (
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) => updateBlock(idx, 'title', e.target.value)}
                              className="w-full p-1 bg-transparent text-xs font-bold border-b border-slate-100 dark:border-gray-800 focus:border-blue-500"
                              placeholder="Display Title / Action Name"
                            />
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="text"
                                value={block.url || ''}
                                onChange={(e) => updateBlock(idx, 'url', e.target.value)}
                                className="flex-1 px-2 py-1 bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded text-[11px]"
                                placeholder="Download Link / URL"
                              />
                              {block.type === 'PDF_REFERENCE' && (
                                <label className="bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] px-2 py-1 border border-[#FFE2E2] rounded text-[10px] font-bold cursor-pointer whitespace-nowrap">
                                  Upload
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handlePdfUpload(idx, file)
                                    }}
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: UPLOADS & ATTACHMENTS */}
            {activeTab === 'resources' && (
              <div className="space-y-5">
                <div className="bg-slate-50/50 dark:bg-slate-900/30 p-5 border border-slate-200 dark:border-gray-800 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">Class Video Lectures</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">MP4 upload or YouTube/Vimeo links</p>
                    </div>
                    <button
                      type="button"
                      onClick={addVideo}
                      className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-3 py-1.5 rounded-lg font-bold border border-blue-200/50"
                    >
                      + Add Video
                    </button>
                  </div>

                  {videos.map((vid, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 p-4 rounded-lg space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeVideo(idx)}
                        className="absolute right-2 top-2 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={12} />
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={vid.resourceTitle || ''}
                          onChange={(e) => updateVideo(idx, 'resourceTitle', e.target.value)}
                          placeholder="Lecture Video Title"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-gray-850 border border-slate-200 dark:border-gray-700 rounded text-xs"
                        />
                        <input
                          type="text"
                          value={vid.videoChannel || ''}
                          onChange={(e) => updateVideo(idx, 'videoChannel', e.target.value)}
                          placeholder="Instructor / Author"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-gray-850 border border-slate-200 dark:border-gray-700 rounded text-xs"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={vid.resourceUrl || ''}
                          onChange={(e) => updateVideo(idx, 'resourceUrl', e.target.value)}
                          placeholder="YouTube Link or MP4 URL"
                          className="flex-1 px-2.5 py-1.5 bg-slate-50 dark:bg-gray-850 border border-slate-200 dark:border-gray-700 rounded text-xs font-mono"
                        />
                        <label className="bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-3 py-1.5 border border-blue-200 dark:border-blue-900/40 rounded text-[11px] font-bold cursor-pointer whitespace-nowrap">
                          Upload MP4
                          <input
                            type="file"
                            accept="video/mp4"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleVideoUpload(idx, file)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-900/30 p-5 border border-slate-200 dark:border-gray-800 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">Reference Publications & Links</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Attach official ICAI/MCA source PDFs</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => addReference('PDF')}
                        className="text-[10px] bg-red-50 hover:bg-red-100 text-[#C0392B] dark:bg-red-950/40 dark:text-red-400 px-3 py-1.5 rounded-lg font-bold border border-red-200/50"
                      >
                        + Add PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => addReference('REFERENCE')}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-gray-800 dark:hover:bg-gray-750 px-3 py-1.5 rounded-lg font-bold border border-slate-200 dark:border-gray-700"
                      >
                        + Add Reference Link
                      </button>
                    </div>
                  </div>

                  {references.map((ref, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 p-4 rounded-lg space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeReference(idx)}
                        className="absolute right-2 top-2 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={12} />
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={ref.resourceTitle || ''}
                          onChange={(e) => updateReference(idx, 'resourceTitle', e.target.value)}
                          placeholder="Document Title"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-gray-850 border border-slate-200 dark:border-gray-700 rounded text-xs font-semibold"
                        />
                        <select
                          value={ref.sourceType || 'ICAI_OFFICIAL'}
                          onChange={(e) => updateReference(idx, 'sourceType', e.target.value)}
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-gray-850 border border-slate-200 dark:border-gray-700 rounded text-xs"
                        >
                          <option value="ICAI_OFFICIAL">ICAI Official Publication</option>
                          <option value="MCA">MCA Government Portal</option>
                          <option value="EXTERNAL">External Commentary</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={ref.resourceUrl || ''}
                          onChange={(e) => updateReference(idx, 'resourceUrl', e.target.value)}
                          placeholder="Direct resource URL"
                          className="flex-1 px-2.5 py-1.5 bg-slate-50 dark:bg-gray-850 border border-slate-200 dark:border-gray-700 rounded text-xs font-mono"
                        />
                        {ref.resourceType === 'PDF' && (
                          <label className="bg-red-50 hover:bg-red-100 text-[#C0392B] dark:bg-red-950/40 dark:text-red-400 px-3 py-1.5 border border-red-200 dark:border-red-900/40 rounded text-[11px] font-bold cursor-pointer whitespace-nowrap">
                            Upload PDF
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handlePdfUpload(idx, file)
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: REVISIONS HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Database Revision Snapshots</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setRevisionHistory([])
                      ensureRevisionsLoaded()
                    }}
                    className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-250 dark:bg-gray-800 dark:hover:bg-gray-750 px-2.5 py-1.5 rounded transition-all"
                  >
                    <RefreshCw size={10} /> Reload Revisions
                  </button>
                </div>

                {revisionHistory.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8">No revision history found yet. Revisions are created when saving draft or publishing.</p>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-gray-850 border border-slate-200 dark:border-gray-850 rounded-xl bg-slate-50/20 dark:bg-slate-900/10 overflow-hidden">
                    {revisionHistory.map((rev, index) => (
                      <div key={rev.id} className="p-4 flex items-center justify-between hover:bg-white dark:hover:bg-[#111726]/40 transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-[#2D5BE3]">Version {rev.version}</span>
                            <span className={`text-[8.5px] font-bold uppercase px-2 py-0.5 rounded-full ${rev.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-slate-200 text-slate-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                              {rev.action}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 font-mono">{new Date(rev.createdAt).toLocaleString()} · {rev.userEmail || 'System'}</p>
                          {rev.description && <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-semibold italic">{"\""}{rev.description}{"\""}</p>}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setComparingRevision(rev)}
                            className="text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1.5 rounded font-bold"
                          >
                            Compare
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to revert all values to version ${rev.version}?`)) {
                                applySnapshot(rev.snapshot)
                              }
                            }}
                            className="text-[10px] bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] px-2.5 py-1.5 rounded font-bold"
                          >
                            Rollback
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PUBLISH CHECKLIST */}
            {activeTab === 'publish' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">Pre-Publication Validation</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Ensure metadata constraints match compliance before publishing</p>
                </div>

                <div className="space-y-2.5">
                  {checks.map((check, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-lg">
                      <span className="text-xs font-semibold text-slate-700 dark:text-gray-300">{check.name}</span>
                      {check.passed ? (
                        <span className="bg-[#E8F7EE] text-[#1A7A4A] px-2.5 py-0.5 rounded text-[10px] font-bold">✓ PASSED</span>
                      ) : (
                        <span className="bg-[#FEF6E4] text-[#B45309] px-2.5 py-0.5 rounded text-[10px] font-bold">Advisory Pending</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => handleSubmitInner(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmitInner(true)}
                    disabled={!allChecksPassed}
                    className="bg-[#1A7A4A] hover:bg-[#15613B] text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm & Publish <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Live Interactive Portal Preview */}
        <div className="w-1/2 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-y-auto p-6">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-between">
            <span>Real-time Interactive Live Preview</span>
            <span className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              ● Sync Active
            </span>
          </div>

          <div className="border border-[#E2E1DD] dark:border-gray-800 rounded-2xl bg-white dark:bg-[#111726] overflow-hidden shadow-lg flex-1 flex flex-col">
            {/* Mock Header from public standard portal */}
            <div className="p-6 border-b border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0D121F]/80 flex justify-between items-start shrink-0">
              <div className="space-y-1 max-w-sm">
                <span className="text-[9px] bg-slate-200 dark:bg-gray-800 px-2 py-0.5 rounded font-extrabold uppercase text-[#2D5BE3]">{standardFramework} Framework</span>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {standardCode || 'STANDARD CODE'} — {entryTitle || 'Standard Document Title'}
                </h2>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{applicabilitySummary || 'Scope of applicability rules...'}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${standardStatus === 'ACTIVE' ? 'bg-[#E8F7EE] text-[#1A7A4A]' : 'bg-red-100 text-red-800'}`}>
                  {standardStatus}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Issued: {dateIssued || 'N/A'}</span>
              </div>
            </div>

            {/* Preview Navigation Tabs */}
            <div className="flex border-b border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#111726] shrink-0">
              {(['standard', 'examples', 'lecture', 'pdf'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPreviewTab(tab)}
                  className={`flex-1 py-3 text-center text-xs font-extrabold uppercase tracking-wide border-b-2 -mb-px transition-all ${
                    previewTab === tab
                      ? 'border-[#2D5BE3] text-[#2D5BE3]'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents Preview rendering identical to user layout */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {previewTab === 'standard' && (
                <div className="space-y-4">
                  {blocks.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs font-semibold">No visual blocks created yet. Go to Content tab to assemble curriculum blocks.</div>
                  ) : (
                    blocks.map((block, blockIdx) => {
                      if (block.hidden) return null
                      switch (block.type) {
                        case 'HEADING':
                          return (
                            <h3 key={blockIdx} className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-5 first:mt-0 border-b border-slate-100 dark:border-gray-800 pb-2">
                              {renderTextWithReferences(block.content)}
                            </h3>
                          )
                        case 'SUB_HEADING':
                          return (
                            <h4 key={blockIdx} className="text-xs font-bold text-slate-900 dark:text-white mt-4 mb-2">
                              {renderTextWithReferences(block.content)}
                            </h4>
                          )
                        case 'PARAGRAPH':
                          return (
                            <p key={blockIdx} className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-semibold">
                              {renderTextWithReferences(block.content)}
                            </p>
                          )
                        case 'NOTE':
                        case 'EXAM_TRAP':
                        case 'PRACTICAL_USE': {
                          const bg = {
                            NOTE: 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300',
                            EXAM_TRAP: 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-300',
                            PRACTICAL_USE: 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-300'
                          }[block.type as string] || ''

                          return (
                            <div key={blockIdx} className={`p-4 rounded-xl border ${bg} space-y-1`}>
                              {block.title && <h5 className="text-xs font-extrabold uppercase tracking-wider">{block.title}</h5>}
                              <p className="text-xs leading-relaxed font-semibold whitespace-pre-line">{renderTextWithReferences(block.body)}</p>
                            </div>
                          )
                        }
                        case 'CASE_LAW':
                          return (
                            <div key={blockIdx} className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 dark:border-blue-900/30 dark:bg-blue-950/15 space-y-2">
                              <div className="flex justify-between items-center">
                                <h5 className="text-xs font-extrabold text-blue-900 dark:text-blue-300 uppercase tracking-wide">Case Law Reference</h5>
                                {block.citation && <span className="text-[10px] font-mono text-blue-500">{block.citation}</span>}
                              </div>
                              <p className="text-xs font-bold text-slate-800 dark:text-white">{block.title}</p>
                              <p className="text-xs italic text-slate-600 dark:text-gray-300 whitespace-pre-line">{"\""}{block.verdict}{"\""}</p>
                            </div>
                          )
                        case 'TABLE':
                          return (
                            <div key={blockIdx} className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-2xs">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 dark:bg-[#0D121F] border-b border-slate-200 dark:border-gray-800">
                                    {block.headers?.map((h: string, hIdx: number) => (
                                      <th key={hIdx} className="p-3 font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                                  {block.rows?.map((row: string[], rIdx: number) => (
                                    <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                                      {row.map((cell: string, cIdx: number) => (
                                        <td key={cIdx} className="p-3 text-slate-600 dark:text-gray-400 font-semibold">{renderTextWithReferences(cell)}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        case 'FAQ':
                          return (
                            <div key={blockIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 dark:border-gray-850 dark:bg-slate-900/10 space-y-2">
                              <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-slate-400">
                                <span>FAQ · {block.faqCategory}</span>
                                {block.sourceRef && <span>Ref: {block.sourceRef}</span>}
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white">Q: {block.question}</h5>
                              <p className="text-xs text-slate-600 dark:text-gray-300 whitespace-pre-line">A: {block.answer}</p>
                            </div>
                          )
                        case 'PDF_REFERENCE':
                          return (
                            <div key={blockIdx} className="p-3 border border-red-200 bg-red-50/20 dark:border-red-950/40 rounded-xl flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText size={14} className="text-[#C0392B]" />
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title || 'Official PDF Document'}</span>
                              </div>
                              {block.url && <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 font-bold hover:underline">View PDF</a>}
                            </div>
                          )
                        case 'VIDEO':
                          return (
                            <div key={blockIdx} className="p-3 border border-blue-200 bg-blue-50/20 dark:border-blue-950/40 rounded-xl flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Video size={14} className="text-[#2D5BE3]" />
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title || 'Video Lecture Reference'}</span>
                              </div>
                              {block.url && <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline">Watch Class</a>}
                            </div>
                          )
                        case 'DOWNLOAD_SECTION':
                          return (
                            <div key={blockIdx} className="p-4 rounded-xl border border-dashed border-red-300 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/10 flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <FileText size={16} className="text-red-500" />
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title || 'Download Study Material'}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => alert('PDF generation is simulated. Prints website content directly.')}
                                className="text-xs font-bold text-red-600 hover:underline"
                              >
                                Print Guide
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
                                  className="max-w-full rounded-xl border border-slate-200 dark:border-gray-800 shadow-xs max-h-[300px] object-contain"
                                />
                              )}
                              {block.caption && (
                                <p className="text-[10px] text-slate-500 italic text-center font-medium">
                                  {block.caption}
                                </p>
                              )}
                            </div>
                          )
                        default:
                          return null
                      }
                    })
                  )}
                </div>
              )}

              {previewTab === 'examples' && (
                <div className="space-y-4">
                  {blocks.filter(b => b.type === 'ILLUSTRATION' || b.type === 'EXAMPLE').length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs font-semibold">No illustrations created. Go to Content tab and add Illustration block type.</div>
                  ) : (
                    blocks.filter(b => b.type === 'ILLUSTRATION' || b.type === 'EXAMPLE').map((block, blockIdx) => (
                      <div key={blockIdx} className="bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-gray-800 pb-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{block.title || 'Example Illustration'}</h4>
                        </div>
                        {block.scenario && (
                          <div>
                            <span className="text-[9px] uppercase font-extrabold text-slate-400">Scenario / Issue</span>
                            <p className="text-xs text-slate-800 dark:text-gray-200 whitespace-pre-line font-semibold mt-0.5">{renderTextWithReferences(block.scenario)}</p>
                          </div>
                        )}
                        {block.working && (
                          <div className="p-3 bg-white dark:bg-gray-850 border border-slate-200 dark:border-gray-800 rounded">
                            <span className="text-[9px] uppercase font-extrabold text-slate-400">Working Details</span>
                            <p className="text-xs text-slate-600 dark:text-gray-400 whitespace-pre-line font-semibold mt-0.5">{renderTextWithReferences(block.working)}</p>
                          </div>
                        )}
                        {block.answer && (
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded">
                            <span className="text-[9px] uppercase font-extrabold text-[#1A7A4A]">Conclusion Treatment</span>
                            <p className="text-xs text-[#1A7A4A] dark:text-emerald-400 whitespace-pre-line font-semibold mt-0.5">{renderTextWithReferences(block.answer)}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {previewTab === 'lecture' && (
                <div className="space-y-4 text-center py-8">
                  {videos.length === 0 ? (
                    <div className="text-slate-400 text-xs">No lecture video resources linked. Go to Resources tab to attach a video.</div>
                  ) : (
                    videos.map((vid, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-[#0D121F] p-4 rounded-xl border border-slate-200 dark:border-gray-800 max-w-sm mx-auto space-y-2">
                        <Video className="mx-auto text-blue-500" size={32} />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{vid.resourceTitle || 'Lecture Class'}</h4>
                        <p className="text-[10px] text-slate-500">{vid.videoChannel || 'Instructor'}</p>
                        {vid.resourceUrl && (
                          <a
                            href={vid.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold"
                          >
                            Watch Video
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {previewTab === 'pdf' && (
                <div className="space-y-4 text-center py-8">
                  {references.filter(r => r.resourceType === 'PDF').length === 0 ? (
                    <div className="text-slate-400 text-xs">No PDF reference files uploaded. Go to Resources tab to upload standard document PDF.</div>
                  ) : (
                    references.filter(r => r.resourceType === 'PDF').map((ref, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-[#0D121F] p-4 rounded-xl border border-slate-200 dark:border-gray-800 max-w-sm mx-auto space-y-2">
                        <FileText className="mx-auto text-red-500" size={32} />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ref.resourceTitle || 'Official PDF Publication'}</h4>
                        <p className="text-[10px] text-slate-500">{ref.sourceType}</p>
                        {ref.resourceUrl && (
                          <a
                            href={ref.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-xs bg-red-650 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-semibold"
                          >
                            Download Source PDF
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-side Revision Comparison Modal overlay */}
      {comparingRevision && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6">
          <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 w-full max-w-5xl h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E2E1DD] dark:border-gray-800 flex justify-between items-center bg-[#FAFAF8] dark:bg-[#0D121F]">
              <div>
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">Side-by-Side Revision Comparison</h3>
                <p className="text-[10px] text-slate-500 font-mono">Comparing Current Workspace vs Version {comparingRevision.version} ({new Date(comparingRevision.createdAt).toLocaleString()})</p>
              </div>
              <button
                type="button"
                onClick={() => setComparingRevision(null)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Split Compare lists */}
            <div className="flex-1 flex overflow-hidden divide-x divide-slate-200 dark:divide-gray-850">
              {/* Left Column: Current Draft */}
              <div className="w-1/2 flex flex-col overflow-y-auto p-5 space-y-4">
                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded w-fit uppercase">Current Draft State</span>
                <div className="space-y-3">
                  {blocks.map((b, i) => (
                    <div key={i} className="p-3 bg-slate-50/50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-850 rounded-lg text-xs space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400">{b.type}</span>
                      <p className="font-semibold text-slate-800 dark:text-gray-200 leading-normal">{b.content || b.title || b.question || 'Block Content'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Historical Revision */}
              <div className="w-1/2 flex flex-col overflow-y-auto p-5 space-y-4">
                <span className="text-[10px] font-extrabold text-[#C0392B] bg-[#FFF0F0] dark:bg-red-950/45 px-3 py-1 rounded w-fit uppercase">Historical Version {comparingRevision.version}</span>
                <div className="space-y-3">
                  {(comparingRevision.snapshot?.entryBody?.blocks || []).map((b: any, i: number) => (
                    <div key={i} className="p-3 bg-slate-50/50 dark:bg-[#0D121F] border border-slate-200 dark:border-gray-850 rounded-lg text-xs space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400">{b.type}</span>
                      <p className="font-semibold text-slate-800 dark:text-gray-200 leading-normal">{b.content || b.title || b.question || 'Block Content'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Modal Footer actions */}
            <div className="p-4 border-t border-[#E2E1DD] dark:border-gray-800 flex justify-end gap-2 bg-[#FAFAF8] dark:bg-[#0D121F]">
              <button
                type="button"
                onClick={() => setComparingRevision(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg text-xs font-semibold"
              >
                Close Comparison
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Restore Version ${comparingRevision.version} snapshot now?`)) {
                    applySnapshot(comparingRevision.snapshot)
                    setComparingRevision(null)
                  }
                }}
                className="bg-[#1A7A4A] hover:bg-[#15613B] text-white px-4 py-2 rounded-lg text-xs font-semibold"
              >
                Restore This Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
