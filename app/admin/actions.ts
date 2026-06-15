'use server'

import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import prisma from '@/lib/db'
import { createAuditLog } from '@/lib/audit'

const DB_PATH = path.join(process.cwd(), 'lib/data/dynamic-db.json')

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    return { entries: [], domains: [], glossary: [], media: [] }
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch (e) {
    return { entries: [], domains: [], glossary: [], media: [] }
  }
}

function writeDb(data: any) {
  try {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err: any) {
    console.warn(`Local JSON db write skipped/failed (expected on serverless EROFS): ${err.message}`)
  }
}

import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'accounts-one-default-secret-key-321-at-least-32-chars-long'
// SECURITY: ADMIN_SECRET must be set via environment variable in production.

function generateToken(expiryMs: number): string {
  const expiry = Date.now() + expiryMs
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(String(expiry)).digest('hex')
  return `${expiry}.${signature}`
}

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

// ============================================================
// ADMIN AUTHENTICATION
// ============================================================

export async function login(password: string, email: string) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const sanitizedEmail = (email || '').trim()

  // Fail immediately if password env var is not configured — never fall back to a default.
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set. Login disabled.')
    return { success: false, error: 'Admin access is not configured. Please contact the administrator.' }
  }

  if (password === adminPassword) {
    const sessionToken = generateToken(60 * 60 * 24 * 1000) // 1 day
    const cookieStore = await cookies()
    
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day session
      path: '/',
    })

    cookieStore.set('admin_email', sanitizedEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    // Write login audit log
    await createAuditLog({
      action: 'LOGIN',
      entityType: 'System',
      entityId: 'AdminPortal',
      userEmail: sanitizedEmail,
      description: 'Successful administrative login'
    })

    return { success: true }
  }

  // Log failed attempt
  await createAuditLog({
    action: 'LOGIN_FAILED',
    entityType: 'System',
    entityId: 'AdminPortal',
    userEmail: sanitizedEmail || 'Unknown',
    description: 'Failed login attempt with incorrect PIN'
  })

  return { success: false, error: 'Invalid PIN or Password' }
}

export async function logout() {
  const cookieStore = await cookies()
  const email = cookieStore.get('admin_email')?.value || 'Admin'
  
  // Write logout audit log
  await createAuditLog({
    action: 'LOGOUT',
    entityType: 'System',
    entityId: 'AdminPortal',
    userEmail: email,
    description: 'Successful administrative logout'
  })

  cookieStore.delete('admin_session')
  cookieStore.delete('admin_email')
  return { success: true }
}

export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!session) return false
  return verifyToken(session)
}

// ============================================================
// ENTRY CRUD OPERATIONS (Prisma + JSON Fallback)
// ============================================================

