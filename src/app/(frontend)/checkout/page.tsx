'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const router = useRouter()

  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const { user } = useAuth()

  const handleCheckout = async () => {
    try {
      if (!user?.id) {
        router.push('/auth/login')
        return
      }

      if (!items || items.length === 0) return
      if (!address || !phone) return

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress: address,
          phone,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-200">
        Cart is empty
      </div>
    )
  }

  return (
    <section className="relative min-h-screen bg-black text-white px-4 py-16 overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6 animate-fadeUp">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400">
            Your Order
          </h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-5 rounded-xl border border-yellow-500/10 bg-black/60 backdrop-blur"
            >
              <div>
                <h3 className="font-semibold text-yellow-200">{item.title}</h3>
                <p className="text-sm text-yellow-100/60">
                  ${formatPrice(item.price)} × {item.quantity}
                </p>
              </div>

              <div className="font-semibold text-yellow-300">
                ${formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-6 animate-fadeUp delay-200">
          <div className="p-6 rounded-2xl border border-yellow-500/20 bg-black/70 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <h2 className="text-2xl font-bold mb-6 text-yellow-300">Checkout</h2>

            <input
              type="text"
              placeholder="Shipping address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mb-3 px-4 py-3 rounded-lg bg-black/60 border border-yellow-500/20 text-white placeholder-yellow-100/40 focus:outline-none focus:border-yellow-400 transition"
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-5 px-4 py-3 rounded-lg bg-black/60 border border-yellow-500/20 text-white placeholder-yellow-100/40 focus:outline-none focus:border-yellow-400 transition"
            />

            <div className="flex justify-between mb-6 text-yellow-200">
              <span>Total</span>
              <span className="font-bold text-yellow-300">${formatPrice(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
