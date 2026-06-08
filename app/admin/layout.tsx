import { cookies } from 'next/headers'
import AdminHeader from './AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = cookies().get('admin_session')?.value
  const isAuthenticated = session === 'authenticated_session_token'

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col font-sans">
      {isAuthenticated && <AdminHeader />}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
