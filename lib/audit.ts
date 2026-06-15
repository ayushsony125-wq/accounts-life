import { headers, cookies } from 'next/headers'
import prisma from './db'

export interface AuditLogOptions {
  action: string      // "LOGIN" | "LOGOUT" | "CREATE" | "UPDATE" | "PUBLISH" | "ROLLBACK" | "DELETE"
  entityType: string  // "Entry" | "MediaFile" | "GlossaryTerm" | "System"
  entityId: string    // The ID or Slug of the entity affected
  description?: string
  userEmail?: string  // If provided directly (e.g. on login/logout before session cookie)
}

/**
 * Creates an audit log entry in the database.
 * Automatically captures IP Address and User Agent from headers,
 * and extracts user email from session cookie if not explicitly provided.
 */
export async function createAuditLog(options: AuditLogOptions) {
  try {
    const headersList = await headers()
    const cookieStore = await cookies()

    // 1. Resolve User Email / Identity
    let identity = options.userEmail
    if (!identity) {
      identity = cookieStore.get('admin_email')?.value || 'System'
    }

    // 2. Capture Network Metadata
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1'
    const userAgent = headersList.get('user-agent') || 'Unknown Agent'

    // 3. Save to database
    await prisma.auditLog.create({
      data: {
        userEmail: identity,
        action: options.action,
        entityType: options.entityType,
        entityId: options.entityId,
        description: options.description || null,
        ipAddress: ip.split(',')[0].trim(), // Get primary IP in case of proxy chain
        userAgent: userAgent,
      }
    })
  } catch (err) {
    console.error('Failed to write audit log:', err)
  }
}
