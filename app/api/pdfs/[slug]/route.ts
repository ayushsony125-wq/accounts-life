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

    // 1. Try database first (primary source of truth)
    const resource = await prisma.entryResource.findFirst({
      where: {
        resourceType: 'PDF',
        entry: {
          entrySlug: cleanSlug,
        },
      },
      include: {
        mediaFile: true
      }
    })

    if (resource) {
      // Check the optimized mediaFile database mapping first
      if (resource.mediaFile && resource.mediaFile.filePath) {
        const fileUrl = resource.mediaFile.filePath
        if (fileUrl.startsWith('data:application/pdf;base64,')) {
          const base64Data = fileUrl.substring('data:application/pdf;base64,'.length)
          const buffer = Buffer.from(base64Data, 'base64')
          return new NextResponse(buffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `inline; filename="${cleanSlug}.pdf"`,
              'Cache-Control': 'public, max-age=86400'
            },
          })
        }
      }

      // Backwards compatibility fallback for legacy inline resourceUrl Base64 values
      if (resource.resourceUrl) {
        const url = resource.resourceUrl
        if (url.startsWith('data:application/pdf;base64,')) {
          const base64Data = url.substring('data:application/pdf;base64,'.length)
          const buffer = Buffer.from(base64Data, 'base64')
          return new NextResponse(buffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `inline; filename="${cleanSlug}.pdf"`,
              'Cache-Control': 'public, max-age=86400'
            },
          })
        } else if (url.startsWith('/pdfs/')) {
          const redirectUrl = new URL(url, request.url)
          return NextResponse.redirect(redirectUrl)
        }
      }
    }

    // 2. Fall back to local filesystem (secondary source of truth)
    const localPath = path.join(process.cwd(), 'public/pdfs', `${cleanSlug}.pdf`)
    try {
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath)
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${cleanSlug}.pdf"`,
            'Cache-Control': 'public, max-age=31536000, immutable'
          },
        })
      }
    } catch (fsErr) {
      console.warn(`Local file check failed for ${cleanSlug}:`, fsErr)
    }

    return new NextResponse(`PDF standard mapping for "${cleanSlug}" not found in database or filesystem.`, { status: 404 })
  } catch (err: any) {
    console.error('API PDF Route Server Error:', err)
    return new NextResponse(`Server Error: ${err.message || String(err)}`, { status: 500 })
  }
}
