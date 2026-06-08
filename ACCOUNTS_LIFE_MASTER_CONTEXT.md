# Accounts.Life — Master Project Handover Package
## The Definitive Project Context and Technical Handover Document

> [!IMPORTANT]
> **READ THIS BEFORE COMMENCING ANY DEVELOPMENT.**
> This document preserves 100% of the project context for the Accounts.Life application. It assumes no prior conversation history or logs are accessible. It contains all approved specifications, databases, architecture configurations, design tokens, folder structures, and development statuses.
> **DO NOT modify the frozen architecture, redesign components, or add new features beyond this specification.**

---

## 1. Complete Product Vision
**Accounts.Life** is not a course-selling site, a educational blog, an AI chatbot portal, or a general community forum. It is an **Accounting Operating System (AOS)** — the single most organized, structured, and verified accounting knowledge ecosystem ever built.
The platform collapses fragmented sources (ICAI study materials, statutory MCA/government sites, unstructured YouTube lectures, search engine blogs, static textbooks) into a single canonical source of truth for the Indian accounting universe.

### Platform Positioning
The platform sits at the intersection of **High Depth** and **High Accessibility**:
- **ICAI Portal**: Authoritative but difficult to navigate.
- **YouTube**: Explanatory but unstructured and highly variable in quality.
- **Google / Blogs**: Accessible but unreliable, repetitive, and SEO-optimized.
- **Accounts.Life**: Authoritative, deeply structured, fully connected, and verified directly against source standards and code.

### Intended Personas
- **CA / CMA Aspirants** (Foundation, Intermediate, and Final): Seeking clear concepts, journal entries, accounting standards, and study alignments.
- **B.Com / Commerce Students**: Seeking foundations, double-entry logic, and worked numerical illustrations.
- **Article Assistants / Accountants / Finance Professionals**: Seeking quick reference for standards (AS, Ind AS), accounting treatments, applicability rules, disclosure requirements, and comparative taxonomy.
- **Educators & Researchers**: Seeking cross-referencing, history of amendments, and citable official references.

---

## 2. Complete Platform Mission
The core platform mission is summarized in five words: **Organize · Structure · Connect · Verify · Present.**

### The Five Laws of Accounts.Life
1. **Law of Organization**: Every piece of accounting knowledge has exactly one canonical home on this platform.
2. **Law of Connection**: No concept exists in isolation. Every entry must link to its parent, siblings, child topics, and cross-references.
3. **Law of Verification**: All knowledge must trace directly to an authoritative source (ICAI, MCA, IASB, statute, standard).
4. **Law of Clarity**: Complexity is structured, not hidden. Information is layered, exposing details only as required.
5. **Law of Completeness**: The system is a living, expanding work. Empty taxonomy nodes are handled confidently and are hidden from users rather than showing empty templates.

---

## 3. Final Approved Architecture
The system utilizes a modern, lightweight web framework designed for maximum performance, search engine crawlability, and zero layout shift.

### Architecture Overview
- **Frontend Framework**: Next.js 14 utilizing TypeScript and Tailwind CSS. Static Site Generation (SSG) with Incremental Static Regeneration (ISR) is used for public routes, delivering sub-second page loads.
- **Database**: PostgreSQL database. High relational integrity is enforced via foreign keys to track connections across entries, standards, subdomains, and glossary terms.
- **ORM**: Prisma client handles data access and migrations.
- **Admin CMS**: A custom admin portal integrated directly into the Next.js app under `/admin/` utilizing NextAuth (or custom JWT) with mandatory Time-based One-Time Password (TOTP) 2FA.
- **Search System**: Fuse.js client-side search indexing all published entries dynamically on compile/regeneration. In V1, this avoids complex indexing servers.
- **Video Strategy**: Videos are strictly link-only (title, channel, URL, source classification). No embedded iframe players are allowed at the template level to preserve performance.

---

## 4. Final Approved CMS Architecture
The CMS is designed specifically for a single administrative user: **AK** (the founder). AK is non-technical, meaning they should not write HTML, Markdown, or CSS. AK fills fields in form tabs, and the system dynamically generates, structures, and compiles the website.

### Key CMS Architectural Traits
- **Two States**: Content is either a `DRAFT` or `PUBLISHED`.
- **Three Verification Levels**: 
  - `VERIFIED`: Content is checked and matches an official statutory authority.
  - `DRAFT`: Content is drafted by AK but not officially verified.
  - `PLACEHOLDER`: Node exists in the taxonomy index, but content is not yet written (automatically hidden on public pages).
- **The 4-Tab Entry Form**:
  1. *Identity*: Basic meta, tags, domains, and SEO values.
  2. *Content*: Unified block-based inputs for standard content, journal entries, illustrations, FAQs, etc.
  3. *Resources*: PDF files, external official links, videos, and related entries.
  4. *Publish*: Automated completeness checklist, status, and verification assignment.
- **Pre-Publish Checklist**:
  - *Blocking Check (Cannot Publish)*: Title present, summary > 50 chars, body > 200 words, domain/subdomain assigned, verification level set, primary authority source specified.
  - *Advisory Check (Warnings only)*: Exam tags assigned, balanced journal entries (debits equal credits), comparative rows filled.

---

## 5. Final Approved Design System
The design system replicates the aesthetic of a premium legal reference work, a well-curated library, or an encyclopedia. It is clean, minimalist, highly readable, and uses color strictly for structural meaning, never for arbitrary decoration.

### 5.1 Color Tokens
- **Backgrounds**:
  - Page BG (Primary): `#FAFAF8` (Warm soft white to reduce reading strain)
  - Card/Sidebar BG (Secondary): `#F4F3F0` (Soft off-white)
  - Code/Table BG (Tertiary): `#EEECEA` (Light warm grey)
  - Dark Headers/Footers: `#1A1E2A` (Deep navy-slate)
- **Text**:
  - Primary body: `#1C1C1E` (Near black for maximum contrast)
  - Secondary metadata: `#4A4A52` (Dark grey)
  - Tertiary labels/breadcrumbs: `#76767E` (Medium grey)
  - Muted placeholders: `#A0A0A8` (Light grey)
  - Inverse text: `#F0F0EF` (Off-white on dark backgrounds)
- **Accent & Semantic Colors**:
  - Primary Accent: `#2D5BE3` (Slate Blue) | Hover: `#1E47C8` | BG Tint: `#EEF2FD`
  - Secondary Accent: `#0F6B5E` (Deep Teal for AS/Standards) | BG Tint: `#E6F4F2`
  - Verified Green: `#1A7A4A` | BG Tint: `#E8F7EE`
  - Warning Amber: `#B45309` | BG Tint: `#FEF6E4`
  - Error Red: `#C0392B` | BG Tint: `#FDEEEE`
