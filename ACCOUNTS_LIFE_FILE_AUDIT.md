# Accounts.Life — Codebase File Audit
## Complete Inventory, Purpose, Dependencies, Status, and Roadmap of Workspace Files

This document provides a comprehensive inventory of all existing files in the **Accounts.Life** Next.js project. It classifies every file by category, details its purpose and dependencies, and maps its current status and future modification requirements.

---

## 1. Infrastructure Files

### File Path: `app/layout.tsx`
- **Purpose**: Root HTML wrapper for the Next.js application. Configures the document head (meta tags, viewport, SEO rules), skips navigation for accessibility, loads the global typography fonts (Inter, Lora, JetBrains Mono) via Google Fonts, and embeds the global `Header` and `Footer` layout wrappers.
- **Dependencies**: 
  - `next/font/google`
  - `app/globals.css`
  - `components/layout/Header.tsx`
  - `components/layout/Footer.tsx`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. In Phase 3, dark mode class toggles will need to be injected into the `html` tag.

### File Path: `app/globals.css`
- **Purpose**: Master style sheets sheet. Registers standard Tailwind CSS directives, imports design system fonts, overrides core styling defaults, configures smooth scrolling, and maps semantic color utilities for focus states and custom selections.
- **Dependencies**: 
  - Tailwind CSS framework directives
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No. Built to design system standards.

---

## 2. Database Files

### File Path: `prisma/schema.prisma`
- **Purpose**: The master database blueprint. Declares the PostgreSQL connection provider and maps all 15 relational tables (Domains, Subdomains, Entries, StandardDetails, definitions, disclosures, JEs, JERows, illustrations, relationships, equivalents, resources, notes, FAQs, glossary, and media files) with their enums, indexes, and foreign key cascades.
- **Dependencies**: 
  - PostgreSQL database instance
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. In V2, this schema will require adjustments to support collaborative multi-editor schemas, analytics audit trails, and automatic bidirectional relationships.

### File Path: `lib/db.ts`
- **Purpose**: Instantiates and exports a singleton instance of the PrismaClient. Prevents connection exhaustion errors caused by hot-reloading in local Next.js development.
- **Dependencies**: 
  - `@prisma/client`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No. Standard singleton exporter.

---

## 3. UI Files

### File Path: `components/layout/Header.tsx`
- **Purpose**: Renders the persistent sticky header navigation containing the brand logo, navigation links (Foundations, Standards, Company Accounts, Reference, Glossary), mobile sidebar drawer, and a search icon trigger.
- **Dependencies**: 
  - `next/link`
  - `next/navigation`
  - `lucide-react`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. In Phase 6, the search icon needs to be wired to open the client-side Fuse.js search overlay.

### File Path: `components/layout/Footer.tsx`
- **Purpose**: Global footer rendering site directories (foundations list, standard links, platform sitemaps), copyright lines, and legal links.
- **Dependencies**: 
  - `next/link`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. Sibling links can be dynamically read from the database in later phases instead of being hardcoded.

### File Path: `components/ui/DomainPill.tsx`
- **Purpose**: Reusable badge displaying a domain's code (e.g., D01) with dynamically adjusted color tones matching the domain's branding hex.
- **Dependencies**: 
  - `lib/utils.ts` (color mapping helpers)
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No. Ready for inclusion in listing pages.

### File Path: `components/ui/EntryTypeBadge.tsx`
- **Purpose**: Renders small visual badge tags identifying the content type (e.g., Concept, Standard, Journal Entry, Glossary) with color configurations mapping to the design system.
- **Dependencies**: 
  - `lib/utils.ts`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No. Ready for card integrations.

### File Path: `components/ui/VerificationBadge.tsx`
- **Purpose**: Small pill indicator displaying verification status (Verified, Draft, Placeholder) with specific screen-reader helper labels.
- **Dependencies**: 
  - `lucide-react`
  - `lib/types.ts`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No. Ready for content headings.

