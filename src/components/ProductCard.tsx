'use client'

import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { AddToCartButton } from '@/components/AddToCartBtn'
import type { Order } from '@/payload-types'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-yellow-500/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_60px_rgba(212,175,55,0.08)] hover:shadow-[0_0_80px_rgba(212,175,55,0.18)] transition-all duration-500">
      {/* glow border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-300/5 pointer-events-none" />

      <div className="p-4 flex flex-col gap-3 relative z-10">
        {/* IMAGE */}
        <div className="relative w-full h-52 rounded-xl overflow-hidden border border-yellow-500/10 bg-black/40">
          {typeof product.mainPhoto !== 'number' && product.mainPhoto?.url && (
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.mainPhoto.url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain scale-105 group-hover:scale-110 group-hover:rotate-1 transition duration-700 ease-out"
              />
            </Link>
          )}
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <Link
            href={`/products/${product.id}`}
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

          {product.inStock ? (
            <AddToCartButton
              id={product.id}
              title={product.name}
              price={product.price}
              image={
                typeof product.mainPhoto !== 'number' && product.mainPhoto?.url
                  ? product.mainPhoto.url
                  : ''
              }
            />
          ) : (
            <span className="inline-block text-sm px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-500/60 bg-black/40 backdrop-blur">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
