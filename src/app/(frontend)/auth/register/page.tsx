'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { setUser } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    passwordConfirmation?: string
    general?: string
  }>({})

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passwordConfirmation = formData.get('passwordConfirmation') as string

    if (!name) return setErrors({ name: 'Name is required' })
    if (!email) return setErrors({ email: 'Email is required' })
    if (password.length < 6) return setErrors({ password: 'Minimum 6 characters' })
    if (password !== passwordConfirmation)
      return setErrors({ passwordConfirmation: 'Passwords do not match' })

    setLoading(true)

    try {
      // регистрация
      const registerRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      })

      const registerData = await registerRes.json()

      if (!registerRes.ok) {
        setErrors({
          general: registerData?.errors?.[0]?.message || 'Registration failed',
        })
        return
      }

      // автоматический логин после регистрации
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginRes.json()

      if (!loginRes.ok) {
        setErrors({
          general: loginData?.errors?.[0]?.message || 'Auto login failed',
        })
        return
      }

      setUser(loginData.user)

      router.push('/')
    } catch {
      setErrors({ general: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-125 mx-8 my-20 md:mx-auto flex flex-col gap-y-8 border shadow-lg p-8 rounded-sm">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-indigo-400">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
        {errors.general && <span className="text-red-500 text-sm">{errors.general}</span>}

        <input
          name="name"
          className="border p-2 rounded-sm"
          type="text"
          placeholder="Your Full Name"
          required
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

        <input
          name="email"
          className="border p-2 rounded-sm"
          type="email"
          placeholder="Your email"
          required
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

        <input
          name="password"
          className="border p-2 rounded-sm"
          type="password"
          placeholder="Password"
          required
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

        <input
          name="passwordConfirmation"
          className="border p-2 rounded-sm"
          type="password"
          placeholder="Password Confirmation"
          required
        />
        {errors.passwordConfirmation && (
          <span className="text-red-500 text-sm">{errors.passwordConfirmation}</span>
        )}

        <button
          disabled={loading}
          className="py-2 px-8 rounded-sm bg-indigo-500 text-white disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
