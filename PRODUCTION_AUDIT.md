# Accounts.Life — Production Readiness Audit

This document outlines deployment issues, configuration blockers, and code audit findings required for the public release of **Accounts.Life**.

---

## Deployment & Build Readiness

### 1. Missing Robots.txt & Sitemap Router
* **Severity:** MEDIUM
* **Impact:** Search engines will not discover all pre-rendered paths or know crawl permissions, impacting search ranking.
* **Exact File:** [app/](file:///d:/My%20Accounts/accounts-life/app/) (missing `robots.ts` and `sitemap.ts`)
* **Exact Fix:**
  * Create `app/robots.ts` returning:
    ```typescript
    import { MetadataRoute } from 'next'
    export default function robots(): MetadataRoute.Robots {
      return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: 'https://accounts.life/sitemap.xml',
      }
    }
    ```
  * Create `app/sitemap.ts` querying all published entries to generate sitemap nodes:
    ```typescript
    import { MetadataRoute } from 'next'
    import { getSearchIndex } from '@/lib/queries'
    export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
      const index = await getSearchIndex()
      const entries = index.map(item => ({
        url: `https://accounts.life/${item.slug}`,
        lastModified: new Date(),
      }))
      return [
        { url: 'https://accounts.life', lastModified: new Date() },
        { url: 'https://accounts.life/glossary', lastModified: new Date() },
        ...entries
      ]
    }
    ```

---

## Database Index Requirements

### 2. Missing Database Indexes on Entry Filters
* **Severity:** MEDIUM
* **Impact:** Query times for dynamic pages will degrade exponentially as the content database grows. Next.js `generateStaticParams` builds will suffer from full table scans.
* **Exact File:** [prisma/schema.prisma](file:///d:/My%20Accounts/accounts-life/prisma/schema.prisma) (specifically the `Entry` model)
* **Exact Fix:**
  * Define database indexes on the foreign keys and status flags in the `Entry` model:
    ```prisma
    model Entry {
      // ... fields
      @@index([domainId])
      @@index([subdomainId])
      @@index([status])
      @@index([entryType])
      @@map("entries")
    }
    ```

---

## Workspace Health & Code Integrity

### 3. ep-withered-shape Connection Pooling
* **Severity:** MEDIUM
* **Impact:** Serverless execution on platforms like Vercel will rapidly exhaust PostgreSQL connection limits since Neon database pools are shared on cold starts.
* **Exact File:** [.env](file:///d:/My%20Accounts/accounts-life/.env) and [prisma/schema.prisma](file:///d:/My%20Accounts/accounts-life/prisma/schema.prisma)
* **Exact Fix:** Configure connection pooling using Neon connection pooler port (usually port 6543) and separate the direct migration string in the environment config:
  * In `schema.prisma`:
    ```prisma
    datasource db {
      provider  = "postgresql"
      url       = env("DATABASE_URL")
      directUrl = env("DIRECT_URL")
    }
    ```
  * Configure `DATABASE_URL` as the pooled connection URI and `DIRECT_URL` as the direct connection string in `.env`.
