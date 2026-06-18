import Link from 'next/link'
import { cookies } from 'next/headers'
import { verifyAdminSession } from '../session'
import {
  Settings,
  Shield,
  Globe,
  Clock,
  AlertTriangle,
  Info,
  Lock,
  Zap,
  KeyRound,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const SITE_VERSION = '1.2.0'
const SITE_NAME = 'Accounts.One'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://accounts.one'

export default async function SettingsPage() {
  await verifyAdminSession()
  const cookieStore = await cookies()
  const loggedInEmail = cookieStore.get('admin_email')?.value || 'admin@accounts.one'

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] flex items-center gap-2">
          <Settings size={22} className="text-[#2D5BE3]" />
          Settings & Configuration
        </h1>
        <p className="text-sm text-[#76767E] mt-1">
          Manage site information, security, and account settings for Accounts.One Admin CMS.
        </p>
      </div>

      {/* Section 1 — Site Information */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2 bg-[#FAFAF8]">
          <div className="w-7 h-7 rounded-lg bg-[#EEF2FD] flex items-center justify-center">
            <Globe size={14} className="text-[#2D5BE3]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">Site Information</h2>
            <p className="text-[11px] text-[#A0A0A8]">Current deployment configuration</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-1">
          {[
            { label: 'Account Name',    value: 'CA Portal Administrator (AK)', mono: false },
            { label: 'Site Name',       value: SITE_NAME,    mono: false },
            { label: 'Live URL',        value: SITE_URL,     mono: true  },
            { label: 'Admin Email',     value: loggedInEmail, mono: true  },
            { label: 'CMS Version',     value: SITE_VERSION, mono: true  },
            { label: 'Environment',     value: process.env.NODE_ENV ?? 'production', mono: true },
            { label: 'Database',        value: process.env.DATABASE_URL ? 'Neon PostgreSQL (Connected)' : 'Not configured', mono: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-[#F4F3F0] last:border-0">
              <span className="text-sm font-medium text-[#4A4A52]">{row.label}</span>
              <span className={`text-sm text-[#1C1C1E] ${row.mono ? 'font-mono bg-[#F4F3F0] px-2 py-0.5 rounded text-xs' : 'font-semibold'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Security & Password */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2 bg-[#FAFAF8]">
          <div className="w-7 h-7 rounded-lg bg-[#F0EAF9] flex items-center justify-center">
            <Shield size={14} className="text-[#6B3FA0]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">Security & Access</h2>
            <p className="text-[11px] text-[#A0A0A8]">Authentication, passwords, and recovery options</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-5">
          {/* Password Change */}
          <div className="flex items-start justify-between gap-4 py-2 border-b border-[#F4F3F0]">
            <div className="flex items-start gap-3">
              <Lock size={14} className="text-[#6B3FA0] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C1C1E]">Change Admin Password</p>
                <p className="text-xs text-[#76767E] mt-0.5">
                  Update your admin password via the <code className="bg-[#F4F3F0] px-1 rounded">ADMIN_PASSWORD</code> environment variable in Vercel.
                  Go to: <strong>Vercel Dashboard → accounts-one project → Settings → Environment Variables</strong>
                </p>
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#2D5BE3] hover:underline font-semibold mt-1"
                >
                  Open Vercel Dashboard ↗
                </a>
              </div>
            </div>
          </div>

          {/* Recovery Password */}
          <div className="flex items-start justify-between gap-4 py-2 border-b border-[#F4F3F0]">
            <div className="flex items-start gap-3">
              <KeyRound size={14} className="text-[#B45309] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C1C1E]">Alternative Recovery & Fallback Access</p>
                <p className="text-xs text-[#76767E] mt-0.5 leading-relaxed">
                  If you lose access to your primary password, you can configure fallback recovery methods:
                </p>
                <ul className="list-disc pl-4 text-xs text-[#76767E] space-y-1 mt-1.5 leading-relaxed font-semibold">
                  <li><strong>Recovery Password:</strong> Add <code className="bg-[#F4F3F0] px-1 rounded">ADMIN_RECOVERY_PASSWORD</code> in Vercel Environment Variables.</li>
                  <li><strong>Safe Recovery Email:</strong> Add <code className="bg-[#F4F3F0] px-1 rounded">ADMIN_RECOVERY_EMAIL</code> to set a secondary destination for emergency token dispatch.</li>
                  <li><strong>TOTP Multi-Factor:</strong> Add <code className="bg-[#F4F3F0] px-1 rounded">ADMIN_MFA_SECRET</code> to enable 2FA app verification codes on login.</li>
                </ul>
                <div className="mt-3.5 p-3 bg-[#FEF6E4] border border-[#FDE68A] rounded-lg">
                  <p className="text-xs font-semibold text-[#B45309]">
                    ⚠ Save recovery credentials in a secure, offline password manager. Never commit raw passwords to version control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Duration */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-[#76767E]" />
              <div>
                <p className="text-sm font-medium text-[#4A4A52]">Session Duration</p>
                <p className="text-xs text-[#A0A0A8] mt-0.5">Admin sessions expire after this period of inactivity</p>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-[#F4F3F0] px-2 py-0.5 rounded text-[#4A4A52]">24 hours</span>
          </div>
        </div>
      </div>

      {/* Section 3 — Session Info */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2 bg-[#FAFAF8]">
          <div className="w-7 h-7 rounded-lg bg-[#E8F7EE] flex items-center justify-center">
            <Clock size={14} className="text-[#1A7A4A]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">Current Session</h2>
            <p className="text-[11px] text-[#A0A0A8]">Your active admin session details</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-1">
          {[
            { label: 'Auth Method',    value: 'HMAC-SHA256 Signed Cookie' },
            { label: 'Token Validity', value: '24h from login' },
            { label: 'Secure Cookie',  value: 'httpOnly · SameSite=Strict · Secure' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-[#F4F3F0] last:border-0">
              <span className="text-sm font-medium text-[#4A4A52]">{row.label}</span>
              <span className="text-xs text-[#76767E] font-mono bg-[#F4F3F0] px-2 py-0.5 rounded">{row.value}</span>
            </div>
          ))}
          <div className="mt-2 pt-2">
            <Link
              href="/admin/activity"
              className="text-xs text-[#2D5BE3] hover:underline font-semibold flex items-center gap-1"
            >
              <Info size={11} />
              View full activity log →
            </Link>
          </div>
        </div>
      </div>

      {/* Section 4 — Status & Health */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2 bg-[#FAFAF8]">
          <div className="w-7 h-7 rounded-lg bg-[#E8F7EE] flex items-center justify-center">
            <CheckCircle2 size={14} className="text-[#1A7A4A]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">System Status</h2>
            <p className="text-[11px] text-[#A0A0A8]">Live production deployment health</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-3">
          {[
            { label: 'Live Site',           status: 'Operational',  color: '#1A7A4A', bg: '#E8F7EE' },
            { label: 'Admin CMS',           status: 'Operational',  color: '#1A7A4A', bg: '#E8F7EE' },
            { label: 'Database (Neon)',      status: process.env.DATABASE_URL ? 'Connected' : 'Not Configured', color: process.env.DATABASE_URL ? '#1A7A4A' : '#C0392B', bg: process.env.DATABASE_URL ? '#E8F7EE' : '#FDEEEE' },
            { label: 'PDF/Video Storage',   status: 'Database-backed', color: '#2D5BE3', bg: '#EEF2FD' },
            { label: 'Cache',               status: 'force-dynamic (no stale cache)', color: '#B45309', bg: '#FEF6E4' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#F4F3F0] last:border-0">
              <span className="text-sm font-medium text-[#4A4A52]">{row.label}</span>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ color: row.color, backgroundColor: row.bg }}
              >
                ● {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 — Danger Zone */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#FDEEEE] flex items-center gap-2 bg-[#FFFAFA]">
          <div className="w-7 h-7 rounded-lg bg-[#FDEEEE] flex items-center justify-center">
            <AlertTriangle size={14} className="text-[#C0392B]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#C0392B]">Danger Zone</h2>
            <p className="text-[11px] text-[#A0A0A8]">Irreversible destructive operations — disabled in production</p>
          </div>
        </div>
        <div className="px-5 py-5">
          <div className="flex items-start justify-between gap-4 py-2">
            <div>
              <p className="text-sm font-medium text-[#4A4A52]">Reset Demo Data</p>
              <p className="text-xs text-[#A0A0A8] mt-0.5 max-w-sm">
                Wipe all entries, standards, glossary terms and activity logs and restore
                sample seed data. This action cannot be undone.
              </p>
            </div>
            <button
              disabled
              className="shrink-0 px-4 py-2 rounded-lg border border-[#E2E1DD] text-xs font-semibold text-[#C8C7C2] bg-[#F4F3F0] cursor-not-allowed transition-all"
              title="Disabled in production"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
