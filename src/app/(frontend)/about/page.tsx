import { getAboutUsPage } from '@/lib/apiServices'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutUsPage()

  return {
    title: page?.title || 'About us',
  }
}

export default async function AboutUsPage() {
  const page = await getAboutUsPage()

  return (
    <section className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <div className="text-center py-32 px-4 animate-fadeUp">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400">
          {page.title}
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-yellow-100/80">
          We create a new generation of digital experience — minimal, powerful, premium.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 pb-20 animate-fadeUp delay-200">
        <article className="border border-yellow-500/20 bg-black/70 backdrop-blur-xl rounded-2xl p-10 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
          <div
            className="prose prose-invert max-w-none
            prose-headings:text-yellow-300
            prose-p:text-yellow-100/90
          "
          >
            <RichText data={page.content} />
          </div>
        </article>
      </div>

      {/* BIG STATEMENT */}
      <div className="text-center py-28 px-4 animate-fadeUp delay-300">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-200 max-w-3xl mx-auto leading-tight">
          Technology should feel simple, elegant and powerful.
        </h2>
      </div>

      {/* VALUES */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 pb-28">
        {[
          {
            title: 'Precision',
            desc: 'Every detail is refined to perfection.',
          },
          {
            title: 'Innovation',
            desc: 'We focus on future, not trends.',
          },
          {
            title: 'Experience',
            desc: 'We design emotions, not just products.',
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className={`border border-yellow-500/20 rounded-2xl p-8 bg-black/60 backdrop-blur transition duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] animate-fadeUp`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <h3 className="text-xl font-semibold mb-3 text-yellow-300">{item.title}</h3>
            <p className="text-yellow-100/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