- **Borders**:
  - Default: `#E2E1DD`
  - Strong: `#C8C7C2`
- **Domain Accent Colors**:
  - D01 (Accounting Foundations): `#2D5BE3` (Slate Blue)
  - D02 (AS Standards): `#0F6B5E` (Deep Teal)
  - D03 (Ind AS Standards): `#6B3FA0` (Deep Purple)
  - D04 (IFRS / IAS): `#B45309` (Amber)
  - D05 (Company Accounts): `#1A7A4A` (Forest Green)
  - D06–D12 (Inactive): `#4A4A52` (Charcoal)
  - Master Glossary / GLO: `#5B6678` (Slate)

### 5.2 Typography System
- **Fonts**:
  - Interface/Headers: **Inter** (Google Font, sans-serif) - Weights: 400, 500, 600, 700
  - Long-form body reading: **Lora** (Google Font, serif) - Weights: 400, 600 (used only for body text columns)
  - Accounting displays/Formulas/Monospace: **JetBrains Mono** (Google Font, monospace) - Weights: 400, 500
- **Line Heights**:
  - Body text: `1.70` (generous line spacing for dense accounting content)
- **Maximum Column Width**:
  - Reading text is restricted to a maximum of `680px` (approximately 72 characters per line) to optimize reading comprehension and reduce fatigue.

### 5.3 Key Custom Components
1. **Journal Entry Display Block (`.je-block`)**:
   - Monospace layout in JetBrains Mono.
   - Column layout: Account names / particulars, Dr. amounts, Cr. amounts.
   - Debit rows are left-aligned (with "Dr." after the account name).
   - Credit rows are indented by `2em` (with "To" in muted text before the account name).
   - Narration is italicized with a dashed top border.
   - Features "Copy as Text" (preserves tab formatting) and "Copy as Image" (utilizes `html2canvas` client-side to copy a PNG to the clipboard).
2. **Alert / Callout Boxes**:
   - Green (Teal) for **Important** rules.
   - Blue for **Note** annotations.
   - Gold/Amber for **Tip** guidelines.
   - Red for **Caution** warnings and common errors.
3. **Authority Reference Block**:
   - Compact footer component on all pages indicating official citation, issued by, effective date, and link to MCA/ICAI source.
4. **Table of Contents (TOC)**:
   - Sticky sidebar listing page headers. Actively updates via `IntersectionObserver`.
   - On mobile, displays as a sticky dropdown ("Jump to Section").
5. **Print Stylesheet**:
   - Enforced via `@media print`. Hides header, footer, sidebars, and tab bars. Automatically expands all accordion tabs (such as FAQs) and keeps journal entries formatted cleanly without breaks.

---

## 6. Complete Accounting Taxonomy
The entire accounting knowledge base is divided into **12 Domains**.

```
ACCOUNTS.LIFE KNOWLEDGE UNIVERSE
├── DOMAIN 01 — ACCOUNTING FOUNDATIONS (ACTIVE)
├── DOMAIN 02 — AS STANDARDS (ACTIVE)
├── DOMAIN 03 — IND AS STANDARDS (PARTIAL)
├── DOMAIN 04 — IFRS & INTERNATIONAL STANDARDS (COMING SOON)
├── DOMAIN 05 — COMPANY ACCOUNTS (PARTIAL)
├── DOMAIN 06 — COST ACCOUNTING (COMING SOON)
├── DOMAIN 07 — MANAGEMENT ACCOUNTING (COMING SOON)
├── DOMAIN 08 — PRACTICAL & INDUSTRY ACCOUNTING (COMING SOON)
├── DOMAIN 09 — ACCOUNTING TECHNOLOGY (COMING SOON)
├── DOMAIN 10 — ACCOUNTING RESEARCH & CASE STUDIES (COMING SOON)
├── DOMAIN 11 — STUDY & EXAM RESOURCES (PARTIAL)
└── DOMAIN 12 — REFERENCE & REGULATORY LIBRARY (COMING SOON)
```

### 6.1 Domain 01 - Active Subdomain Structure
- **01.01: Nature & Philosophy of Accounting**
  - Topics: What is Accounting, History, Users, Branches, Bookkeeping vs Accounting.
- **01.02: Accounting Concepts & Conventions**
  - Topics: Business Entity, Money Measurement, Going Concern, Accrual, Consistency, Conservatism/Prudence, Materiality, Matching, Historical Cost, Dual Aspect, Realization, Periodicity, Full Disclosure, Objectivity.
- **01.03: Accounting Principles & Framework**
  - Topics: Indian GAAP, US GAAP, Enhancing characteristics, constraints.
- **01.04: Accounting Equation & Double Entry**
  - Topics: Assets = Liabilities + Equity, DEAD CLIC rules, traditional vs modern Debit/Credit golden rules.
- **01.05: The Accounting Cycle**
  - Topics: Source Documents, Journal Proper, Ledger posting, Trial Balance preparation, Adjusting Entries, Closing Entries, Financial Statements.
- **01.06: Subsidiary Books**
  - Topics: Cash Book (Single, Double, Triple columns, Petty Cash Book), Purchase/Sales Books, Bills of Exchange (issue, endorsement, discounting, dishonor, accommodation bills).
- **01.07: Bank Reconciliation Statement (BRS)**
  - Topics: Causes of difference, Adjusted Cash Book method, BRS preparation.
- **01.08: Depreciation Accounting**
  - Topics: Causes, Methods (SLM, WDV, SYD, Units of Production), asset disposal, change in useful life, Schedule II of Companies Act 2013 vs Income Tax rules.
- **01.09: Provisions & Reserves**
  - Topics: Provision vs Reserve, Bad Debt provisions, Revenue/Capital/Secret reserves, Sinking Funds.
- **01.10: Rectification of Errors**
  - Topics: Omission, Commission, Principle, Compensating errors, Suspense Accounts, profit rectification.
- **01.11: Consignment & Joint Venture**
  - Topics: Consignee/Consignor entries, Del Credere commissions, Memorandum JV.
- **01.12: Partnership Accounting**
  - Topics: Profit Appropriation, Goodwill valuation (Super profit, capitalization), Partner Admission/Retirement/Death, Dissolution (Garner vs Murray rule).
- **01.13: Hire Purchase & Installment System**
  - Topics: Asset accrual, interest calculation, repossessions.