---

## 4. CMS Files

*Note: Frontend page templates and CMS admin pages are scheduled to be built in subsequent development phases (Phases 1-6). The planned files are audited below for technical reference.*

### Planned File Path: `app/admin/login/page.tsx`
- **Purpose**: Administrative login gateway validating security credentials and checking TOTP 2FA.
- **Dependencies**: 
  - NextAuth.js or custom JWT
  - Speakeasy (TOTP validation library)
- **Current Status**: Planned (Not Yet Created).
- **Whether Complete/Incomplete**: Incomplete.
- **Whether It Should Be Modified Later**: N/A.

### Planned File Path: `app/admin/page.tsx`
- **Purpose**: CMS dashboard offering statistics on published entries, progress maps for domains, and quick-action shortcuts.
- **Dependencies**: 
  - `lib/db.ts`
- **Current Status**: Planned (Not Yet Created).
- **Whether Complete/Incomplete**: Incomplete.
- **Whether It Should Be Modified Later**: N/A.

### Planned File Path: `app/admin/entries/new/page.tsx` & `[id]/edit/page.tsx`
- **Purpose**: Forms supporting entry creation and edits. Implements the 4-tab interface (Identity, Content editor, Resources, Publish) and standard-specific custom inputs.
- **Dependencies**: 
  - `lib/db.ts`
  - Rich-text editor integrations
- **Current Status**: Planned (Not Yet Created).
- **Whether Complete/Incomplete**: Incomplete.
- **Whether It Should Be Modified Later**: N/A.

---

## 5. Utilities Files

### File Path: `lib/types.ts`
- **Purpose**: Defines TypeScript interfaces and type declarations for all database entities, enums, component props, and system states.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. Expand standard specifications or add new V2 analytics types as the system scales.

### File Path: `lib/utils.ts`
- **Purpose**: Collection of helper functions, including ClassName merges (`cn`), Indian currency formatting (`formatIndianCurrency`), date converters, slug generators, and path builders.
- **Dependencies**: 
  - `clsx`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No. Core helpers are stable.

### File Path: `lib/data/domains.ts`
- **Purpose**: Holds static domain definitions, subdomains, hex colors, taglines, and description content. Used for prototyping components before database seeding.
- **Dependencies**: 
  - `lib/types.ts`
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. In Phase 2, this file will serve as the source database seeder.

---

## 6. Configuration Files

### File Path: `package.json`
- **Purpose**: Project package manifest. Lists active scripts, runtime dependencies (Next 14, React 18, Prisma, Lucide, Fuse.js, html2canvas), and developer dependencies (TypeScript, Tailwind, PostCSS, ESLint).
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. If database drivers or analytics libraries are changed in V2.

### File Path: `tailwind.config.ts`
- **Purpose**: Tailwind CSS custom configurations. Registers custom colors (bg-primary, text-muted, domain colors), custom typography scale, border-radii, spacing tokens, and typography options.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: Yes. Add dark mode tokens in Phase 3.

### File Path: `tsconfig.json`
- **Purpose**: Configures TypeScript compiler settings, target output guidelines (ES2017), path aliases (`@/*`), and file inclusions.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No.

### File Path: `next.config.ts`
- **Purpose**: Next.js framework configuration. Defines remote image optimization rules (for ICAI/MCA thumbnail fetching) and router features.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No.

### File Path: `postcss.config.js`
- **Purpose**: PostCSS compilation setup, binding Tailwind CSS and Autoprefixer processors.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No.

### File Path: `.eslintrc.json`
- **Purpose**: Extends Next.js lint configurations, ensuring strict coding alignment.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No.

### File Path: `.env.example`
- **Purpose**: Environment template file outlining database connection paths and public host parameters.
- **Dependencies**: None.
- **Current Status**: Complete.
- **Whether Complete/Incomplete**: Complete.
- **Whether It Should Be Modified Later**: No.
