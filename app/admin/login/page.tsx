'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login, checkSession } from '@/app/admin/actions'
import BackButton from '@/components/ui/BackButton'
import { KeyRound, AlertCircle, ArrowRight, Mail, Phone, Shield, UserPlus, Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')
  const [userMode, setUserMode] = useState<'signin' | 'register'>('signin')
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  
  // Form values
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [password, setPassword] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  
  // Status states
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const authenticated = await checkSession()
        if (authenticated) {
          router.push('/admin')
        } else {
          setCheckingAuth(false)
        }
      } catch {
        setCheckingAuth(false)
      }
    }
    checkAuth()
  }, [router])

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminPassword.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await login(adminPassword)
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

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate inputs
    if (authMethod === 'email') {
      const emailTrimmed = email.trim()
      if (!emailTrimmed) {
        setError('Please enter your email address.')
        setLoading(false)
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(emailTrimmed)) {
        setError('Please enter a valid email address (e.g. name@domain.com).')
        setLoading(false)
        return
      }
    } else {
      const phoneTrimmed = phone.trim()
      if (!phoneTrimmed) {
        setError('Please enter your phone number.')
        setLoading(false)
        return
      }
      const phoneRegex = countryCode === '+91' ? /^\d{10}$/ : /^\d{7,15}$/
      if (!phoneRegex.test(phoneTrimmed)) {
        setError(countryCode === '+91' ? 'Please enter a valid 10-digit Indian phone number.' : 'Please enter a valid phone number (7-15 digits).')
        setLoading(false)
        return
      }
    }
    
    if (!password.trim()) {
      setError('Please enter your password.')
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      setLoading(false)
      return
    }

    // Simulate authentication
    setTimeout(() => {
      setLoading(false)
      // Save mockup user preference
      localStorage.setItem('user_session', JSON.stringify({
        method: authMethod,
        identifier: authMethod === 'email' ? email : `${countryCode} ${phone}`,
        name: authMethod === 'email' ? email.split('@')[0] : 'User'
      }))
      // Redirect home
      router.push('/')
    }, 800)
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('user_session', JSON.stringify({
        method: 'google',
        identifier: 'google-user@gmail.com',
        name: 'Google User'
      }))
      router.push('/')
    }, 800)
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <svg className="animate-spin h-8 w-8 text-[#2D5BE3]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-xs text-[#76767E] font-semibold dark:text-gray-400">Verifying session...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0F19] flex flex-col items-center justify-center px-6 py-16 transition-colors relative">
      <div className="w-full max-w-md bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-lg shadow-sm p-8">
        <div className="mb-4">
          <BackButton fallbackPath="/" />
        </div>
        {/* Brand logo header */}
        <div className="flex flex-col items-center text-center mb-6">
          <svg className="w-[48px] h-[38px] shrink-0 mb-3" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="logoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path d="M4 28L14 6H19L9 28H4Z" fill="url(#logoBlue)" />
            <path d="M10.5 19H20V23H8.5L10.5 19Z" fill="url(#logoBlue)" />
            <path d="M16 10L20 6H25V28H20V11L16 15V10Z" fill="url(#logoGreen)" />
          </svg>
          <div className="flex items-center text-[#1C1C1E] dark:text-white mb-2">
            <span className="font-sans font-bold text-xl tracking-tight">Accounts</span>
            <span className="font-sans font-bold text-xl tracking-tight text-[#2D5BE3]">.</span>
            <span className="font-sans font-bold text-xl tracking-tight">One</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-[#76767E] dark:text-gray-400 font-bold">
            Portal Access
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-1 bg-[#FAFAF8] dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 p-1 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('user'); setError(null); }}
            className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'user'
                ? 'bg-white dark:bg-[#1E2640] text-[#2D5BE3] dark:text-[#60A5FA] shadow-xs'
                : 'text-[#76767E] dark:text-gray-400 hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('admin'); setError(null); }}
            className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'admin'
                ? 'bg-white dark:bg-[#1E2640] text-[#2D5BE3] dark:text-[#60A5FA] shadow-xs'
                : 'text-[#76767E] dark:text-gray-400 hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            Admin Login
          </button>
        </div>

        {activeTab === 'user' ? (
          /* ── USER SIGNUP/LOGIN FLOW ── */
          <div>
            {/* Toggle signin / register */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F4F3F0] dark:border-gray-800">
              <span className="text-xs text-[#76767E] dark:text-gray-400 font-semibold">
                {userMode === 'signin' ? 'New to Accounts.One?' : 'Already have an account?'}
              </span>
              <button
                type="button"
                onClick={() => setUserMode(userMode === 'signin' ? 'register' : 'signin')}
                className="text-xs font-bold text-[#2D5BE3] dark:text-[#60A5FA] hover:underline"
              >
                {userMode === 'signin' ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            {/* Auth Method Selector */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-1.5 border rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  authMethod === 'email'
                    ? 'border-[#2D5BE3] dark:border-[#60A5FA] bg-[#EEF2FD] dark:bg-gray-800 text-[#2D5BE3] dark:text-[#60A5FA]'
                    : 'border-[#E2E1DD] dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Mail size={12} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-1.5 border rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  authMethod === 'phone'
                    ? 'border-[#2D5BE3] dark:border-[#60A5FA] bg-[#EEF2FD] dark:bg-gray-800 text-[#2D5BE3] dark:text-[#60A5FA]'
                    : 'border-[#E2E1DD] dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Phone size={12} />
                Phone
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="space-y-4">
              {authMethod === 'email' ? (
                <div>
                  <label htmlFor="email-input" className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-xs text-[#1C1C1E] dark:text-white focus:outline-none focus:border-[#2D5BE3] dark:focus:border-[#60A5FA] transition-all"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone-input" className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={loading}
                      className="px-2 py-2 bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-xs text-[#1C1C1E] dark:text-white focus:outline-none"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (AE)</option>
                    </select>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-xs text-[#1C1C1E] dark:text-white focus:outline-none focus:border-[#2D5BE3] dark:focus:border-[#60A5FA] transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password-input-user" className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password-input-user"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-3 pr-10 py-2 bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-xs text-[#1C1C1E] dark:text-white focus:outline-none focus:border-[#2D5BE3] dark:focus:border-[#60A5FA] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    disabled={loading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-md text-xs text-red-600 dark:text-red-400">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white py-2.5 rounded-md text-xs font-bold transition-all shadow-xs disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {userMode === 'signin' ? 'Sign In to Account' : 'Register & Continue'}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Social Authentication divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#F4F3F0] dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-[#1E2640] px-2 text-[10px] text-[#A0A0A8] font-bold uppercase tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#0B0F19] hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 py-2.5 rounded-md transition-colors disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" fillOpacity="1" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              Google Workspace
            </button>
          </div>
        ) : (
          /* ── ADMINISTRATIVE PIN ACCESS ── */
          <div>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password-input"
                  className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  Enter Administrative PIN
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 text-[#A0A0A8]" size={14} />
                  <input
                    id="password-input"
                    type={showAdminPassword ? 'text' : 'password'}
                    placeholder="••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-xs text-[#1C1C1E] dark:text-white focus:outline-none focus:border-[#2D5BE3] dark:focus:border-[#60A5FA]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    disabled={loading}
                    aria-label={showAdminPassword ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showAdminPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-md text-xs text-red-600 dark:text-red-400">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !adminPassword.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#2D5BE3] hover:bg-[#2450CC] text-white py-2.5 rounded-md text-xs font-bold transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Access Portal
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-[#A0A0A8]">
                This portal is restricted to authorized editors only. Public registration is disabled.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
