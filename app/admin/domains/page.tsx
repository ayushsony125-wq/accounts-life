import { verifyAdminSession } from '../session'
import { getDomains } from '@/lib/queries'
import DomainsListClient from './DomainsListClient'

export const dynamic = 'force-dynamic'

export default async function DomainsConfigPage() {
  await verifyAdminSession()
  const domains = await getDomains()

  return <DomainsListClient initialDomains={domains} />
}
