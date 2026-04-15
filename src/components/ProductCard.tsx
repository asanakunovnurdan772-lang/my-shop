'use client'

import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = () => {
    console.log('adding')
    addItem({
      id: String(product.id),
      title: product.name,
      price: product.salePrice || product.price,
    })

    toast.success('Added to cart')
  }
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-yellow-500/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_60px_rgba(212,175,55,0.08)] hover:shadow-[0_0_80px_rgba(212,175,55,0.18)] transition-all duration-500">
      {/* glow border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-300/5 pointer-events-none" />

      <div className="p-4 flex flex-col gap-3 relative z-10">
        {/* IMAGE */}
        <div className="relative w-full h-52 rounded-xl overflow-hidden border border-yellow-500/10 bg-black/40">
          {typeof product.mainPhoto !== 'number' && product.mainPhoto?.url && (
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.mainPhoto.url}
                alt={product.name}
                fill
                className="object-contain scale-105 group-hover:scale-110 group-hover:rotate-1 transition duration-700 ease-out"
              />
            </Link>
          )}
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <Link
            href={`/product/${product.id}`}
            className="block text-yellow-100 font-semibold text-lg leading-snug line-clamp-2 hover:text-yellow-300 transition"
          >
            {product.name}
          </Link>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  ${formatPrice(product.price)}
                </span>

                <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-semibold">
                  ${formatPrice(product.salePrice)}
                </span>
              </>
            ) : (
              <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-semibold">
                ${formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black text-xs font-bold tracking-wide uppercase shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105 transition cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
