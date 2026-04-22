'use client'
import { useState } from 'react'

interface Props {
  description: string
}

export function ProductDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative max-w-xl">
      {/* TEXT */}
      <p
        className={`text-sm leading-7 text-yellow-100/90 transition-all duration-500 ${
          expanded ? '' : 'line-clamp-3'
        }`}
      >
        {description}
      </p>

      {/* FADE EFFECT */}
      {!expanded && (
        <div className="absolute bottom-8 left-0 w-full h-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      )}

      {/* BUTTON */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 hover:scale-105 transition"
      >
        {expanded ? 'Show less' : 'Read more...'}
      </button>
    </div>
  )
}
