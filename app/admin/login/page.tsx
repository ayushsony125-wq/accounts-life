'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/admin/actions'
import { KeyRound, AlertCircle, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await login(password)
      if (res.success) {
        router.push('/admin')
      } else {
        setError(res.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white border border-[#E2E1DD] rounded-lg shadow-sm p-8">
        
        {/* Brand logo header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center text-[#1C1C1E] mb-2">
            <span className="font-sans font-bold text-xl tracking-tight">Accounts</span>
            <span className="font-sans font-bold text-xl tracking-tight text-[#4A4A52]">.</span>
            <span className="font-sans font-bold text-xl tracking-tight">Life</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3] ml-1 self-end mb-[5px]" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#76767E] font-semibold">
            Administrative Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password-input"
              className="block text-xs font-semibold uppercase tracking-wider text-[#76767E] mb-2"
            >
              Enter Administrative PIN
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-[#A0A0A8]" size={16} />
              <input
                id="password-input"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-sm text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3]"
                disabled={loading}
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-md bg-[#FDEEEE] border border-[#F5C6C0] text-xs text-[#C0392B]" role="alert">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white py-2.5 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
          >
            {loading ? 'Authenticating...' : 'Access Portal'}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#A0A0A8]">
            This portal is restricted to authorized editors only. Public registration is disabled.
          </p>
        </div>

      </div>
    </div>
  )
}
