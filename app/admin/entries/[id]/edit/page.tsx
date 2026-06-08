import { notFound } from 'next/navigation'
import { verifyAdminSession } from '../../../session'
import { getDomains, getAllEntries } from '@/lib/queries'
import EntryForm from '../../EntryForm'

interface EditPageProps {
  params: { id: string }
}

export const dynamic = 'force-dynamic'

export default async function EditEntryPage({ params }: EditPageProps) {
  verifyAdminSession()
  
  const [domains, entries] = await Promise.all([
    getDomains(),
    getAllEntries()
  ])
  
  const entry = entries.find((e) => e.id === Number(params.id))
  
  if (!entry) {
    notFound()
  }

  return <EntryForm initialEntry={entry} domains={domains} />
}