- **01.14: Insurance Claims**
  - Topics: Loss of stock (Memorandum trading), Loss of profit (consequential loss), Average clauses.
- **01.15: Self-Balancing Ledgers**
  - Topics: Sectional balancing, Debtors/Creditors ledger control.

### 6.2 Domain 02 - AS Standards Index (All 32 Standards)
- **AS 1**: Disclosure of Accounting Policies
- **AS 2**: Valuation of Inventories
- **AS 3**: Cash Flow Statements
- **AS 4**: Contingencies and Events After Balance Sheet Date
- **AS 5**: Net Profit or Loss, Prior Period Items and Changes in Policies
- **AS 7**: Construction Contracts
- **AS 9**: Revenue Recognition
- **AS 10**: Property, Plant and Equipment (Superseded AS 6)
- **AS 11**: Effects of Changes in Foreign Exchange Rates
- **AS 12**: Accounting for Government Grants
- **AS 13**: Accounting for Investments
- **AS 14**: Accounting for Amalgamations
- **AS 15**: Employee Benefits
- **AS 16**: Borrowing Costs
- **AS 17**: Segment Reporting
- **AS 18**: Related Party Disclosures
- **AS 19**: Leases
- **AS 20**: Earnings Per Share
- **AS 21**: Consolidated Financial Statements
- **AS 22**: Accounting for Taxes on Income (Deferred Tax)
- **AS 23**: Accounting for Investments in Associates
- **AS 24**: Discontinuing Operations
- **AS 25**: Interim Financial Reporting
- **AS 26**: Intangible Assets
- **AS 27**: Financial Reporting of Interests in Joint Ventures
- **AS 28**: Impairment of Assets
- **AS 29**: Provisions, Contingent Liabilities and Contingent Assets
- **AS 30, 31, 32**: Financial Instruments (withdrawn or replaced)

### 6.3 Domain 03 - Priority Ind AS Standards Index
- **Ind AS 1**: Presentation of Financial Statements
- **Ind AS 2**: Inventories
- **Ind AS 7**: Cash Flows
- **Ind AS 12**: Income Taxes
- **Ind AS 16**: Property, Plant and Equipment
- **Ind AS 115**: Revenue from Contracts with Customers
- **Ind AS 116**: Leases
- **Ind AS 103**: Business Combinations
- **Ind AS 109**: Financial Instruments

---

## 7. Final V1 Scope
The focus of V1 is to **make the first 162+ entries excellent** and provide the structural skeleton of the entire knowledge system.

### Frontend deliverables:
- Responsive static pages (SSG with Next.js).
- Main Homepage.
- 12 Domain landing pages (5 active, 7 Coming Soon).
- Active subdomain listing index pages.
- Dynamic entry page templates:
  - **Concept / Topic template**: Left sibling nav, 680px body, right dynamic TOC.
  - **Standard template (AS & Ind AS variants)**: Dark header, sticky tab bar (Objective | Scope | Definitions | Provisions | Disclosures | Comparison | Illustrations | Resources), right meta sidebar.
  - **Journal Entry template**: Sibling nav, variation listings, monospaced blocks, copy actions.
  - **Glossary**: A–Z Index + individual term lookup pages.
- Client-side search layout (Header overlay + `/search/` page) utilizing Fuse.js.
- Clean human sitemap (`/sitemap`) + XML generator.

### Backend/CMS deliverables:
- JWT Admin login + QR-based TOTP 2FA.
- Admin dashboard displaying content count statistics, active domain coverage mapping, and quick action buttons.
- Forms supporting the 7 entry types and 4-tab workflow.
- Equivalence Map management panel.
- Pre-publish checklists.

---

## 8. Final Domain Structure
URLs are strictly structured and mapped hierarchically:
- **Domain Landing**: `/[domain-slug]/` (e.g. `/foundations/`, `/company-accounts/`)
- **Subdomain Page**: `/[domain-slug]/[subdomain-slug]/` (e.g. `/foundations/depreciation-accounting/`)
- **Entry Details**: `/[domain-slug]/[subdomain-slug]/[entry-slug]/` (e.g. `/foundations/depreciation-accounting/straight-line-method/`)
- **AS Standard Pages**: `/standards/as/[standard-slug]/` (e.g. `/standards/as/as-2/`)
- **Ind AS Standard Pages**: `/standards/ind-as/[standard-slug]/` (e.g. `/standards/ind-as/ind-as-115/`)
- **Glossary Index**: `/glossary/`
- **Glossary Term**: `/glossary/[term-slug]/`
- **Search Page**: `/search/`
- **Sitemap Index**: `/sitemap/`

---

## 9. Final Entry Types
Every content object created in the system falls under one of **7 entry types**:
1. `Concept`: Detailed explanations of foundational principles.
2. `Standard`: Codified standards (AS / Ind AS / IFRS).
3. `Journal Entry`: Transaction-level debit/credit records.
4. `Glossary Term`: Dictionary definitions.
5. `Illustration`: Numerical working examples.
6. `FAQ`: Common questions on concepts or standards.
7. `Reference`: Curated external links, statutory notices, or official PDFs.

---

## 10. Final Page Types
The front-end has **12 dedicated page templates**:
- `T01 (Homepage)`: Hero search, domain explorer grids, recently added feeds, featured journal entries.
- `T02 (Domain Landing)`: Subdomain lists, featured concepts, standards indicator, progress map.
- `T03 (Subdomain Listing)`: Subdomain description, list of child entries with type/verification badges, previous/next subdomain navigation.
- `T04 (Concept/Topic Page)`: Sibling nav, 3-column container, H2/H3 scan TOC, body editor blocks, illustrations, FAQs, related standards list.
- `T05 (Standard Page - AS)`: Dark Teal header, equivalents strip, sticky tab bar, right-hand meta sidebar, 8-tab content.
- `T06 (Standard Page - Ind AS)`: Identical structure to T05 but uses a Deep Purple style injection.
- `T07 (Journal Entry Page)`: Standalone page featuring transaction explanation, one or more `.je-block`s, debit/credit rules, and numerical examples.
- `T08 (Glossary Index)`: A–Z index, alphabetically grouped terms.
- `T09 (Glossary Term Page)`: Term definition, authoritative citation, and links to referencing entries.
- `T10 (Search Results)`: Shareable search page pre-populated via URL query params (`/search/?q=[query]`) with domain/type filters.
- `T11 (Sitemap)`: Human-readable hierarchical tree of all domains, active subdomains, and live pages.
- `T12 (Coming Soon Domain)`: Confident landing page for inactive domains (06–10, 12).

