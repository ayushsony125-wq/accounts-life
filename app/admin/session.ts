import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Checks the admin session cookie. If not authenticated,
 * performs an immediate server-side redirect to the login page.
 */
export function verifyAdminSession() {
  const session = cookies().get('admin_session')?.value
  if (session !== 'authenticated_session_token') {
    redirect('/admin/login')
  }
}
