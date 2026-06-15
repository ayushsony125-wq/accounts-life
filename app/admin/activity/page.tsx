import { verifyAdminSession } from '../session'
import prisma from '@/lib/db'
import ActivityLogClient from './ActivityLogClient'

export const dynamic = 'force-dynamic'

export default async function ActivityLogPage() {
  await verifyAdminSession()

  let logs: any[] = []
  try {
    logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    })
  } catch {
    // auditLog table may not exist yet — show empty state
  }

  // Serialize dates for client component
  const serializedLogs = logs.map((log) => ({
    id: log.id,
    action: log.action as string,
    description: log.description as string | null,
    entityType: log.entityType as string | null,
    entityId: log.entityId as string | null,
    userEmail: log.userEmail as string | null,
    ipAddress: log.ipAddress as string | null,
    createdAt: log.createdAt instanceof Date ? log.createdAt.toISOString() : log.createdAt,
  }))

  return <ActivityLogClient logs={serializedLogs} />
}