---

## 11. Final Navigation Structure
- **Global Header**: Wordmark + 6 nav items (Foundations, Standards dropdown [AS, Ind AS, IFRS], Company Accounts, Reference, Glossary) + Search icon button. Sticky on scroll.
- **Global Footer**: Dark Navy background, 4 column links (Brand info, top foundations subdomains, standards map, platform links), copyright statement.
- **Breadcrumbs**: Home / Domain / Subdomain / Page Title. Mobile displays a simple back button ("← Sibling Subdomain").
- **Left Navigation**: Present in T04, T05, T06, T07, T09. Shows the domain code, "In This Subdomain" list, and a collapsible accordion containing other subdomains of the active domain.
- **Right Navigation**: Dynamic TOC on topic pages; permanent sticky metadata panel on standards; A-Z jump links on glossary.

---

## 12. Final Database Structure
The Prisma schema contains **15 core entities**.

```prisma
// ==========================================
// schema.prisma
// ==========================================
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Domain {
  id                Int          @id @default(autoincrement())
  domainCode        String       @unique @map("domain_code") // D01, D02...
  domainName        String       @map("domain_name")
  domainSlug        String       @unique @map("domain_slug")
  domainTagline     String?      @map("domain_tagline")
  domainDescription String?      @map("domain_description") @db.Text
  domainColorHex    String       @map("domain_color_hex") @default("#2D5BE3")
  domainStatus      DomainStatus @map("domain_status") @default(COMING_SOON)
  sortOrder         Int          @map("sort_order") @default(0)
  plannedEntryCount Int          @map("planned_entry_count") @default(100)
  createdAt         DateTime     @default(now()) @map("created_at")
  updatedAt         DateTime     @updatedAt @map("updated_at")
  subdomains        Subdomain[]
  entries           Entry[]
  @@map("domains")
}

enum DomainStatus {
  ACTIVE
  PARTIAL
  COMING_SOON
}

model Subdomain {
  id                  Int       @id @default(autoincrement())
  domainId            Int       @map("domain_id")
  subdomainName       String    @map("subdomain_name")
  subdomainSlug       String    @map("subdomain_slug")
  subdomainDescription String?  @map("subdomain_description") @db.Text
  sortOrder           Int       @map("sort_order") @default(0)
  createdAt           DateTime  @default(now()) @map("created_at")
  updatedAt           DateTime  @updatedAt @map("updated_at")
  domain              Domain    @relation(fields: [domainId], references: [id])
  entries             Entry[]
  @@unique([domainId, subdomainSlug])
  @@map("subdomains")
}

model Entry {
  id                  Int               @id @default(autoincrement())
  entryType           EntryType         @map("entry_type")
  entryTitle          String            @map("entry_title")
  entrySlug           String            @unique @map("entry_slug")
  domainId            Int               @map("domain_id")
  subdomainId         Int               @map("subdomain_id")
  summary             String            @db.VarChar(500)
  entryBody           Json?             @map("entry_body")
  authorityPrimary    String?           @map("authority_primary")
  authorityPrimaryUrl String?           @map("authority_primary_url")
  authoritySecondary  String?           @map("authority_secondary") @db.Text
  verificationLevel   VerificationLevel @map("verification_level") @default(PLACEHOLDER)
  status              EntryStatus       @default(DRAFT)
  examLevelTags       Json?             @map("exam_level_tags") // Array of strings
  sortOrder           Int               @map("sort_order") @default(0)
  isFeatured          Boolean           @map("is_featured") @default(false)
  seoTitle            String?           @map("seo_title")
  seoDescription      String?           @map("seo_description") @db.VarChar(155)
  wordCount           Int?              @map("word_count")
  publishedAt         DateTime?         @map("published_at")
  lastReviewedAt      DateTime?         @map("last_reviewed_at")
  createdAt           DateTime          @default(now()) @map("created_at")
  updatedAt           DateTime          @updatedAt @map("updated_at")
  domain              Domain            @relation(fields: [domainId], references: [id])
  subdomain           Subdomain         @relation(fields: [subdomainId], references: [id])
  standardDetail      StandardDetail?
  journalEntries      EntryJournalEntry[]
  illustrations       EntryIllustration[]
  notes               EntryNote[]
  faqs                EntryFAQ[]
  resources           EntryResource[]
  relationsFrom       EntryRelationship[] @relation("RelationFrom")
  relationsTo         EntryRelationship[] @relation("RelationTo")
  standardEquivsFrom  StandardEquivalent[] @relation("StandardFrom")
  standardEquivsTo    StandardEquivalent[] @relation("StandardTo")
  @@map("entries")
}

enum EntryType {
  CONCEPT
  STANDARD
  JOURNAL_ENTRY
  GLOSSARY_TERM
  ILLUSTRATION
  FAQ
  REFERENCE
}

enum VerificationLevel {
  VERIFIED
  DRAFT
  PLACEHOLDER
}

enum EntryStatus {
  DRAFT
  PUBLISHED
}

model StandardDetail {
  id                    Int               @id @default(autoincrement())
  entryId               Int               @unique @map("entry_id")
  standardCode          String            @map("standard_code")
  standardFramework     StandardFramework @map("standard_framework")
  standardStatus        StandardStatus    @map("standard_status") @default(ACTIVE)
  standardStatusYear    Int?              @map("standard_status_year")
  issuingBody           String            @map("issuing_body") @default("ICAI")
  dateIssued            DateTime?         @map("date_issued")
  dateEffective         DateTime?         @map("date_effective")
  dateRevised           DateTime?         @map("date_revised")
  applicabilitySummary  String?           @map("applicability_summary")
  quickBullet1Icon      String?           @map("quick_bullet_1_icon")
  quickBullet1Label     String?           @map("quick_bullet_1_label")
  quickBullet1Desc      String?           @map("quick_bullet_1_desc")
  quickBullet2Icon      String?           @map("quick_bullet_2_icon")
  quickBullet2Label     String?           @map("quick_bullet_2_label")
  quickBullet2Desc      String?           @map("quick_bullet_2_desc")
  quickBullet3Icon      String?           @map("quick_bullet_3_icon")
  quickBullet3Label     String?           @map("quick_bullet_3_label")
  quickBullet3Desc      String?           @map("quick_bullet_3_desc")
  objectiveText         String?           @map("objective_text") @db.Text
  objectiveSourcePara   String?           @map("objective_source_para")
  objectiveCommentary   String?           @map("objective_commentary") @db.Text
  objectiveKeyIssues    Json?             @map("objective_key_issues")
  scopeStatement        String?           @map("scope_statement") @db.Text
  scopeIncluded         Json?             @map("scope_included")
  scopeExcluded         Json?             @map("scope_excluded")
  scopeSpecialCases     Json?             @map("scope_special_cases")
  provisionsRecognitionIntro String?      @map("provisions_recognition_intro") @db.Text
  provisionsRecognitionBody  Json?        @map("provisions_recognition_body")
  provisionsMeasurementIntro String?      @map("provisions_measurement_intro") @db.Text
  provisionsMeasurementModel1 Json?       @map("provisions_measurement_model_1")
  provisionsMeasurementModel2 Json?       @map("provisions_measurement_model_2")
  provisionsMeasurementBody  Json?        @map("provisions_measurement_body")
  comparisonStd2EntryId Int?              @map("comparison_std_2_entry_id")
  comparisonStd3EntryId Int?              @map("comparison_std_3_entry_id")
  keyDifferences        Json?             @map("key_differences")
  applicabilityMatrix   Json?             @map("applicability_matrix")
  entry                 Entry             @relation(fields: [entryId], references: [id], onDelete: Cascade)
  definitions           StandardDefinition[]
  disclosureGroups      StandardDisclosureGroup[]
  comparisonRows        StandardComparisonRow[]
  amendments            StandardAmendment[]
  @@map("standard_details")
}

enum StandardFramework {
  AS
  IND_AS
}

enum StandardStatus {
  ACTIVE
  WITHDRAWN
  REVISED
}

model StandardDefinition {
  id                  Int            @id @default(autoincrement())
  standardDetailId    Int            @map("standard_detail_id")
  defTerm             String         @map("def_term")
  defParaReference    String?        @map("def_para_reference")
  defOfficialText     String         @map("def_official_text") @db.Text
  defPlainExplanation String?        @map("def_plain_explanation") @db.Text
  sortOrder           Int            @map("sort_order") @default(0)
  standardDetail      StandardDetail @relation(fields: [standardDetailId], references: [id], onDelete: Cascade)
  @@map("standard_definitions")
}

model StandardDisclosureGroup {
  id               Int            @id @default(autoincrement())
  standardDetailId Int            @map("standard_detail_id")
  groupHeading     String         @map("group_heading")
  groupParaRange   String?        @map("group_para_range")
  sortOrder        Int            @map("sort_order") @default(0)
  standardDetail   StandardDetail @relation(fields: [standardDetailId], references: [id], onDelete: Cascade)
  items            StandardDisclosureItem[]
  @@map("standard_disclosure_groups")
}

model StandardDisclosureItem {
  id                 Int                    @id @default(autoincrement())
  disclosureGroupId  Int                    @map("disclosure_group_id")
  itemText           String                 @map("item_text") @db.Text
  itemParaRef        String?                @map("item_para_ref")
  itemIsConditional  Boolean                @map("item_is_conditional") @default(false)
  itemConditionNote  String?                @map("item_condition_note") @db.Text
  sortOrder          Int                    @map("sort_order") @default(0)
  disclosureGroup    StandardDisclosureGroup @relation(fields: [disclosureGroupId], references: [id], onDelete: Cascade)
  @@map("standard_disclosure_items")
}

model StandardComparisonRow {
  id               Int            @id @default(autoincrement())
  standardDetailId Int            @map("standard_detail_id")
  criterion        String
  valueStd1        String?        @map("value_std_1") @db.Text
  valueStd2        String?        @map("value_std_2") @db.Text
  valueStd3        String?        @map("value_std_3") @db.Text
  isDifferent      Boolean        @map("is_different") @default(false)
  differenceNote   String?        @map("difference_note") @db.Text
  sortOrder        Int            @map("sort_order") @default(0)
  standardDetail   StandardDetail @relation(fields: [standardDetailId], references: [id], onDelete: Cascade)
  @@map("standard_comparison_rows")
}

model StandardAmendment {
  id                   Int            @id @default(autoincrement())
  standardDetailId     Int            @map("standard_detail_id")
  amendmentDate        DateTime       @map("amendment_date")
  amendmentType        AmendmentType  @map("amendment_type")
  amendmentAuthority   String?        @map("amendment_authority")
  amendmentDescription String?        @map("amendment_description") @db.Text
  amendmentKeyChanges  Json?          @map("amendment_key_changes")
  amendmentOfficialUrl String?        @map("amendment_official_url")
  sortOrder            Int            @map("sort_order") @default(0)
  standardDetail       StandardDetail @relation(fields: [standardDetailId], references: [id], onDelete: Cascade)
  @@map("standard_amendments")
}

enum AmendmentType {
  ORIGINAL
  MAJOR_REVISION
  AMENDMENT
  WITHDRAWAL
  CLARIFICATION
}

model EntryJournalEntry {
  id                Int               @id @default(autoincrement())
  entryId           Int               @map("entry_id")
  jeScenarioTitle   String?           @map("je_scenario_title")
  jeLabel           String?           @map("je_label")
  jeParaRef         String?           @map("je_para_ref")
  jeCategoryHeading String?           @map("je_category_heading")
  jeNarration       String?           @map("je_narration") @db.Text
  sortOrder         Int               @map("sort_order") @default(0)
  entry             Entry             @relation(fields: [entryId], references: [id], onDelete: Cascade)
  rows              JournalEntryRow[]
  @@map("entry_journal_entries")
}

model JournalEntryRow {
  id             Int               @id @default(autoincrement())
  journalEntryId Int               @map("journal_entry_id")
  rowType        JERowType         @map("row_type")
  accountName    String?           @map("account_name")
  drAmount       Decimal?          @map("dr_amount") @db.Decimal(15, 2)
  crAmount       Decimal?          @map("cr_amount") @db.Decimal(15, 2)
  sortOrder      Int               @map("sort_order") @default(0)
  journalEntry   EntryJournalEntry @relation(fields: [journalEntryId], references: [id], onDelete: Cascade)
  @@map("journal_entry_rows")
}

enum JERowType {
  DR
  CR
  TOTAL
  SEPARATOR
}

model EntryIllustration {
  id             Int             @id @default(autoincrement())
  entryId        Int             @map("entry_id")
  illusTitle     String          @map("illus_title")
  illusScenario  String?         @map("illus_scenario") @db.Text
  illusWorking   String?         @map("illus_working") @db.Text
  illusAnswer    String?         @map("illus_answer") @db.Text
  illusNote      String?         @map("illus_note") @db.Text
  illusDifficulty IllusDifficulty @map("illus_difficulty") @default(BEGINNER)
  illusParaRef   String?         @map("illus_para_ref")
  illusFsImpact  Json?           @map("illus_fs_impact")
  sortOrder      Int             @map("sort_order") @default(0)
  entry          Entry           @relation(fields: [entryId], references: [id], onDelete: Cascade)
  @@map("entry_illustrations")
}

enum IllusDifficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

model EntryRelationship {
  id              Int              @id @default(autoincrement())
  entryId         Int              @map("entry_id")
  relatedEntryId  Int              @map("related_entry_id")
  relationshipType RelationshipType @map("relationship_type") @default(GENERAL)
  sortOrder       Int              @map("sort_order") @default(0)
  entry           Entry            @relation("RelationFrom", fields: [entryId], references: [id], onDelete: Cascade)
  relatedEntry    Entry            @relation("RelationTo", fields: [relatedEntryId], references: [id], onDelete: Cascade)
  @@unique([entryId, relatedEntryId])
  @@map("entry_relationships")
}

enum RelationshipType {
  GENERAL
  PREREQUISITE
  COMPARE
  NEXT
}

model StandardEquivalent {
  id                   Int   @id @default(autoincrement())
  standardEntryId      Int   @map("standard_entry_id")
  equivalentEntryId    Int   @map("equivalent_entry_id")
  supersedesEntryId    Int?  @map("supersedes_entry_id")
  supersededByEntryId  Int?  @map("superseded_by_entry_id")
  standardEntry        Entry @relation("StandardFrom", fields: [standardEntryId], references: [id])
  equivalentEntry      Entry @relation("StandardTo", fields: [equivalentEntryId], references: [id])
  @@map("standard_equivalents")
}

model EntryResource {
  id            Int                @id @default(autoincrement())
  entryId       Int                @map("entry_id")
  resourceType  ResourceType       @map("resource_type")
  resourceTitle String             @map("resource_title")
  resourceUrl   String?            @map("resource_url")
  mediaFileId   Int?               @map("media_file_id")
  sourceType    ResourceSourceType @map("source_type")
  videoChannel  String?            @map("video_channel")
  refYear       Int?               @map("ref_year")
  sortOrder     Int                @map("sort_order") @default(0)
  entry         Entry              @relation(fields: [entryId], references: [id], onDelete: Cascade)
  mediaFile     MediaFile?         @relation(fields: [mediaFileId], references: [id])
  @@map("entry_resources")
}

enum ResourceType {
  PDF
  VIDEO
  REFERENCE
}

enum ResourceSourceType {
  ICAI_OFFICIAL
  MCA
  IASB
  EXTERNAL
}

model GlossaryTerm {
  id               Int         @id @default(autoincrement())
  term             String
  termSlug         String      @unique @map("term_slug")
  shortDefinition  String      @map("short_definition") @db.VarChar(500)
  fullDefinition   Json?       @map("full_definition")
  authoritySource  String?     @map("authority_source")
  authorityUrl     String?     @map("authority_url")
  relatedTerms     Json?       @map("related_terms")
  standardRefs     Json?       @map("standard_refs")
  examLevelTags    Json?       @map("exam_level_tags")
  status           EntryStatus @default(DRAFT)
  lastReviewedAt   DateTime?   @map("last_reviewed_at")
  createdAt        DateTime    @default(now()) @map("created_at")
  updatedAt        DateTime    @updatedAt @map("updated_at")
  @@map("glossary_terms")
}

model MediaFile {
  id            Int                @id @default(autoincrement())
  fileName      String             @map("file_name")
  filePath      String             @map("file_path")
  fileSizeBytes Int?               @map("file_size_bytes")
  sourceType    ResourceSourceType @map("source_type")
  uploadedAt    DateTime           @default(now()) @map("uploaded_at")
  resources     EntryResource[]
  @@map("media_files")
}

model EntryNote {
  id        Int      @id @default(autoincrement())
  entryId   Int      @map("entry_id")
  noteType  NoteType @map("note_type")
  noteTitle String?  @map("note_title")
  noteBody  String   @map("note_body") @db.Text
  sortOrder Int      @map("sort_order") @default(0)
  entry     Entry    @relation(fields: [entryId], references: [id], onDelete: Cascade)
  @@map("entry_notes")
}

enum NoteType {
  IMPORTANT
  NOTE
  TIP
  CAUTION
}

model EntryFAQ {
  id            Int         @id @default(autoincrement())
  entryId       Int         @map("entry_id")
  faqQuestion   String      @map("faq_question")
  faqAnswer     String      @map("faq_answer") @db.Text
  faqSourceRef  String?     @map("faq_source_ref")
  faqCategory   FAQCategory @map("faq_category") @default(GENERAL)
  sortOrder     Int         @map("sort_order") @default(0)
  entry         Entry       @relation(fields: [entryId], references: [id], onDelete: Cascade)
  @@map("entry_faqs")
}

enum FAQCategory {
  GENERAL
  APPLICABILITY
  RECOGNITION
  MEASUREMENT
  DISCLOSURE
  EXAM
  PRACTICAL
}
```

