import { cookies } from 'next/headers'
import AdminHeader from './AdminHeader'
import BackButton from '@/components/ui/BackButton'
import { verifyAdminSession as _verify } from './session'
import crypto from 'crypto'

// Re-use the same ADMIN_SECRET as session.ts so token validation is consistent
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  const isAuthenticated = session ? verifyToken(session) : false

  // If not authenticated, render children only (login page handles its own layout)
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0F19] text-[#1C1C1E] dark:text-white flex flex-col font-sans transition-colors pt-14">
      <AdminHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <BackButton fallbackPath="/admin" />
        </div>
        {children}
      </main>
    </div>
  )
}
