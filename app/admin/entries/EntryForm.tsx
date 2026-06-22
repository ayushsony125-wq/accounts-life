'use client'

import { useState, useTransition, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { saveEntry, getEntryRevisions, getRevisionSnapshot } from '../actions'
import {
  Info, Book, Image, Video, CheckCircle, ArrowRight, ArrowLeft, Plus,
  Trash2, HelpCircle, History, FileText, Link2, ExternalLink, X,
  ArrowUp, ArrowDown, Eye, EyeOff, Copy, RefreshCw, Columns, Maximize2, Sparkles, ChevronRight, Scale
} from 'lucide-react'
import GlobalActionBar from '../GlobalActionBar'

interface EntryFormProps {
  initialEntry?: any
  domains: any[]
}

// Helper functions for WYSIWYG editor translation
function cleanHtmlToMarkup(html: string): string {
  if (!html) return '';
  let str = html;
  str = str.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  str = str.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  str = str.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  str = str.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  str = str.replace(/<u[^>]*>(.*?)<\/u>/gi, '[u]$1[/u]');
  str = str.replace(/<mark[^>]*>(.*?)<\/mark>/gi, '[highlight]$1[/highlight]');
  
  str = str.replace(/<[^>]+>/g, '');
  
  str = str.replace(/&nbsp;/g, ' ')
           .replace(/&amp;/g, '&')
           .replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"');
  return str.trim();
}

function markupToHtml(str: string): string {
  if (!str) return '';
  let html = str;
  html = html.replace(/\[highlight\](.*?)\[\/highlight\]/gi, '<mark>$1</mark>');
  html = html.replace(/\[u\](.*?)\[\/u\]/gi, '<u>$1</u>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  return html;
}

function blocksToHtml(blocks: any[]): string {
  if (!blocks || blocks.length === 0) return '';
  return blocks
    .map((block) => {
      if (block.hidden) return '';
      switch (block.type) {
        case 'HEADING':
          return `<h2>${markupToHtml(block.content || '')}</h2>`;
        case 'SUB_HEADING':
          return `<h3>${markupToHtml(block.content || '')}</h3>`;
        case 'PARAGRAPH':
          return `<p>${markupToHtml(block.content || '')}</p>`;
        case 'NOTE':
          return `<div data-block-type="NOTE" data-title="${block.title || ''}" class="editor-note-block">
            ${block.title ? `<strong class="note-title">${markupToHtml(block.title)}</strong>` : ''}
            <div class="note-body">${markupToHtml(block.body || '')}</div>
          </div>`;
        case 'EXAM_TRAP':
          return `<div data-block-type="EXAM_TRAP" data-title="${block.title || ''}" class="editor-exam-trap">
            <span class="trap-label">⚠️ EXAM TRAP</span>
            ${block.title ? `<strong class="trap-title">${markupToHtml(block.title)}</strong>` : ''}
            <div class="trap-body">${markupToHtml(block.body || '')}</div>
          </div>`;
        case 'PRACTICAL_USE':
          return `<div data-block-type="PRACTICAL_USE" data-title="${block.title || ''}" class="editor-practical-use">
            <span class="practical-label">💡 PRACTICAL USE / REAL WORLD</span>
            ${block.title ? `<strong class="practical-title">${markupToHtml(block.title)}</strong>` : ''}
            <div class="practical-body">${markupToHtml(block.body || '')}</div>
          </div>`;
        case 'CASE_LAW':
          return `<div data-block-type="CASE_LAW" data-title="${block.title || ''}" data-citation="${block.citation || ''}" class="editor-case-law">
            <span class="case-label">⚖️ CASE LAW</span>
            <strong class="case-title">${markupToHtml(block.title || '')}</strong>
            ${block.citation ? `<span class="case-citation">Citation: ${markupToHtml(block.citation)}</span>` : ''}
            <div class="case-body">${markupToHtml(block.body || '')}</div>
          </div>`;
        case 'EXAMPLE':
        case 'ILLUSTRATION':
          return `<div data-block-type="ILLUSTRATION" data-title="${block.title || ''}" class="editor-illustration-block">
            <strong class="illus-title">📋 Example: ${markupToHtml(block.title || '')}</strong>
            <div class="illus-scenario"><strong>Scenario: </strong>${markupToHtml(block.scenario || '')}</div>
            ${block.working ? `<div class="illus-working"><strong>Working: </strong>${markupToHtml(block.working)}</div>` : ''}
            ${block.answer ? `<div class="illus-answer"><strong>Solution / Treatment: </strong>${markupToHtml(block.answer)}</div>` : ''}
          </div>`;
        case 'TABLE': {
          const headers = (block.headers || []).map((h: string) => `<th>${markupToHtml(h)}</th>`).join('');
          const rows = (block.rows || [])
            .map((row: string[]) => `<tr>${row.map((cell) => `<td>${markupToHtml(cell)}</td>`).join('')}</tr>`)
            .join('');
          return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
        }
        case 'FAQ':
          return `<div data-block-type="FAQ" data-question="${block.question || ''}" class="editor-faq-block">
            <strong class="faq-question">❓ Question: ${markupToHtml(block.question || '')}</strong>
            <div class="faq-answer"><strong>Answer: </strong>${markupToHtml(block.answer || '')}</div>
          </div>`;
        case 'IMAGE':
          return `<img src="${block.url || ''}" alt="${block.caption || ''}" class="editor-image-block" />`;
        default:
          return `<p>${markupToHtml(block.content || '')}</p>`;
      }
    })
    .join('\n');
}

function htmlToBlocks(html: string): any[] {
  if (typeof window === 'undefined') return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const blocks: any[] = [];
  
  const children = Array.from(doc.body.children);
  for (const el of children) {
    const tagName = el.tagName.toLowerCase();
    const blockType = el.getAttribute('data-block-type');
    
    if (blockType === 'NOTE') {
      const title = el.getAttribute('data-title') || '';
      const bodyEl = el.querySelector('.note-body');
      const body = cleanHtmlToMarkup(bodyEl ? bodyEl.innerHTML : el.innerHTML);
      blocks.push({ type: 'NOTE', title, body });
    } else if (blockType === 'EXAM_TRAP') {
      const title = el.getAttribute('data-title') || '';
      const bodyEl = el.querySelector('.trap-body');
      const body = cleanHtmlToMarkup(bodyEl ? bodyEl.innerHTML : el.innerHTML);
      blocks.push({ type: 'EXAM_TRAP', title, body });
    } else if (blockType === 'PRACTICAL_USE') {
      const title = el.getAttribute('data-title') || '';
      const bodyEl = el.querySelector('.practical-body');
      const body = cleanHtmlToMarkup(bodyEl ? bodyEl.innerHTML : el.innerHTML);
      blocks.push({ type: 'PRACTICAL_USE', title, body });
    } else if (blockType === 'CASE_LAW') {
      const title = el.getAttribute('data-title') || '';
      const citation = el.getAttribute('data-citation') || '';
      const bodyEl = el.querySelector('.case-body');
      const body = cleanHtmlToMarkup(bodyEl ? bodyEl.innerHTML : el.innerHTML);
      blocks.push({ type: 'CASE_LAW', title, citation, body });
    } else if (blockType === 'ILLUSTRATION' || blockType === 'EXAMPLE') {
      const title = el.getAttribute('data-title') || '';
      const scenarioEl = el.querySelector('.illus-scenario');
      let scenario = scenarioEl ? scenarioEl.innerHTML : '';
      if (scenario.startsWith('<strong>Scenario: </strong>')) {
        scenario = scenario.replace('<strong>Scenario: </strong>', '');
      }
      scenario = cleanHtmlToMarkup(scenario);
      
      const workingEl = el.querySelector('.illus-working');
      let working = workingEl ? workingEl.innerHTML : '';
      if (working.startsWith('<strong>Working: </strong>')) {
        working = working.replace('<strong>Working: </strong>', '');
      }
      working = cleanHtmlToMarkup(working);
      
      const answerEl = el.querySelector('.illus-answer');
      let answer = answerEl ? answerEl.innerHTML : '';
      if (answer.startsWith('<strong>Solution / Treatment: </strong>')) {
        answer = answer.replace('<strong>Solution / Treatment: </strong>', '');
      }
      answer = cleanHtmlToMarkup(answer);
      
      blocks.push({ type: 'ILLUSTRATION', title, scenario, working, answer });
    } else if (blockType === 'FAQ') {
      const question = el.getAttribute('data-question') || '';
      const answerEl = el.querySelector('.faq-answer');
      let answer = answerEl ? answerEl.innerHTML : '';
      if (answer.startsWith('<strong>Answer: </strong>')) {
        answer = answer.replace('<strong>Answer: </strong>', '');
      }
      answer = cleanHtmlToMarkup(answer);
      blocks.push({ type: 'FAQ', question, answer });
    } else if (tagName === 'table') {
      const headers: string[] = [];
      const rows: string[][] = [];
      
      const ths = el.querySelectorAll('th');
      ths.forEach(th => headers.push(cleanHtmlToMarkup(th.innerHTML)));
      
      const trs = el.querySelectorAll('tbody tr');
      trs.forEach(tr => {
        const row: string[] = [];
        const tds = tr.querySelectorAll('td');
        tds.forEach(td => row.push(cleanHtmlToMarkup(td.innerHTML)));
        rows.push(row);
      });
      
      blocks.push({ type: 'TABLE', headers, rows });
    } else if (tagName === 'h2') {
      blocks.push({ type: 'HEADING', content: cleanHtmlToMarkup(el.innerHTML) });
    } else if (tagName === 'h3' || tagName === 'h4') {
      blocks.push({ type: 'SUB_HEADING', content: cleanHtmlToMarkup(el.innerHTML) });
    } else if (tagName === 'img') {
      blocks.push({ type: 'IMAGE', url: (el as HTMLImageElement).src || '', caption: (el as HTMLImageElement).alt || '' });
    } else {
      const text = cleanHtmlToMarkup(el.innerHTML);
      if (text) {
        blocks.push({ type: 'PARAGRAPH', content: text });
      }
    }
  }
  return blocks;
}

export default function EntryForm({ initialEntry, domains }: EntryFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  // Local undo/redo history stack maintained as a unified state to prevent React state updater side-effects
  const [historyState, setHistoryState] = useState<{ list: any[], pointer: number }>({ list: [], pointer: -1 })
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'identity' | 'content' | 'examples' | 'resources' | 'history' | 'publish'>('identity')
  const [previewTab, setPreviewTab] = useState<'standard' | 'examples' | 'lecture' | 'pdf'>('standard')

  const editorRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [initialHtml] = useState(() => {
    // Generate initial blocks if possible
    if (initialEntry?.entryBody) {
      try {
        const bodyObj = typeof initialEntry.entryBody === 'string'
          ? JSON.parse(initialEntry.entryBody)
          : initialEntry.entryBody
        if (bodyObj && bodyObj.blocks && Array.isArray(bodyObj.blocks)) {
          return blocksToHtml(bodyObj.blocks)
        }
      } catch (err) {}
    }
    return '';
  })

  const examplesRef = useRef<HTMLDivElement>(null)
  const examplesDebounceRef = useRef<NodeJS.Timeout | null>(null)
  const [initialExamplesHtml] = useState(() => {
    if (initialEntry?.entryBody) {
      try {
        const bodyObj = typeof initialEntry.entryBody === 'string'
          ? JSON.parse(initialEntry.entryBody)
          : initialEntry.entryBody
        if (bodyObj?.examplesHtml) return bodyObj.examplesHtml
        // Fallback: convert example blocks to html if any
        if (bodyObj?.examples && Array.isArray(bodyObj.examples) && bodyObj.examples.length > 0) {
          return bodyObj.examples.map((ex: any) => {
            const parts = []
            if (ex.title) parts.push(`<h2>${ex.title}</h2>`)
            if (ex.scenario) parts.push(`<h3>Facts</h3><p>${ex.scenario}</p>`)
            if (ex.working) parts.push(`<h3>Issue / Working</h3><p>${ex.working}</p>`)
            if (ex.answer) parts.push(`<h3>Analysis &amp; Conclusion</h3><p>${ex.answer}</p>`)
            if (ex.note) parts.push(`<blockquote>${ex.note}</blockquote>`)
            return parts.join('\n')
          }).join('<hr/>')
        }
      } catch (err) {}
    }
    // Check root level illustrations
    if (initialEntry?.illustrations && Array.isArray(initialEntry.illustrations) && initialEntry.illustrations.length > 0) {
      return initialEntry.illustrations.map((ex: any) => {
        const parts = []
        if (ex.illusTitle || ex.title) parts.push(`<h2>${ex.illusTitle || ex.title}</h2>`)
        if (ex.illusScenario || ex.scenario) parts.push(`<h3>Facts</h3><p>${ex.illusScenario || ex.scenario}</p>`)
        if (ex.illusWorking || ex.working) parts.push(`<h3>Issue / Working</h3><p>${ex.illusWorking || ex.working}</p>`)
        if (ex.illusAnswer || ex.answer) parts.push(`<h3>Analysis &amp; Conclusion</h3><p>${ex.illusAnswer || ex.answer}</p>`)
        if (ex.illusNote || ex.note) parts.push(`<blockquote>${ex.illusNote || ex.note}</blockquote>`)
        return parts.join('\n')
      }).join('<hr/>')
    }
    // Check root level examples
    if (initialEntry?.examples && Array.isArray(initialEntry.examples) && initialEntry.examples.length > 0) {
      return initialEntry.examples.map((ex: any) => {
        const parts = []
        if (ex.title) parts.push(`<h2>${ex.title}</h2>`)
        if (ex.scenario) parts.push(`<h3>Facts</h3><p>${ex.scenario}</p>`)
        if (ex.working) parts.push(`<h3>Issue / Working</h3><p>${ex.working}</p>`)
        if (ex.answer) parts.push(`<h3>Analysis &amp; Conclusion</h3><p>${ex.answer}</p>`)
        if (ex.note) parts.push(`<blockquote>${ex.note}</blockquote>`)
        return parts.join('\n')
      }).join('<hr/>')
    }
    // Return placeholder so the editor is never visually blank
    return '<p>Type or paste Examples / Case Law content here. This content will be saved to the database and displayed on the public Examples tab. Remove this placeholder before saving.</p>'
  })

  const [examplesHtml, setExamplesHtml] = useState(initialExamplesHtml)

  const handleExamplesInput = () => {
    if (examplesDebounceRef.current) {
      clearTimeout(examplesDebounceRef.current)
    }
    examplesDebounceRef.current = setTimeout(() => {
      if (examplesRef.current) {
        setExamplesHtml(examplesRef.current.innerHTML)
      }
    }, 500)
  }

  const handleEditorInput = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      if (editorRef.current) {
        const parsed = htmlToBlocks(editorRef.current.innerHTML)
        setBlocks(parsed)
      }
    }, 500)
  }

  const triggerEditorUpdate = () => {
    if (editorRef.current) {
      const parsed = htmlToBlocks(editorRef.current.innerHTML)
      setBlocks(parsed)
    }
  }

  const triggerExamplesUpdate = () => {
    if (examplesRef.current) {
      setExamplesHtml(examplesRef.current.innerHTML)
    }
  }

  const insertHtmlIntoEditor = (html: string, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return
    ref.current.focus()
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      let isInside = false
      let node: Node | null = range.commonAncestorContainer
      while (node) {
        if (node === ref.current) {
          isInside = true
          break
        }
        node = node.parentNode
      }
      if (isInside) {
        range.deleteContents()
        const el = document.createElement("div")
        el.innerHTML = html
        const frag = document.createDocumentFragment()
        let childNode
        let lastChild
        while ((childNode = el.firstChild)) {
          lastChild = frag.appendChild(childNode)
        }
        range.insertNode(frag)
        if (lastChild) {
          const nextRange = range.cloneRange()
          nextRange.setStartAfter(lastChild)
          nextRange.collapse(true)
          sel.removeAllRanges()
          sel.addRange(nextRange)
        }
        return
      }
    }
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = html
    while (tempDiv.firstChild) {
      ref.current.appendChild(tempDiv.firstChild)
    }
  }

  const insertSpecialBlock = (type: 'NOTE' | 'EXAM_TRAP' | 'PRACTICAL_USE' | 'CASE_LAW', isExamples: boolean) => {
    let title = ''
    let citation = ''
    if (type === 'NOTE') {
      title = prompt('Enter Note Title (optional):') || ''
    } else if (type === 'EXAM_TRAP') {
      title = prompt('Enter Exam Trap Title (optional):') || ''
    } else if (type === 'PRACTICAL_USE') {
      title = prompt('Enter Practical Use Title (optional):') || ''
    } else if (type === 'CASE_LAW') {
      title = prompt('Enter Case Title:') || 'Case Law'
      citation = prompt('Enter Case Citation (optional):') || ''
    }

    let html = ''
    if (type === 'NOTE') {
      html = `<div data-block-type="NOTE" data-title="${title}" class="editor-note-block">${title ? `<strong class="note-title">${title}</strong>` : ''}<div class="note-body">Enter note body here...</div></div><p><br></p>`
    } else if (type === 'EXAM_TRAP') {
      html = `<div data-block-type="EXAM_TRAP" data-title="${title}" class="editor-exam-trap"><span class="trap-label">⚠️ EXAM TRAP</span>${title ? `<strong class="trap-title">${title}</strong>` : ''}<div class="trap-body">Enter exam trap body here...</div></div><p><br></p>`
    } else if (type === 'PRACTICAL_USE') {
      html = `<div data-block-type="PRACTICAL_USE" data-title="${title}" class="editor-practical-use"><span class="practical-label">💡 PRACTICAL USE / REAL WORLD</span>${title ? `<strong class="practical-title">${title}</strong>` : ''}<div class="practical-body">Enter practical application here...</div></div><p><br></p>`
    } else if (type === 'CASE_LAW') {
      html = `<div data-block-type="CASE_LAW" data-title="${title}" data-citation="${citation}" class="editor-case-law"><span class="case-label">⚖️ CASE LAW</span><strong class="case-title">${title}</strong>${citation ? `<span class="case-citation">Citation: ${citation}</span>` : ''}<div class="case-body">Enter case law details here...</div></div><p><br></p>`
    }

    if (isExamples) {
      insertHtmlIntoEditor(html, examplesRef)
      triggerExamplesUpdate()
    } else {
      insertHtmlIntoEditor(html, editorRef)
      triggerEditorUpdate()
    }
  }

  useEffect(() => {
    const focus = searchParams?.get('focus')
    if (focus === 'pdf' || focus === 'video') {
      setActiveTab('resources')
    }
  }, [searchParams])

  // Sync editor DOM to current blocks state when the content tab becomes active
  useEffect(() => {
    if (activeTab === 'content' && editorRef.current) {
      const currentHtml = blocksToHtml(blocks)
      // Only reset if content differs (avoids cursor jump on initial load)
      if (editorRef.current.innerHTML !== currentHtml) {
        editorRef.current.innerHTML = currentHtml
      }
    }
  }, [activeTab])

  // Sync examples editor DOM when examples tab becomes active
  useEffect(() => {
    if (activeTab === 'examples' && examplesRef.current) {
      if (examplesRef.current.innerHTML !== examplesHtml) {
        examplesRef.current.innerHTML = examplesHtml
      }
    }
  }, [activeTab])


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
    setAuthoritySecondary(snapshot.authoritySecondary || '')
    setExamLevelTags(snapshot.examLevelTags || '')
    setSeoTitle(snapshot.seoTitle || '')
    setSeoDescription(snapshot.seoDescription || '')
    setIsFeatured(!!snapshot.isFeatured)
    setStandardCode(snapshot.standardCode || '')
    setStandardFramework(snapshot.standardFramework || 'AS')
    setStandardStatus(snapshot.standardStatus || 'ACTIVE')
    setIssuingBody(snapshot.issuingBody || 'ICAI')
    setDateIssued(snapshot.dateIssued || '')
    setDateEffective(snapshot.dateEffective || '')
    setApplicabilitySummary(snapshot.applicabilitySummary || '')
    // Restore resources from snapshot
    if (Array.isArray(snapshot.videos)) {
      setVideos(snapshot.videos)
    }
    if (Array.isArray(snapshot.references)) {
      setReferences(snapshot.references)
    }
    if (snapshot.entryBody?.blocks) {
      setBlocks(snapshot.entryBody.blocks)
    } else if (snapshot.blocks) {
      setBlocks(snapshot.blocks)
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
        blocks,
        examplesHtml
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
    blocks,
    examplesHtml
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
    setExamplesHtml(snap.examplesHtml || '')
    if (editorRef.current) {
      editorRef.current.innerHTML = blocksToHtml(snap.blocks || [])
    }
    if (examplesRef.current) {
      examplesRef.current.innerHTML = snap.examplesHtml || ''
    }
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
        blocks: blocks,
        examplesHtml: examplesHtml
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
        } else if (publishNow) {
          // Only redirect on explicit publish
          router.push('/admin/entries')
          router.refresh()
        }
        // Draft save: stay on the page — lastSaved timestamp already updated above
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

  const handleBlockPdfUpload = async (blockIdx: number, file: File) => {
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
        updateBlock(blockIdx, 'url', data.url)
        updateBlock(blockIdx, 'title', file.name)
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
      {/* Full-width Document Editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Full-width Form Editor — no split pane */}
        <div className="w-full flex flex-col bg-white dark:bg-[#111726] overflow-y-auto">
          {/* Visual Tabs Header */}
          <div className="flex border-b border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0D121F]">
            <Link
              href="/admin/entries"
              className="flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-r border-[#E2E1DD] dark:border-gray-800 text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </Link>
            {(['identity', 'content', 'examples', 'resources', 'history', 'publish'] as const).map((tab) => {
              const active = activeTab === tab
              const Icon = {
                identity: Info,
                content: Book,
                examples: Scale,
                resources: Video,
                history: History,
                publish: CheckCircle
              }[tab]

              const label = {
                identity: 'Identity',
                content: 'Standard',
                examples: 'Examples / Case Law',
                resources: 'Resources',
                history: 'History',
                publish: 'Publish'
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
                  <span>{label}</span>
                </button>
              )
            })}
          </div>

          <div className={`flex-1 ${(activeTab === 'content' || activeTab === 'examples') ? 'p-0' : 'p-6 space-y-6'}`}>
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
            {/* TAB 2: WYSIWYG PAGE EDITOR — Same layout as public standard page */}
            {activeTab === 'content' && (
              <div className="flex flex-col min-h-full bg-[#F5F4F1] dark:bg-[#0D121F]">
                <style dangerouslySetInnerHTML={{ __html: `
                  .canvas-editor {
                    outline: none;
                    min-height: 600px;
                  }
                  .canvas-editor h1 {
                    font-size: 2.25rem;
                    font-weight: 900;
                    color: #1C1C1E;
                    letter-spacing: -0.02em;
                    margin-bottom: 0.5rem;
                    line-height: 1.15;
                  }
                  .canvas-editor h2 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1C1C1E;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    border-bottom: 2px solid #E2E1DD;
                    padding-bottom: 0.75rem;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                  }
                  .canvas-editor h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #1C1C1E;
                    margin-top: 2rem;
                    margin-bottom: 0.875rem;
                  }
                  .canvas-editor h4 {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #333;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                  }
                  .canvas-editor p {
                    font-size: 1.09rem;
                    line-height: 1.85;
                    color: #2A2A35;
                    margin-bottom: 1.5rem;
                  }
                  .canvas-editor ul, .canvas-editor ol {
                    padding-left: 1.75rem;
                    margin-bottom: 1.5rem;
                  }
                  .canvas-editor li {
                    font-size: 1.04rem;
                    line-height: 1.8;
                    color: #2A2A35;
                    margin-bottom: 0.375rem;
                  }
                  .canvas-editor strong { font-weight: 800; }
                  .canvas-editor em { font-style: italic; }
                  .canvas-editor u { text-decoration: underline; }
                  .canvas-editor blockquote {
                    border-left: 3px solid #2D5BE3;
                    padding-left: 1.25rem;
                    margin: 1.5rem 0;
                    color: #555;
                    font-style: italic;
                  }
                  .canvas-editor table {
                    width: 100%;
                    text-align: left;
                    font-size: 0.875rem;
                    border-collapse: collapse;
                    border: 1px solid #E2E1DD;
                    margin-bottom: 2rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                  }
                  .canvas-editor th {
                    background-color: #F8FAFC;
                    color: #4A5568;
                    border-bottom: 1px solid #E2E1DD;
                    padding: 0.75rem 1rem;
                    font-weight: bold;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                  }
                  .canvas-editor td {
                    padding: 0.75rem 1rem;
                    color: #2D3748;
                    border-bottom: 1px solid #E2E1DD;
                  }
                  .canvas-editor .editor-note-block {
                    padding: 1.5rem 2rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(197, 195, 188, 0.5);
                    background-color: rgba(250, 250, 248, 0.6);
                    margin-bottom: 2rem;
                  }
                  .canvas-editor .editor-exam-trap {
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #F5C6C0;
                    background-color: #FDEEEE;
                    margin-bottom: 1rem;
                  }
                  .canvas-editor .editor-practical-use {
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #C5E9D4;
                    background-color: #E8F7EE;
                    margin-bottom: 1rem;
                  }
                  .canvas-editor .editor-case-law {
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #DCE6FF;
                    background-color: #EEF2FD;
                    margin-bottom: 1rem;
                  }
                  .dark .canvas-editor h1,
                  .dark .canvas-editor h2,
                  .dark .canvas-editor h3,
                  .dark .canvas-editor h4 { color: #ffffff; }
                  .dark .canvas-editor h2 { border-color: #1e2640; }
                  .dark .canvas-editor p,
                  .dark .canvas-editor li { color: #d1d5db; }
                  .dark .canvas-editor table { border-color: #1e2640; }
                  .dark .canvas-editor th { background-color: #1e2640; color: #d1d5db; border-color: #1e2640; }
                  .dark .canvas-editor td { color: #d1d5db; border-color: #1e2640; }
                  .dark .canvas-editor .editor-note-block { border-color: #1e2640; background-color: rgba(30,38,64,0.55); }
                  .dark .canvas-editor .editor-exam-trap { background-color: #2c1d1d; border-color: rgba(245,198,192,0.5); }
                  .dark .canvas-editor .editor-practical-use { background-color: #1a2c22; border-color: rgba(197,233,212,0.5); }
                  .dark .canvas-editor .editor-case-law { background-color: #1a2542; border-color: rgba(220,230,255,0.5); }
                ` }} />

                {/* Editor toolbar strip */}
                <div className="flex items-center gap-3 px-6 py-2.5 border-b border-[#E2E1DD]/60 dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0D121F] shrink-0 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#76767E]">Document Editor</span>
                  <span className="text-[10px] text-[#A0A0A8]">·</span>
                  <span className="text-[10px] text-[#A0A0A8]">Type freely — paste from Word or PDF</span>
                  <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                    <button type="button" onClick={() => { document.execCommand('bold'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 font-bold text-xs" title="Bold">B</button>
                    <button type="button" onClick={() => { document.execCommand('italic'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 italic text-xs" title="Italic">I</button>
                    <button type="button" onClick={() => { document.execCommand('underline'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 underline text-xs" title="Underline">U</button>
                    <button type="button" onClick={() => { document.execCommand('strikeThrough'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 line-through text-xs" title="Strikethrough">S</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />
                    
                    <button type="button" onClick={() => { document.execCommand('justifyLeft'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Align Left">Align L</button>
                    <button type="button" onClick={() => { document.execCommand('justifyCenter'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Align Center">Align C</button>
                    <button type="button" onClick={() => { document.execCommand('justifyRight'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Align Right">Align R</button>
                    <button type="button" onClick={() => { document.execCommand('justifyFull'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Justify">Justify</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />

                    <button type="button" onClick={() => { document.execCommand('formatBlock', false, 'h2'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-bold">H2</button>
                    <button type="button" onClick={() => { document.execCommand('formatBlock', false, 'h3'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-bold">H3</button>
                    <button type="button" onClick={() => { document.execCommand('formatBlock', false, 'p'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs">P</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />
                    
                    <button type="button" onClick={() => { document.execCommand('insertUnorderedList'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs" title="Bullet List">• List</button>
                    <button type="button" onClick={() => { document.execCommand('insertOrderedList'); triggerEditorUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs" title="Numbered List">1. List</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />
                    
                    <button type="button" onClick={() => {
                      const url = prompt("Enter hyperlink URL:");
                      if (url) {
                        document.execCommand('createLink', false, url);
                        triggerEditorUpdate();
                      }
                    }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-medium" title="Insert Link">Link</button>
                    
                    <button type="button" onClick={() => {
                      const tableHtml = `<table class="w-full text-left text-xs border-collapse border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden mb-6"><thead><tr class="bg-slate-50 dark:bg-slate-850"><th class="p-3 font-bold border-b border-[#E2E1DD] dark:border-gray-800">Header 1</th><th class="p-3 font-bold border-b border-[#E2E1DD] dark:border-gray-800">Header 2</th></tr></thead><tbody><tr><td class="p-3 border-b border-[#E2E1DD] dark:border-gray-800">Cell 1</td><td class="p-3 border-b border-[#E2E1DD] dark:border-gray-800">Cell 2</td></tr></tbody></table><p><br></p>`;
                      insertHtmlIntoEditor(tableHtml, editorRef);
                      triggerEditorUpdate();
                    }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-medium" title="Insert Table">Table</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />

                    <select 
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        insertSpecialBlock(val as any, false);
                        e.target.value = '';
                      }}
                      className="p-1 px-1.5 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded text-xs text-slate-700 dark:text-gray-300 font-medium cursor-pointer"
                    >
                      <option value="">+ Add Block...</option>
                      <option value="NOTE">📝 Note Block</option>
                      <option value="EXAM_TRAP">⚠️ Exam Trap</option>
                      <option value="PRACTICAL_USE">💡 Practical Use</option>
                      <option value="CASE_LAW">⚖️ Case Law</option>
                    </select>
                  </div>
                </div>

                {/* Document canvas — full page feel */}
                <div className="flex-1 overflow-y-auto py-10 px-4 sm:px-8">
                  <div className="max-w-4xl mx-auto">
                    <div
                      ref={editorRef}
                      contentEditable
                      onInput={handleEditorInput}
                      onBlur={handleEditorInput}
                      suppressContentEditableWarning
                      className="canvas-editor w-full min-h-[600px] outline-none text-[#1C1C1E] dark:text-white focus:outline-none bg-white dark:bg-[#111726] rounded-2xl px-10 py-12 border border-[#E2E1DD] dark:border-gray-800 shadow-sm"
                      dangerouslySetInnerHTML={{ __html: initialHtml }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2.5: WYSIWYG EXAMPLES EDITOR — Same layout as public standard page */}
            {activeTab === 'examples' && (
              <div className="flex flex-col min-h-full bg-[#F5F4F1] dark:bg-[#0D121F]">
                <style dangerouslySetInnerHTML={{ __html: `
                  .canvas-editor {
                    outline: none;
                    min-height: 600px;
                  }
                  .canvas-editor h1 {
                    font-size: 2.25rem;
                    font-weight: 900;
                    color: #1C1C1E;
                    letter-spacing: -0.02em;
                    margin-bottom: 0.5rem;
                    line-height: 1.15;
                  }
                  .canvas-editor h2 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1C1C1E;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    border-bottom: 2px solid #E2E1DD;
                    padding-bottom: 0.75rem;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                  }
                  .canvas-editor h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #1C1C1E;
                    margin-top: 2rem;
                    margin-bottom: 0.875rem;
                  }
                  .canvas-editor h4 {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #333;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                  }
                  .canvas-editor p {
                    font-size: 1.09rem;
                    line-height: 1.85;
                    color: #2A2A35;
                    margin-bottom: 1.5rem;
                  }
                  .canvas-editor ul, .canvas-editor ol {
                    padding-left: 1.75rem;
                    margin-bottom: 1.5rem;
                  }
                  .canvas-editor li {
                    font-size: 1.04rem;
                    line-height: 1.8;
                    color: #2A2A35;
                    margin-bottom: 0.375rem;
                  }
                  .canvas-editor strong { font-weight: 800; }
                  .canvas-editor em { font-style: italic; }
                  .canvas-editor u { text-decoration: underline; }
                  .canvas-editor blockquote {
                    border-left: 3px solid #2D5BE3;
                    padding-left: 1.25rem;
                    margin: 1.5rem 0;
                    color: #555;
                    font-style: italic;
                  }
                  .canvas-editor table {
                    width: 100%;
                    text-align: left;
                    font-size: 0.875rem;
                    border-collapse: collapse;
                    border: 1px solid #E2E1DD;
                    margin-bottom: 2rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                  }
                  .canvas-editor th {
                    background-color: #F8FAFC;
                    color: #4A5568;
                    border-bottom: 1px solid #E2E1DD;
                    padding: 0.75rem 1rem;
                    font-weight: bold;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                  }
                  .canvas-editor td {
                    padding: 0.75rem 1rem;
                    color: #2D3748;
                    border-bottom: 1px solid #E2E1DD;
                  }
                  .canvas-editor .editor-note-block {
                    padding: 1.5rem 2rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(197, 195, 188, 0.5);
                    background-color: rgba(250, 250, 248, 0.6);
                    margin-bottom: 2rem;
                  }
                  .canvas-editor .editor-exam-trap {
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #F5C6C0;
                    background-color: #FDEEEE;
                    margin-bottom: 1rem;
                  }
                  .canvas-editor .editor-practical-use {
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #C5E9D4;
                    background-color: #E8F7EE;
                    margin-bottom: 1rem;
                  }
                  .canvas-editor .editor-case-law {
                    padding: 1.25rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #DCE6FF;
                    background-color: #EEF2FD;
                    margin-bottom: 1rem;
                  }
                  .dark .canvas-editor h1,
                  .dark .canvas-editor h2,
                  .dark .canvas-editor h3,
                  .dark .canvas-editor h4 { color: #ffffff; }
                  .dark .canvas-editor h2 { border-color: #1e2640; }
                  .dark .canvas-editor p,
                  .dark .canvas-editor li { color: #d1d5db; }
                  .dark .canvas-editor table { border-color: #1e2640; }
                  .dark .canvas-editor th { background-color: #1e2640; color: #d1d5db; border-color: #1e2640; }
                  .dark .canvas-editor td { color: #d1d5db; border-color: #1e2640; }
                  .dark .canvas-editor .editor-note-block { border-color: #1e2640; background-color: rgba(30,38,64,0.55); }
                  .dark .canvas-editor .editor-exam-trap { background-color: #2c1d1d; border-color: rgba(245,198,192,0.5); }
                  .dark .canvas-editor .editor-practical-use { background-color: #1a2c22; border-color: rgba(197,233,212,0.5); }
                  .dark .canvas-editor .editor-case-law { background-color: #1a2542; border-color: rgba(220,230,255,0.5); }
                ` }} />

                {/* Editor toolbar strip */}
                <div className="flex items-center gap-3 px-6 py-2.5 border-b border-[#E2E1DD]/60 dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0D121F] shrink-0 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#76767E]">Examples / Case Law Editor</span>
                  <span className="text-[10px] text-[#A0A0A8]">·</span>
                  <span className="text-[10px] text-[#A0A0A8]">Type or paste examples directly</span>
                  <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                    <button type="button" onClick={() => { document.execCommand('bold'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 font-bold text-xs" title="Bold">B</button>
                    <button type="button" onClick={() => { document.execCommand('italic'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 italic text-xs" title="Italic">I</button>
                    <button type="button" onClick={() => { document.execCommand('underline'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 underline text-xs" title="Underline">U</button>
                    <button type="button" onClick={() => { document.execCommand('strikeThrough'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 line-through text-xs" title="Strikethrough">S</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />
                    
                    <button type="button" onClick={() => { document.execCommand('justifyLeft'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Align Left">Align L</button>
                    <button type="button" onClick={() => { document.execCommand('justifyCenter'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Align Center">Align C</button>
                    <button type="button" onClick={() => { document.execCommand('justifyRight'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Align Right">Align R</button>
                    <button type="button" onClick={() => { document.execCommand('justifyFull'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px]" title="Justify">Justify</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />

                    <button type="button" onClick={() => { document.execCommand('formatBlock', false, 'h2'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-bold">H2</button>
                    <button type="button" onClick={() => { document.execCommand('formatBlock', false, 'h3'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-bold">H3</button>
                    <button type="button" onClick={() => { document.execCommand('formatBlock', false, 'p'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs">P</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />
                    
                    <button type="button" onClick={() => { document.execCommand('insertUnorderedList'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs" title="Bullet List">• List</button>
                    <button type="button" onClick={() => { document.execCommand('insertOrderedList'); triggerExamplesUpdate(); }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs" title="Numbered List">1. List</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />
                    
                    <button type="button" onClick={() => {
                      const url = prompt("Enter hyperlink URL:");
                      if (url) {
                        document.execCommand('createLink', false, url);
                        triggerExamplesUpdate();
                      }
                    }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-medium" title="Insert Link">Link</button>
                    
                    <button type="button" onClick={() => {
                      const tableHtml = `<table class="w-full text-left text-xs border-collapse border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden mb-6"><thead><tr class="bg-slate-50 dark:bg-slate-850"><th class="p-3 font-bold border-b border-[#E2E1DD] dark:border-gray-800">Header 1</th><th class="p-3 font-bold border-b border-[#E2E1DD] dark:border-gray-800">Header 2</th></tr></thead><tbody><tr><td class="p-3 border-b border-[#E2E1DD] dark:border-gray-800">Cell 1</td><td class="p-3 border-b border-[#E2E1DD] dark:border-gray-800">Cell 2</td></tr></tbody></table><p><br></p>`;
                      insertHtmlIntoEditor(tableHtml, examplesRef);
                      triggerExamplesUpdate();
                    }} className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-400 text-xs font-medium" title="Insert Table">Table</button>
                    
                    <span className="w-px h-4 bg-slate-200 dark:bg-gray-700 mx-0.5" />

                    <select 
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        insertSpecialBlock(val as any, true);
                        e.target.value = '';
                      }}
                      className="p-1 px-1.5 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded text-xs text-slate-700 dark:text-gray-300 font-medium cursor-pointer"
                    >
                      <option value="">+ Add Block...</option>
                      <option value="NOTE">📝 Note Block</option>
                      <option value="EXAM_TRAP">⚠️ Exam Trap</option>
                      <option value="PRACTICAL_USE">💡 Practical Use</option>
                      <option value="CASE_LAW">⚖️ Case Law</option>
                    </select>
                  </div>
                </div>

                {/* Document canvas */}
                <div className="flex-1 overflow-y-auto py-10 px-4 sm:px-8">
                  <div className="max-w-4xl mx-auto">
                    <div
                      ref={examplesRef}
                      contentEditable
                      onInput={handleExamplesInput}
                      onBlur={handleExamplesInput}
                      suppressContentEditableWarning
                      className="canvas-editor w-full min-h-[600px] outline-none text-[#1C1C1E] dark:text-white focus:outline-none bg-white dark:bg-[#111726] rounded-2xl px-10 py-12 border border-[#E2E1DD] dark:border-gray-800 shadow-sm"
                      dangerouslySetInnerHTML={{ __html: initialExamplesHtml }}
                    />
                  </div>
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
