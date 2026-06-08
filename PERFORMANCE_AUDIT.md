# Accounts.Life — Performance & Accessibility Audit

This document examines page performance metrics, accessibility features (WCAG 2.1 AA), responsive layouts, and font layout optimizations.

---

## Performance & Core Web Vitals

### 1. Cumulative Layout Shift (CLS) on Font Load
* **Severity:** LOW
* **Impact:** Layout reflows occur briefly during page initialization as browser defaults swap to Inter and Lora.
* **Exact File:** [app/layout.tsx](file:///d:/My%20Accounts/accounts-life/app/layout.tsx)
* **Exact Fix:** Font swap configurations are already enabled (`display: 'swap'`). To entirely prevent shifts, match sizes by defining custom size-adjust rules inside CSS overrides or Tailwind configs.

---

## Accessibility (WCAG 2.1 AA Compliance)

### 2. Low Contrast Ratio on Minor Labels
* **Severity:** MEDIUM
* **Impact:** Visually impaired users or screen readers might struggle to distinguish small labels, metadata stamps, or breadcrumb links.
* **Exact File:** [app/globals.css](file:///d:/My%20Accounts/accounts-life/app/globals.css) (and styling configuration definitions)
* **Exact Fix:**
  * Ensure text secondary colors (`#4A4A52`) and muted text colors (`#76767E`) meet the minimum WCAG 2.1 AA contrast ratio requirements of `4.5:1` against standard white and cream backgrounds:
    ```css
    /* Increase color weights */
    .text-secondary {
      color: #3e3e44;
    }
    .text-tertiary {
      color: #5d5d64;
    }
    ```

### 3. Screen Reader Form Labels in Search Box
* **Severity:** LOW
* **Impact:** Keyboard/screen-reader users navigating the search page will lack descriptive inputs.
* **Exact File:** [app/search/page.tsx](file:///d:/My%20Accounts/accounts-life/app/search/page.tsx) (and glossary input fields)
* **Exact Fix:**
  * Add explicit `aria-label` or `id` matching `<label>` elements to input boxes:
    ```tsx
    <input
      id="search-input"
      type="text"
      aria-label="Search all accounting topics"
      // ...
    />
    ```

---

## Mobile Responsiveness

### 4. Code Block Horizontal Overflows on Mobile Screens
* **Severity:** LOW
* **Impact:** Long formula strings and double-entry row grids might cause horizontal scroll shifts on standard mobile screens.
* **Exact File:** [app/globals.css](file:///d:/My%20Accounts/accounts-life/app/globals.css) (code wrappers)
* **Exact Fix:** Apply explicit horizontal scroll rules for code elements:
  ```css
  pre, code {
    max-width: 100%;
    overflow-x: auto;
  }
  ```