export async function saveEntry(entryData: any) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  let entryId = entryData.id
  const useDatabase = process.env.DATABASE_URL ? true : false

  if (useDatabase) {
    try {
      // Recreate child relations to prevent duplication on edit
      if (entryId) {
        await prisma.entryNote.deleteMany({ where: { entryId } })
        await prisma.entryFAQ.deleteMany({ where: { entryId } })
        await prisma.entryJournalEntry.deleteMany({ where: { entryId } })
        await prisma.entryIllustration.deleteMany({ where: { entryId } })

        // Check if a PDF resource is already mapped in the database
        const submittedPdf = (entryData.resources || []).find((r: any) => r.resourceType === 'PDF')
        if (submittedPdf) {
          if (submittedPdf.resourceUrl && !submittedPdf.resourceUrl.startsWith('/api/pdfs/')) {
            // A new PDF file is uploaded/mapped in the payload (not the API route placeholder)
            await prisma.entryResource.deleteMany({ where: { entryId } })
          } else {
            // Otherwise, delete all non-PDF resources for this entry to preserve the existing database Base64 mapping
            await prisma.entryResource.deleteMany({
              where: {
                entryId,
                resourceType: { not: 'PDF' }
              }
            })
          }
        } else {
          // PDF was deleted/removed from resources. Delete all resources including PDF resources.
          await prisma.entryResource.deleteMany({ where: { entryId } })
        }

        await prisma.standardDetail.deleteMany({ where: { entryId } })
      }

      // Filter out any API route placeholder PDF resource from being recreated to avoid duplication
      const resourcesToCreate = (entryData.resources || []).filter((r: any) => {
        if (r.resourceType === 'PDF' && r.resourceUrl && r.resourceUrl.startsWith('/api/pdfs/')) {
          return false
        }
        return true
      })

      // Build schema-compliant payload
      const dataPayload: any = {
        entryType: entryData.entryType,
        entryTitle: entryData.entryTitle,
        entrySlug: entryData.entrySlug,
        domainId: Number(entryData.domainId),
        subdomainId: Number(entryData.subdomainId),
        summary: entryData.summary,
        verificationLevel: entryData.verificationLevel || 'DRAFT',
        status: entryData.status || 'DRAFT',
        examLevelTags: entryData.examLevelTags || [],
        authorityPrimary: entryData.authorityPrimary || null,
        authorityPrimaryUrl: entryData.authorityPrimaryUrl || null,
        authoritySecondary: entryData.authoritySecondary || null,
        isFeatured: entryData.isFeatured || false,
        seoTitle: entryData.seoTitle || null,
        seoDescription: entryData.seoDescription || null,
        wordCount: entryData.summary ? entryData.summary.split(/\s+/).length : 50,
        publishedAt: entryData.status === 'PUBLISHED' ? new Date() : null,
        lastReviewedAt: new Date(),
        notes: {
          create: (entryData.notes || []).map((n: any, idx: number) => ({
            noteType: n.noteType || 'NOTE',
            noteTitle: n.noteTitle || null,
            noteBody: n.noteBody || '',
            sortOrder: idx,
          })),
        },
        faqs: {
          create: (entryData.faqs || []).map((f: any, idx: number) => ({
            faqQuestion: f.faqQuestion || '',
            faqAnswer: f.faqAnswer || '',
            faqSourceRef: f.faqSourceRef || null,
            faqCategory: f.faqCategory || 'GENERAL',
            sortOrder: idx,
          })),
        },
        journalEntries: {
          create: (entryData.journalEntries || []).map((je: any, jeIdx: number) => ({
            jeScenarioTitle: je.jeScenarioTitle || null,
            jeLabel: je.jeLabel || null,
            jeCategoryHeading: je.jeCategoryHeading || null,
            jeNarration: je.jeNarration || null,
            sortOrder: jeIdx,
            rows: {
              create: (je.rows || []).map((row: any, rIdx: number) => ({
                rowType: row.rowType || 'DR',
                accountName: row.accountName || null,
                drAmount: row.drAmount !== '' && row.drAmount !== null ? Number(row.drAmount) : null,
                crAmount: row.crAmount !== '' && row.crAmount !== null ? Number(row.crAmount) : null,
                sortOrder: rIdx,
              })),
            },
          })),
        },
        illustrations: {
          create: (entryData.illustrations || []).map((illus: any, idx: number) => ({
            illusTitle: illus.illusTitle || '',
            illusScenario: illus.illusScenario || null,
            illusWorking: illus.illusWorking || null,
            illusAnswer: illus.illusAnswer || null,
            illusNote: illus.illusNote || null,
            illusDifficulty: illus.illusDifficulty || 'BEGINNER',
            sortOrder: idx,
          })),
        },
        resources: {
          create: resourcesToCreate.map((r: any, idx: number) => ({
            resourceType: r.resourceType || 'REFERENCE',
            resourceTitle: r.resourceTitle || '',
            resourceUrl: r.resourceUrl || null,
            sourceType: r.sourceType || 'EXTERNAL',
            videoChannel: r.videoChannel || null,
            refYear: r.refYear ? Number(r.refYear) : null,
            sortOrder: idx,
          })),
        },
      }

      // Embed standard detail if entry type is STANDARD
      if (entryData.entryType === 'STANDARD') {
        dataPayload.standardDetail = {
          create: {
            standardCode: entryData.standardCode || '',
            standardFramework: entryData.standardFramework || 'AS',
            standardStatus: entryData.standardStatus || 'ACTIVE',
            issuingBody: entryData.issuingBody || 'ICAI',
            dateIssued: entryData.dateIssued ? new Date(entryData.dateIssued) : null,
            dateEffective: entryData.dateEffective ? new Date(entryData.dateEffective) : null,
            applicabilitySummary: entryData.applicabilitySummary || null,
            objectiveText: entryData.objective?.text || null,
            objectiveSourcePara: entryData.objective?.sourcePara || null,
            objectiveCommentary: entryData.objective?.commentary || null,
            objectiveKeyIssues: entryData.objective?.keyIssues || [],
            scopeStatement: entryData.scope?.statement || null,
            scopeIncluded: entryData.scope?.included || [],
            scopeExcluded: entryData.scope?.excluded || [],
            definitions: {
              create: (entryData.definitions || []).map((def: any, idx: number) => ({
                defTerm: def.defTerm || '',
                defParaReference: def.defParaReference || null,
                defOfficialText: def.defOfficialText || '',
                defPlainExplanation: def.defPlainExplanation || null,
                sortOrder: idx,
              })),
            },
            disclosureGroups: {
              create: (entryData.disclosureGroups || []).map((g: any, gIdx: number) => ({
                groupHeading: g.groupHeading || '',
                groupParaRange: g.groupParaRange || null,
                sortOrder: gIdx,
                items: {
                  create: (g.items || []).map((item: any, iIdx: number) => ({
                    itemText: item.itemText || '',
                    itemIsConditional: item.itemIsConditional || false,
                    sortOrder: iIdx,
                  })),
                },
              })),
            },
            comparisonRows: {
              create: (entryData.comparisonRows || []).map((row: any, idx: number) => ({
                criterion: row.criterion || '',
                valueStd1: row.valueStd1 || null,
                valueStd2: row.valueStd2 || null,
                isDifferent: row.isDifferent || false,
                sortOrder: idx,
              })),
            },
          },
        }
      }

      if (entryId) {
        await prisma.entry.update({
          where: { id: entryId },
          data: dataPayload,
        })
      } else {
        const saved = await prisma.entry.create({
          data: dataPayload,
        })
        entryId = saved.id
      }

      // --- CREATE REVISION SNAPSHOT ---
      // Every save (draft or publish) creates a versioned snapshot for undo/redo/history
      try {
        const cookieStore = await cookies()
        const userEmail = cookieStore.get('admin_email')?.value || 'Admin'
        const ip = '127.0.0.1' // Simplified; full IP capture available via middleware

        // Get the current version count to auto-increment
        const revCount = await prisma.revision.count({ where: { entryId } })
        
        await prisma.revision.create({
          data: {
            entryId,
            version: revCount + 1,
            action: entryData.status === 'PUBLISHED' ? 'PUBLISH' : 'SAVE_DRAFT',
            snapshot: entryData as any,
            isPublished: entryData.status === 'PUBLISHED',
            description: entryData.status === 'PUBLISHED'
              ? `Published version ${revCount + 1}`
              : `Saved draft version ${revCount + 1}`,
            userEmail,
            ipAddress: ip,
            userAgent: 'AdminCMS',
          }
        })

        // Create audit log
        await createAuditLog({
          action: entryData.status === 'PUBLISHED' ? 'PUBLISH' : 'UPDATE',
          entityType: 'Entry',
          entityId: String(entryId),
          description: `${entryData.status === 'PUBLISHED' ? 'Published' : 'Saved draft'}: ${entryData.entryTitle}`
        })
      } catch (revErr) {
        // Non-fatal: revision creation failure should not block save
        console.warn('Revision creation failed (non-fatal):', revErr)
      }

    } catch (e: any) {
      console.error('Prisma database write failed:', e)
      return {
        success: false,
        error: `Database Save Error: ${e.message || String(e)}\n\nStack Trace:\n${e.stack || 'No stack trace available'}`
      }
    }
  }

  // Local JSON Database write (Always synced as fallback)
  const db = readDb()
  const entries = db.entries || []

  if (entryId) {
    const index = entries.findIndex((e: any) => e.id === entryId)
    if (index !== -1) {
      entries[index] = {
        ...entries[index],
        ...entryData,
        id: entryId,
        updatedAt: new Date().toISOString(),
      }
    } else {
      entries.push({
        ...entryData,
        id: entryId,
        updatedAt: new Date().toISOString(),
      })
    }
  } else {
    entryId = entries.length > 0 ? Math.max(...entries.map((e: any) => e.id)) + 1 : 100
    const newEntry = {
      ...entryData,
      id: entryId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    entries.push(newEntry)
  }

  db.entries = entries
  writeDb(db)

  return { success: true, id: entryId }
}

