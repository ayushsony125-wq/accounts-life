import { verifyAdminSession } from '../session'
import { getAllEntries } from '@/lib/queries'
import EntriesListClient from './EntriesListClient'

export const dynamic = 'force-dynamic'

export default async function EntriesPage() {
  await verifyAdminSession()
  const entries = await getAllEntries()

  return <EntriesListClient initialEntries={entries} />
}
