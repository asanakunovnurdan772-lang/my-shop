'use client'

import { Category } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

type Props = {
  category: Category
}

export default function CategoryCard({ category }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl transition duration-300 ease-out will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* CARD */}
      <div className="border border-yellow-500/20 bg-black/90 backdrop-blur-xl rounded-2xl px-4 py-8 flex flex-col items-center gap-4 shadow-[0_0_25px_rgba(212,175,55,0.08)] hover:shadow-[0_0_50px_rgba(212,175,55,0.25)] transition overflow-hidden">
        {/* LIGHT GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/20 blur-3xl rotate-45" />
        </div>

        {/* IMAGE */}
        <div className="w-20 h-20 relative z-10" style={{ transform: 'translateZ(40px)' }}>
          {typeof category.image !== 'number' && category.image?.url && (
            <Link href={`/categories/${category.id}`}>
              <Image
                src={category.image.url}
                alt={category.name ?? 'Category image'}
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              />
            </Link>
          )}
        </div>

        {/* TITLE */}
        <h3
          className="font-semibold text-center text-lg z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500"
          style={{ transform: 'translateZ(60px)' }}
        >
          <Link href="`/categories/${category.id}`">{category.name}</Link>
        </h3>
      </div>
    </div>
  )
}
