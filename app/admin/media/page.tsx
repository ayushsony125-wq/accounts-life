import { verifyAdminSession } from '../session'
import prisma from '@/lib/db'
import MediaLibraryClient from './MediaLibraryClient'

export const dynamic = 'force-dynamic'

export default async function MediaLibraryPage() {
  await verifyAdminSession()

  let pdfs: any[] = []
  let videos: any[] = []
  let standards: any[] = []

  const useDatabase = process.env.DATABASE_URL ? true : false

  if (useDatabase) {
    try {
      const resources = await prisma.entryResource.findMany({
        where: {
          resourceType: { in: ['PDF', 'VIDEO'] },
        },
        include: {
          entry: {
            select: {
              id: true,
              entryTitle: true,
              entrySlug: true,
              entryType: true,
              status: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      })

      pdfs = resources.filter((r) => r.resourceType === 'PDF')
      videos = resources.filter((r) => r.resourceType === 'VIDEO')

      standards = await prisma.entry.findMany({
        where: { entryType: 'STANDARD' },
        select: {
          id: true,
          entryTitle: true,
          entrySlug: true,
          status: true,
        },
        orderBy: { entryTitle: 'asc' },
      })
    } catch (e) {
      console.error('MediaLibraryPage: DB fetch failed:', e)
    }
  }

  return (
    <MediaLibraryClient
      pdfs={pdfs}
      videos={videos}
      standards={standards}
    />
  )
}
