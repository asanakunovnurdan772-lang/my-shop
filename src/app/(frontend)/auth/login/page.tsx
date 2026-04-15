'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'

export default function LoginPage() {
  const { setUser } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setErrors({
          general: data?.errors?.[0]?.message || 'Invalid credentials',
        })
        setLoading(false)
        return
      }

      const meRes = await fetch('/api/users/me', {
        credentials: 'include',
      })
      const meData = await meRes.json()

      setUser(meData.user)

      router.push('/')
    } catch {
      setErrors({ general: 'Network error' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Sign in</h1>

        {errors.general && (
          <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-md text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors({})
            }}
          />

          <input
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({})
            }}
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <Link className="text-indigo-500 font-medium hover:underline" href="/auth/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
