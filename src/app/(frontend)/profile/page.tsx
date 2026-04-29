'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

type Order = {
  id: string
  total: number
  status: string
  createdAt: string
  items: {
    product: {
      name: string
    }
    quantity: number
    price: number
  }[]
}

const statusMap: Record<string, { label: string; color: string; dot: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-600', dot: 'bg-yellow-400' },
  processing: { label: 'Processing', color: 'text-blue-600', dot: 'bg-blue-400' },
  shipped: { label: 'Shipped', color: 'text-purple-600', dot: 'bg-purple-400' },
  delivered: { label: 'Delivered', color: 'text-green-700', dot: 'bg-green-500' },
  cancelled: { label: 'Cancelled', color: 'text-red-600', dot: 'bg-red-400' },
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const perPage = 6

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', { credentials: 'include' })
        const data = await res.json()
        setOrders(data.docs || [])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please log in to view your orders
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading orders...
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold mb-2">No orders yet</h1>
        <p className="text-gray-500 mb-6">Your purchases will appear here</p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  const totalPages = Math.ceil(orders.length / perPage)
  const visible = orders.slice((page - 1) * perPage, page * perPage)

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your purchases</p>
        </div>

        {/* ORDERS */}
        <div className="space-y-5">
          {visible.map((order) => {
            const status = statusMap[order.status]

            return (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition p-6"
              >
                {/* TOP */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Order</p>
                    <p className="font-medium text-gray-900">#{String(order.id).slice(0, 8)}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${formatPrice(order.total)}</p>

                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${status?.dot}`} />
                      <span className={`text-xs ${status?.color}`}>
                        {status?.label || order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="border-t pt-3 space-y-1">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-600">
                      <span>
                        {item.product?.name} × {item.quantity}
                      </span>
                      <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaLongArrowAltLeft />
            </button>

            <span className="text-sm text-gray-500">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaLongArrowAltRight />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
