import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/db'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'accounts-one-default-secret-key-321-at-least-32-chars-long'

function verifyToken(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return false
    const [expiryStr, signature] = parts
    const expiry = Number(expiryStr)
    if (isNaN(expiry) || expiry < Date.now()) return false
    const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(expiryStr).digest('hex')
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  } catch {
    return false
  }
}

async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!session) return false
  return verifyToken(session)
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await checkSession()
    if (!isAuth) {
      return new NextResponse(JSON.stringify({ success: false, error: 'Unauthorized: Session invalid or expired.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const entrySlug = (formData.get('entrySlug') as string || '').toLowerCase().trim()
    const fileType = (formData.get('type') as string || 'pdf').toLowerCase().trim() // 'pdf' or 'video'
    const resourceTitle = (formData.get('resourceTitle') as string || '').trim()

    if (!file) {
      return new NextResponse(JSON.stringify({ success: false, error: 'No file uploaded.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!entrySlug) {
      return new NextResponse(JSON.stringify({ success: false, error: 'Missing entry slug mapping.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = buffer.toString('base64')
    const mimeType = file.type || (fileType === 'pdf' ? 'application/pdf' : 'video/mp4')
    const base64Url = `data:${mimeType};base64,${base64Data}`

    // 1. Save to local disk (public folder) for development speed and direct link access
    const subfolder = fileType === 'pdf' ? 'pdfs' : 'videos'
    const diskDir = path.join(process.cwd(), 'public', subfolder)
    const fileName = `${entrySlug}.${fileType === 'pdf' ? 'pdf' : 'mp4'}`
    const diskPath = path.join(diskDir, fileName)
    let diskSaveSuccess = false

    try {
      if (!fs.existsSync(diskDir)) {
        fs.mkdirSync(diskDir, { recursive: true })
      }
      fs.writeFileSync(diskPath, buffer)
      diskSaveSuccess = true
      console.log(`Uploaded File: Saved to disk successfully at ${diskPath}`)
    } catch (fsErr: any) {
      console.warn(`Uploaded File: Disk write failed (typical on serverless Vercel): ${fsErr.message}`)
    }

    // 2. Sync to database via MediaFile (guarantees persistence across serverless environments)
    const dbFileType = fileType === 'pdf' ? 'PDF' : 'VIDEO'
    let mediaFile = await prisma.mediaFile.findFirst({
      where: { 
        fileName, 
        fileType: dbFileType
      }
    })

    if (mediaFile) {
      mediaFile = await prisma.mediaFile.update({
        where: { id: mediaFile.id },
        data: {
          filePath: base64Url,
          fileSizeBytes: file.size,
          mimeType,
          uploadedAt: new Date()
        }
      })
      console.log(`Uploaded File: Updated database MediaFile ID ${mediaFile.id} for standard ${entrySlug}`)
    } else {
      mediaFile = await prisma.mediaFile.create({
        data: {
          fileName,
          filePath: base64Url,
          fileSizeBytes: file.size,
          fileType: dbFileType,
          mimeType,
          sourceType: 'ICAI_OFFICIAL'
        }
      })
      console.log(`Uploaded File: Created new database MediaFile ID ${mediaFile.id} for standard ${entrySlug}`)
    }

    // 3. Find or create the Entry for this slug, then upsert EntryResource
    // This is the CRITICAL step that was missing — without this, PDF/video routes can't find the file
    const publicUrl = fileType === 'pdf' ? `/api/pdfs/${entrySlug}` : `/api/videos/${entrySlug}`
    const dbResourceType = fileType === 'pdf' ? 'PDF' : 'VIDEO'
    const finalResourceTitle = resourceTitle || (fileType === 'pdf' 
      ? `Official ${entrySlug.toUpperCase().replace(/-/g, ' ')} PDF` 
      : `${entrySlug.toUpperCase().replace(/-/g, ' ')} Lecture Video`)

    try {
      // Look up the entry by slug
      let entry = await prisma.entry.findUnique({
        where: { entrySlug }
      })

      if (entry) {
        // Upsert EntryResource for this entry + type
        const existingResource = await prisma.entryResource.findFirst({
          where: {
            entryId: entry.id,
            resourceType: dbResourceType
          }
        })

        if (existingResource) {
          await prisma.entryResource.update({
            where: { id: existingResource.id },
            data: {
              resourceUrl: publicUrl,
              resourceTitle: finalResourceTitle,
              mediaFileId: mediaFile.id
            }
          })
          console.log(`Uploaded File: Updated EntryResource ID ${existingResource.id} for entry ${entrySlug}`)
        } else {
          await prisma.entryResource.create({
            data: {
              entryId: entry.id,
              resourceType: dbResourceType,
              resourceTitle: finalResourceTitle,
              resourceUrl: publicUrl,
              sourceType: 'ICAI_OFFICIAL',
              mediaFileId: mediaFile.id
            }
          })
          console.log(`Uploaded File: Created new EntryResource for entry ${entrySlug}, type ${dbResourceType}`)
        }
      } else {
        console.warn(`Uploaded File: No entry found for slug '${entrySlug}' — MediaFile saved but EntryResource not linked. Entry must be saved first.`)
      }
    } catch (resourceErr: any) {
      console.error(`Uploaded File: EntryResource upsert failed for ${entrySlug}:`, resourceErr.message)
      // Non-fatal: file is still saved, admin can re-link manually
    }

    return new NextResponse(JSON.stringify({
      success: true,
      url: publicUrl,
      mediaFileId: mediaFile.id,
      fileName: file.name,
      fileSize: file.size
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err: any) {
    console.error('API File Upload Router Error:', err)
    return new NextResponse(JSON.stringify({ success: false, error: err.message || String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