---

## 13. Final CMS Modules
AK's CMS Admin panel contains the following modules:
- **Dashboard**: Coverage indicators (domains built vs target size), quick entry creator shortcuts, draft feeds.
- **Content Manager**: List entries, CRUD for concepts, standards, JEs, illustrations, FAQs, and references. Combines related tables.
- **Taxonomy Editor**: Manage domains and subdomains (descriptions, ordering).
- **Glossary Manager**: CRUD for the master glossary terms.
- **Equivalence Map Table**: Cross-standard reference editor (AS, Ind AS, and IFRS mappings).
- **Media Library**: PDF document upload manager (Cloudflare R2 target).

---

## 14. Final Development Package Summary
The development package aims to deliver a stable, reliable framework. The primary goal of V1 is to enable AK to populate the database with correct knowledge entries. System performance, clean HTML structures, SEO tags, semantic aria labels, and zero layout shift are critical validation criteria for V1.

---

## 15. Approved Technical Stack
- **Framework**: Next.js 14 (App Router, static generation `output: 'export'` or Incremental Static Regeneration [ISR] with `revalidate`).
- **Language**: TypeScript + ES2017+ target.
- **Styling**: Tailwind CSS + PostCSS + CSS variables system.
- **Database ORM**: Prisma + PostgreSQL database.
- **Search Engine**: Fuse.js client-side search indexing.
- **Interactive Helpers**: `html2canvas` for copying JEs as images (deferred, client-only load).
- **Icons**: `lucide-react` (consistent 1.5px stroke weight).
- **Hosting**: Vercel (frontend) + Railway (PostgreSQL) + Cloudflare R2 (PDF files storage).

