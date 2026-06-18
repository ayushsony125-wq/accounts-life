import { cookies } from 'next/headers'
import AdminSidebar from './AdminSidebar'
import GlobalAdminTopBar from './GlobalAdminTopBar'
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
    <div className="min-h-screen bg-[#F4F3F0] text-[#1C1C1E] font-sans flex">
      {/* Sidebar — fixed left, w-56 */}
      <AdminSidebar />

      {/* Main content area — offset by sidebar width */}
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        {/* Sticky top control bar — always visible on every admin page */}
        <GlobalAdminTopBar />

        {/* Page content */}
        <main className="flex-1 p-8 overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
