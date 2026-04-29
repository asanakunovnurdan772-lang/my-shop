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

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-400' },
  processing: { label: 'Processing', color: 'text-blue-400' },
  shipped: { label: 'Shipped', color: 'text-purple-400' },
  delivered: { label: 'Delivered', color: 'text-green-400' },
  cancelled: { label: 'Cancelled', color: 'text-red-400' },
}

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          credentials: 'include',
        })

        const data = await res.json()
        setOrders(data.docs || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-200">
        <Link href="/auth/login" className="underline">
          Log in to view orders
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-200">
        Loading...
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-200">
        <h1 className="text-2xl font-bold mb-4">No orders yet</h1>
        <Link
          href="/books"
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black rounded-full font-semibold"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  const totalPages = Math.ceil(orders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage)

  return (
    <section className="relative min-h-screen bg-black text-white px-4 py-16 overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-fadeUp">
          My Orders
        </h1>

        {/* ORDERS */}
        <div className="space-y-6 animate-fadeUp delay-200">
          {currentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-yellow-500/10 bg-black/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_30px_rgba(212,175,55,0.06)]"
            >
              {/* HEADER */}
              <div className="flex justify-between mb-5">
                <div>
                  <p className="font-semibold text-yellow-200">
                    Order #{String(order.id).slice(0, 8)}
                  </p>
                  <p className="text-xs text-yellow-100/50">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-yellow-300">${formatPrice(order.total)}</p>
                  <p className={`text-sm font-medium ${statusMap[order.status]?.color}`}>
                    {statusMap[order.status]?.label || order.status}
                  </p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-2 border-t border-yellow-500/10 pt-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-yellow-100/70">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10 animate-fadeUp delay-300">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-yellow-500/10 transition disabled:opacity-30"
            >
              <FaLongArrowAltLeft className="text-yellow-300" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded-full text-sm transition
                  ${
                    p === currentPage
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold'
                      : 'text-yellow-100 hover:bg-yellow-500/10'
                  }
                `}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-yellow-500/10 transition disabled:opacity-30"
            >
              <FaLongArrowAltRight className="text-yellow-300" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