export async function deleteEntry(id: number) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      await prisma.entry.delete({ where: { id } })
    } catch (e) {
      console.warn('Prisma database delete failed, falling back to JSON.', e)
    }
  }

  const db = readDb()
  const entries = db.entries || []
  db.entries = entries.filter((e: any) => e.id !== id)
  writeDb(db)

  return { success: true }
}

// ============================================================
// GLOSSARY CRUD OPERATIONS (Prisma + JSON Fallback)
// ============================================================

export async function saveGlossaryTerm(termData: any) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  let termId = termData.id
  const useDatabase = process.env.DATABASE_URL ? true : false

  if (useDatabase) {
    try {
      const dataPayload = {
        term: termData.term,
        termSlug: termData.termSlug,
        shortDefinition: termData.shortDefinition,
        authoritySource: termData.authoritySource || null,
        authorityUrl: termData.authorityUrl || null,
        relatedTerms: termData.relatedTerms || [],
        standardRefs: termData.standardRefs || [],
        examLevelTags: termData.examLevelTags || [],
        status: termData.status || 'DRAFT',
        lastReviewedAt: new Date(),
      }

      if (termId) {
        await prisma.glossaryTerm.update({
          where: { id: termId },
          data: dataPayload,
        })
      } else {
        const saved = await prisma.glossaryTerm.create({
          data: dataPayload,
        })
        termId = saved.id
      }
    } catch (e) {
      console.warn('Prisma saveGlossaryTerm failed, falling back to JSON.', e)
    }
  }

  const db = readDb()
  const glossary = db.glossary || []

  if (termId) {
    const index = glossary.findIndex((t: any) => t.id === termId)
    if (index !== -1) {
      glossary[index] = {
        ...glossary[index],
        ...termData,
        id: termId,
        updatedAt: new Date().toISOString(),
      }
    } else {
      glossary.push({
        ...termData,
        id: termId,
        updatedAt: new Date().toISOString(),
      })
    }
  } else {
    termId = glossary.length > 0 ? Math.max(...glossary.map((t: any) => t.id)) + 1 : 1000
    const newTerm = {
      ...termData,
      id: termId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    glossary.push(newTerm)
  }

  db.glossary = glossary
  writeDb(db)

  return { success: true, id: termId }
}

