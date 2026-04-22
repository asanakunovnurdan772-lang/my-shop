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
    <section className="max-w-7xl mx-auto px-4 py-10 min-h-[calc(100vh-123px-116px)]">
      {!isEmpty ? (
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
          All Products in Category: {category.name}
        </h2>
      ) : null}

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium mb-2">No products found in this category</p>
          <p className="text-sm text-gray-500">
            Try checking back later or choose another category
          </p>
          <Link href={'/products'} className="py-2 px-6 bg-indigo-600 rounded-full text-white my-4">
            Go shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <ProductCard product={book} key={book.id} />
            ))}
          </div>

          <CategoryPagination totalPages={totalPages} currentPage={currentPage} categoryId={id} />
        </>
      )}
    </section>
  )
}