---

## 16. Folder Structure
The Next.js workspace follows this exact structure:

```
accounts-life/
├── .env.example
├── .eslintrc.json
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   └── schema.prisma
├── lib/
│   ├── db.ts               # Prisma client singleton
│   ├── types.ts            # Type definitions
│   ├── utils.ts            # Indian currency formatting, slugs, date converters
│   └── data/
│       └── domains.ts      # Static seed/stub data for domains
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky navbar with mobile hamburger and dropdown
│   │   └── Footer.tsx      # Global dark navy footer
│   └── ui/
│       ├── DomainPill.tsx        # Styled domain indicators
│       ├── EntryTypeBadge.tsx    # Styled badge matching the 7 entry types
│       └── VerificationBadge.tsx # Status markers for Verified/Draft/Placeholder
└── app/
    ├── globals.css         # Styling system base configuration
    ├── layout.tsx          # Root layout loading Inter, Lora, and JetBrains Mono
    ├── page.tsx            # T01 Homepage [NOT CREATED YET]
    ├── search/
    │   └── page.tsx        # T10 Search Page [NOT CREATED YET]
    ├── sitemap/
    │   └── page.tsx        # T11 Sitemap Page [NOT CREATED YET]
    ├── sitemap.xml/
    │   └── route.ts        # XML Sitemap endpoint [NOT CREATED YET]
    ├── glossary/
    │   ├── page.tsx        # T08 Glossary index [NOT CREATED YET]
    │   └── [slug]/
    │       └── page.tsx    # T09 Glossary term detail [NOT CREATED YET]
    ├── standards/
    │   ├── as/
    │   │   ├── page.tsx    # List AS standards [NOT CREATED YET]
    │   │   └── [slug]/
    │   │       └── page.tsx# T05 AS Standard page [NOT CREATED YET]
    │   └── ind-as/
    │       ├── page.tsx    # List Ind AS standards [NOT CREATED YET]
    │       └── [slug]/
    │           └── page.tsx# T06 Ind AS Standard page [NOT CREATED YET]
    ├── [domainSlug]/
    │   ├── page.tsx        # T02 Domain landing page [NOT CREATED YET]
    │   ├── [subdomainSlug]/
    │   │   ├── page.tsx    # T03 Subdomain listing [NOT CREATED YET]
    │   │   └── [entrySlug]/
    │   │       └── page.tsx# T04 Concept page [NOT CREATED YET]
    │   └── journal-entries/
    │       └── [slug]/
    │           └── page.tsx# T07 Journal Entry page [NOT CREATED YET]
    ├── admin/
    │   ├── page.tsx        # CMS Dashboard [NOT CREATED YET]
    │   ├── login/
    │   │   └── page.tsx    # Admin Login [NOT CREATED YET]
    │   └── entries/
    │       ├── page.tsx    # All entries list [NOT CREATED YET]
    │       ├── new/
    │       │   └── page.tsx# Entry creation form [NOT CREATED YET]
    │       └── [id]/
    │           └── edit/
    │               └── page.tsx # Entry editor form [NOT CREATED YET]
    └── api/
        ├── search-index/
        │   └── route.ts    # JSON search index endpoint [NOT CREATED YET]
        └── upload/
            └── route.ts    # PDF upload handler [NOT CREATED YET]
```

