# Accounts.Life — SEO Readiness Audit

This document examines indexation readiness, structured schemas, meta tags, and crawler optimization required for search engine visibility.

---

## Crawling & Indexation

### 1. Missing Robots.txt & XML Sitemap
* **Severity:** HIGH
* **Impact:** Search engine bots will crawl duplicate paths, miss newly published concepts, and fail to discover dynamic routes properly.
* **Exact File:** [app/](file:///d:/My%20Accounts/accounts-life/app/) (lack of sitemap and robots configuration)
* **Exact Fix:** Add `app/robots.ts` and `app/sitemap.ts` to automatically index dynamic content retrieved from Neon PostgreSQL.

---

## Semantic Web & Schema.org

### 2. Missing JSON-LD Structured Data
* **Severity:** LOW
* **Impact:** Lost opportunity to acquire Google rich snippets (FAQ cards, course structures, article cards, breadcrumb lists) on SERPs.
* **Exact File:** [app/[domainSlug]/[subSlug]/[entrySlug]/page.tsx](file:///d:/My%20Accounts/accounts-life/app/%5BdomainSlug%5D/%5BsubSlug%5D/%5BentrySlug%5D/page.tsx)
* **Exact Fix:**
  * Add a JSON-LD script tag in the page template to export semantic metadata for parser bots:
    ```tsx
    const jsonLd = {
      "@context": "https://schema.type",
      "@type": "TechArticle",
      "headline": entry.entryTitle,
      "description": entry.summary,
      "datePublished": entry.publishedAt,
      "author": { "@type": "Person", "name": "AK" }
    }
    
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ... rest of UI */}
      </>
    )
    ```

---

## Meta Tags & Canonicalization

### 3. Absolute Alternate Canonical Link Paths
* **Severity:** LOW
* **Impact:** If `metadataBase` fails to resolve, relative path strings might generate broken canonical URLs on third-party aggregators.
* **Exact File:** [app/[domainSlug]/[subSlug]/[entrySlug]/page.tsx](file:///d:/My%20Accounts/accounts-life/app/%5BdomainSlug%5D/%5BsubSlug%5D/%5BentrySlug%5D/page.tsx)
* **Exact Fix:**
  * Define explicit URL strings within metadata canonical paths:
    ```typescript
    canonical: `https://accounts.life/${params.domainSlug}/${params.subSlug}/${params.entrySlug}`
    ```
