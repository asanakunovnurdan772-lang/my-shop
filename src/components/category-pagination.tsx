'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

interface Props {
  totalPages: number
  currentPage: number
  categoryId: string
}

export function CategoryPagination({ totalPages, currentPage, categoryId }: Props) {
  const router = useRouter()

  const handlePage = (page: number) => {
    router.push(`/categories/${categoryId}?page=${page}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* LEFT */}
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full transition-colors ${
          currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-indigo-100'
        }`}
      >
        <FaLongArrowAltLeft className="w-4 h-4 text-gray-800" />
      </button>

      {/* PAGES */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
        const isActive = p === currentPage
        return (
          <button
            key={p}
            onClick={() => handlePage(p)}
            className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-sm transition-colors ${
              isActive ? 'bg-gray-800 text-white shadow-sm' : 'hover:bg-indigo-100 text-gray-700'
            }`}
          >
            {p}
          </button>
        )
      })}

      {/* RIGHT */}
      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full transition-colors ${
          currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-indigo-100'
        }`}
      >
        <FaLongArrowAltRight className="w-4 h-4 text-gray-800" />
      </button>
    </div>
  )
}
