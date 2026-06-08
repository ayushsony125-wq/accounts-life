'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveEntry } from '../actions'
import { Info, Book, Image, Video, CheckCircle, ArrowRight, ArrowLeft, Plus, Trash2, HelpCircle } from 'lucide-react'

interface EntryFormProps {
  initialEntry?: any
  domains: any[]
}

export default function EntryForm({ initialEntry, domains }: EntryFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<'identity' | 'content' | 'resources' | 'publish'>('identity')

  // --- FORM STATES ---
  // Identity Tab fields
  const [id, setId] = useState<number | undefined>(initialEntry?.id)
  const [entryTitle, setEntryTitle] = useState(initialEntry?.entryTitle || '')
  const [entrySlug, setEntrySlug] = useState(initialEntry?.entrySlug || '')
  const [entryType, setEntryType] = useState<string>(initialEntry?.entryType || 'CONCEPT')
  const [domainId, setDomainId] = useState<number>(initialEntry?.domainId || domains[0]?.id || 1)
  
  // Find current domain's subdomains
  const currentDomain = domains.find((d) => d.id === Number(domainId))
  const subdomains = currentDomain?.subdomains || []
  
  const [subdomainId, setSubdomainId] = useState<number>(
    initialEntry?.subdomainId || subdomains[0]?.id || 1
  )

  const [summary, setSummary] = useState(initialEntry?.summary || '')
  const [verificationLevel, setVerificationLevel] = useState<string>(initialEntry?.verificationLevel || 'DRAFT')
  const [status, setStatus] = useState<string>(initialEntry?.status || 'DRAFT')
  const [examLevelTags, setExamLevelTags] = useState<string>(
    initialEntry?.examLevelTags ? initialEntry.examLevelTags.join(', ') : 'CA Intermediate'
  )
  const [authorityPrimary, setAuthorityPrimary] = useState(initialEntry?.authorityPrimary || '')
  const [authorityPrimaryUrl, setAuthorityPrimaryUrl] = useState(initialEntry?.authorityPrimaryUrl || '')
  const [authoritySecondary, setAuthoritySecondary] = useState(initialEntry?.authoritySecondary || '')
  const [isFeatured, setIsFeatured] = useState<boolean>(initialEntry?.isFeatured || false)
  const [seoTitle, setSeoTitle] = useState(initialEntry?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(initialEntry?.seoDescription || '')

  // Content Tab fields
  // 1. Regular sections
  const [sections, setSections] = useState<any[]>(initialEntry?.sections || [
    { id: 'overview', heading: 'Overview', level: 1, body: '' }
  ])

  // 2. FAQs
  const [faqs, setFaqs] = useState<any[]>(
    initialEntry?.faqs
      ? initialEntry.faqs.map((f: any) => ({
          faqQuestion: f.faqQuestion || f.question || '',
          faqAnswer: f.faqAnswer || f.answer || '',
          faqSourceRef: f.faqSourceRef || f.sourceRef || '',
          faqCategory: f.faqCategory || f.category || 'GENERAL',
        }))
      : []
  )

  // 3. Notes callouts
  const [notes, setNotes] = useState<any[]>(
    initialEntry?.notes
      ? initialEntry.notes.map((n: any) => ({
          noteType: n.noteType || n.type || 'NOTE',
          noteTitle: n.noteTitle || n.title || '',
          noteBody: n.noteBody || n.body || '',
        }))
      : []
  )

  // 4. Standalone Journal entries
  const [journalEntries, setJournalEntries] = useState<any[]>(
    initialEntry?.journalEntries
      ? initialEntry.journalEntries.map((je: any) => ({
          jeScenarioTitle: je.jeScenarioTitle || je.scenario || '',
          jeLabel: je.jeLabel || je.label || '',
          jeCategoryHeading: je.jeCategoryHeading || je.category || '',
          jeNarration: je.jeNarration || je.narration || '',
          rows: je.rows
            ? je.rows.map((row: any) => ({
                rowType: row.rowType || 'DR',
                accountName: row.accountName || '',
                drAmount: row.drAmount || '',
                crAmount: row.crAmount || '',
              }))
            : [{ rowType: 'DR', accountName: '', drAmount: '', crAmount: '' }],
        }))
      : []
  )

  // 5. Illustrations
  const [illustrations, setIllustrations] = useState<any[]>(
    initialEntry?.illustrations
      ? initialEntry.illustrations.map((illus: any) => ({
          illusTitle: illus.illusTitle || illus.title || '',
          illusScenario: illus.illusScenario || illus.scenario || '',
          illusWorking: illus.illusWorking || illus.working || '',
          illusAnswer: illus.illusAnswer || illus.answer || '',
          illusNote: illus.illusNote || illus.note || '',
          illusDifficulty: illus.illusDifficulty || illus.difficulty || 'BEGINNER',
        }))
      : []
  )

  // Standard specific fields (rendered if entryType === 'STANDARD')
  const [standardCode, setStandardCode] = useState(initialEntry?.standardCode || '')
  const [standardFramework, setStandardFramework] = useState<string>(initialEntry?.standardFramework || 'AS')
  const [standardStatus, setStandardStatus] = useState<string>(initialEntry?.standardStatus || 'ACTIVE')
  const [issuingBody, setIssuingBody] = useState(initialEntry?.issuingBody || 'ICAI')
  const [dateIssued, setDateIssued] = useState(initialEntry?.dateIssued || '')
  const [dateEffective, setDateEffective] = useState(initialEntry?.dateEffective || '')
  const [applicabilitySummary, setApplicabilitySummary] = useState(initialEntry?.applicabilitySummary || '')
  
  const [objectiveText, setObjectiveText] = useState(initialEntry?.objective?.text || '')
  const [objectiveSourcePara, setObjectiveSourcePara] = useState(initialEntry?.objective?.sourcePara || '')
  const [objectiveCommentary, setObjectiveCommentary] = useState(initialEntry?.objective?.commentary || '')
  const [objectiveKeyIssues, setObjectiveKeyIssues] = useState(
    initialEntry?.objective?.keyIssues ? initialEntry.objective.keyIssues.join('\n') : ''
  )
  
  const [scopeStatement, setScopeStatement] = useState(initialEntry?.scope?.statement || '')
  const [scopeIncluded, setScopeIncluded] = useState(
    initialEntry?.scope?.included ? initialEntry.scope.included.join('\n') : ''
  )
  const [scopeExcluded, setScopeExcluded] = useState(
    initialEntry?.scope?.excluded ? initialEntry.scope.excluded.join('\n') : ''
  )

  const [definitions, setDefinitions] = useState<any[]>(
    initialEntry?.definitions
      ? initialEntry.definitions.map((def: any) => ({
          defTerm: def.defTerm || def.term || '',
          defParaReference: def.defParaReference || def.paraRef || '',
          defOfficialText: def.defOfficialText || def.officialText || '',
          defPlainExplanation: def.defPlainExplanation || def.plainExplanation || '',
        }))
      : []
  )
  const [disclosureGroups, setDisclosureGroups] = useState<any[]>(
    initialEntry?.disclosureGroups
      ? initialEntry.disclosureGroups.map((g: any) => ({
          groupHeading: g.groupHeading || g.heading || '',
          groupParaRange: g.groupParaRange || g.paraRange || '',
          items: g.items
            ? g.items.map((item: any) => ({
                itemText: item.itemText || item.text || '',
                itemIsConditional: item.itemIsConditional || item.isConditional || false,
              }))
            : [],
        }))
      : []
  )
  const [comparisonRows, setComparisonRows] = useState<any[]>(
    initialEntry?.comparisonRows || initialEntry?.comparison?.rows
      ? (initialEntry.comparisonRows || initialEntry.comparison.rows).map((row: any) => ({
          criterion: row.criterion || '',
          valueStd1: row.valueStd1 || row.as || '',
          valueStd2: row.valueStd2 || row.indAs || '',
          isDifferent: row.isDifferent || false,
        }))
      : []
  )

  // Tab 3: Resources
  const [videos, setVideos] = useState<any[]>(
    initialEntry?.resources?.filter((r: any) => r.resourceType === 'VIDEO') || []
  )
  const [references, setReferences] = useState<any[]>(
    initialEntry?.resources?.filter((r: any) => r.resourceType !== 'VIDEO') || []
  )

  // Auto-slug generation
  const handleTitleChange = (val: string) => {
    setEntryTitle(val)
    if (!id) {
      // Auto-slugify
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setEntrySlug(slugified)
    }
  }

  // Section additions
  const addSection = () => {
    setSections([...sections, { id: `sec-${Date.now()}`, heading: 'New Section', level: 1, body: '' }])
  }
  const removeSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx))
  }
  const updateSection = (idx: number, field: string, val: any) => {
    const next = [...sections]
    next[idx][field] = val
    setSections(next)
  }

  // FAQ additions
  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '', category: 'GENERAL', sortOrder: faqs.length }])
  }
  const removeFAQ = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx))
  }
  const updateFAQ = (idx: number, field: string, val: any) => {
    const next = [...faqs]
    next[idx][field] = val
    setFaqs(next)
  }

  // Note additions
  const addNote = () => {
    setNotes([...notes, { noteType: 'NOTE', noteTitle: '', noteBody: '', sortOrder: notes.length }])
  }
  const removeNote = (idx: number) => {
    setNotes(notes.filter((_, i) => i !== idx))
  }
  const updateNote = (idx: number, field: string, val: any) => {
    const next = [...notes]
    next[idx][field] = val
    setNotes(next)
  }

  // Standalone Journal Entry additions
  const addJournalEntry = () => {
    setJournalEntries([
      ...journalEntries,
      {
        jeScenarioTitle: '',
        jeLabel: '',
        jeCategoryHeading: '',
        jeNarration: '',
        rows: [{ rowType: 'DR', accountName: '', drAmount: '', crAmount: '' }],
        sortOrder: journalEntries.length,
      },
    ])
  }
  const removeJournalEntry = (jeIdx: number) => {
    setJournalEntries(journalEntries.filter((_, i) => i !== jeIdx))
  }
  const updateJournalEntry = (jeIdx: number, field: string, val: any) => {
    const next = [...journalEntries]
    next[jeIdx][field] = val
    setJournalEntries(next)
  }
  const addJournalRow = (jeIdx: number) => {
    const next = [...journalEntries]
    next[jeIdx].rows.push({ rowType: 'DR', accountName: '', drAmount: '', crAmount: '' })
    setJournalEntries(next)
  }
  const removeJournalRow = (jeIdx: number, rowIdx: number) => {
    const next = [...journalEntries]
    next[jeIdx].rows = next[jeIdx].rows.filter((_: any, i: number) => i !== rowIdx)
    setJournalEntries(next)
  }
  const updateJournalRow = (jeIdx: number, rowIdx: number, field: string, val: any) => {
    const next = [...journalEntries]
    next[jeIdx].rows[rowIdx][field] = val
    setJournalEntries(next)
  }

  // Illustration additions
  const addIllustration = () => {
    setIllustrations([
      ...illustrations,
      {
        illusTitle: '',
        illusScenario: '',
        illusWorking: '',
        illusAnswer: '',
        illusNote: '',
        illusDifficulty: 'BEGINNER',
        sortOrder: illustrations.length,
      },
    ])
  }
  const removeIllustration = (idx: number) => {
    setIllustrations(illustrations.filter((_, i) => i !== idx))
  }
  const updateIllustration = (idx: number, field: string, val: any) => {
    const next = [...illustrations]
    next[idx][field] = val
    setIllustrations(next)
  }

  // Standard Definition additions
  const addDefinition = () => {
    setDefinitions([...definitions, { defTerm: '', defParaReference: '', defOfficialText: '', defPlainExplanation: '' }])
  }
  const removeDefinition = (idx: number) => {
    setDefinitions(definitions.filter((_, i) => i !== idx))
  }
  const updateDefinition = (idx: number, field: string, val: any) => {
    const next = [...definitions]
    next[idx][field] = val
    setDefinitions(next)
  }

  // Disclosure Group additions
  const addDisclosureGroup = () => {
    setDisclosureGroups([...disclosureGroups, { groupHeading: '', groupParaRange: '', items: [{ itemText: '', isConditional: false }] }])
  }
  const removeDisclosureGroup = (idx: number) => {
    setDisclosureGroups(disclosureGroups.filter((_, i) => i !== idx))
  }
  const updateDisclosureGroup = (idx: number, field: string, val: any) => {
    const next = [...disclosureGroups]
    next[idx][field] = val
    setDisclosureGroups(next)
  }
  const addDisclosureItem = (gIdx: number) => {
    const next = [...disclosureGroups]
    next[gIdx].items.push({ itemText: '', isConditional: false })
    setDisclosureGroups(next)
  }
  const removeDisclosureItem = (gIdx: number, iIdx: number) => {
    const next = [...disclosureGroups]
    next[gIdx].items = next[gIdx].items.filter((_: any, i: number) => i !== iIdx)
    setDisclosureGroups(next)
  }
  const updateDisclosureItem = (gIdx: number, iIdx: number, field: string, val: any) => {
    const next = [...disclosureGroups]
    next[gIdx].items[iIdx][field] = val
    setDisclosureGroups(next)
  }

  // Comparison Row additions
  const addComparisonRow = () => {
    setComparisonRows([...comparisonRows, { criterion: '', valueStd1: '', valueStd2: '', isDifferent: false, differenceNote: '' }])
  }
  const removeComparisonRow = (idx: number) => {
    setComparisonRows(comparisonRows.filter((_, i) => i !== idx))
  }
  const updateComparisonRow = (idx: number, field: string, val: any) => {
    const next = [...comparisonRows]
    next[idx][field] = val
    setComparisonRows(next)
  }

  // Resources (Videos & References) additions
  const addVideo = () => {
    setVideos([...videos, { resourceType: 'VIDEO', resourceTitle: '', resourceUrl: '', videoChannel: '', sourceType: 'EXTERNAL' }])
  }
  const removeVideo = (idx: number) => {
    setVideos(videos.filter((_, i) => i !== idx))
  }
  const updateVideo = (idx: number, field: string, val: any) => {
    const next = [...videos]
    next[idx][field] = val
    setVideos(next)
  }

  const addReference = () => {
    setReferences([...references, { resourceType: 'PDF', resourceTitle: '', resourceUrl: '', sourceType: 'ICAI_OFFICIAL', refYear: new Date().getFullYear() }])
  }
  const removeReference = (idx: number) => {
    setReferences(references.filter((_, i) => i !== idx))
  }
  const updateReference = (idx: number, field: string, val: any) => {
    const next = [...references]
    next[idx][field] = val
    setReferences(next)
  }

  // --- SUBMIT ---
  const handleSubmit = (publishNow = false) => {
    if (!entryTitle.trim() || !entrySlug.trim() || !summary.trim()) {
      alert('Please fill out the Title, Slug, and Summary in Tab 1.')
      setActiveTab('identity')
      return
    }

    startTransition(async () => {
      // Map standard detail nested fields if STANDARD
      let stdDetailObj = null
      if (entryType === 'STANDARD') {
        stdDetailObj = {
          standardCode,
          standardFramework,
          standardStatus,
          issuingBody,
          dateIssued,
          dateEffective,
          applicabilitySummary,
          objective: {
            text: objectiveText,
            sourcePara: objectiveSourcePara,
            commentary: objectiveCommentary,
            keyIssues: objectiveKeyIssues.split('\n').filter((x: string) => x.trim()),
          },
          scope: {
            statement: scopeStatement,
            included: scopeIncluded.split('\n').filter((x: string) => x.trim()),
            excluded: scopeExcluded.split('\n').filter((x: string) => x.trim()),
          },
          definitions: definitions.map((def) => ({
            ...def,
            term: def.defTerm,
            paraRef: def.defParaReference,
            officialText: def.defOfficialText,
            plainExplanation: def.defPlainExplanation,
          })),
          disclosureGroups: disclosureGroups.map((g) => ({
            ...g,
            heading: g.groupHeading,
            paraRange: g.groupParaRange,
            items: g.items?.map((item: any) => ({
              ...item,
              text: item.itemText,
              isConditional: item.itemIsConditional,
            })),
          })),
          comparisonRows: comparisonRows.map((r: any) => ({
            ...r,
            valueStd1: r.valueStd1,
            valueStd2: r.valueStd2,
          })),
        }
      }

      // Combine video & references
      const combinedResources = [
        ...videos.map((v) => ({ ...v, resourceType: 'VIDEO' })),
        ...references,
      ]

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
        sections,
        faqs: faqs.map((f) => ({
          ...f,
          question: f.faqQuestion,
          answer: f.faqAnswer,
          sourceRef: f.faqSourceRef,
          category: f.faqCategory,
        })),
        notes: notes.map((n: any) => ({
          ...n,
          type: n.noteType || n.type || 'NOTE',
          title: n.noteTitle || n.title || '',
          body: n.noteBody || n.body || '',
          noteType: n.noteType || n.type || 'NOTE',
          noteTitle: n.noteTitle || n.title || '',
          noteBody: n.noteBody || n.body || '',
        })),
        journalEntries,
        illustrations,
        resources: combinedResources,
        domain: currentDomain ? {
          domainCode: currentDomain.domainCode,
          domainName: currentDomain.domainName,
          domainSlug: currentDomain.domainSlug,
          domainColorHex: currentDomain.domainColorHex,
        } : undefined,
        subdomain: subdomains.find((s: any) => s.id === Number(subdomainId)) ? {
          subdomainName: subdomains.find((s: any) => s.id === Number(subdomainId))?.subdomainName,
          subdomainSlug: subdomains.find((s: any) => s.id === Number(subdomainId))?.subdomainSlug,
        } : undefined,
        // Standard Detail properties directly on payload object for easy public page render fallback
        standardCode,
        standardFramework,
        standardStatus,
        issuingBody,
        dateIssued,
        dateEffective,
        applicabilitySummary,
        objective: {
          text: objectiveText,
          sourcePara: objectiveSourcePara,
          commentary: objectiveCommentary,
          keyIssues: objectiveKeyIssues.split('\n').filter((x: string) => x.trim()),
        },
        scope: {
          statement: scopeStatement,
          included: scopeIncluded.split('\n').filter((x: string) => x.trim()),
          excluded: scopeExcluded.split('\n').filter((x: string) => x.trim()),
        },
        definitions: definitions.map((def) => ({
          ...def,
          term: def.defTerm,
          paraRef: def.defParaReference,
          officialText: def.defOfficialText,
          plainExplanation: def.defPlainExplanation,
        })),
        disclosureGroups: disclosureGroups.map((g) => ({
          ...g,
          heading: g.groupHeading,
          paraRange: g.groupParaRange,
          items: g.items?.map((item: any) => ({
            ...item,
            text: item.itemText,
            isConditional: item.itemIsConditional,
          })),
        })),
        comparisonRows: comparisonRows.map((r: any) => ({
          ...r,
          valueStd1: r.valueStd1,
          valueStd2: r.valueStd2,
        })),
        comparison: {
          std2Title: standardFramework === 'AS' ? 'Ind AS equivalent' : 'AS equivalent',
          rows: comparisonRows.map((r: any) => ({
            criterion: r.criterion,
            as: r.valueStd1 || r.as || '',
            indAs: r.valueStd2 || r.indAs || '',
            isDifferent: r.isDifferent || false,
          })),
        },
        quickBullets: [
          { icon: '🏢', label: 'Framework', desc: standardFramework === 'AS' ? 'Accounting Standards (AS)' : 'Ind AS Framework' },
          { icon: '📋', label: 'Status', desc: standardStatus },
          { icon: '🏫', label: 'Issuing Body', desc: issuingBody },
        ],
        journalEntryNotes: journalEntries.map((je: any) => ({
          scenario: je.jeScenarioTitle,
          treatment: je.jeNarration || 'See double entry guidance details.',
        })),
      }

      try {
        const res = await saveEntry(payload)
        if (res.success) {
          router.push('/admin/entries')
          router.refresh()
        } else {
          alert('Error saving entry.')
        }
      } catch (e) {
        alert('An error occurred during submission.')
      }
    })
  }

  // --- PRE-PUBLISH CHECKS ---
  const checks = [
    { name: 'Title is filled', passed: entryTitle.trim().length > 0 },
    { name: 'Slug is defined', passed: entrySlug.trim().length > 0 },
    { name: 'Summary is completed (min 20 chars)', passed: summary.trim().length >= 20 },
    { name: 'Primary authority source cited', passed: authorityPrimary.trim().length > 0 },
    { name: 'SEO meta details provided', passed: seoTitle.trim().length > 0 || seoDescription.trim().length > 0 },
  ]
  const allPassed = checks.every((c: any) => c.passed)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Form header */}
      <div className="flex items-center gap-3 border-b border-[#E2E1DD] pb-4">
        <Link
          href="/admin/entries"
          className="p-1 text-[#76767E] hover:text-[#1C1C1E] transition-colors"
          title="Back to List"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1C1C1E]">
            {id ? `Edit Entry: ${entryTitle}` : 'Create New Content Entry'}
          </h1>
          <p className="text-xs text-[#76767E] mt-0.5">
            Configure metadata, content blocks, illustrations, and publish policies.
          </p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-[#E2E1DD] gap-1 bg-white p-1 rounded-md">
        {(['identity', 'content', 'resources', 'publish'] as const).map((tab) => {
          const active = activeTab === tab
          const label = tab.charAt(0).toUpperCase() + tab.slice(1)
          const Icon = {
            identity: Info,
            content: Book,
            resources: Video,
            publish: CheckCircle,
          }[tab]

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded transition-colors ${
                active
                  ? 'bg-[#2D5BE3] text-white'
                  : 'text-[#76767E] hover:text-[#1C1C1E] hover:bg-[#F4F3F0]'
              }`}
            >
              <Icon size={12} />
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB 1: IDENTITY */}
      {activeTab === 'identity' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-5 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Entry Title *
              </label>
              <input
                type="text"
                value={entryTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                placeholder="e.g. Going Concern Assumption"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                value={entrySlug}
                onChange={(e) => setEntrySlug(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] font-mono focus:outline-none focus:border-[#2D5BE3]"
                placeholder="e.g. going-concern"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Entry Type
              </label>
              <select
                value={entryType}
                onChange={(e) => setEntryType(e.target.value)}
                className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
              >
                <option value="CONCEPT">Concept Article</option>
                <option value="STANDARD">Accounting Standard</option>
                <option value="JOURNAL_ENTRY">Journal Entry Standalone</option>
                <option value="GLOSSARY_TERM">Glossary Definition</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Domain Category
              </label>
              <select
                value={domainId}
                onChange={(e) => setDomainId(Number(e.target.value))}
                className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
              >
                {domains.map((dom) => (
                  <option key={dom.id} value={dom.id}>
                    {dom.domainCode} — {dom.domainName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Subdomain Section
              </label>
              <select
                value={subdomainId}
                onChange={(e) => setSubdomainId(Number(e.target.value))}
                className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
              >
                {subdomains.length > 0 ? (
                  subdomains.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.subdomainName}
                    </option>
                  ))
                ) : (
                  <option value="1">Core Guidance</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E]">
                Summary Outline (Max 500 chars) *
              </label>
              <span className="text-[10px] text-[#A0A0A8] font-mono">
                {summary.length} / 500
              </span>
            </div>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value.substring(0, 500))}
              rows={3}
              className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3] font-sans"
              placeholder="Provide a plain-language summary for hover previews and sitemaps."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Verification Badge
              </label>
              <select
                value={verificationLevel}
                onChange={(e) => setVerificationLevel(e.target.value)}
                className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
              >
                <option value="VERIFIED">Verified (Official Vetted)</option>
                <option value="DRAFT">Draft (Under Review)</option>
                <option value="PLACEHOLDER">Placeholder / Scheduled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Draft Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
              >
                <option value="DRAFT">Draft (Unpublished)</option>
                <option value="PUBLISHED">Published (Public)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Exam Levels (Comma list)
              </label>
              <input
                type="text"
                value={examLevelTags}
                onChange={(e) => setExamLevelTags(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                placeholder="CA Intermediate, CA Final"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Primary Authority Source
              </label>
              <input
                type="text"
                value={authorityPrimary}
                onChange={(e) => setAuthorityPrimary(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                placeholder="e.g. ICAI Study Material Chapter 4"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1.5">
                Primary Source URL
              </label>
              <input
                type="url"
                value={authorityPrimaryUrl}
                onChange={(e) => setAuthorityPrimaryUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is-featured-checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded border-[#E2E1DD] text-[#2D5BE3] focus:ring-[#2D5BE3]"
            />
            <label htmlFor="is-featured-checkbox" className="text-xs font-semibold text-[#4A4A52] cursor-pointer">
              Feature this entry on public dashboard/landing page
            </label>
          </div>

          <div className="border-t border-[#E2E1DD] pt-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]">
              SEO & Social Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#76767E] mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                  placeholder="Defaults to Entry Title"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#76767E] mb-1">
                  Meta Description
                </label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={1}
                  className="w-full px-3 py-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
                  placeholder="Defaults to Summary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* A. If Entry Type is STANDARD, render Standard Details Form fields */}
          {entryType === 'STANDARD' && (
            <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-5 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#2D5BE3] border-b border-[#E2E1DD] pb-2">
                Standard Framework Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Standard Code</label>
                  <input
                    type="text"
                    value={standardCode}
                    onChange={(e) => setStandardCode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                    placeholder="e.g. AS 1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Framework</label>
                  <select
                    value={standardFramework}
                    onChange={(e) => setStandardFramework(e.target.value)}
                    className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E]"
                  >
                    <option value="AS">Accounting Standards (AS)</option>
                    <option value="IND_AS">Ind AS Framework</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Standard Status</label>
                  <select
                    value={standardStatus}
                    onChange={(e) => setStandardStatus(e.target.value)}
                    className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E]"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="WITHDRAWN">Withdrawn</option>
                    <option value="REVISED">Revised</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Issuing Body</label>
                  <input
                    type="text"
                    value={issuingBody}
                    onChange={(e) => setIssuingBody(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#76767E] mb-1">Applicability Summary</label>
                <textarea
                  value={applicabilitySummary}
                  onChange={(e) => setApplicabilitySummary(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  placeholder="Summary detailing which levels of companies this standard applies to."
                />
              </div>

              {/* Standard Objective */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">1. Objective</h3>
                <textarea
                  value={objectiveText}
                  onChange={(e) => setObjectiveText(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  placeholder="Official objective statement..."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#76767E] mb-0.5">Source Clause Paragraph</label>
                    <input
                      type="text"
                      value={objectiveSourcePara}
                      onChange={(e) => setObjectiveSourcePara(e.target.value)}
                      className="w-full px-3 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                      placeholder="e.g. Paragraph 1-3"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#76767E] mb-0.5">Key issues (One per line)</label>
                    <textarea
                      value={objectiveKeyIssues}
                      onChange={(e) => setObjectiveKeyIssues(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                      placeholder="Issue 1&#10;Issue 2"
                    />
                  </div>
                </div>
              </div>

              {/* Standard Scope */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">2. Scope</h3>
                <textarea
                  value={scopeStatement}
                  onChange={(e) => setScopeStatement(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  placeholder="Core scope statement..."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#76767E] mb-0.5">Included Items (One per line)</label>
                    <textarea
                      value={scopeIncluded}
                      onChange={(e) => setScopeIncluded(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#76767E] mb-0.5">Excluded Items (One per line)</label>
                    <textarea
                      value={scopeExcluded}
                      onChange={(e) => setScopeExcluded(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                    />
                  </div>
                </div>
              </div>

              {/* Key Definitions list */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">3. Key Definitions</h3>
                  <button
                    type="button"
                    onClick={addDefinition}
                    className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
                  >
                    <Plus size={10} /> Add Def
                  </button>
                </div>
                {definitions.map((def, idx) => (
                  <div key={idx} className="border border-[#E2E1DD] p-3.5 rounded-md relative space-y-2.5">
                    <button
                      type="button"
                      onClick={() => removeDefinition(idx)}
                      className="absolute right-2 top-2 text-[#76767E] hover:text-[#C0392B]"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={def.defTerm}
                        onChange={(e) => updateDefinition(idx, 'defTerm', e.target.value)}
                        placeholder="Term Name"
                        className="px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                      />
                      <input
                        type="text"
                        value={def.defParaReference}
                        onChange={(e) => updateDefinition(idx, 'defParaReference', e.target.value)}
                        placeholder="Para Ref (e.g. Clause 4)"
                        className="px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                      />
                    </div>
                    <textarea
                      value={def.defOfficialText}
                      onChange={(e) => updateDefinition(idx, 'defOfficialText', e.target.value)}
                      placeholder="Official Text (Quotes)"
                      rows={1}
                      className="w-full px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                    />
                    <textarea
                      value={def.defPlainExplanation}
                      onChange={(e) => updateDefinition(idx, 'defPlainExplanation', e.target.value)}
                      placeholder="Plain language explanation..."
                      rows={1}
                      className="w-full px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                    />
                  </div>
                ))}
              </div>

              {/* Disclosure checklist */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">4. Disclosure Groups</h3>
                  <button
                    type="button"
                    onClick={addDisclosureGroup}
                    className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
                  >
                    <Plus size={10} /> Add Group
                  </button>
                </div>
                {disclosureGroups.map((g, gIdx) => (
                  <div key={gIdx} className="border border-[#E2E1DD] p-4 rounded-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="grid grid-cols-2 gap-2 flex-1 mr-6">
                        <input
                          type="text"
                          value={g.groupHeading}
                          onChange={(e) => updateDisclosureGroup(gIdx, 'groupHeading', e.target.value)}
                          placeholder="Heading (e.g. General Disclosures)"
                          className="px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs font-semibold text-[#1C1C1E]"
                        />
                        <input
                          type="text"
                          value={g.groupParaRange}
                          onChange={(e) => updateDisclosureGroup(gIdx, 'groupParaRange', e.target.value)}
                          placeholder="Para Ref (e.g. Para 17)"
                          className="px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDisclosureGroup(gIdx)}
                        className="text-[#76767E] hover:text-[#C0392B]"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {/* Disclosure Items list */}
                    <div className="space-y-2 pl-4 border-l-2 border-[#E2E1DD]">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#76767E]">Disclosure Items</p>
                        <button
                          type="button"
                          onClick={() => addDisclosureItem(gIdx)}
                          className="text-[10px] text-[#2D5BE3] font-semibold flex items-center gap-0.5"
                        >
                          <Plus size={8} /> Add Item
                        </button>
                      </div>
                      {g.items?.map((item: any, iIdx: number) => (
                        <div key={iIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={item.itemText}
                            onChange={(e) => updateDisclosureItem(gIdx, iIdx, 'itemText', e.target.value)}
                            placeholder="Disclosure requirement clause..."
                            className="flex-1 px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <input
                              type="checkbox"
                              checked={item.itemIsConditional || false}
                              onChange={(e) => updateDisclosureItem(gIdx, iIdx, 'itemIsConditional', e.target.checked)}
                              id={`cond-${gIdx}-${iIdx}`}
                              className="rounded text-[#2D5BE3]"
                            />
                            <label htmlFor={`cond-${gIdx}-${iIdx}`} className="text-[9px] font-semibold text-[#76767E] cursor-pointer">
                              Conditional
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDisclosureItem(gIdx, iIdx)}
                            className="text-[#76767E] hover:text-[#C0392B]"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison table rows */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">5. Framework Comparison (AS vs Ind AS)</h3>
                  <button
                    type="button"
                    onClick={addComparisonRow}
                    className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
                  >
                    <Plus size={10} /> Add Comparison Row
                  </button>
                </div>
                {comparisonRows.map((row, idx) => (
                  <div key={idx} className="border border-[#E2E1DD] p-3 rounded-md space-y-2 relative">
                    <button
                      type="button"
                      onClick={() => removeComparisonRow(idx)}
                      className="absolute right-2 top-2 text-[#76767E] hover:text-[#C0392B]"
                    >
                      <Trash2 size={12} />
                    </button>
                    <input
                      type="text"
                      value={row.criterion}
                      onChange={(e) => updateComparisonRow(idx, 'criterion', e.target.value)}
                      placeholder="Comparison Criterion (e.g. Revaluation Model)"
                      className="w-full px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs font-semibold text-[#1C1C1E]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <textarea
                        value={row.valueStd1}
                        onChange={(e) => updateComparisonRow(idx, 'valueStd1', e.target.value)}
                        placeholder="Value in this AS Standard"
                        rows={1}
                        className="px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                      />
                      <textarea
                        value={row.valueStd2}
                        onChange={(e) => updateComparisonRow(idx, 'valueStd2', e.target.value)}
                        placeholder="Value in Ind AS Equivalent"
                        rows={1}
                        className="px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B. Core Sections - Heading & paragraphs layout */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                General Document Sections
              </h2>
              <button
                type="button"
                onClick={addSection}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add Section
              </button>
            </div>

            {sections.map((sec, idx) => (
              <div key={sec.id || idx} className="border border-[#E2E1DD] p-4 rounded-md relative space-y-3 bg-[#FAFAF8]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-1 mr-6">
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                      placeholder="Section Heading"
                      className="flex-1 px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs font-semibold text-[#1C1C1E]"
                    />
                    <select
                      value={sec.level}
                      onChange={(e) => updateSection(idx, 'level', Number(e.target.value))}
                      className="bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs"
                    >
                      <option value="1">H1 Heading</option>
                      <option value="2">H2 Subheading</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(idx)}
                    className="text-[#76767E] hover:text-[#C0392B]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <textarea
                  value={sec.body}
                  onChange={(e) => updateSection(idx, 'body', e.target.value)}
                  placeholder="Section body content paragraph..."
                  rows={4}
                  className="w-full px-3 py-2 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                />
              </div>
            ))}
          </div>

          {/* C. Accounting Journal Entries (Double Entry blocks) */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                CMS Journal Entries (Double-Entry Block)
              </h2>
              <button
                type="button"
                onClick={addJournalEntry}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add Journal Entry
              </button>
            </div>

            {journalEntries.map((je, jeIdx) => (
              <div key={jeIdx} className="border border-[#E2E1DD] p-4 rounded-md space-y-3 bg-[#FAFAF8]">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1 mr-4">
                    <input
                      type="text"
                      value={je.jeScenarioTitle || ''}
                      onChange={(e) => updateJournalEntry(jeIdx, 'jeScenarioTitle', e.target.value)}
                      placeholder="Scenario title (e.g. Asset purchased on credit)"
                      className="px-2 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                    />
                    <input
                      type="text"
                      value={je.jeCategoryHeading || ''}
                      onChange={(e) => updateJournalEntry(jeIdx, 'jeCategoryHeading', e.target.value)}
                      placeholder="Category (e.g. Initial Recognition)"
                      className="px-2 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                    />
                    <input
                      type="text"
                      value={je.jeLabel || ''}
                      onChange={(e) => updateJournalEntry(jeIdx, 'jeLabel', e.target.value)}
                      placeholder="Label badge (e.g. Entry A)"
                      className="px-2 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeJournalEntry(jeIdx)}
                    className="text-[#76767E] hover:text-[#C0392B] mt-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Ledger Rows */}
                <div className="space-y-2 border-t border-[#E2E1DD] pt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#76767E]">Debit & Credit Rows</p>
                    <button
                      type="button"
                      onClick={() => addJournalRow(jeIdx)}
                      className="text-[10px] text-[#2D5BE3] font-semibold flex items-center gap-0.5"
                    >
                      <Plus size={8} /> Add Row
                    </button>
                  </div>
                  {je.rows?.map((row: any, rIdx: number) => (
                    <div key={rIdx} className="grid grid-cols-12 gap-2 items-center">
                      <select
                        value={row.rowType}
                        onChange={(e) => updateJournalRow(jeIdx, rIdx, 'rowType', e.target.value)}
                        className="col-span-2 bg-[#F4F3F0] border border-[#E2E1DD] rounded px-1.5 py-1 text-xs"
                      >
                        <option value="DR">DR (Debit)</option>
                        <option value="CR">CR (Credit)</option>
                        <option value="SEPARATOR">Separator Row</option>
                      </select>
                      <input
                        type="text"
                        value={row.accountName || ''}
                        onChange={(e) => updateJournalRow(jeIdx, rIdx, 'accountName', e.target.value)}
                        placeholder="Account Ledger Name"
                        className="col-span-5 px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                        disabled={row.rowType === 'SEPARATOR'}
                      />
                      <input
                        type="number"
                        value={row.drAmount || ''}
                        onChange={(e) => updateJournalRow(jeIdx, rIdx, 'drAmount', e.target.value ? Number(e.target.value) : '')}
                        placeholder="Dr Amount"
                        className="col-span-2 px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                        disabled={row.rowType === 'CR' || row.rowType === 'SEPARATOR'}
                      />
                      <input
                        type="number"
                        value={row.crAmount || ''}
                        onChange={(e) => updateJournalRow(jeIdx, rIdx, 'crAmount', e.target.value ? Number(e.target.value) : '')}
                        placeholder="Cr Amount"
                        className="col-span-2 px-2 py-1 bg-[#F4F3F0] border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                        disabled={row.rowType === 'DR' || row.rowType === 'SEPARATOR'}
                      />
                      <button
                        type="button"
                        onClick={() => removeJournalRow(jeIdx, rIdx)}
                        className="col-span-1 text-center text-[#76767E] hover:text-[#C0392B]"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#76767E] mb-1">
                    Narration Clause
                  </label>
                  <input
                    type="text"
                    value={je.jeNarration || ''}
                    onChange={(e) => updateJournalEntry(jeIdx, 'jeNarration', e.target.value)}
                    placeholder="e.g. (Being machinery depreciation charged via SLM method)"
                    className="w-full px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* D. Accounting Illustrations */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                Practical Illustrations
              </h2>
              <button
                type="button"
                onClick={addIllustration}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add Illustration
              </button>
            </div>

            {illustrations.map((illus, idx) => (
              <div key={idx} className="border border-[#E2E1DD] p-4 rounded-md relative space-y-3 bg-[#FAFAF8]">
                <button
                  type="button"
                  onClick={() => removeIllustration(idx)}
                  className="absolute right-2 top-2 text-[#76767E] hover:text-[#C0392B]"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#76767E] mb-1">Illustration Title</label>
                    <input
                      type="text"
                      value={illus.illusTitle}
                      onChange={(e) => updateIllustration(idx, 'illusTitle', e.target.value)}
                      placeholder="e.g. Illustration 1: Depreciation calculation"
                      className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#76767E] mb-1">Difficulty</label>
                    <select
                      value={illus.illusDifficulty}
                      onChange={(e) => updateIllustration(idx, 'illusDifficulty', e.target.value)}
                      className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E]"
                    >
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Scenario Question</label>
                  <textarea
                    value={illus.illusScenario || ''}
                    onChange={(e) => updateIllustration(idx, 'illusScenario', e.target.value)}
                    rows={2}
                    placeholder="Describe the transaction scenario..."
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Working Notes & Calculation</label>
                  <textarea
                    value={illus.illusWorking || ''}
                    onChange={(e) => updateIllustration(idx, 'illusWorking', e.target.value)}
                    rows={2}
                    placeholder="Show formulas and step-by-step numbers..."
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#76767E] mb-1">Final Answer / Treatment</label>
                  <textarea
                    value={illus.illusAnswer || ''}
                    onChange={(e) => updateIllustration(idx, 'illusAnswer', e.target.value)}
                    rows={2}
                    placeholder="State the ledger placement or final disclosure..."
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* E. Callout Notes */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                Callout Notes (Alerts)
              </h2>
              <button
                type="button"
                onClick={addNote}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add Note
              </button>
            </div>

            {notes.map((note, idx) => (
              <div key={idx} className="border border-[#E2E1DD] p-4 rounded-md relative space-y-3 bg-[#FAFAF8]">
                <button
                  type="button"
                  onClick={() => removeNote(idx)}
                  className="absolute right-2 top-2 text-[#76767E] hover:text-[#C0392B]"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#76767E] mb-1">Note Type</label>
                    <select
                      value={note.noteType}
                      onChange={(e) => updateNote(idx, 'noteType', e.target.value)}
                      className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E]"
                    >
                      <option value="NOTE">Standard Note</option>
                      <option value="IMPORTANT">Important Notice</option>
                      <option value="TIP">Study Tip / Guideline</option>
                      <option value="CAUTION">Caution / Compliance Warning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#76767E] mb-1">Optional Note Title</label>
                    <input
                      type="text"
                      value={note.noteTitle || ''}
                      onChange={(e) => updateNote(idx, 'noteTitle', e.target.value)}
                      placeholder="Note Headline"
                      className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                    />
                  </div>
                </div>
                <textarea
                  value={note.noteBody}
                  onChange={(e) => updateNote(idx, 'noteBody', e.target.value)}
                  rows={2}
                  placeholder="Enter the message body..."
                  className="w-full px-3 py-1.5 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                />
              </div>
            ))}
          </div>

          {/* F. FAQs */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                Frequently Asked Questions (FAQs)
              </h2>
              <button
                type="button"
                onClick={addFAQ}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add FAQ
              </button>
            </div>

            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E2E1DD] p-4 rounded-md relative space-y-3 bg-[#FAFAF8]">
                <button
                  type="button"
                  onClick={() => removeFAQ(idx)}
                  className="absolute right-2 top-2 text-[#76767E] hover:text-[#C0392B]"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#76767E] mb-1">FAQ Category</label>
                    <select
                      value={faq.faqCategory || 'GENERAL'}
                      onChange={(e) => updateFAQ(idx, 'faqCategory', e.target.value)}
                      className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-2 py-1.5 text-xs text-[#1C1C1E]"
                    >
                      <option value="GENERAL">General Guidance</option>
                      <option value="APPLICABILITY">Applicability & Limits</option>
                      <option value="RECOGNITION">Recognition rules</option>
                      <option value="MEASUREMENT">Measurement bases</option>
                      <option value="EXAM">Exam context</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#76767E] mb-1">Source Paragraph Citation</label>
                    <input
                      type="text"
                      value={faq.faqSourceRef || ''}
                      onChange={(e) => updateFAQ(idx, 'faqSourceRef', e.target.value)}
                      placeholder="e.g. Paragraph 12 of Standard"
                      className="w-full px-3 py-1.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  value={faq.faqQuestion}
                  onChange={(e) => updateFAQ(idx, 'faqQuestion', e.target.value)}
                  placeholder="Enter the FAQ Question..."
                  className="w-full px-3 py-1.5 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                />
                <textarea
                  value={faq.faqAnswer}
                  onChange={(e) => updateFAQ(idx, 'faqAnswer', e.target.value)}
                  rows={2}
                  placeholder="Enter the FAQ Answer..."
                  className="w-full px-3 py-1.5 bg-white border border-[#E2E1DD] rounded-md text-xs text-[#1C1C1E]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Videos Manager */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                Linked Video References
              </h2>
              <button
                type="button"
                onClick={addVideo}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add Video
              </button>
            </div>
            {videos.map((vid, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-[#FAFAF8] p-3 rounded-md border border-[#E2E1DD]">
                <input
                  type="text"
                  value={vid.resourceTitle}
                  onChange={(e) => updateVideo(idx, 'resourceTitle', e.target.value)}
                  placeholder="Video Title Description"
                  className="col-span-4 px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                />
                <input
                  type="url"
                  value={vid.resourceUrl}
                  onChange={(e) => updateVideo(idx, 'resourceUrl', e.target.value)}
                  placeholder="YouTube Video URL"
                  className="col-span-4 px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                />
                <input
                  type="text"
                  value={vid.videoChannel}
                  onChange={(e) => updateVideo(idx, 'videoChannel', e.target.value)}
                  placeholder="Channel Name"
                  className="col-span-3 px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                />
                <button
                  type="button"
                  onClick={() => removeVideo(idx)}
                  className="col-span-1 text-center text-[#76767E] hover:text-[#C0392B]"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* PDF/Static Reference documents */}
          <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2E1DD] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E]">
                Official Reference Links & Documents
              </h2>
              <button
                type="button"
                onClick={addReference}
                className="text-xs text-[#2D5BE3] font-semibold flex items-center gap-0.5"
              >
                <Plus size={10} /> Add Reference Document
              </button>
            </div>
            {references.map((ref, idx) => (
              <div key={idx} className="border border-[#E2E1DD] p-3 rounded-md space-y-2 bg-[#FAFAF8]">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={ref.resourceTitle}
                    onChange={(e) => updateReference(idx, 'resourceTitle', e.target.value)}
                    placeholder="Document Title (e.g. AS 1 Official MCA Notification)"
                    className="col-span-6 px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                  />
                  <select
                    value={ref.sourceType}
                    onChange={(e) => updateReference(idx, 'sourceType', e.target.value)}
                    className="col-span-3 bg-white border border-[#E2E1DD] rounded px-1.5 py-1 text-xs"
                  >
                    <option value="ICAI_OFFICIAL">ICAI Official</option>
                    <option value="MCA">MCA Government</option>
                    <option value="IASB">IASB International</option>
                    <option value="EXTERNAL">External Reference</option>
                  </select>
                  <input
                    type="number"
                    value={ref.refYear || ''}
                    onChange={(e) => updateReference(idx, 'refYear', Number(e.target.value))}
                    placeholder="Year"
                    className="col-span-2 px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                  />
                  <button
                    type="button"
                    onClick={() => removeReference(idx)}
                    className="col-span-1 text-center text-[#76767E] hover:text-[#C0392B]"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <input
                  type="url"
                  value={ref.resourceUrl || ''}
                  onChange={(e) => updateReference(idx, 'resourceUrl', e.target.value)}
                  placeholder="Direct document hyperlink URL..."
                  className="w-full px-2 py-1 bg-white border border-[#E2E1DD] rounded text-xs text-[#1C1C1E]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PUBLISH */}
      {activeTab === 'publish' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E] border-b border-[#E2E1DD] pb-2">
              Pre-Publication Verification
            </h2>
            <p className="text-xs text-[#76767E] mt-1">
              Verify your entry against standard publishing guidelines before committing updates.
            </p>
          </div>

          <div className="space-y-2.5">
            {checks.map((check, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[#FAFAF8] rounded border border-[#E2E1DD]">
                <span className="text-xs font-semibold text-[#4A4A52]">{check.name}</span>
                {check.passed ? (
                  <span className="bg-[#E8F7EE] text-[#1A7A4A] px-2 py-0.5 rounded text-[10px] font-bold">PASSED</span>
                ) : (
                  <span className="bg-[#FEF6E4] text-[#B45309] px-2 py-0.5 rounded text-[10px] font-bold">PENDING / ADVISORY</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-[#E2E1DD]">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={isPending}
              className="bg-[#EEECEA] hover:bg-[#E2E1DD] text-[#1C1C1E] px-4 py-2.5 rounded-md text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isPending || !allPassed}
              className="bg-[#1A7A4A] hover:bg-[#15613B] text-white px-5 py-2.5 rounded-md text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
            >
              <span>{isPending ? 'Publishing...' : 'Confirm & Publish'}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
