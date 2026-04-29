import ProductCard from '@/components/ProductCard'
import { CategoryPagination } from '@/components/category-pagination'
import { getBooksByCategory, getCategory } from '@/lib/apiServices'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayloadClient()

  const category = await payload.findByID({
    collection: 'categories',
    id,
  })

  return {
    title: `All Products in ${category?.name} category` || 'Products in category',
  }
}

const PRODUCTS_PER_PAGE = 8

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = await params
  const { page } = await searchParams

  const currentPage = Math.max(1, Number(page) || 1)

  const category = await getCategory(id)

  const { books, total } = await getBooksByCategory(id, {
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
  })

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE)

  const isEmpty = books.length === 0

  return (
    <section className="relative min-h-[calc(100vh-123px-116px)] bg-black text-white px-4 py-16 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* TITLE */}
        {!isEmpty && (
          <h2 className="text-3xl md:text-5xl font-extrabold mb-10 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-fadeUp">
            {category.name}
          </h2>
        )}

        {/* EMPTY STATE */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fadeUp">
            <p className="text-xl font-semibold mb-3 text-yellow-200">No products found</p>
            <p className="text-sm text-yellow-100/60 mb-6">
              Try another category or explore our catalog
            </p>

            <Link
              href={'/products'}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeUp delay-200">
              {books.map((book) => (
                <ProductCard product={book} key={book.id} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-12 flex justify-center animate-fadeUp delay-300">
              <CategoryPagination
                totalPages={totalPages}
                currentPage={currentPage}
                categoryId={id}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
