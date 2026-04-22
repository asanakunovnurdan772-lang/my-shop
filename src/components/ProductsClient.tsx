'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import type { Product, Category } from '@/payload-types'
import ProductCard from './ProductCard'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

interface Props {
  products: Product[]
  totalDocs: number
  totalPages: number
  currentPage: number
  categories: Category[]
}

export default function ProductsClient({
  products,
  totalDocs,
  totalPages,
  currentPage,
  categories,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      if (!('page' in updates)) {
        params.delete('page')
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '')
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '')

  useEffect(() => {
    setPriceMin(searchParams.get('priceMin') || '')
    setPriceMax(searchParams.get('priceMax') || '')
  }, [searchParams])

  const applyPrice = () => {
    updateParams({
      priceMin: priceMin.trim() || undefined,
      priceMax: priceMax.trim() || undefined,
    })
  }

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyPrice()
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ sort: e.target.value })
  }

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ category: e.target.value })
  }

  const handleInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ inStock: e.target.checked ? 'true' : undefined })
  }

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ sale: e.target.checked ? 'true' : undefined })
  }

  const handlePage = (page: number) => {
    updateParams({ page: String(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilters = () => {
    setPriceMin('')
    setPriceMax('')
    router.push(pathname)
  }

  const perPage = 12
  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalDocs)

  return (
    /* Внешний контейнер: теперь bg-black и min-h-screen растягиваются на всю ширину и высоту */
    <section className="relative w-full bg-black text-white min-h-screen overflow-hidden">
      {/* Glow background: теперь он тоже на весь экран */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

      {/* Внутренний контейнер: ограничивает ширину контента и центрирует его */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-14">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400">
            Products List
          </h1>

          <select
            value={searchParams.get('sort') || ''}
            onChange={handleSort}
            className="text-sm border border-yellow-500/30 rounded-lg px-3 py-2 bg-black/60 text-yellow-200 backdrop-blur focus:ring-2 focus:ring-yellow-500/30 outline-none"
          >
            <option value="">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="date-asc">Oldest first</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* SIDEBAR */}
          <aside className="w-full md:w-60 shrink-0 bg-black/70 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <p className="text-xs uppercase tracking-widest text-yellow-500/60 mb-4 font-medium">
              Filters
            </p>

            <div className="space-y-5">
              {/* CATEGORY */}
              <div>
                <label className="text-xs text-yellow-500/60 mb-1.5 block">By Category</label>

                <select
                  value={searchParams.get('category') || ''}
                  onChange={handleCategory}
                  className="w-full text-sm border border-yellow-500/20 rounded-lg px-3 py-2 bg-black/60 text-yellow-200 outline-none focus:border-yellow-500/50"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="text-xs text-yellow-500/60 mb-1.5 block">By Price</label>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    onKeyDown={handlePriceKeyDown}
                    className="w-full text-sm border border-yellow-500/20 rounded-lg px-3 py-2 bg-black/60 text-yellow-200 outline-none focus:border-yellow-500/50"
                  />

                  <input
                    type="number"
                    placeholder="To"
                    min="0"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    onKeyDown={handlePriceKeyDown}
                    className="w-full text-sm border border-yellow-500/20 rounded-lg px-3 py-2 bg-black/60 text-yellow-200 outline-none focus:border-yellow-500/50"
                  />
                </div>

                <button
                  onClick={applyPrice}
                  className="mt-3 w-full text-xs bg-gradient-to-r from-yellow-500 to-yellow-300 text-black rounded-lg py-2.5 font-bold shadow-lg hover:brightness-110 active:scale-95 transition"
                >
                  Apply
                </button>
              </div>

              {/* CHECKBOX */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2 text-sm text-yellow-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="accent-yellow-500"
                    checked={searchParams.get('inStock') === 'true'}
                    onChange={handleInStock}
                  />
                  <span className="group-hover:text-yellow-400 transition">In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-yellow-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="accent-yellow-500"
                    checked={searchParams.get('sale') === 'true'}
                    onChange={handleSale}
                  />
                  <span className="group-hover:text-yellow-400 transition">On Sale</span>
                </label>
              </div>

              <button
                onClick={resetFilters}
                className="text-xs text-yellow-500/60 hover:text-yellow-300 transition w-full text-left pt-2"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-sm text-yellow-500/60 mb-6">
              Showing{' '}
              <span className="text-yellow-200 font-medium">
                {startItem}-{endItem}
              </span>{' '}
              of <span className="text-yellow-200 font-medium">{totalDocs}</span>
            </p>

            {products.length === 0 ? (
              <div className="text-center py-32 border border-dashed border-yellow-500/20 rounded-3xl bg-yellow-500/5">
                <p className="text-yellow-500/60 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 border border-yellow-500/40 text-yellow-400 rounded-full hover:bg-yellow-500/10 transition"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 py-4">
                <button
                  onClick={() => handlePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-yellow-500/20 hover:bg-yellow-500/10 transition disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <FaLongArrowAltLeft className="text-yellow-400" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePage(p)}
                      className={`w-10 h-10 rounded-full transition font-medium ${
                        p === currentPage
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow-lg shadow-yellow-500/20'
                          : 'text-yellow-200 hover:bg-yellow-500/10 border border-transparent hover:border-yellow-500/20'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-yellow-500/20 hover:bg-yellow-500/10 transition disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <FaLongArrowAltRight className="text-yellow-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
