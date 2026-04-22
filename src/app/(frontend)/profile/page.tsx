'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    currentPassword: '',
    newPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || '',
      }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!user) {
      router.push('/auth/login')
      return
    }

    setLoading(true)

    try {
      // 1. Проверяем текущий пароль
      if (form.currentPassword) {
        const loginRes = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            password: form.currentPassword,
          }),
        })

        if (!loginRes.ok) {
          throw new Error('Invalid current password')
        }
      }

      // 2. Обновляем данные
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          ...(form.newPassword ? { password: form.newPassword } : {}),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || 'Error updating profile')
      }

      setUser(data.doc)

      setSuccess(true)

      // очищаем пароли
      setForm((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="p-10 text-center">You are not authorized</div>
  }

  return (
    <section className="py-12 min-h-screen">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* PASSWORD BLOCK */}
          <div className="border-t border-gray-300 pt-6 space-y-4">
            <h2 className="font-semibold">Change Password</h2>

            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg px-4 py-3 text-sm">
              Profile updated successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-700 text-white rounded-full"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </section>
  )
}
