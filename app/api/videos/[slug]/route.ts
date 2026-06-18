import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const params = await context.params
    const slug = params?.slug
    if (!slug) {
      return new NextResponse('Bad Request: Missing slug parameter', { status: 400 })
    }

    const cleanSlug = slug.toLowerCase().trim()
    const isNumeric = /^\d+$/.test(cleanSlug)
    const entryId = isNumeric ? parseInt(cleanSlug, 10) : undefined

    // 1. Try database first (primary source of truth for Vercel/serverless)
    const resource = await prisma.entryResource.findFirst({
      where: {
        resourceType: 'VIDEO',
        entry: entryId ? { id: entryId } : { entrySlug: cleanSlug },
      },
      include: {
        mediaFile: true
      }
    })

    if (resource) {
      if (resource.mediaFile && resource.mediaFile.filePath) {
        const url = resource.mediaFile.filePath
        if (url.startsWith('data:video/mp4;base64,')) {
          const base64Data = url.substring('data:video/mp4;base64,'.length)
          const buffer = Buffer.from(base64Data, 'base64')
          return new NextResponse(buffer, {
            headers: {
              'Content-Type': 'video/mp4',
              'Content-Disposition': `inline; filename="${cleanSlug}.mp4"`,
              'Cache-Control': 'public, max-age=86400'
            },
          })
        } else if (url.startsWith('data:') && url.includes('base64,')) {
          // Fallback for other mime types
          const parts = url.split('base64,')
          const buffer = Buffer.from(parts[1], 'base64')
          const contentType = url.match(/data:(.*?);/)?.[1] || 'video/mp4'
          return new NextResponse(buffer, {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition': `inline; filename="${cleanSlug}.mp4"`,
              'Cache-Control': 'public, max-age=86400'
            },
          })
        } else if (url.startsWith('http://') || url.startsWith('https://')) {
          return NextResponse.redirect(new URL(url))
        }
      }

      if (resource.resourceUrl) {
        const url = resource.resourceUrl
        if (url.startsWith('data:')) {
          const parts = url.split('base64,')
          const buffer = Buffer.from(parts[1], 'base64')
          const contentType = url.match(/data:(.*?);/)?.[1] || 'video/mp4'
          return new NextResponse(buffer, {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition': `inline; filename="${cleanSlug}.mp4"`,
              'Cache-Control': 'public, max-age=86400'
            },
          })
        } else if (url.startsWith('http://') || url.startsWith('https://')) {
          return NextResponse.redirect(new URL(url))
        }
      }
    }


    // 2. Fall back to local filesystem (secondary source of truth)
    const localPath = path.join(process.cwd(), 'public/videos', `${cleanSlug}.mp4`)
    try {
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath)
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'video/mp4',
            'Content-Disposition': `inline; filename="${cleanSlug}.mp4"`,
            'Cache-Control': 'public, max-age=31536000, immutable'
          },
        })
      }
    } catch (fsErr) {
      console.warn(`Local video file check failed for ${cleanSlug}:`, fsErr)
    }

    return new NextResponse(`Video standard mapping for "${cleanSlug}" not found in database or filesystem.`, { status: 404 })
  } catch (err: any) {
    console.error('API Video Route Server Error:', err)
    return new NextResponse(`Server Error: ${err.message || String(err)}`, { status: 500 })
  }
}