export async function deleteGlossaryTerm(id: number) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      await prisma.glossaryTerm.delete({ where: { id } })
    } catch (e) {
      console.warn('Prisma deleteGlossaryTerm failed, falling back to JSON.', e)
    }
  }

  const db = readDb()
  const glossary = db.glossary || []
  db.glossary = glossary.filter((t: any) => t.id !== id)
  writeDb(db)

  return { success: true }
}

// ============================================================
// DOMAIN METADATA CONFIGURATION (Prisma + JSON Fallback)
// ============================================================

export async function updateDomainMeta(domainCode: string, tagline: string, description: string) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      await prisma.domain.update({
        where: { domainCode },
        data: {
          domainTagline: tagline,
          domainDescription: description,
        },
      })
    } catch (e) {
      console.warn('Prisma updateDomainMeta failed, falling back to JSON.', e)
    }
  }

  const db = readDb()
  const domains = db.domains || []
  const index = domains.findIndex((d: any) => d.domainCode === domainCode)

  if (index !== -1) {
    domains[index] = {
      ...domains[index],
      domainTagline: tagline,
      domainDescription: description,
      updatedAt: new Date().toISOString(),
    }
  } else {
    domains.push({
      domainCode,
      domainTagline: tagline,
      domainDescription: description,
      updatedAt: new Date().toISOString(),
    })
  }

  db.domains = domains
  writeDb(db)

  return { success: true }
}

// ============================================================
// HOMEPAGE LAYOUT & CONTENT CONFIGURATION (Prisma + JSON Fallback)
// ============================================================

const CONFIG_FILE_PATH = path.join(process.cwd(), 'lib/data/homepage-config.json')

function readConfigJson(key: string, defaultValue: any) {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    return defaultValue
  }
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf-8'))
    return data[key] !== undefined ? data[key] : defaultValue
  } catch (e) {
    return defaultValue
  }
}

function writeConfigJson(key: string, value: any) {
  try {
    const dir = path.dirname(CONFIG_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    let currentData: Record<string, any> = {}
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      try {
        currentData = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf-8'))
      } catch {}
    }
    currentData[key] = value
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(currentData, null, 2), 'utf-8')
  } catch (err: any) {
    console.warn(`Local JSON config write skipped/failed (expected on serverless EROFS): ${err.message}`)
  }
}

export async function getHomepageConfig(key: string, defaultValue: any) {
  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      const record = await prisma.homepageConfig.findUnique({
        where: { key }
      })
      if (record) {
        return record.value
      }
    } catch (e) {
      console.warn(`Prisma findUnique for key ${key} failed, falling back to JSON.`, e)
    }
  }
  return readConfigJson(key, defaultValue)
}

export async function saveHomepageConfig(key: string, value: any) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      await prisma.homepageConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    } catch (e) {
      console.warn(`Prisma upsert for key ${key} failed, falling back to JSON.`, e)
    }
  }
  writeConfigJson(key, value)
  return { success: true }
}

