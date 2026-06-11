# Accounts.One — Deployment Guide

This document outlines the step-by-step setup required to provision resources, configure environmental variables, seed baseline metadata, migrate static items, compile the **Accounts.One** application for production, and manage the domain transition on Vercel.

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
NEXT_PUBLIC_SITE_URL="https://accounts.one"

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

---

## 5. Vercel Domain Transition to Accounts.One
To transition the deployment from `accounts-life.vercel.app` (or custom domain `accounts.life`) to the new canonical domain `accounts.one`, follow these steps:

1. **Purchase/Acquire the Domain:**
   Ensure `accounts.one` is registered and you have access to its DNS records.

2. **Add Domain to Vercel Project:**
   * Open the Vercel Dashboard, select the project, and navigate to **Settings** > **Domains**.
   * Enter `accounts.one` and click **Add**.
   * Vercel will recommend adding a redirect from the `www` subdomain (i.e. `www.accounts.one` redirecting to `accounts.one`). Accept this recommendation.

3. **Configure DNS Records:**
   * In your DNS provider (e.g., GoDaddy, Cloudflare, Namecheap), add the records requested by Vercel:
     * **A Record** for `accounts.one` pointing to Vercel's IP: `76.76.21.21`
     * **CNAME Record** for `www.accounts.one` pointing to `cname.vercel-dns.com`
   * Wait for DNS propagation and SSL generation (typically 5-15 minutes).

4. **Update Environment Variables on Vercel:**
   * Go to **Settings** > **Environment Variables** in the Vercel project settings.
   * Edit `NEXT_PUBLIC_SITE_URL` and change its value to `https://accounts.one`.
   * Ensure it is set for all environments (Production, Preview, Development).

5. **Redeploy the Project:**
   * Go to the **Deployments** tab on Vercel.
   * Select your latest deployment and choose **Redeploy** to ensure the new env variables are compiled into the static assets.

6. **Set up Redirection from Old Domain (Optional but Recommended):**
   * If you own `accounts.life`, keep it active in Vercel domains and set it as a redirect to `accounts.one`. This preserves SEO authority and ensures old links redirect correctly.
