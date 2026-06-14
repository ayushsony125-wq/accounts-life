import { notFound } from 'next/navigation'
import { verifyAdminSession } from '../../../session'
import { getDomains, getEntryById } from '@/lib/queries'
import EntryForm from '../../EntryForm'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function EditEntryPage({ params }: EditPageProps) {
  await verifyAdminSession()
  const { id } = await params
  
  const [domains, entry] = await Promise.all([
    getDomains(),
    getEntryById(Number(id))
  ])
  
  if (!entry) {
    notFound()
  }

  return <EntryForm initialEntry={entry} domains={domains} />
}
