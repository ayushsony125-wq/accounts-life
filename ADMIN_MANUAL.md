# Accounts.Life — Admin CMS Manual

This manual explains how to access, authenticate, and manage domain categories, glossary definitions, compliance standards, and educational topics using the built-in Admin CMS dashboard.

---

## 1. Authentication
Access the dashboard by navigating to the login page:
* **Route:** `/admin/login`
* **Credentials:** Enter the security PIN configured in the `ADMIN_PASSWORD` environment variable.
* **Session Lifetime:** The login session is persisted client-side in cookies. If the PIN is changed in the server environment, the administrator must log in again.

---

## 2. Admin Panel Layout (`/admin`)
Once logged in, the central administrator console provides:
* **Record Summary:** Real-time counts of Domains, subdomains, published Entries, and Glossary terms.
* **Shortcut Actions:** Direct links to write new entries, edit existing records, manage glossary lists, or adjust domain parameters.

---

## 3. Operations & Management

### A. Domain Editor (`/admin/domains`)
* Use this panel to update code listings, edit color identifiers (hex values) that display on domain badges, and edit tagline descriptions for the public homepage.

### B. Content Entry Manager (`/admin/entries`)
* **Create Entry:** Navigate to `/admin/entries/new`. Select the entry type (`CONCEPT`, `STANDARD`, `JOURNAL_ENTRY`, etc.), domain category, and target subdomain.
* **Edit Entry:** Select any entry from the central list to open its editor form.
* **Fields:**
  * **Title & Slug:** Title of the topic and the slug (e.g. `accrual-concept` must match the public path URL).
  * **Summary:** Brief paragraph description showing up in search indexes and card hover-overs.
  * **Body Blocks:** JSON structure defining the page layout (headings, text blocks).
  * **Exam Level Tags:** Categorization tags (e.g., CA Foundation, CA Intermediate) to help learners filter topics.
  * **Status:** Toggle between `DRAFT` (hidden from public site) and `PUBLISHED` (instantly compiled and visible on the website).

### C. Glossary Editor (`/admin/glossary`)
* Navigate to the glossary editor to add terms, write plain-English definitions, specify authority source references (e.g. AS 2, Para 4), and link related topics.

---

## 4. Verification & Deployment Synchronization
* Accounts.Life is a Next.js static site. When you make modifications, save changes, or create new articles in the CMS, the changes persist immediately in the Neon database.
* To reflect changes instantly on a statically generated website hosting provider, trigger a rebuild or verify that your host supports **Incremental Static Regeneration (ISR)** for dynamic routes.
* If testing locally in development mode (`npm run dev`), the public site will instantly query the Neon database on every page reload to reflect your CMS updates.
