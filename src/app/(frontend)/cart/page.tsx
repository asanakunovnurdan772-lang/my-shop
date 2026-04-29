'use client'

import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import Link from 'next/link'
import { IoMdCloseCircle } from 'react-icons/io'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const addItem = useCartStore((s) => s.addItem)
  const clearCart = useCartStore((s) => s.clearCart)

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <section className="py-24 text-center min-h-120 bg-black text-white">
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">Your cart is empty</h1>

        <Link
          href="/products"
          className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition"
        >
          Go shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="py-16 min-h-150 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
          Your Cart ({totalItems})
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT */}
          <div className="w-full lg:w-[70%] space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-yellow-500/20 bg-black/80 backdrop-blur-xl rounded-xl p-5 flex justify-between items-center shadow-[0_0_20px_rgba(212,175,55,0.08)]"
              >
                {/* INFO + IMAGE */}
                <div className="w-1/2 flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="rounded-lg border border-yellow-500/20 object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-yellow-100">{item.title}</h3>
                    <p className="text-sm text-yellow-500/70">${formatPrice(item.price)} each</p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem(item.id)
                        : useCartStore.setState({
                            items: items.map((i) =>
                              i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
                            ),
                          })
                    }
                    className="px-3 py-1 border border-yellow-500/30 rounded hover:bg-yellow-500/10"
                  >
                    -
                  </button>

                  <span className="min-w-5 text-center text-yellow-300">{item.quantity}</span>

                  <button
                    onClick={() =>
                      addItem({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        image: item.image, // важно!
                      })
                    }
                    className="px-3 py-1 border border-yellow-500/30 rounded hover:bg-yellow-500/10"
                  >
                    +
                  </button>
                </div>

                {/* PRICE */}
                <div className="font-semibold w-24 text-right text-yellow-400">
                  ${formatPrice(item.price * item.quantity)}
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-yellow-500 hover:text-red-500 text-xl transition"
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            ))}

            {/* CLEAR */}
            <button
              onClick={clearCart}
              className="text-sm py-2 px-5 rounded-full bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold shadow-md hover:scale-105 transition mt-4"
            >
              Clear cart
            </button>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="w-full lg:w-[30%] border border-yellow-500/20 rounded-2xl p-6 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.1)] h-fit">
            <h3 className="font-bold text-xl mb-6 text-yellow-400">Order Summary</h3>

            <div className="flex justify-between mb-3 text-yellow-100">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-3 text-yellow-100">
              <span>Subtotal</span>
              <span>${formatPrice(total)}</span>
            </div>

            <div className="flex justify-between mb-6 text-yellow-100">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6 text-yellow-300">
              <span>Total</span>
              <span>${formatPrice(total)}</span>
            </div>

            <Link
              href={'/checkout'}
              className="relative block w-full text-center py-3 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition duration-300 overflow-hidden"
            >
              Proceed to Checkout
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