function getStandardTitle(slug: string): string {
  const list = [
    { id: 'as-1', label: 'AS 1 – Disclosure of Accounting Policies' },
    { id: 'as-2', label: 'AS 2 – Valuation of Inventories' },
    { id: 'as-3', label: 'AS 3 – Cash Flow Statements' },
    { id: 'as-4', label: 'AS 4 – Contingencies & Events occurring after Balance Sheet' },
    { id: 'as-5', label: 'AS 5 – Net Profit or Loss, Prior Period Items & Changes' },
    { id: 'as-7', label: 'AS 7 – Construction Contracts' },
    { id: 'as-9', label: 'AS 9 – Revenue Recognition' },
    { id: 'as-10', label: 'AS 10 – Property, Plant and Equipment' },
    { id: 'as-11', label: 'AS 11 – Effects of Changes in Foreign Exchange Rates' },
    { id: 'as-12', label: 'AS 12 – Accounting for Government Grants' },
    { id: 'as-13', label: 'AS 13 – Accounting for Investments' },
    { id: 'as-14', label: 'AS 14 – Accounting for Amalgamations' },
    { id: 'as-15', label: 'AS 15 – Employee Benefits' },
    { id: 'as-16', label: 'AS 16 – Borrowing Costs' },
    { id: 'as-17', label: 'AS 17 – Segment Reporting' },
    { id: 'as-18', label: 'AS 18 – Related Party Disclosures' },
    { id: 'as-19', label: 'AS 19 – Leases' },
    { id: 'as-20', label: 'AS 20 – Earnings Per Share' },
    { id: 'as-21', label: 'AS 21 – Consolidated Financial Statements' },
    { id: 'as-22', label: 'AS 22 – Accounting for Taxes on Income' },
    { id: 'as-23', label: 'AS 23 – Investments in Associates in Consolidated Fin Stmts' },
    { id: 'as-24', label: 'AS 24 – Discontinuing Operations' },
    { id: 'as-25', label: 'AS 25 – Interim Financial Reporting' },
    { id: 'as-26', label: 'AS 26 – Intangible Assets' },
    { id: 'as-27', label: 'AS 27 – Financial Reporting of Interests in Joint Ventures' },
    { id: 'as-28', label: 'AS 28 – Impairment of Assets' },
    { id: 'as-29', label: 'AS 29 – Provisions, Contingent Liabilities & Contingent Assets' },
    { id: 'ind-as-1', label: 'Ind AS 1 – Presentation of Financial Statements' },
    { id: 'ind-as-2', label: 'Ind AS 2 – Inventories' },
    { id: 'ind-as-7', label: 'Ind AS 7 – Statement of Cash Flows' },
    { id: 'ind-as-8', label: 'Ind AS 8 – Accounting Policies, Changes & Errors' },
    { id: 'ind-as-10', label: 'Ind AS 10 – Events after the Reporting Period' },
    { id: 'ind-as-12', label: 'Ind AS 12 – Income Taxes' },
    { id: 'ind-as-16', label: 'Ind AS 16 – Property, Plant and Equipment' },
    { id: 'ind-as-19', label: 'Ind AS 19 – Employee Benefits' },
    { id: 'ind-as-20', label: 'Ind AS 20 – Accounting for Govt Grants & Disclosure' },
    { id: 'ind-as-21', label: 'Ind AS 21 – Effects of Changes in FX Rates' },
    { id: 'ind-as-23', label: 'Ind AS 23 – Borrowing Costs' },
    { id: 'ind-as-24', label: 'Ind AS 24 – Related Party Disclosures' },
    { id: 'ind-as-27', label: 'Ind AS 27 – Separate Financial Statements' },
    { id: 'ind-as-28', label: 'Ind AS 28 – Investments in Associates and Joint Ventures' },
    { id: 'ind-as-29', label: 'Ind AS 29 – Financial Reporting in Hyperinflationary' },
    { id: 'ind-as-32', label: 'Ind AS 32 – Financial Instruments: Presentation' },
    { id: 'ind-as-33', label: 'Ind AS 33 – Earnings Per Share' },
    { id: 'ind-as-34', label: 'Ind AS 34 – Interim Financial Reporting' },
    { id: 'ind-as-36', label: 'Ind AS 36 – Impairment of Assets' },
    { id: 'ind-as-37', label: 'Ind AS 37 – Provisions, Contingent Liabilities & Assets' },
    { id: 'ind-as-38', label: 'Ind AS 38 – Intangible Assets' },
    { id: 'ind-as-40', label: 'Ind AS 40 – Investment Property' },
    { id: 'ind-as-41', label: 'Ind AS 41 – Agriculture' },
    { id: 'ind-as-101', label: 'Ind AS 101 – First-time Adoption' },
    { id: 'ind-as-102', label: 'Ind AS 102 – Share-based Payment' },
    { id: 'ind-as-103', label: 'Ind AS 103 – Business Combinations' },
    { id: 'ind-as-105', label: 'Ind AS 105 – Non-current Assets Held for Sale & Discont' },
    { id: 'ind-as-106', label: 'Ind AS 106 – Exploration & Evaluation of Minerals' },
    { id: 'ind-as-107', label: 'Ind AS 107 – Financial Instruments: Disclosures' },
    { id: 'ind-as-108', label: 'Ind AS 108 – Operating Segments' },
    { id: 'ind-as-109', label: 'Ind AS 109 – Financial Instruments' },
    { id: 'ind-as-110', label: 'Ind AS 110 – Consolidated Financial Statements' },
    { id: 'ind-as-111', label: 'Ind AS 111 – Joint Arrangements' },
    { id: 'ind-as-112', label: 'Ind AS 112 – Disclosure of Interests in Other Entities' },
    { id: 'ind-as-113', label: 'Ind AS 113 – Fair Value Measurement' },
    { id: 'ind-as-114', label: 'Ind AS 114 – Regulatory Deferral Accounts' },
    { id: 'ind-as-115', label: 'Ind AS 115 – Revenue from Contracts with Customers' },
    { id: 'ind-as-116', label: 'Ind AS 116 – Leases' },
    { id: 'ind-as-117', label: 'Ind AS 117 – Insurance Contracts' }
  ]
  const match = list.find(x => x.id === slug)
  return match ? match.label : slug.toUpperCase()
}

