'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoIosClose } from 'react-icons/io'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export function ProductGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const activeImage = images[activeIndex]

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  if (!images.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-yellow-500/60 rounded-xl border border-yellow-500/20">
        No image
      </div>
    )
  }

  return (
    <>
      {/* MAIN IMAGE */}
      <div
        onClick={() => setIsOpen(true)}
        className="group relative w-full aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border border-yellow-500/20 bg-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(212,175,55,0.1)] cursor-zoom-in"
      >
        <Image
          src={activeImage}
          alt="Product image"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-6 justify-center flex-wrap">
        {images.map((img, i) => {
          const active = i === activeIndex

          return (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-20 rounded-lg overflow-hidden border transition duration-300
                ${
                  active
                    ? 'border-yellow-400 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                    : 'border-yellow-500/20 hover:border-yellow-400 hover:scale-105'
                }`}
            >
              <Image src={img} alt="Photo" fill className="object-cover" />
            </button>
          )
        })}
      </div>

      {/* FULLSCREEN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center">
          {/* CLOSE */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-yellow-400 text-3xl hover:scale-110 transition"
          >
            <IoIosClose />
          </button>

          {/* LEFT */}
          <button
            onClick={prev}
            className="absolute left-6 text-yellow-400 text-2xl hover:scale-125 transition"
          >
            <FaChevronLeft />
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            className="absolute right-6 text-yellow-400 text-2xl hover:scale-125 transition"
          >
            <FaChevronRight />
          </button>

          {/* IMAGE */}
          <div className="relative w-[90%] max-w-3xl h-[70vh]">
            <Image
              src={activeImage}
              alt="Zoom"
              fill
              className="object-contain transition duration-500"
            />
          </div>

          {/* THUMB STRIP */}
          <div className="absolute bottom-6 flex gap-3">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveIndex(i)}
                className={`w-14 h-16 relative rounded overflow-hidden border ${
                  i === activeIndex ? 'border-yellow-400' : 'border-yellow-500/30'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
