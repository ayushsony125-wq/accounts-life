'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Check,
  RotateCcw,
  AlertTriangle,
  Play,
  Save,
  ChevronRight,
  Eye,
  PlusCircle,
  HelpCircle
} from 'lucide-react'
import { saveHomepageConfig } from '../actions'

// ─── Default Static Configuration Fallbacks ───────────────────────────────────

const DEFAULT_SECTIONS_ORDER = ['hero', 'domains', 'updates', 'quickaccess', 'accuracy']

const DEFAULT_POPULAR_SEARCHES = [
  { label: 'AS 1 Disclosure', href: '/search?q=AS+1' },
  { label: 'Revenue Recognition', href: '/search?q=Revenue+Recognition' },
  { label: 'ITR Due Dates', href: '/search?q=ITR+Due+Dates' },
  { label: 'Audit Evidence', href: '/search?q=Audit+Evidence' },
  { label: 'Input Tax Credit', href: '/search?q=Input+Tax+Credit' },
  { label: 'Transfer Pricing', href: '/search?q=Transfer+Pricing' },
]

const DEFAULT_TRUST_POINTS = [
  'Backed by ICAI, Government & Official Sources',
  'Simple Language, Practical Understanding',
  'Section, Rule, Notification with Every Answer',
  'Study Material & Curated Video Lectures',
  'For Students, Articles & Practising Professionals',
]

const DEFAULT_DOMAINS_CARDS = [
  { id: 'accounts', code: 'ACC', name: 'Accounts', description: 'Concepts, AS, Ind AS, Journal Entries, Financial Statements & Practical Guidance.', href: '/foundations', color: '#2D5BE3', IconName: 'BookOpen' },
  { id: 'audit', code: 'AUD', name: 'Audit', description: 'Standards on Auditing, Audit Procedures, CARO, Working Papers & Audit Guidance.', href: '/search?q=Audit', color: '#0F6B5E', IconName: 'ShieldCheck' },
  { id: 'income-tax', code: 'ITX', name: 'Income Tax', description: 'Sections, TDS, Returns, Assessments, Case Laws & Compliance.', href: '/search?q=Income+Tax', color: '#B45309', IconName: 'Calculator' },
  { id: 'gst', code: 'GST', name: 'GST', description: 'ITC, Registration, Returns, Compliance, Notices & Practical Issues.', href: '/search?q=GST', color: '#1A7A4A', IconName: 'TrendingUp' },
  { id: 'corporate-law', code: 'LAW', name: 'Corporate & Laws', description: 'Companies Act, LLP, ROC Compliance, Corporate Governance & More.', href: '/search?q=Corporate+Law', color: '#6B3FA0', IconName: 'Building2' },
  { id: 'fm-other', code: 'FM', name: 'Finance & Other', description: 'Ratios, Capital Budgeting, Cost of Capital, Analysis & Decision Making.', href: '/financial-analysis', color: '#5B6678', IconName: 'BarChart3' },
]

const DEFAULT_QUICK_LINKS = [
  { label: 'Standards Library', href: '/standards/as', description: 'AS, Ind AS, SA, IFRS & more', IconName: 'BookOpen', color: '#2D5BE3' },
  { label: 'Section Finder', href: '/search', description: 'Income Tax, GST & Companies Act', IconName: 'Search', color: '#0F6B5E' },
  { label: 'Case Laws', href: '/search?q=Case+Laws', description: 'Important judgments & rulings', IconName: 'Scale', color: '#6B3FA0' },
  { label: 'Forms & Checklists', href: '/search?q=Forms', description: 'Practical templates & checklists', IconName: 'FileText', color: '#B45309' },
  { label: 'Calculators', href: '/search?q=Calculators', description: 'Financial & Tax calculators', IconName: 'Calculator', color: '#1A7A4A' },
]