export async function uploadPdfAction(formData: FormData) {
  try {
    const isAuth = await checkSession()
    if (!isAuth) {
      console.error('PDF Upload: Unauthorized access attempt.')
      return { success: false, error: 'Unauthorized: Session expired or invalid. Please log in again.' }
    }

    const file = formData.get('pdfFile') as File
    if (!file) {
      console.error('PDF Upload: No file provided in formData.')
      return { success: false, error: 'Validation Error: No file was selected for upload.' }
    }

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      console.error(`PDF Upload: Invalid file type: ${file.type}, name: ${file.name}`)
      return { success: false, error: 'Validation Error: Only PDF documents (.pdf) are allowed.' }
    }

    // Limit file size to 4MB for serverless compatibility (Vercel payload limit is 4.5MB)
    const MAX_SIZE = 4 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      console.error(`PDF Upload: File size ${file.size} exceeds serverless limit of ${MAX_SIZE}`)
      return { success: false, error: `File Size Error: File size exceeds the Vercel payload limit of 4MB (Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB). Please choose a smaller test PDF.` }
    }

    const entrySlug = (formData.get('entrySlug') as string || '').toLowerCase().trim()
    if (!entrySlug) {
      console.error('PDF Upload: No entry slug specified.')
      return { success: false, error: 'Validation Error: Please select an Accounting Standard to map.' }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = buffer.toString('base64')
    const base64Url = `data:application/pdf;base64,${base64Data}`

    // 1. Try to save locally to disk (ideal for development and environments with persistent local storage)
    const pdfsDir = path.join(process.cwd(), 'public/pdfs')
    let diskWriteSuccess = false
    let diskWriteError = ''
    const safeName = `${entrySlug}.pdf`
    const filePath = path.join(pdfsDir, safeName)

    try {
      if (!fs.existsSync(pdfsDir)) {
        fs.mkdirSync(pdfsDir, { recursive: true })
      }
      fs.writeFileSync(filePath, buffer)
      console.log(`PDF Upload: Saved file successfully to local disk at ${filePath}`)
      diskWriteSuccess = true
    } catch (fsErr: any) {
      console.warn(`PDF Upload: Local disk save failed (expected on Vercel EROFS): ${fsErr.message}`)
      diskWriteError = fsErr.message
    }

    // 2. Sync / save to database as Base64 Data URI
    const useDatabase = process.env.DATABASE_URL ? true : false
    if (useDatabase) {
      try {
        let entry = await prisma.entry.findUnique({
          where: { entrySlug }
        })

        // Auto-create standard entry if it does not exist in the database
        if (!entry) {
          console.log(`PDF Upload: Standard '${entrySlug}' not in DB. Auto-creating database entry...`)
          
          let domainId = 2
          let subdomainId = 5
          if (entrySlug.startsWith('ind-as')) {
            domainId = 3
            subdomainId = 8
          }

          // Dynamically check matching database domains to make it even more robust
          try {
            const dbDomain = await prisma.domain.findFirst({
              where: {
                domainCode: {
                  contains: entrySlug.startsWith('ind-as') ? 'IND' : 'AS',
                  mode: 'insensitive'
                }
              },
              include: { subdomains: true }
            })
            if (dbDomain) {
              domainId = dbDomain.id
              if (dbDomain.subdomains.length > 0) {
                subdomainId = dbDomain.subdomains[0].id
              }
            }
          } catch (domErr) {
            console.warn('PDF Upload: Failed to dynamically lookup domains, using static fallbacks:', domErr)
          }

          const title = getStandardTitle(entrySlug)
          const standardCode = entrySlug.replace('-', ' ').toUpperCase()
          const framework = entrySlug.startsWith('ind-as') ? 'IND_AS' : 'AS'

          entry = await prisma.entry.create({
            data: {
              entryType: 'STANDARD',
              entryTitle: title,
              entrySlug: entrySlug,
              domainId: domainId,
              subdomainId: subdomainId,
              summary: `Requires compliance and disclosure treatment for ${title}.`,
              verificationLevel: 'VERIFIED',
              status: 'PUBLISHED',
              standardDetail: {
                create: {
                  standardCode: standardCode,
                  standardFramework: framework,
                  standardStatus: 'ACTIVE',
                  issuingBody: framework === 'AS' ? 'ICAI' : 'MCA'
                }
              }
            }
          })
          console.log(`PDF Upload: Successfully auto-created database entry for '${entrySlug}' with ID: ${entry.id}`)
        }

        // Upsert PDF resource mapping
        const existingPdfResource = await prisma.entryResource.findFirst({
          where: { entryId: entry.id, resourceType: 'PDF' }
        })

        const resourceTitle = `Official ${entry.entryTitle} PDF`

        if (existingPdfResource) {
          await prisma.entryResource.update({
            where: { id: existingPdfResource.id },
            data: { 
              resourceUrl: base64Url, 
              resourceTitle 
            }
          })
          console.log(`PDF Upload: Updated existing PDF resource in Neon database with Base64 payload for ${entrySlug}`)
        } else {
          await prisma.entryResource.create({
            data: {
              entryId: entry.id,
              resourceType: 'PDF',
              resourceTitle,
              resourceUrl: base64Url,
              sourceType: 'ICAI_OFFICIAL'
            }
          })
          console.log(`PDF Upload: Created new PDF resource in Neon database with Base64 payload for ${entrySlug}`)
        }

        // Database save was successful, we can return success regardless of disk write failures!
        return { success: true, url: `/api/pdfs/${entrySlug}` }

      } catch (dbErr: any) {
        console.error('PDF Upload: Database sync failed:', dbErr)
        
        // If both disk and database failed, we return error
        if (!diskWriteSuccess) {
          return { 
            success: false, 
            error: `PDF Upload failed. Disk write error: ${diskWriteError}. Database sync error: ${dbErr.message}` 
          }
        }

        // If disk succeeded but DB failed, return warning
        return { 
          success: true, 
          url: `/pdfs/${safeName}`, 
          warning: `PDF was saved to local disk, but database sync failed: ${dbErr.message}`
        }
      }
    }

    // Database is not enabled, rely strictly on local disk write
    if (!diskWriteSuccess) {
      return { 
        success: false, 
        error: `Server File Write Error: Failed to save PDF to disk: ${diskWriteError}` 
      }
    }

    return { success: true, url: `/pdfs/${safeName}` }
  } catch (err: any) {
    console.error('PDF Upload: Unexpected server error:', err)
    return { success: false, error: `Server Error: An unexpected error occurred: ${err.message || String(err)}` }
  }
}

