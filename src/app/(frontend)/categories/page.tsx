import { getCategories } from '@/lib/apiServices'
import CategoryCard from '@/components/CategoryCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Categories',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <section className="relative min-h-[calc(100vh-123px-116px)] bg-black text-white px-4 py-16 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-fadeUp">
          Categories
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 animate-fadeUp delay-200">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group transform transition duration-500 hover:scale-[1.05]"
            >
              <CategoryCard category={category} />

              {/* glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none rounded-xl bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
