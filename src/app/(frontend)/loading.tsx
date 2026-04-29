export default function Loading() {
  return (
    /* bg-neutral-950 делает фон глубоким черным, а text-white подготавливает цвет для контента */
    <div className="py-8 min-h-[calc(100vh-123px-116px)] flex flex-col items-center justify-center bg-neutral-950">
      {/* Контейнер для спиннера. Сделал размер чуть адекватнее (w-16 h-16) */}
      <div className="w-16 h-16 text-yellow-400">
        <svg
          className="animate-spin"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <rect x="11" y="1" width="2" height="5" opacity=".14" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />

            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="discrete"
              dur="0.75s"
              values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>

      {/* Опционально: текст под спиннером */}
      <p className="mt-4 text-neutral-400 text-sm font-medium tracking-widest uppercase">
        Loading...
      </p>
    </div>
  )
}
