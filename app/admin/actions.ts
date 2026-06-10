'use server'

import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import prisma from '@/lib/db'

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
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'accounts-life-default-secret-key-321-at-least-32-chars-long'

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

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'Ak@993102'

  if (password === adminPassword) {
    const sessionToken = generateToken(60 * 60 * 24 * 1000) // 1 day
    cookies().set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day session
      path: '/',
    })
    return { success: true }
  }

  return { success: false, error: 'Invalid PIN or Password' }
}

export async function logout() {
  cookies().delete('admin_session')
  return { success: true }
}

export async function checkSession(): Promise<boolean> {
  const session = cookies().get('admin_session')?.value
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
        await prisma.entryResource.deleteMany({ where: { entryId } })
        await prisma.standardDetail.deleteMany({ where: { entryId } })
      }

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
          create: (entryData.resources || []).map((r: any, idx: number) => ({
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
    } catch (e) {
      console.warn('Prisma database write failed, falling back to local JSON.', e)
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
