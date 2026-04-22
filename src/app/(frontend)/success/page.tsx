'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import Link from 'next/link'

export default function SuccessPage() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
    console.log('SESSION ID:', sessionId)
  }, [sessionId])

  return (
    <div className="p-10 text-center min-h-[calc(100vh-123px-116px)] flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment successful 🎉</h1>

        <p className="text-gray-500 mb-8">Thank you for your purchase! We'll contact you soon.</p>

        <Link
          href="/orders"
          className="inline-block py-3 px-8 bg-indigo-600 text-white rounded-full"
        >
          My Orders
        </Link>
      </div>
    </div>
  )
}
