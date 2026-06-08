# Accounts.Life — Deployment Guide

This document outlines the step-by-step setup required to provision resources, configure environmental variables, seed baseline metadata, migrate static items, and compile the **Accounts.Life** application for production.

---

## 1. Prerequisites
* **Runtime:** Node.js (v18.0.0 or higher) and npm (v9.0.0 or higher).
* **Database:** A live PostgreSQL instance (recommended: [Neon Serverless PostgreSQL](https://neon.tech)).
* **OS:** Windows / Linux / macOS.

---

## 2. Environment Variables Configuration
Create a `.env` file in the root directory. Replace the mock credentials with your live values:

```env
# Connection string to the live database (Neon / PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_MYQVqcRta1A6@ep-withered-shape-aobihyk5-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Canonical URL of your public application
NEXT_PUBLIC_SITE_URL="https://accounts.life"

# Security pin for Admin CMS dashboard access
ADMIN_PASSWORD="your-strong-password"
```

---

## 3. Database Initialization & Seeding
Follow this exact sequence to deploy tables, seed taxonomy metadata, and run the static content migration:

```bash
# 1. Sync database schema models directly with PostgreSQL
npx prisma db push

# 2. Populate core domain and subdomain metadata (D01-D12)
npx prisma db seed

# 3. Migrate all static topics and glossary terms into SQL tables
npx ts-node prisma/migrate-content.ts
```

*Note: For Windows environments, execute commands as `npx.cmd` instead of `npx` if script execution blocks occur.*

---

## 4. Production Compilation & Launch
Once the database is initialized and populated:

```bash
# 1. Compile the Next.js production build (performs type check and static generation)
npm run build

# 2. Spin up the Node.js production server
npm run start
```

### Build Optimization Details
* Next.js utilizes `generateStaticParams` to pre-generate dynamic routes during the build phase.
* Since the database is fully seeded and contains content, the build pipeline will query Neon to pre-compile all dynamic paths (e.g. `/[domainSlug]/[subSlug]/[entrySlug]`), resulting in fast page load times on the live server.
* The query layer uses standard singletons in [lib/db.ts](file:///d:/My%20Accounts/accounts-life/lib/db.ts) to minimize database connection pools under high traffic.
