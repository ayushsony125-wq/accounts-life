import { verifyAdminSession } from '../../session'
import { getDomains } from '@/lib/queries'
import EntryForm from '../EntryForm'

export const dynamic = 'force-dynamic'

export default async function NewEntryPage() {
  await verifyAdminSession()
  const domains = await getDomains()

  return <EntryForm domains={domains} />
}