const DEFAULT_TODAYS_ESSENTIALS = [
  { id: 'due-dates', title: 'Income Tax Due Dates', subtitle: 'AY 2025-26', IconName: 'Calculator', color: '#B45309', href: '/search?q=Income+Tax+Due+Dates' },
  { id: 'gst-calendar', title: 'GST Return Calendar', subtitle: 'June 2025', IconName: 'Calendar', color: '#1A7A4A', href: '/search?q=GST+Return+Calendar' },
  { id: 'tds-rates', title: 'TDS Rates & Codes', subtitle: 'Assessment Year 2025-26', IconName: 'FileText', color: '#2D5BE3', href: '/search?q=TDS+Rates' },
  { id: 'mca-forms', title: 'Important Forms', subtitle: 'Companies Act, 2013', IconName: 'Building2', color: '#6B3FA0', href: '/search?q=MCA+Forms' },
]

const DEFAULT_ACCURACY_PILLARS = [
  { IconName: 'ShieldCheck', title: 'Verified Sources', body: 'Content from official authorities only' },
  { IconName: 'CheckCircle2', title: 'Expert Reviewed', body: 'Reviewed by professionals & subject experts' },
  { IconName: 'FileText', title: 'Plain & Practical', body: 'Simple language with practical insights' },
  { IconName: 'RefreshCw', title: 'Always Updated', body: 'Real-time updates on laws, rules & amendments' },
  { IconName: 'CheckCircle2', title: '100% Reliable', body: 'Trusted by professionals across India' },
]

const DEFAULT_DOMAINS_LINKS = [
  { label: 'Accounts', href: '/foundations' },
  { label: 'Audit', href: '/search?q=Audit' },
  { label: 'Income Tax', href: '/search?q=Income+Tax' },
  { label: 'GST', href: '/search?q=GST' },
  { label: 'Corporate & Laws', href: '/search?q=Corporate+Law' },
  { label: 'Finance & Other', href: '/financial-analysis' },
]

const DEFAULT_RESOURCES_LINKS = [
  { label: 'Standards Library', href: '/standards/as' },
  { label: 'Section Finder', href: '/search' },
  { label: 'Case Laws', href: '/search?q=Case+Laws' },
  { label: 'Forms & Checklists', href: '/search?q=Forms' },
  { label: 'Calculators', href: '/search?q=Calculators' },
  { label: 'Latest Updates', href: '/search' },
]

