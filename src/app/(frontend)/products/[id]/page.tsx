import { getPayloadClient } from '@/lib/payloadClient'
import type { Product } from '@/payload-types'
import { formatPrice } from '@/lib/utils'
import { ProductGallery } from '@/components/ProductGallery'
import { AddToCartButton } from '@/components/AddToCartBtn'
import { ProductDescription } from '@/components/ProductDescription'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayloadClient()

  const product = (await payload.findByID({
    collection: 'products',
    id,
    depth: 2,
  })) as Product

  return {
    title: product?.name || 'Product',
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayloadClient()

  const product = (await payload.findByID({
    collection: 'products',
    id,
    depth: 2,
  })) as Product

  const mainImageUrl =
    product.mainPhoto && typeof product.mainPhoto === 'object' && product.mainPhoto.url
      ? product.mainPhoto.url
      : null

  const photos = Array.isArray(product.photos)
    ? (product.photos as { url?: string }[]).filter((p) => p?.url)
    : []

  const allImages = Array.from(
    new Set([...(mainImageUrl ? [mainImageUrl] : []), ...photos.map((p) => p.url as string)]),
  )

  const authors = product.authors?.filter((a) => typeof a !== 'number')

  const category =
    product.category && typeof product.category === 'object' ? product.category : null

  const hasDiscount = typeof product.salePrice === 'number' && product.salePrice < product.price

  const price = hasDiscount ? product.salePrice! : product.price

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.10),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* LEFT — GALLERY */}
          <div className="relative rounded-3xl border border-yellow-500/10 bg-black/60 backdrop-blur-2xl p-6 shadow-[0_0_100px_rgba(212,175,55,0.08)] hover:shadow-[0_0_120px_rgba(212,175,55,0.12)] transition">
            <ProductGallery images={allImages} />
          </div>

          {/* RIGHT — INFO */}
          <div className="flex flex-col gap-6 animate-fadeUp">
            {/* CATEGORY */}
            {category && (
              <span className="text-xs tracking-[0.3em] uppercase text-yellow-500/60">
                {category.name}
              </span>
            )}

            {/* TITLE */}
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200">
              {product.name}
            </h1>

            {/* AUTHORS */}
            {authors && (
              <div className="text-sm text-white/50">
                {authors.map((author) => (
                  <span key={author.id} className="mr-3">
                    {author.fullName}
                  </span>
                ))}
              </div>
            )}

            {/* PRICE */}
            <div className="flex items-end gap-4 mt-2">
              <span className="text-4xl font-bold text-yellow-300">${formatPrice(price)}</span>

              {hasDiscount && (
                <span className="text-lg text-white/30 line-through">
                  ${formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* STOCK */}
            <div>
              <span
                className={`inline-flex px-4 py-1 rounded-full text-xs font-medium border backdrop-blur ${
                  product.inStock
                    ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
                    : 'text-red-300 border-red-500/30 bg-red-500/10'
                }`}
              >
                {product.inStock ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            {/* CTA */}
            {product.inStock && (
              <div className="mt-2">
                <AddToCartButton id={product.id} title={product.name} price={product.price} />
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <ProductDescription description={product.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
