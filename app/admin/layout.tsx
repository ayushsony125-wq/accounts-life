import { cookies } from 'next/headers'
import AdminSidebar from './AdminSidebar'
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
        {/* Sticky top header bar */}
        <header className="sticky top-0 z-40 h-12 bg-white border-b border-[#E2E1DD] flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[#1C1C1E]">CMS Admin</span>
            <span className="text-[#E2E1DD]">·</span>
            <span className="text-xs text-[#76767E]">accounts-life</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#2D5BE3] hover:underline font-semibold flex items-center gap-1"
            >
              View Live Site ↗
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
