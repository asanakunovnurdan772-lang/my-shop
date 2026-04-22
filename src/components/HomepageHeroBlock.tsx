import { Store } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  store: Store
}

export default function HomepageHeroBlock({ store }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 xl:px-8 py-16">
      <div className="relative rounded-3xl border border-yellow-500/20 bg-black/90 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.08)]">
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-yellow-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <span className="w-fit px-4 py-1 text-xs tracking-widest text-yellow-400 border border-yellow-500/30 rounded-full bg-yellow-500/5">
              PREMIUM STORE
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                {store.name}
              </span>
            </h1>

            <p className="text-gray-300 leading-relaxed max-w-md">{store.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="/products"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold shadow-lg hover:scale-105 transition"
              >
                Browse Catalog
              </Link>

              <Link
                href="/about"
                className="px-7 py-3 rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE (NO DAMAGE) */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-6 bg-yellow-500/10 blur-3xl rounded-3xl" />

            <div className="relative w-full h-[420px] lg:h-[500px] flex items-center justify-center rounded-3xl overflow-hidden border border-yellow-500/20">
              {typeof store.heroImage !== 'number' && store.heroImage?.url && (
                <Image
                  src={store.heroImage.url}
                  alt={store.name}
                  width={1200}
                  height={800}
                  className="object-contain max-h-full max-w-full transition duration-700 hover:scale-105"
                />
              )}

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
