import Link from 'next/link'
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
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const SITE_VERSION = '1.0.0'
const SITE_NAME = 'Accounts.One'
const SITE_URL = 'https://accounts-life.vercel.app'

export default async function SettingsPage() {
  await verifyAdminSession()

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] flex items-center gap-2">
          <Settings size={22} className="text-[#2D5BE3]" />
          Settings
        </h1>
        <p className="text-sm text-[#76767E] mt-1">
          Admin configuration and site information.
        </p>
      </div>

      {/* Section 1 — Site Information */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EEF2FD] flex items-center justify-center">
            <Globe size={14} className="text-[#2D5BE3]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">Site Information</h2>
            <p className="text-[11px] text-[#A0A0A8]">Static configuration for this deployment</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-4">
          {[
            { label: 'Site Name',    value: SITE_NAME,    mono: false },
            { label: 'Public URL',   value: SITE_URL,     mono: true  },
            { label: 'CMS Version',  value: SITE_VERSION, mono: true  },
            { label: 'Environment',  value: process.env.NODE_ENV ?? 'production', mono: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#F4F3F0] last:border-0">
              <span className="text-sm font-medium text-[#4A4A52]">{row.label}</span>
              <span className={`text-sm text-[#1C1C1E] ${row.mono ? 'font-mono bg-[#F4F3F0] px-2 py-0.5 rounded text-xs' : 'font-semibold'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Security */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F0EAF9] flex items-center justify-center">
            <Shield size={14} className="text-[#6B3FA0]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">Security</h2>
            <p className="text-[11px] text-[#A0A0A8]">Authentication and access controls</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-[#F4F3F0]">
            <div className="flex items-center gap-3">
              <Lock size={14} className="text-[#76767E]" />
              <div>
                <p className="text-sm font-medium text-[#4A4A52]">Change Password</p>
                <p className="text-xs text-[#A0A0A8] mt-0.5">Update your admin password</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FEF6E4] text-[#B45309]">
              Coming Soon
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-[#76767E]" />
              <div>
                <p className="text-sm font-medium text-[#4A4A52]">Session Duration</p>
                <p className="text-xs text-[#A0A0A8] mt-0.5">Admin sessions expire after 7 days</p>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-[#F4F3F0] px-2 py-0.5 rounded text-[#4A4A52]">7 days</span>
          </div>
        </div>
      </div>

      {/* Section 3 — Session Info */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E1DD] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E8F7EE] flex items-center justify-center">
            <Clock size={14} className="text-[#1A7A4A]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1C1C1E]">Session Info</h2>
            <p className="text-[11px] text-[#A0A0A8]">Your current admin session details</p>
          </div>
        </div>
        <div className="px-5 py-5 space-y-4">
          {[
            { label: 'Current User',   value: 'admin@accounts.one' },
            { label: 'Last Login',     value: 'Tracked in Activity Log' },
            { label: 'Auth Method',    value: 'HMAC-SHA256 cookie token' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#F4F3F0] last:border-0">
              <span className="text-sm font-medium text-[#4A4A52]">{row.label}</span>
              <span className="text-xs text-[#76767E] font-mono bg-[#F4F3F0] px-2 py-0.5 rounded">{row.value}</span>
            </div>
          ))}
          <div className="mt-1">
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

      {/* Section 4 — Danger Zone */}
      <div className="bg-white border border-[#E2E1DD] rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#FDEEEE] flex items-center gap-2 bg-[#FFFAFA]">
          <div className="w-7 h-7 rounded-lg bg-[#FDEEEE] flex items-center justify-center">
            <AlertTriangle size={14} className="text-[#C0392B]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#C0392B]">Danger Zone</h2>
            <p className="text-[11px] text-[#A0A0A8]">Irreversible destructive operations</p>
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
