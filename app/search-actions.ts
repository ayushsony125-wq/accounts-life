'use server'

import { getSearchIndex } from '@/lib/queries'

export interface SearchResultItem {
  id: number | string
  title: string
  slug: string
  type: string
  summary: string
  domainCode: string
  domainName: string
  domainSlug: string
  domainColorHex: string
}

export async function searchGlobalIndex(query: string): Promise<SearchResultItem[]> {
  const index = await getSearchIndex()
  if (!query.trim()) return []
  
  const lowerQuery = query.toLowerCase().trim()
  
  // Custom relevance scoring
  const scored = index.map(item => {
    let score = 0
    const lowerTitle = item.title.toLowerCase()
    const lowerSummary = item.summary.toLowerCase()
    
    if (lowerTitle === lowerQuery) {
      score += 100 // exact title match
    } else if (lowerTitle.startsWith(lowerQuery)) {
      score += 50 // title prefix match
    } else if (lowerTitle.includes(lowerQuery)) {
      score += 30 // title substring match
    } else if (lowerSummary.includes(lowerQuery)) {
      score += 10 // summary match
    } else if (item.domainName.toLowerCase().includes(lowerQuery)) {
      score += 5 // domain name match
    }
    
    return { item, score }
  })
  
  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.item)
    .slice(0, 10) // Return top 10 items
}