// ============================================================
// REVISION / VERSION HISTORY ACTIONS
// ============================================================

export async function getEntryRevisions(entryId: number) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (!useDatabase) return { success: true, revisions: [] }

  try {
    const revisions = await prisma.revision.findMany({
      where: { entryId },
      orderBy: { version: 'desc' },
      select: {
        id: true,
        version: true,
        action: true,
        isPublished: true,
        description: true,
        userEmail: true,
        createdAt: true,
        // snapshot is excluded to keep response small — loaded on demand
      }
    })
    return { success: true, revisions }
  } catch (e: any) {
    console.error('getEntryRevisions failed:', e)
    return { success: false, error: e.message, revisions: [] }
  }
}

export async function getRevisionSnapshot(revisionId: number) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (!useDatabase) return { success: false, error: 'Database not configured', snapshot: null }

  try {
    const revision = await prisma.revision.findUnique({
      where: { id: revisionId },
      select: { id: true, version: true, action: true, snapshot: true, isPublished: true, description: true, userEmail: true, createdAt: true }
    })
    if (!revision) return { success: false, error: 'Revision not found', snapshot: null }
    return { success: true, revision }
  } catch (e: any) {
    return { success: false, error: e.message, snapshot: null }
  }
}

export async function restoreRevision(revisionId: number) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (!useDatabase) return { success: false, error: 'Database not configured' }

  try {
    const revision = await prisma.revision.findUnique({
      where: { id: revisionId },
      include: { entry: true }
    })

    if (!revision) return { success: false, error: 'Revision not found' }

    // Restore the entry by saving the snapshot as a new save
    const snapshot = revision.snapshot as any
    snapshot.id = revision.entryId

    const result = await saveEntry(snapshot)

    if (result.success) {
      await createAuditLog({
        action: 'ROLLBACK',
        entityType: 'Entry',
        entityId: String(revision.entryId),
        description: `Restored to version ${revision.version} (${revision.action}) from ${new Date(revision.createdAt).toLocaleString()}`
      })
    }

    return result
  } catch (e: any) {
    console.error('restoreRevision failed:', e)
    return { success: false, error: e.message }
  }
}

