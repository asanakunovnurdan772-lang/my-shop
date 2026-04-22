import { getPayloadClient } from '@/lib/payloadClient'
import ProductsClient from '@/components/ProductsClient'
import type { Where } from 'payload'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All products in our store',
}

interface SearchParams {
  page?: string
  sort?: string
  category?: string
  priceMin?: string
  priceMax?: string
  inStock?: string
  sale?: string
  search?: string
}

const LIMIT = 9

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const page = Number(params.page) || 1

  const sort =
    params.sort === 'price-asc'
      ? 'price'
      : params.sort === 'price-desc'
        ? '-price'
        : params.sort === 'date-asc'
          ? 'publishedYear'
          : '-publishedYear'

  // ✅ собираем условия отдельно
  const and: Where[] = []

  if (params.category) {
    and.push({ category: { equals: params.category } })
  }

  if (params.inStock === 'true') {
    and.push({ inStock: { equals: true } })
  }

  if (params.sale === 'true') {
    and.push({ salePrice: { exists: true } })
  }

  if (params.priceMin || params.priceMax) {
    and.push({
      price: {
        ...(params.priceMin && { greater_than_equal: Number(params.priceMin) }),
        ...(params.priceMax && { less_than_equal: Number(params.priceMax) }),
      },
    })
  }

  if (params.search?.trim()) {
    const search = params.search.trim()

    and.push({
      or: [{ name: { like: search } }],
    })
  }

  const where: Where = {
    isPublished: { equals: true },
    ...(and.length > 0 && { and }),
  }

  const payload = await getPayloadClient()

  const [productsData, categoriesData] = await Promise.all([
    payload.find({
      collection: 'products',
      page,
      limit: LIMIT,
      sort,
      where,
      depth: 1,
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
    }),
  ])

  return (
    <div className="min-h-117.5">
      <ProductsClient
        products={productsData.docs}
        totalDocs={productsData.totalDocs}
        totalPages={productsData.totalPages}
        currentPage={page}
        categories={categoriesData.docs}
      />
    </div>
  )
}
