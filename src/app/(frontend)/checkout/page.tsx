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
      //  Проверка авторизации
      if (!user?.id) {
        alert('You should be logged in to checkout')
        router.push('/auth/login')
        return
      }

      //  Проверка корзины
      if (!items || items.length === 0) {
        alert('Your cart is empty')
        return
      }

      //  Проверка формы
      if (!address || !phone) {
        alert('Please fill in your address and phone number')
        return
      }

      //  Запрос на сервер
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingAddress: address,
          phone,
        }),
      })

      const data = await res.json()

      //  Ошибка от сервера
      if (!res.ok) {
        console.error('Payment error:', data.error)
        alert(data.error || 'Payment failed')
        return
      }

      //  Редирект на Stripe
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to create payment')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Failed to create payment')
    }
  }

  if (items.length === 0) {
    return <div className="p-10 text-center">Cart is empty</div>
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
      {/* LEFT — ITEMS */}
      <div className="w-full lg:w-2/3 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>

        {items.map((item) => (
          <div key={item.id} className="flex justify-between border p-4 rounded">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">
                ${formatPrice(item.price)} × {item.quantity}
              </p>
            </div>

            <div className="font-semibold">${formatPrice(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-1/3 border p-6 rounded bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <input
          type="text"
          placeholder="Shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 mb-3 w-full"
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <div className="flex justify-between mb-4">
          <span>Total</span>
          <span className="font-bold">${formatPrice(total)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded"
        >
          Pay now
        </button>
      </div>
    </div>
  )
}