const DEFAULT_PLATFORM_LINKS = [
  { label: 'Search', href: '/search' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Sitemap', href: '/sitemap.xml' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

interface ClientProps {
  initialLayoutConfig: any
  initialFooterConfig: any
}

export default function HomepageConfigClient({ initialLayoutConfig, initialFooterConfig }: ClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'layout' | 'hero' | 'videos' | 'footer' | 'preview'>('layout')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // ─── CMS Configurations State ──────────────────────────────────────────────
  const [sectionsOrder, setSectionsOrder] = useState<string[]>(
    initialLayoutConfig?.sectionsOrder || DEFAULT_SECTIONS_ORDER
  )
  const [heroTitle, setHeroTitle] = useState(initialLayoutConfig?.heroTitle || "The Operating System for")
  const [heroTitleSpan, setHeroTitleSpan] = useState(initialLayoutConfig?.heroTitleSpan || "Professional Excellence")
  const [heroSubtitle, setHeroSubtitle] = useState(
    initialLayoutConfig?.heroSubtitle ||
      "Trusted explanations. Exact legal support. Official sources. Practical notes. Curated videos. Everything a professional needs."
  )
  const [popularSearches, setPopularSearches] = useState<any[]>(
    initialLayoutConfig?.popularSearches || DEFAULT_POPULAR_SEARCHES
  )
  const [trustPoints, setTrustPoints] = useState<string[]>(
    initialLayoutConfig?.trustPoints || DEFAULT_TRUST_POINTS
  )
  const [domainsHeading, setDomainsHeading] = useState(initialLayoutConfig?.domainsHeading || "Explore by Domain")
  const [domainsSubheading, setDomainsSubheading] = useState(
    initialLayoutConfig?.domainsSubheading ||
      "Choose a subject to access structured knowledge, laws, standards, and practical guidance."
  )
  const [updatesHeading, setUpdatesHeading] = useState(initialLayoutConfig?.updatesHeading || "Latest Updates")
  const [updatesSubheading, setUpdatesSubheading] = useState(
    initialLayoutConfig?.updatesSubheading || "Stay informed with important notifications, circulars & professional updates."
  )
  const [quickAccessHeading, setQuickAccessHeading] = useState(
    initialLayoutConfig?.quickAccessHeading || "Quick Access"
  )
  const [quickAccessSubheading, setQuickAccessSubheading] = useState(
    initialLayoutConfig?.quickAccessSubheading || "Everything you need, right at your fingertips."
  )
  const [accuracyHeading, setAccuracyHeading] = useState(
    initialLayoutConfig?.accuracyHeading || "Built for Accuracy. Designed for Professionals."
  )

  // Curated videos list
  const [videosHeading, setVideosHeading] = useState(initialLayoutConfig?.videosHeading || "Curated Video Library")
  const [videosSubheading, setVideosSubheading] = useState(
    initialLayoutConfig?.videosSubheading || "Watch expert lectures and regulatory updates."
  )
  const [videosItems, setVideosItems] = useState<any[]>(initialLayoutConfig?.videosItems || [])

  // Footer Link columns
  const [domainsLinks, setDomainsLinks] = useState<any[]>(initialFooterConfig?.domainsLinks || DEFAULT_DOMAINS_LINKS)
  const [resourcesLinks, setResourcesLinks] = useState<any[]>(
    initialFooterConfig?.resourcesLinks || DEFAULT_RESOURCES_LINKS
  )
  const [platformLinks, setPlatformLinks] = useState<any[]>(
    initialFooterConfig?.platformLinks || DEFAULT_PLATFORM_LINKS
  )

  // ─── Temp inputs for adding lists ──────────────────────────────────────────
  const [newSearchLabel, setNewSearchLabel] = useState('')
  const [newSearchHref, setNewSearchHref] = useState('')
  const [newTrustPoint, setNewTrustPoint] = useState('')
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [newVideoDesc, setNewVideoDesc] = useState('')

  const [newFooterLabel, setNewFooterLabel] = useState('')
  const [newFooterHref, setNewFooterHref] = useState('')
  const [footerColTarget, setFooterColTarget] = useState<'domains' | 'resources' | 'platform'>('domains')

  // Validation Warnings
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const validateLink = (href: string): boolean => {
    if (!href) return false
    return href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://')
  }

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
    const vimeoRegExp = /vimeo\.com\/(\d+)/
    const vimeoMatch = url.match(vimeoRegExp)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }
    return null
  }

  // ─── List Action Handlers ──────────────────────────────────────────────────

  const addPopularSearch = () => {
    if (!newSearchLabel.trim() || !newSearchHref.trim()) return
    if (!validateLink(newSearchHref)) {
      alert('Invalid Link URL. Must start with "/" or "http:///https://"')
      return
    }
    setPopularSearches([...popularSearches, { label: newSearchLabel.trim(), href: newSearchHref.trim() }])
    setNewSearchLabel('')
    setNewSearchHref('')
  }

  const deletePopularSearch = (idx: number) => {
    setPopularSearches(popularSearches.filter((_, i) => i !== idx))
  }

  const addTrustPoint = () => {
    if (!newTrustPoint.trim()) return
    setTrustPoints([...trustPoints, newTrustPoint.trim()])
    setNewTrustPoint('')
  }

  const deleteTrustPoint = (idx: number) => {
    setTrustPoints(trustPoints.filter((_, i) => i !== idx))
  }

  const addVideo = () => {
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return
    const embed = getEmbedUrl(newVideoUrl)
    if (!embed) {
      alert('Invalid Video URL. Please supply a valid YouTube or Vimeo link.')
      return
    }
    setVideosItems([
      ...videosItems,
      { title: newVideoTitle.trim(), url: newVideoUrl.trim(), description: newVideoDesc.trim() }
    ])
    setNewVideoTitle('')
    setNewVideoUrl('')
    setNewVideoDesc('')
  }

  const deleteVideo = (idx: number) => {
    if (confirm('Are you sure you want to delete this video embed?')) {
      setVideosItems(videosItems.filter((_, i) => i !== idx))
    }
  }

  const addFooterLink = () => {
    if (!newFooterLabel.trim() || !newFooterHref.trim()) return
    if (!validateLink(newFooterHref)) {
      alert('Invalid Link URL. Must start with "/" or "http:///https://"')
      return
    }
    const newItem = { label: newFooterLabel.trim(), href: newFooterHref.trim() }
    if (footerColTarget === 'domains') {
      setDomainsLinks([...domainsLinks, newItem])
    } else if (footerColTarget === 'resources') {
      setResourcesLinks([...resourcesLinks, newItem])
    } else {
      setPlatformLinks([...platformLinks, newItem])
    }
    setNewFooterLabel('')
    setNewFooterHref('')
  }

  const deleteFooterLink = (col: 'domains' | 'resources' | 'platform', idx: number) => {
    if (confirm('Are you sure you want to delete this link?')) {
      if (col === 'domains') {
        setDomainsLinks(domainsLinks.filter((_, i) => i !== idx))
      } else if (col === 'resources') {
        setResourcesLinks(resourcesLinks.filter((_, i) => i !== idx))
      } else {
        setPlatformLinks(platformLinks.filter((_, i) => i !== idx))
      }
    }
  }

  // ─── Section Re-ordering ───────────────────────────────────────────────────

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const nextOrder = [...sectionsOrder]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= nextOrder.length) return

    // Swap elements
    const temp = nextOrder[index]
    nextOrder[index] = nextOrder[targetIndex]
    nextOrder[targetIndex] = temp
    setSectionsOrder(nextOrder)
  }

  const toggleSectionState = (section: string) => {
    if (sectionsOrder.includes(section)) {
      if (sectionsOrder.length <= 1) {
        alert('You must keep at least one active section on the homepage.')
        return
      }
      setSectionsOrder(sectionsOrder.filter((s) => s !== section))
    } else {
      // Add section to the end
      setSectionsOrder([...sectionsOrder, section])
    }
  }

  // ─── Save & Reset Actions ──────────────────────────────────────────────────

  const resetToDefaults = () => {
    if (confirm('CAUTION: Are you sure you want to discard all CMS modifications and reset the homepage to the default design?')) {
      setSectionsOrder(DEFAULT_SECTIONS_ORDER)
      setHeroTitle("The Operating System for")
      setHeroTitleSpan("Professional Excellence")
      setHeroSubtitle("Trusted explanations. Exact legal support. Official sources. Practical notes. Curated videos. Everything a professional needs.")
      setPopularSearches(DEFAULT_POPULAR_SEARCHES)
      setTrustPoints(DEFAULT_TRUST_POINTS)
      setDomainsHeading("Explore by Domain")
      setDomainsSubheading("Choose a subject to access structured knowledge, laws, standards, and practical guidance.")
      setUpdatesHeading("Latest Updates")
      setUpdatesSubheading("Stay informed with important notifications, circulars & professional updates.")
      setQuickAccessHeading("Quick Access")
      setQuickAccessSubheading("Everything you need, right at your fingertips.")
      setAccuracyHeading("Built for Accuracy. Designed for Professionals.")
      setVideosHeading("Curated Video Library")
      setVideosSubheading("Watch expert lectures and regulatory updates.")
      setVideosItems([])
      setDomainsLinks(DEFAULT_DOMAINS_LINKS)
      setResourcesLinks(DEFAULT_RESOURCES_LINKS)
      setPlatformLinks(DEFAULT_PLATFORM_LINKS)
      setMessage({ type: 'success', text: 'All options restored to default approved parameters.' })
    }
  }

  const handlePublish = async () => {
    setLoading(true)
    setMessage(null)

    // Build configuration objects
    const layoutConfig = {
      sectionsOrder,
      heroTitle,
      heroTitleSpan,
      heroSubtitle,
      popularSearches,
      trustPoints,
      domainsHeading,
      domainsSubheading,
      updatesHeading,
      updatesSubheading,
      quickAccessHeading,
      quickAccessSubheading,
      accuracyHeading,
      videosHeading,
      videosSubheading,
      videosItems
    }

    const footerConfig = {
      domainsLinks,
      resourcesLinks,
      platformLinks
    }

    try {
      const resLayout = await saveHomepageConfig('homepage_layout_config', layoutConfig)
      const resFooter = await saveHomepageConfig('footer_config', footerConfig)

      if (resLayout.success && resFooter.success) {
        setMessage({ type: 'success', text: 'CMS configurations published successfully to production!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: 'Failed to publish settings.' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred during save.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E2E1DD] pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
            Homepage Configuration
          </h1>
          <p className="text-xs text-[#76767E] mt-1">
            Safely customize section layouts, text, headings, footer columns, and video content parameters.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={resetToDefaults}
            disabled={loading}
            className="flex items-center gap-1.5 border border-[#C8C7C2] bg-white hover:bg-[#F4F3F0] text-gray-700 px-4 py-2 rounded-md text-xs font-semibold transition-all disabled:opacity-60 shadow-xs"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-bold transition-all disabled:opacity-60 shadow-xs"
          >
            <Save size={14} />
            <span>{loading ? 'Publishing...' : 'Publish Live'}</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-start gap-2.5 p-4 rounded-md text-xs border ${
            message.type === 'success'
              ? 'bg-[#E8F7EE] text-[#1A7A4A] border-[#C5E9D4]'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          <Check size={14} className="shrink-0 mt-0.5" />
          <span className="font-semibold">{message.text}</span>
        </div>
      )}

      {/* Tabs list */}
      <div className="flex border-b border-[#E2E1DD] gap-2 overflow-x-auto pb-px">
        {[
          { id: 'layout', label: 'Layout & Headings' },
          { id: 'hero', label: 'Hero & Trust Card' },
          { id: 'videos', label: 'Curated Videos' },
          { id: 'footer', label: 'Footer Links' },
          { id: 'preview', label: 'Review Config' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap -mb-px ${
              activeTab === tab.id
                ? 'border-[#2D5BE3] text-[#2D5BE3]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB 1: Layout & Headings ─── */}
      {activeTab === 'layout' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-8 shadow-xs">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
              Homepage Layout Re-ordering
            </h2>
            <p className="text-xs text-[#76767E] mb-4">
              Control the sequence of elements appearing on the homepage. Toggle sections on/off or change their vertical order.
            </p>

            <div className="space-y-2 max-w-xl">
              {sectionsOrder.map((section, idx) => (
                <div
                  key={section}
                  className="flex items-center justify-between p-3.5 bg-[#FAFAF8] border border-[#E2E1DD] rounded-lg text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-gray-400 font-semibold">{idx + 1}</span>
                    <span className="font-bold text-[#1C1C1E] capitalize">
                      {section === 'quickaccess' ? 'Quick Access' : section} Section
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => moveSection(idx, 'down')}
                      disabled={idx === sectionsOrder.length - 1}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      onClick={() => toggleSectionState(section)}
                      className="text-red-600 hover:text-red-800 p-1 font-semibold hover:bg-red-50 rounded ml-1"
                      title="Disable section"
                    >
                      Hide
                    </button>
                  </div>
                </div>
              ))}

              {/* Disabled/Hidden sections pool */}
              {['hero', 'domains', 'updates', 'quickaccess', 'accuracy', 'videos']
                .filter((s) => !sectionsOrder.includes(s))
                .map((section) => (
                  <div
                    key={section}
                    className="flex items-center justify-between p-3.5 bg-gray-50 border border-dashed border-[#C8C7C2] rounded-lg text-xs opacity-60"
                  >
                    <span className="font-bold text-gray-500 capitalize">{section} Section (Hidden)</span>
                    <button
                      onClick={() => toggleSectionState(section)}
                      className="text-green-700 hover:text-green-900 font-bold hover:bg-green-50 p-1 px-2 rounded"
                    >
                      Enable Section
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <hr className="border-[#E2E1DD]" />

          {/* Section Headings Control */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
              Section Heading Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Explore by Domain Heading
                </label>
                <input
                  type="text"
                  value={domainsHeading}
                  onChange={(e) => setDomainsHeading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Explore by Domain Subheading
                </label>
                <input
                  type="text"
                  value={domainsSubheading}
                  onChange={(e) => setDomainsSubheading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Latest Updates Heading
                </label>
                <input
                  type="text"
                  value={updatesHeading}
                  onChange={(e) => setUpdatesHeading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Latest Updates Subheading
                </label>
                <input
                  type="text"
                  value={updatesSubheading}
                  onChange={(e) => setUpdatesSubheading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Quick Access Heading
                </label>
                <input
                  type="text"
                  value={quickAccessHeading}
                  onChange={(e) => setQuickAccessHeading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Quick Access Subheading
                </label>
                <input
                  type="text"
                  value={quickAccessSubheading}
                  onChange={(e) => setQuickAccessSubheading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Accuracy Banner Heading
                </label>
                <input
                  type="text"
                  value={accuracyHeading}
                  onChange={(e) => setAccuracyHeading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Hero & Trust Card ─── */}
      {activeTab === 'hero' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
            Hero Headline & Copy Parameters
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Headline Primary
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Headline Blue Highlight (Span)
                </label>
                <input
                  type="text"
                  value={heroTitleSpan}
                  onChange={(e) => setHeroTitleSpan(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs font-bold text-[#2D5BE3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                Supporting Sub-headline Copy
              </label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs leading-relaxed"
              />
            </div>
          </div>

          <hr className="border-[#E2E1DD]" />

          {/* Popular searches list */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">
              Popular Search Quick Chips
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
              {popularSearches.map((s, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-xs bg-[#EEF2FD] text-[#2D5BE3] border border-[#D0DCFA] px-2.5 py-1 rounded-full font-medium"
                >
                  <span>{s.label}</span>
                  <button
                    onClick={() => deletePopularSearch(idx)}
                    className="hover:text-red-700 font-bold ml-1"
                    title="Remove chip"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add Popular Search Inline Form */}
            <div className="flex flex-wrap gap-2.5 max-w-xl bg-[#FAFAF8] p-3 rounded-lg border border-[#E2E1DD]">
              <div className="flex-1 min-w-[150px]">
                <input
                  type="text"
                  placeholder="Chip Label (e.g. AS 1)"
                  value={newSearchLabel}
                  onChange={(e) => setNewSearchLabel(e.target.value)}
                  className="w-full px-2 py-1.5 border border-[#E2E1DD] rounded text-xs bg-white"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search Link (e.g. /search?q=AS+1)"
                  value={newSearchHref}
                  onChange={(e) => setNewSearchHref(e.target.value)}
                  className="w-full px-2 py-1.5 border border-[#E2E1DD] rounded text-xs bg-white"
                />
              </div>
              <button
                type="button"
                onClick={addPopularSearch}
                className="bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <Plus size={12} /> Add
              </button>
            </div>
          </div>

          <hr className="border-[#E2E1DD]" />

          {/* Trust Points list */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">
              Trust Points Checklist
            </h3>

            <div className="space-y-2 max-w-xl">
              {trustPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#FAFAF8] border border-[#E2E1DD] p-2.5 rounded text-xs text-gray-700"
                >
                  <span className="flex items-center gap-2">
                    <Check size={12} className="text-[#2D5BE3]" />
                    {point}
                  </span>
                  <button
                    onClick={() => deleteTrustPoint(idx)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete trust point"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 max-w-xl">
              <input
                type="text"
                placeholder="New trust point text..."
                value={newTrustPoint}
                onChange={(e) => setNewTrustPoint(e.target.value)}
                className="flex-1 px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
              />
              <button
                onClick={addTrustPoint}
                className="bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-bold shadow-xs flex items-center gap-1"
              >
                <Plus size={12} /> Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: Curated Videos ─── */}
      {activeTab === 'videos' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
              Featured Video Management
            </h2>
            <p className="text-xs text-[#76767E] mb-4">
              Add professional tutorials, ICAI circular explanations, or expert guidance videos to the homepage. YouTube and Vimeo embeds are fully supported.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Videos Section Title
                </label>
                <input
                  type="text"
                  value={videosHeading}
                  onChange={(e) => setVideosHeading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Videos Section Subtitle
                </label>
                <input
                  type="text"
                  value={videosSubheading}
                  onChange={(e) => setVideosSubheading(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs"
                />
              </div>
            </div>
          </div>

          <hr className="border-[#E2E1DD]" />

          {/* Add video form */}
          <div className="bg-[#FAFAF8] border border-[#E2E1DD] p-5 rounded-lg space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">
              Add Video Embed Resource
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Video Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. ICAI Guidance Note on CARO 2020"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  YouTube or Vimeo URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Video Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Brief summary of what this video discusses..."
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] rounded-md text-xs bg-white"
                />
              </div>
            </div>

            <button
              onClick={addVideo}
              className="bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle size={14} /> Validate & Add Video
            </button>
          </div>

          <hr className="border-[#E2E1DD]" />

          {/* Videos listing */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">
              Current Configured Videos ({videosItems.length})
            </h3>

            {videosItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videosItems.map((vid, idx) => {
                  const embed = getEmbedUrl(vid.url)
                  return (
                    <div
                      key={idx}
                      className="border border-[#E2E1DD] rounded-lg overflow-hidden flex flex-col justify-between bg-[#FAFAF8]"
                    >
                      {embed ? (
                        <div className="aspect-video w-full">
                          <iframe
                            src={embed}
                            title={vid.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-gray-100 flex items-center justify-center text-xs text-red-600 font-semibold gap-1.5 p-4 text-center">
                          <AlertTriangle size={16} />
                          Invalid Embed URL
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{vid.title}</h4>
                          <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{vid.description || 'No description provided.'}</p>
                        </div>
                        <button
                          onClick={() => deleteVideo(idx)}
                          className="mt-3 text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1 self-start"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic py-4">No curated videos added yet. Add some above.</p>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 4: Footer Links ─── */}
      {activeTab === 'footer' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-8 shadow-xs">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
              Footer Navigation Link Manager
            </h2>
            <p className="text-xs text-[#76767E] mb-4">
              Add or remove navigation links across the three main columns of the website footer. All link URLs are validated before addition.
            </p>

            {/* Link columns layout grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Column 1: Domains */}
              <div className="border border-[#E2E1DD] p-4 rounded-lg bg-gray-50/50 space-y-3">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-[#E2E1DD] pb-2">
                  1. Domains Column
                </h3>
                <ul className="space-y-1.5">
                  {domainsLinks.map((link, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center text-xs bg-white border border-[#E2E1DD] p-2 rounded hover:shadow-xs transition-shadow"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-gray-800 block truncate">{link.label}</span>
                        <span className="text-[10px] text-gray-400 font-mono block truncate">{link.href}</span>
                      </div>
                      <button
                        onClick={() => deleteFooterLink('domains', idx)}
                        className="text-red-500 hover:text-red-700 shrink-0 ml-1.5"
                      >
                        <Trash2 size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Resources */}
              <div className="border border-[#E2E1DD] p-4 rounded-lg bg-gray-50/50 space-y-3">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-[#E2E1DD] pb-2">
                  2. Resources Column
                </h3>
                <ul className="space-y-1.5">
                  {resourcesLinks.map((link, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center text-xs bg-white border border-[#E2E1DD] p-2 rounded hover:shadow-xs transition-shadow"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-gray-800 block truncate">{link.label}</span>
                        <span className="text-[10px] text-gray-400 font-mono block truncate">{link.href}</span>
                      </div>
                      <button
                        onClick={() => deleteFooterLink('resources', idx)}
                        className="text-red-500 hover:text-red-700 shrink-0 ml-1.5"
                      >
                        <Trash2 size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Platform */}
              <div className="border border-[#E2E1DD] p-4 rounded-lg bg-gray-50/50 space-y-3">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-[#E2E1DD] pb-2">
                  3. Platform Column
                </h3>
                <ul className="space-y-1.5">
                  {platformLinks.map((link, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center text-xs bg-white border border-[#E2E1DD] p-2 rounded hover:shadow-xs transition-shadow"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-gray-800 block truncate">{link.label}</span>
                        <span className="text-[10px] text-gray-400 font-mono block truncate">{link.href}</span>
                      </div>
                      <button
                        onClick={() => deleteFooterLink('platform', idx)}
                        className="text-red-500 hover:text-red-700 shrink-0 ml-1.5"
                      >
                        <Trash2 size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <hr className="border-[#E2E1DD]" />

          {/* Add link form */}
          <div className="bg-[#FAFAF8] border border-[#E2E1DD] p-5 rounded-lg space-y-4 max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#76767E]">
              Add Footer Link
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Destination Column
                </label>
                <select
                  value={footerColTarget}
                  onChange={(e) => setFooterColTarget(e.target.value as any)}
                  className="w-full px-2.5 py-2 border border-[#E2E1DD] bg-white rounded-md text-xs"
                >
                  <option value="domains">1. Domains Column</option>
                  <option value="resources">2. Resources Column</option>
                  <option value="platform">3. Platform Column</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Link Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Careers"
                  value={newFooterLabel}
                  onChange={(e) => setNewFooterLabel(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] bg-white rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Link Href (URL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /contact"
                  value={newFooterHref}
                  onChange={(e) => setNewFooterHref(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E1DD] bg-white rounded-md text-xs"
                />
              </div>
            </div>

            <button
              onClick={addFooterLink}
              className="bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-4 py-2 rounded-md text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Plus size={14} /> Add Column Link
            </button>
          </div>
        </div>
      )}

      {/* ─── TAB 5: Review & Publish ─── */}
      {activeTab === 'preview' && (
        <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 space-y-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
            Review Configurations Before Publishing
          </h2>
          <p className="text-xs text-[#76767E] mb-4">
            Below is a summary of the layout order and settings that will go live immediately on the public website.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAF8] p-5 rounded-lg border border-[#E2E1DD] text-xs">
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 border-b border-[#E2E1DD] pb-1.5 uppercase tracking-wider text-[10px]">
                Active Layout Order
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                {sectionsOrder.map((s) => (
                  <li key={s} className="capitalize font-medium">
                    {s === 'quickaccess' ? 'Quick Access' : s} Section
                  </li>
                ))}
              </ol>

              <h3 className="font-bold text-gray-800 border-b border-[#E2E1DD] pb-1.5 uppercase tracking-wider text-[10px] pt-3">
                Hero Heading Parameters
              </h3>
              <p className="text-gray-700">
                <strong className="text-gray-500 font-medium">Title:</strong> &quot;{heroTitle}&quot;
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-500 font-medium">Highlight:</strong> &quot;{heroTitleSpan}&quot;
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 border-b border-[#E2E1DD] pb-1.5 uppercase tracking-wider text-[10px]">
                Footer Configuration
              </h3>
              <p className="text-gray-700">
                <strong className="text-gray-500 font-medium">Domain Links:</strong> {domainsLinks.length} items
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-500 font-medium">Resource Links:</strong> {resourcesLinks.length} items
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-500 font-medium">Platform Links:</strong> {platformLinks.length} items
              </p>

              <h3 className="font-bold text-gray-800 border-b border-[#E2E1DD] pb-1.5 uppercase tracking-wider text-[10px] pt-3">
                Curated Videos
              </h3>
              <p className="text-gray-700">
                <strong className="text-gray-500 font-medium">Active Embeds:</strong> {videosItems.length} items
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-5 py-2.5 rounded-md text-xs font-bold transition-all shadow-xs"
            >
              <Save size={14} />
              <span>{loading ? 'Publishing settings...' : 'Yes, Publish Live'}</span>
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className="border border-[#C8C7C2] bg-white hover:bg-[#F4F3F0] text-gray-700 px-5 py-2.5 rounded-md text-xs font-semibold"
            >
              Back to Editor
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