// ============================================================
// DASHBOARD METRICS ACTION
// ============================================================

export async function getDashboardMetrics() {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (!useDatabase) {
    return {
      success: true,
      metrics: {
        totalEntries: 0, publishedEntries: 0, draftEntries: 0,
        totalStandards: 0, publishedStandards: 0, draftStandards: 0,
        totalPdfs: 0, totalVideos: 0,
        recentLogins: [], recentPublications: [], recentEdits: [],
        glossaryCount: 0, domainsCount: 0,
      }
    }
  }

  try {
    const [
      totalEntries, publishedEntries, draftEntries,
      totalStandards, publishedStandards, draftStandards,
      totalPdfs, totalVideos, glossaryCount, domainsCount,
      recentAuditLogs
    ] = await Promise.all([
      prisma.entry.count(),
      prisma.entry.count({ where: { status: 'PUBLISHED' } }),
      prisma.entry.count({ where: { status: 'DRAFT' } }),
      prisma.entry.count({ where: { entryType: 'STANDARD' } }),
      prisma.entry.count({ where: { entryType: 'STANDARD', status: 'PUBLISHED' } }),
      prisma.entry.count({ where: { entryType: 'STANDARD', status: 'DRAFT' } }),
      prisma.entryResource.count({ where: { resourceType: 'PDF' } }),
      prisma.entryResource.count({ where: { resourceType: 'VIDEO' } }),
      prisma.glossaryTerm.count(),
      prisma.domain.count(),
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: { id: true, action: true, entityType: true, entityId: true, description: true, userEmail: true, createdAt: true }
      })
    ])

    const recentLogins = recentAuditLogs.filter(l => l.action === 'LOGIN').slice(0, 5)
    const recentPublications = recentAuditLogs.filter(l => l.action === 'PUBLISH').slice(0, 5)
    const recentEdits = recentAuditLogs.filter(l => l.action === 'UPDATE').slice(0, 5)

    return {
      success: true,
      metrics: {
        totalEntries, publishedEntries, draftEntries,
        totalStandards, publishedStandards, draftStandards,
        totalPdfs, totalVideos, glossaryCount, domainsCount,
        recentLogins, recentPublications, recentEdits,
        allRecentActivity: recentAuditLogs,
      }
    }
  } catch (e: any) {
    console.error('getDashboardMetrics failed:', e)
    return { success: false, error: e.message, metrics: null }
  }
}

export async function deletePdfResource(resourceId: number) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      const res = await prisma.entryResource.delete({
        where: { id: resourceId }
      })
      
      await createAuditLog({
        action: 'DELETE_RESOURCE',
        entityType: 'EntryResource',
        entityId: String(resourceId),
        description: `Deleted PDF resource: ${res.resourceTitle}`
      })

      return { success: true }
    } catch (e: any) {
      console.error('Prisma deletePdfResource failed:', e)
      return { success: false, error: e.message }
    }
  }

  return { success: false, error: 'Database not enabled' }
}

export async function updateEntriesOrder(orderMapping: Array<{ id: number, sortOrder: number }>) {
  const isAuth = await checkSession()
  if (!isAuth) throw new Error('Unauthorized')

  const useDatabase = process.env.DATABASE_URL ? true : false
  if (useDatabase) {
    try {
      await prisma.$transaction(
        orderMapping.map(item => 
          prisma.entry.update({
            where: { id: item.id },
            data: { sortOrder: item.sortOrder }
          })
        )
      )

      await createAuditLog({
        action: 'REORDER_ENTRIES',
        entityType: 'Entry',
        entityId: 'All',
        description: `Reordered standards list: updated ${orderMapping.length} items`
      })

      return { success: true }
    } catch (e: any) {
      console.error('Prisma updateEntriesOrder failed:', e)
      return { success: false, error: e.message }
    }
  }

  return { success: false, error: 'Database not enabled' }
}
