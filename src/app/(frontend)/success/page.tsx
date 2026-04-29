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
    <section className="relative min-h-[calc(100vh-123px-116px)] bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />

      <div className="relative text-center max-w-xl w-full animate-fadeUp">
        {/* SUCCESS ICON */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(212,175,55,0.5)]">
          <span className="text-black text-3xl font-bold">✓</span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300">
          Payment Successful
        </h1>

        {/* TEXT */}
        <p className="text-white/60 mb-8">
          Thank you for your purchase. Your order has been processed successfully.
        </p>

        {/* SESSION */}
        {sessionId && <p className="text-xs text-yellow-500/60 mb-6">Session ID: {sessionId}</p>}

        {/* CTA */}
        <Link
          href="/orders"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 transition"
        >
          View My Orders
        </Link>
      </div>
    </section>
  )
}
