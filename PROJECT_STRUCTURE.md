# Accounts.Life — Project Structure Guide

This document maps out the complete directory layout and key modules of the **Accounts.Life** educational web platform.

---

## Directory Hierarchy

```
accounts-life/
├── .next/                  # Next.js build compilation outputs
├── app/                    # Next.js App Router (14+)
│   ├── [domainSlug]/       # Dynamic domain pages
│   │   └── [subSlug]/
│   │       └── [entrySlug]/# Dynamic topic and journal entry pages
│   ├── admin/              # Admin CMS (Single Admin dashboard)
│   │   ├── domains/        # Domain metadata editor
│   │   ├── entries/        # Entry CRUD editors (new / edit)
│   │   ├── glossary/       # Glossary term editor
│   │   ├── login/          # Security login panel
│   │   ├── actions.ts      # CMS database mutations (Server Actions)
│   │   └── page.tsx        # CMS central panel
│   ├── glossary/           # A–Z public directory
│   ├── search/             # Fuse.js text-search results page
│   ├── standards/          # Compliance frameworks
│   │   ├── as/
│   │   │   └── [slug]/     # Dynamic AS standards pages
│   │   └── ind-as/
│   │       └── [slug]/     # Dynamic Ind AS standards pages
│   ├── layout.tsx          # Master navigation layout
│   └── page.tsx            # Public homepage
├── components/             # Reusable UI components
│   ├── blocks/             # Specialized page blocks (Reference, Examples)
│   ├── ui/                 # Small atomic elements (Badges, Buttons)
│   └── navigation/         # Header/Footer menus
├── lib/                    # Data Access and Core Utilities
│   ├── db.ts               # Prisma Client connection singleton
│   ├── queries.ts          # Central data querying API (Neon / Fallback)
│   ├── types.ts            # Shared TypeScript interface definitions
│   └── data/               # Local JSON fallback & static files
│       ├── domains.ts      # Master taxonomy definitions
│       └── static-entries.ts # Development fallback records
├── prisma/                 # Database schema definitions
│   ├── schema.prisma       # Prisma 19-entity configuration
│   ├── seed.ts            # Domain baseline database seeding script
│   └── migrate-content.ts  # Script to migrate static JSON into database
├── .env                    # System secrets and configurations
├── package.json            # Node package scripts and dependencies
├── tailwind.config.ts      # Extended design system tokens
└── tsconfig.json           # TypeScript configuration
```

---

## Core File Responsibilities

### 1. Data Access & Abstraction
* **[lib/db.ts](file:///d:/My%20Accounts/accounts-life/lib/db.ts):** Returns a cached, global instance of the Prisma Client to avoid leaking connection pools under hot-reloading.
* **[lib/queries.ts](file:///d:/My%20Accounts/accounts-life/lib/queries.ts):** Centralizes all read operations. Wraps database queries in try/catch fallbacks. When `USE_DATABASE = true`, it queries Neon PostgreSQL. If Neon is offline, it automatically routes through local JSON data to prevent system crashes.

### 2. Database Layer
* **[prisma/schema.prisma](file:///d:/My%20Accounts/accounts-life/prisma/schema.prisma):** Outlines all 15 core database entities (Domains, Subdomains, Entries, Standard Details, Glossary, FAQs, etc.) and relational mappings.
* **[prisma/seed.ts](file:///d:/My%20Accounts/accounts-life/prisma/seed.ts):** Populates the baseline domain metadata (D01-D12) and their default subdomains.
* **[prisma/migrate-content.ts](file:///d:/My%20Accounts/accounts-life/prisma/migrate-content.ts):** Imports the raw arrays in `static-entries.ts` and loads them directly into SQL tables.

### 3. CMS Mutations
* **[app/admin/actions.ts](file:///d:/My%20Accounts/accounts-life/app/admin/actions.ts):** Server Actions for saving, editing, and deleting records in the database. Supports cascade delete actions.
