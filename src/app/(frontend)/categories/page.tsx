import { getCategories } from '@/lib/apiServices'
import CategoryCard from '@/components/CategoryCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Categories',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 min-h-[calc(100vh-123px-116px)]">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </section>
  )
}
