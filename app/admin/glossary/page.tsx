import { verifyAdminSession } from '../session'
import { getGlossaryTerms } from '@/lib/queries'
import GlossaryManagerClient from './GlossaryManagerClient'

export const dynamic = 'force-dynamic'

export default async function GlossaryConfigPage() {
  verifyAdminSession()
  const terms = await getGlossaryTerms()

  return <GlossaryManagerClient initialTerms={terms} />
}
