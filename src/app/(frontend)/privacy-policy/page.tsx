import { getPrivacyPolicyPage } from '@/lib/apiServices'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPolicyPage()

  return {
    title: page?.title || 'Privacy Policy',
  }
}

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPage()

  return (
    <section className="relative min-h-screen bg-black text-white py-20 px-4 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-fadeUp">
          {page.title}
        </h1>

        {/* SUBTEXT */}
        <p className="text-center text-yellow-100/60 text-sm mb-12 animate-fadeUp delay-100">
          We respect your privacy and are committed to protecting your personal data.
        </p>

        {/* CONTENT CARD */}
        <article className="relative border border-yellow-500/20 bg-black/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.08)] animate-fadeUp delay-200">
          {/* subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

          <div
            className="prose prose-invert max-w-none
              prose-headings:text-yellow-300
              prose-headings:font-semibold
              prose-p:text-yellow-100/85
              prose-strong:text-yellow-200
              prose-li:text-yellow-100/80
              prose-a:text-yellow-400
              prose-a:no-underline hover:prose-a:underline
            "
          >
            <RichText data={page.content} />
          </div>
        </article>

        {/* FOOT NOTE */}
        <p className="text-center text-xs text-yellow-500/50 mt-10 animate-fadeUp delay-300">
          Last updated information is provided within the document above.
        </p>
      </div>
    </section>
  )
}
