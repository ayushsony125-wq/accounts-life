# Accounts.Life — Security Audit

This document details security vulnerabilities, access control flaws, and encryption improvements required for the Admin CMS panel.

---

## Access Control Flaws

### 1. Forged Cookies via Static Session Token
* **Severity:** HIGH
* **Impact:** An attacker can gain full access to the CMS admin panel, creating, editing, and deleting ledger data by simply injecting a static cookie name/value in their browser, completely bypassing the PIN login.
* **Exact File:** [app/admin/actions.ts](file:///d:/My%20Accounts/accounts-life/app/admin/actions.ts) (specifically `SESSION_TOKEN` and `checkSession()`)
* **Exact Fix:**
  * Implement cryptographic signatures using a secret key. Replace the static session token with a signed JWT token or encrypted iron-session logic:
    ```typescript
    import { SignJWT, jwtVerify } from 'jose'
    
    const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'fallback-secret')
    
    export async function login(password: string) {
      const adminPassword = process.env.ADMIN_PASSWORD || '123456'
      if (password === adminPassword) {
        const token = await new SignJWT({ role: 'admin' })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1d')
          .sign(SECRET)
          
        cookies().set('admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24,
          path: '/',
        })
        return { success: true }
      }
      return { success: false, error: 'Invalid PIN' }
    }
    
    export async function checkSession(): Promise<boolean> {
      const token = cookies().get('admin_session')?.value
      if (!token) return false
      try {
        await jwtVerify(token, SECRET)
        return true
      } catch {
        return false
      }
    }
    ```

---

## Authentication & Password Storage

### 2. Plain-Text Password Check in Environment Settings
* **Severity:** MEDIUM
* **Impact:** Storing plain-text passwords in environment config files increases exposure risks (e.g. log leaks, code repository exposures).
* **Exact File:** [.env](file:///d:/My%20Accounts/accounts-life/.env) and [app/admin/actions.ts](file:///d:/My%20Accounts/accounts-life/app/admin/actions.ts)
* **Exact Fix:**
  * Hash the password using a cryptographically secure function (e.g., bcrypt or argon2) and verify the password using verify matches:
    ```typescript
    import bcrypt from 'bcryptjs'
    // In login function:
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    ```

---

## Client-Side Security

### 3. Server Actions Cross-Site Request Forgery (CSRF) Mitigation
* **Severity:** LOW
* **Impact:** Cross-origin forms might send requests to server actions.
* **Exact File:** [next.config.js](file:///d:/My%20Accounts/accounts-life/next.config.js) (or Next.js deployment configuration)
* **Exact Fix:** Ensure server action origin verification is enabled. By default, Next.js 14+ verifies origin header on server actions, but configure strict headers to block non-matching origins.