---

## 17. Files Already Created
The following files have been generated, tested, and are completely functional:
- **`package.json`**: Holds package versions including Next 14, React 18, Prisma, Lucide-react, Fuse.js, and html2canvas.
- **`tsconfig.json`**: Base TypeScript config with path aliases set up (`@/*` pointing to root).
- **`postcss.config.js`**: PostCSS setup mapping to tailwindcss.
- **`tailwind.config.ts`**: Tailwind configurator mapping all custom colors, font size scales, heights, border-radii, spacing tokens, and Lora/Inter/JetBrains Mono configurations.
- **`prisma/schema.prisma`**: The complete database definition file containing all 15 relational tables, columns, indexes, and FK relationships.
- **`lib/db.ts`**: The PrismaClient database connection singleton.
- **`lib/types.ts`**: Complete type declarations mapping all database models, enums, layout cards, navigation systems, and search interfaces.
- **`lib/utils.ts`**: Utility code containing class merges (`cn`), Indian currency text formatters, review date formats, slugification rules, and path builder maps (`getDomainPath`, etc.).
- **`lib/data/domains.ts`**: Static domain details listing all 12 domains, their subdomains, statuses, and colors for immediate front-end testing.
- **`app/globals.css`**: Design tokens, base layout styles, and font mappings.
- **`app/layout.tsx`**: The main page layout wrapper which initializes Google Fonts, handles metadata headers, implements skip-links, and binds the global header and footer.
- **`components/layout/Header.tsx`**: The navigation header containing wordmarks, dropdown buttons for standards, search icon actions, and mobile drawer logic.
- **`components/layout/Footer.tsx`**: The site footer containing site navigation indexes, built-by annotations, and copyright data.
- **`components/ui/DomainPill.tsx`**: Capsule indicators styled with domain colors.
- **`components/ui/EntryTypeBadge.tsx`**: Entry type badges mapping colors to the 7 core classifications.
- **`components/ui/VerificationBadge.tsx`**: Colored markers representing Verified, Draft, and Placeholder status.

---

## 18. Files Not Yet Created
These components and pages need to be implemented in subsequent development phases:
1. **Public page routes**:
   - `app/page.tsx`: The main homepage.
   - `app/[domainSlug]/page.tsx`: Domain landing page.
   - `app/[domainSlug]/[subdomainSlug]/page.tsx`: Subdomain listing.
   - `app/[domainSlug]/[subdomainSlug]/[entrySlug]/page.tsx`: Concept/Illustrations/FAQ renderer.
   - `app/[domainSlug]/journal-entries/[slug]/page.tsx`: Standalone journal entry page.
   - `app/standards/as/[slug]/page.tsx` & `app/standards/ind-as/[slug]/page.tsx`: AS/Ind AS standard page templates with sliding tabs and meta sidebars.
   - `app/glossary/page.tsx` & `app/glossary/[slug]/page.tsx`: Glossary terms layout.
   - `app/search/page.tsx`: Full-screen search page with filters.
   - `app/sitemap/page.tsx`: Human sitemap directory.
