const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const SITE_URL = 'http://localhost:3000'

async function runAudit() {
  console.log('=== STARTING PRODUCTION QA AUDIT ===\n')

  // 1. DATABASE AUDIT (Prisma + Neon Connectivity)
  console.log('[1/4] Auditing Database Connectivity & Counts...')
  const domainsCount = await prisma.domain.count()
  const subdomainsCount = await prisma.subdomain.count()
  const entriesCount = await prisma.entry.count()
  const glossaryCount = await prisma.glossaryTerm.count()
  console.log(`- Domains in DB: ${domainsCount}`)
  console.log(`- Subdomains in DB: ${subdomainsCount}`)
  console.log(`- Entries in DB: ${entriesCount}`)
  console.log(`- Glossary Terms in DB: ${glossaryCount}`)

  if (domainsCount === 0 || entriesCount === 0) {
    throw new Error('Database is empty! Run seed and migration scripts first.')
  }
  console.log('✓ Database audit passed.\n')

  // 2. CMS CRUD AUDIT (Prisma Write, Update, Delete)
  console.log('[2/4] Auditing CMS CRUD Operations...')
  const domain = await prisma.domain.findFirst()
  const subdomain = await prisma.subdomain.findFirst({ where: { domainId: domain.id } })

  // CREATE
  const created = await prisma.entry.create({
    data: {
      entryType: 'CONCEPT',
      entryTitle: 'TEMP_QA_AUDIT_ENTRY',
      entrySlug: 'temp-qa-audit-entry',
      domainId: domain.id,
      subdomainId: subdomain.id,
      summary: 'Temporary QA audit entry summary.',
      status: 'PUBLISHED',
      verificationLevel: 'VERIFIED',
    }
  })
  console.log(`- Created temporary entry: ID=${created.id}, Slug=${created.entrySlug}`)

  // READ & VERIFY CREATED
  const verifyCreated = await prisma.entry.findUnique({ where: { entrySlug: 'temp-qa-audit-entry' } })
  if (!verifyCreated || verifyCreated.entryTitle !== 'TEMP_QA_AUDIT_ENTRY') {
    throw new Error('CMS CREATE Verification failed!')
  }
  console.log('  ✓ Verified created entry exists.')

  // UPDATE
  const updated = await prisma.entry.update({
    where: { id: created.id },
    data: {
      entryTitle: 'TEMP_QA_AUDIT_ENTRY_EDITED',
      summary: 'Temporary QA audit entry summary edited.',
    }
  })
  console.log(`- Updated entry title to: ${updated.entryTitle}`)

  // READ & VERIFY UPDATED
  const verifyUpdated = await prisma.entry.findUnique({ where: { entrySlug: 'temp-qa-audit-entry' } })
  if (!verifyUpdated || verifyUpdated.entryTitle !== 'TEMP_QA_AUDIT_ENTRY_EDITED') {
    throw new Error('CMS UPDATE Verification failed!')
  }
  console.log('  ✓ Verified updated entry contents.')

  // DELETE
  await prisma.entry.delete({ where: { id: created.id } })
  console.log('- Deleted temporary entry.')

  // VERIFY DELETED
  const verifyDeleted = await prisma.entry.findUnique({ where: { entrySlug: 'temp-qa-audit-entry' } })
  if (verifyDeleted) {
    throw new Error('CMS DELETE Verification failed! Entry still exists.')
  }
  console.log('  ✓ Verified entry no longer exists.')
  console.log('✓ CMS CRUD audit passed.\n')

  // 3. HTTP ROUTES & LINK INTEGRITY AUDIT
  console.log('[3/4] Auditing HTTP Routes and Link Integrity on Production Server...')
  const pagesToTest = [
    '/',
    '/foundations',
    '/standards/as',
    '/standards/as/as-1',
    '/standards/ind-as',
    '/standards/ind-as/ind-as-1',
    '/glossary',
    '/search',
    '/sitemap.xml',
    '/robots.txt',
  ]

  const linkRegex = /href="(\/[^"]*)"/g
  const crawledLinks = new Set()
  const brokenLinks = new Set()

  // Audit pages
  for (const page of pagesToTest) {
    const url = `${SITE_URL}${page}`
    const start = Date.now()
    const res = await fetch(url)
    const elapsed = Date.now() - start

    console.log(`- Fetch ${page}: Status ${res.status} (${elapsed}ms)`)
    if (res.status !== 200) {
      throw new Error(`Route ${page} returned status ${res.status}!`)
    }

    const html = await res.text()

    // Scan for internal links to crawl later
    let match
    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1].split('#')[0] // remove hash anchor
      if (link.startsWith('/') && !link.startsWith('/admin') && !link.includes('.') && link !== '/_next') {
        crawledLinks.add(link)
      }
    }

    // Verify sitemap contains standard URLs
    if (page === '/sitemap.xml') {
      if (!html.includes('<loc>') || !html.includes('sitemaps.org')) {
        throw new Error('Sitemap XML structure is invalid!')
      }
      console.log('  ✓ Verified sitemap.xml structure.')
    }

    // Verify robots.txt contains rules
    if (page === '/robots.txt') {
      if (!html.includes('User-Agent:') || !html.includes('Disallow: /admin/')) {
        throw new Error('Robots.txt content is invalid!')
      }
      console.log('  ✓ Verified robots.txt structure.')
    }

    // Verify AS 1 contains objective and scope details
    if (page === '/standards/as/as-1') {
      if (!html.includes('Objective') || !html.includes('Scope') || !html.includes('AS 1')) {
        throw new Error('AS 1 standard page is missing core contents!')
      }
      // Check if FAQs are rendering (proves relations are successfully queried and mapped!)
      if (!html.includes('Frequently Asked Questions') && !html.includes('FAQs')) {
        throw new Error('AS 1 standard page is missing FAQs!')
      }
      if (!html.includes('Journal Entry Guidance')) {
        throw new Error('AS 1 standard page is missing Journal Entry Guidance!')
      }
      console.log('  ✓ Verified AS 1 objective, scope, FAQs, and journal entries rendered successfully.')
    }
  }

  // Verify crawled internal links
  console.log(`- Crawling ${crawledLinks.size} discovered internal links for integrity check...`)
  for (const link of crawledLinks) {
    const res = await fetch(`${SITE_URL}${link}`)
    if (res.status !== 200) {
      console.log(`  ⚠ Broken link found: ${link} (Status ${res.status})`)
      brokenLinks.add(link)
    }
  }

  if (brokenLinks.size > 0) {
    console.warn(`! Found ${brokenLinks.size} broken internal links:`, Array.from(brokenLinks))
  } else {
    console.log('✓ Link integrity audit passed. Zero broken links.')
  }
  console.log('')

  // 4. LIGHTHOUSE-LIKE AUDIT (Performance, Accessibility, Best Practices, SEO)
  console.log('[4/4] Running Lighthouse-like Page Audit...')
  const mainPageRes = await fetch(SITE_URL)
  const html = await mainPageRes.text()

  // SEO Audit
  const hasTitle = html.includes('<title>')
  const hasMetaDesc = html.includes('name="description"')
  const hasCanonical = html.includes('rel="canonical"')
  const hasLdJson = html.includes('type="application/ld+json"')
  const seoScore = (Number(hasTitle) + Number(hasMetaDesc) + Number(hasCanonical) + Number(hasLdJson)) * 25
  console.log(`- SEO Audit: Title=${hasTitle}, Desc=${hasMetaDesc}, Canonical=${hasCanonical}, LD+JSON=${hasLdJson} -> Score: ${seoScore}`)

  // Accessibility (a11y) Audit
  const hasAriaHidden = html.includes('aria-hidden=')
  const hasAlt = html.includes('alt=') || !html.includes('<img ') // no images or has alt
  const hasMainRole = html.includes('<main') || html.includes('role="main"')
  const a11yScore = (Number(hasAriaHidden) + Number(hasAlt) + Number(hasMainRole) + 1) * 25 // base score 25
  console.log(`- Accessibility Audit: aria-hidden=${hasAriaHidden}, alt=${hasAlt}, main=${hasMainRole} -> Score: ${a11yScore}`)

  // Best Practices
  const hasDoctype = html.toLowerCase().startsWith('<!doctype html>')
  const hasCharset = html.toLowerCase().includes('charset="utf-8"') || html.toLowerCase().includes('charset=utf-8')
  const bestPracticeScore = (Number(hasDoctype) + Number(hasCharset) + 2) * 25 // base 50
  console.log(`- Best Practices Audit: doctype=${hasDoctype}, charset=${hasCharset} -> Score: ${bestPracticeScore}`)

  // Performance
  // Benchmark fetching speed
  const fetchTimes = []
  for (let i = 0; i < 5; i++) {
    const start = Date.now()
    const r = await fetch(SITE_URL)
    await r.text()
    fetchTimes.push(Date.now() - start)
  }
  const avgTime = fetchTimes.reduce((a, b) => a + b, 0) / fetchTimes.length
  const perfScore = avgTime < 100 ? 100 : avgTime < 300 ? 90 : avgTime < 600 ? 80 : 70
  console.log(`- Performance Audit: Avg Response Time = ${avgTime.toFixed(1)}ms -> Score: ${perfScore}`)

  const totalScore = Math.round((seoScore + a11yScore + bestPracticeScore + perfScore) / 4)
  console.log(`\n=== QA AUDIT COMPLETED. PRODUCTION READY SCORE: ${totalScore}/100 ===`)
}

runAudit()
  .catch(err => {
    console.error('Audit failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
