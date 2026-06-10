import { cookies } from 'next/headers'
import AdminHeader from './AdminHeader'
import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'accounts-life-default-secret-key-321-at-least-32-chars-long'

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = cookies().get('admin_session')?.value
  const isAuthenticated = session ? verifyToken(session) : false

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col font-sans">
      {isAuthenticated && <AdminHeader />}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
