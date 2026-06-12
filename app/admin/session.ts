import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'accounts-one-default-secret-key-321-at-least-32-chars-long'

function verifyToken(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return false
    const [expiryStr, signature] = parts
    const expiry = Number(expiryStr)
    if (isNaN(expiry) || expiry < Date.now()) return false
    const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(expiryStr).digest('hex')
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  } catch {
    return false
  }
}

/**
 * Checks the admin session cookie. If not authenticated,
 * performs an immediate server-side redirect to the login page.
 */
export async function verifyAdminSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!session || !verifyToken(session)) {
    redirect('/admin/login')
  }
}