2. **CMS/Admin Portal page routes**:
   - `app/admin/login/page.tsx`: Admin credential verification + TOTP 2FA step.
   - `app/admin/page.tsx`: Dashboard with indicators.
   - `app/admin/entries/page.tsx`: Content entry records table.
   - `app/admin/entries/new/page.tsx` & `app/admin/entries/[id]/edit/page.tsx`: The 4-tab content manager form.
3. **Core front-end UI components**:
   - `components/ui/JournalEntryBlock.tsx`:Monospaced `.je-block` layout with copy actions.
   - `components/ui/Callout.tsx`: Key notes block renderer.
   - `components/ui/TableOfContents.tsx`: Dynamic header scanner and observer for active highlight sync.
   - `components/ui/ComparisonTable.tsx`: Multi-standard comparison grid.
   - `components/ui/FAQAccordion.tsx`: Keyboard-navigable question accordion.

---

## 19. Current Development Status
- **Project Structure**: Set up and configured.
- **Database Schema**: Coded and mapped (Prisma file completed). Ready for DB synchronization.
- **Design system tokens**: Defined in custom Tailwind styles.
- **Layout foundation**: Coded. Header and footer navigation bars match layout specs.
- **UI badges/pills**: Built and validated.
- **Domain static stubs**: Built in typescript datasets for early component modeling.
- **Pages / CMS Logic**: Not yet implemented.

---

## 20. Build Order
Follow this step-by-step order to complete development:

```
[Phase A: Setup]
  1. Initialize local DB instance & run prisma generate / db push.
  2. Load static domains data into DB via a seed script.
[Phase B: CMS Core]
  3. Code JWT authorization and QR 2FA validation on `/admin/login`.
  4. Build admin dashboard templates.
  5. Build the 4-tab Entry Form, block editor inputs, and standard custom fields.
  6. Code pre-publish checklist validation.
  7. Deploy PDF file uploads hook linked to R2 storage.
[Phase C: Front-End UI Components]
  8. Code the Journal Entry Monospace Block (DR/CR alignments, total values).
  9. Code "Copy as Text" and "Copy as Image" (using html2canvas).
  10. Code Alert Callouts and FAQ Accordions (with aria roles).
  11. Build dynamic Table of Contents (IntersectionObserver scroll trackers).
[Phase D: Public Page Templates]
  12. Build T01 Homepage (search overlay, explorer, recently added).
  13. Build T02 Domain Landing & T03 Subdomain listing.
  14. Build T04 Concept / Topic Page.
  15. Build T05 & T06 Standard Page templates (code the sticky tab bars, url routing).
  16. Build T07 Journal Entry Page & T09 Glossary detail view.
  17. Build T12 Coming Soon template & T11 Human sitemap.
[Phase E: Search & SEO]
  18. Set up Fuse.js client index generator on `/api/search-index`.
  19. Build `/search/` page and filter triggers.
  20. Setup robots.txt, metadata generators, and sitemap.xml.
[Phase F: Verification & Testing]
  21. Add print stylesheet (@media print) tests.
  22. Perform accessibility audits (WCAG 2.1 AA focus rings).
  23. Deploy and verify SSL routes.
```

---

## 21. Launch Requirements
The platform is ready to launch when the following criteria are met:

### Technical Audits
- **Lighthouse Performance**: Mobile LCP < 2.5s, CLS = 0.
- **Accessibility**: 100% keyboard navigable, aria-expanded toggles on FAQs/accordion tabs, proper skip-links.
- **SEO**: Valid XML sitemaps, canonical links present on all entries, correct metadata headers.
- **Security**: Double-factor authentication active on `/admin/`, media uploads validated against files exceeding 20MB.

### Content Gates
- **Total Published**: At least 120 entries published.
- **Foundations Coverage**: Domain 01 populated with at least 80 active concepts/illustrated entries.
- **Standards Coverage**: All 32 AS standards populated at least as stubs (verbatim Objective and Scope sections populated).
- **Glossary**: At least 50 core terms published.
- **Validation**: All entries show a verification level. Verified entries must link to a valid primary authority URL.

---

## 22. Rejected Ideas
These concepts have been explicitly reviewed and **rejected** by AK. Do not implement:
- **Floating AI Helper / Chat Bubble**: Excluded to preserve the platform's professional, human-curated identity.
- **Embedded Videos / Iframe players**: Replaced with text hyperlinks to preserve performance and avoid clutter.
- **User accounts / comments / forums**: Accounts.Life is a reference work, not a social space.
- **Star-ratings (⭐⭐⭐) and timestamp logs for videos**: Star-ratings look subjective and timestamps are high-maintenance.
- **Kanban workflow board in CMS**: A list view with status filters is more efficient for a single admin.
- **Scheduled publishing**: Content is published immediately or kept as a draft.

---

## 23. Future V2 Features
These features are approved for future implementation:
- **Interactive Knowledge Graph**: Visualizing connected concept nodes using D3.js.
- **Dark Mode**: High-contrast dark mode support.
- **Advanced Search Engine**: Meilisearch backend with phonetic and synonym indexing.
- **Orphan/Broken Link Manager**: Automated CMS link checker.
- **Case Studies & Interview Q&A Modules**: Dedicated standalone modules.

---

## 24. Exact Instructions For The Next AI
When resuming development:
1. **Database Setup**:
   - Ensure a PostgreSQL instance is running.
   - Run `npx prisma db push` to initialize the database tables defined in [schema.prisma](file:///d:/My%20Accounts/accounts-life/prisma/schema.prisma).
   - Write a seed script in `prisma/seed.ts` that reads the static domain definitions from [domains.ts](file:///d:/My%20Accounts/accounts-life/lib/data/domains.ts) and inserts them into the database. Run `npx prisma db seed`.
2. **Setup Verification**:
   - Run `npm run dev` and ensure the application boots.
   - Verify that the layout components [Header.tsx](file:///d:/My%20Accounts/accounts-life/components/layout/Header.tsx) and [Footer.tsx](file:///d:/My%20Accounts/accounts-life/components/layout/Footer.tsx) load without compilation issues.
3. **Core Development Focus**:
   - Begin building page templates in the exact sequence outlined in **Section 20**.
   - Create reusable components in `components/ui/` for custom inputs (such as the Journal Entry Monospace block) and test them with static stub datasets before linking them to dynamic database requests.
   - Stick strictly to the custom spacing, sizing, color theme tokens, and typography mapping defined in [tailwind.config.ts](file:///d:/My%20Accounts/accounts-life/tailwind.config.ts) and [globals.css](file:///d:/My%20Accounts/accounts-life/app/globals.css).
