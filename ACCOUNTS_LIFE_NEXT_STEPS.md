# Accounts.Life — Next Development Steps
## Roadmap, Next Steps, and Instructions for the Incoming AI Developer

This document details the exact steps, files, and build sequence required to resume development of the **Accounts.Life** application. 

---

## 1. Current Completion Percentage
- **Project Configuration & Setup**: 100%
- **Database Schema Mapping**: 100% (Drafted in Prisma schema)
- **Front-end Shell & Badges**: 70% (Header, footer, layout wrapper, and UI badge pills are completed)
- **Monospace Rendering Components**: 0%
- **Public Frontend Pages**: 5% (Routing folders structured, page contents are pending)
- **Admin CMS Portal**: 0%
- **Overall Project Completion (V1 Scope)**: **~20%**

---

## 2. What Has Been Built
The core foundation of the application has been set up:
- **Project Config**: ESLint rules, typescript compiler options, postCSS wrappers, images/routing policies in `next.config.ts`.
- **Styling System**: Tailwind configurations (`tailwind.config.ts`) with custom hex colors, font-sizes, border-radii, spacing grids, and Google Font parameters loaded in `globals.css`.
- **Database Schema**: All 15 database tables mapping concepts, standards, JEs, illustrations, and glossary terms are declared in `prisma/schema.prisma`.
- **Global Layout & Frame Components**: The parent shell layout (`layout.tsx`), header navigations with dropdown states (`Header.tsx`), and bottom footer details (`Footer.tsx`).
- **UI Elements**: Base reusable elements like `DomainPill.tsx`, `EntryTypeBadge.tsx`, and `VerificationBadge.tsx`.
- **Data Collections**: Static domain collections detailing active/inactive domains, subdomains, and coloring policies in `lib/data/domains.ts`.
- **Utilities**: Singleton Prisma Client exporter (`lib/db.ts`), type mappings (`lib/types.ts`), and currency/date helpers (`lib/utils.ts`).

---

## 3. What Remains to Be Built
- **Database Mapping**: Running migrations and seeding the domains metadata.
- **Monospace Ledgers**: The custom `.je-block` journal entry component with dynamic copy rules.
- **CMS Administration Portal**:
  - Secure `/admin/login` page with JWT token controls and Speakeasy TOTP 2FA.
  - Dashboard counts and progress bars.
  - Content edit forms with 4-tab splits, pre-publish checks, and rich text editors.
  - PDF document file uploads (Cloudflare R2 integration).
- **Page Templates**:
  - `T01 (Homepage)`: Main portal rendering hero elements.
  - `T02 (Domain Landing)` & `T03 (Subdomain Listing)`.
  - `T04 (Concept Page)`: Explanation rendering, TOC observers, and accordions.
  - `T05 & T06 (AS / Ind AS Standard Pages)`: Flagship templates with tab navigation and metadata sidebars.
  - `T07 (Journal Entry standalone)` & `T09 (Glossary Term standalone)`.
  - `T11 (Sitemap)` & `T12 (Coming Soon Domain)`.
- **Search System**: Fuse.js search compiler, query filters, search result pages, and header overlays.
- **SEO & Print**: Sitemap XML routing, meta tags, and `@media print` style sheets.

---

## 4. Exact Next Development Step
1. **Spin up database**: Configure a local PostgreSQL database instance (or connect to a development instance on Railway/Supabase).
2. **Environment Variables**: Copy `.env.example` to `.env` and fill in the active `DATABASE_URL` path.
3. **Run Migrations**: Push the database schema to the active instance by executing:
   ```bash
   npx prisma db push
   ```
4. **Create Seeder**: Create a seeder script (`prisma/seed.ts`) to read domain metadata from `lib/data/domains.ts` and insert it into the `Domain` and `Subdomain` tables. Run:
   ```bash
   npx prisma db seed
   ```

---

## 5. Exact Files to Create Next
Create these files immediately to begin coding layout blocks:
1. **`prisma/seed.ts`**: Database seeder script.
2. **`components/ui/JournalEntryBlock.tsx`**: Monospaced journal entry display element. Renders double-entry Particulars, Debit/Credit columns, and italicized narrations. Connects copy-as-text and copy-as-image behaviors.
3. **`components/ui/Callout.tsx`**: Alert banner component displaying Important, Note, Tip, and Caution callouts with their respective border colors and icons.
4. **`components/ui/TableOfContents.tsx`**: Dinamically builds page heading index cards on the right-hand column, tracking page scroll positions using `IntersectionObserver`.
5. **`app/page.tsx`**: The main homepage. Connects domain cards from database queries and renders the central hero search elements.

---

## 6. Expected Build Order
Ensure development follows this order of dependency:
1. **Database & Seeding**: Push schema changes -> seed domain metadata -> verify Prisma Client bindings.
2. **CMS Portal (API & Views)**: Code 2FA admin authentication -> admin dashboard -> 4-tab content manager form.
3. **Monospace Components**: Implement the monospaced Journal Entry block with clipboard copy routines.
4. **Page Templates**:
   - Homepage (`T01`) -> Domain Landing (`T02`) -> Subdomain Page (`T03`).
   - Concept/Topic Page (`T04`) with sticky right-hand TOC.
   - AS Standard Page (`T05`) and Ind AS Standard Page (`T06`) with sliding sticky tabs.
   - Standalone Journal Entry Page (`T07`), Glossary index (`T08`), and Term detail (`T09`).
5. **Search**: Write the index compiler -> construct the search results page (`T10`) and header overlay.
6. **SEO & Print**: Map meta parameters, write the sitemap XML generator, and add print styles (`@media print`).

---

## 7. Risks & Performance Guidelines
- **html2canvas Performance**: Do not import `html2canvas` on page load. Lazy-load it dynamically only when the user clicks the "Copy as Image" button to keep page load weights under 300KB.
- **Layout Shift (CLS)**: Precompute spacing, height parameters, and element dimensions to prevent content shifts when sticky tab bars and sidebar accordion wrappers load.
- **Scroll Observer lag**: Do not attach heavy event observers to windows scrolls. Use `IntersectionObserver` to track Table of Contents highlights.
- **Database Connection Pool**: Always reference the Prisma singleton in `lib/db.ts` to prevent running out of database connections during hot reloads.

---

## 8. Things That Must Never Be Changed
These architectural commitments define the core identity of the platform and must not be altered:
- **No AI Chat or Chatbots**: Do not add conversational AI boxes or floating helpers.
- **No Video Embeds**: Do not use iframe players. Keep videos as text links.
- **Body Column Constraints**: Keep reading columns at a maximum width of `680px`.
- **Authority Citations**: Every published entry must contain a citable primary authority source.
- **Reference layout structure**: Stick to the 3-column reference pattern (Left sibling nav / Center reading / Right Table of Contents).
- **Typography mapping**: Inter is for UI labels, Lora for reading body paragraphs, and JetBrains Mono for accounting ledgers.
- **Single Admin configuration**: The platform is built exclusively for AK. No public registration or multi-user flows.
