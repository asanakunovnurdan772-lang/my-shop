import CategoryCard from '@/components/CategoryCard'
import HomepageHeroBlock from '@/components/HomepageHeroBlock'
import ProductCard from '@/components/ProductCard'

import { getCategories, getHomeProducts, getStoreInfo } from '@/lib/apiServices'

import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'

export default async function HomePage() {
  const store = await getStoreInfo()
  const products = await getHomeProducts()
  const categories = await getCategories()

  const categoriesCount = categories.length
  const categoriesToShow = 4
  const leftCategoriesCount = categoriesCount - categoriesToShow

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO */}
      <HomepageHeroBlock store={store} />

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-bold text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            We Recommend
          </h2>

          <Link
            href="/shop"
            className="text-yellow-400 flex items-center gap-2 hover:text-yellow-300 transition"
          >
            View All
            <FaArrowRightLong />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="hover:scale-[1.03] transition duration-300">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-bold text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            Discover Gadget Categories
          </h2>

          <Link
            href="/shop"
            className="text-yellow-400 flex items-center gap-2 hover:text-yellow-300 transition"
          >
            View All
            <FaArrowRightLong />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
          {categories.slice(0, categoriesToShow).map((category) => (
            <div key={category.id} className="hover:scale-105 transition duration-300">
              <CategoryCard category={category} />
            </div>
          ))}

          {/* MORE CATEGORIES CARD */}
          <div className="border border-yellow-500/20 rounded-2xl flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-xl text-yellow-400 shadow-[0_0_25px_rgba(212,175,55,0.08)] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition">
            <Link className="flex flex-col items-center justify-center gap-2" href={'#'}>
              <span className="font-bold text-4xl text-yellow-300">+</span>
              <span className="text-yellow-400">{leftCategoriesCount} more categories</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
