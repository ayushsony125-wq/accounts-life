'use server'

import { fetchStandardDetail, Standard } from '@/lib/learning-loader'

/**
 * Fetches the full details of a specific Accounting Standard dynamically.
 */
export async function getStandardDetailAction(id: string, framework: 'AS' | 'Ind AS'): Promise<Standard | null> {
  try {
    return await fetchStandardDetail(id, framework)
  } catch (err) {
    console.error(`Error in getStandardDetailAction for ${id}:`, err)
    return null
  }
}
