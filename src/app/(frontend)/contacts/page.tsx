import { getStoreInfo } from '@/lib/apiServices'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
}

export default async function ContactsPage() {
  const store = await getStoreInfo()
  const socials = store.socials

  return (
    <section className="relative min-h-screen bg-black text-white px-4 py-20 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-fadeUp">
          Contact Us
        </h1>

        {/* CARD */}
        <article className="border border-yellow-500/20 bg-black/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.1)] animate-fadeUp delay-200">
          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT */}
            <div className="space-y-6">
              <p className="text-2xl font-semibold text-yellow-300">{store.name}</p>

              <div className="flex items-start gap-4 text-yellow-100/80">
                <FaMapMarkerAlt className="mt-1 text-yellow-400" />
                <span>{store.address}</span>
              </div>

              <div className="flex items-center gap-4 text-yellow-100/80 hover:text-yellow-300 transition">
                <FaPhoneAlt className="text-yellow-400" />
                <span>{store.phone}</span>
              </div>

              <div className="flex items-center gap-4 text-yellow-100/80 hover:text-yellow-300 transition">
                <FaEnvelope className="text-yellow-400" />
                <span>{store.email}</span>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <p className="text-xl font-semibold mb-6 text-yellow-300">Follow Us</p>

              <div className="flex gap-4 flex-wrap">
                {socials?.facebook && (
                  <a
                    target="_blank"
                    href={socials.facebook}
                    className="group p-4 rounded-full border border-yellow-500/20 bg-black/60 backdrop-blur hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition"
                  >
                    <FaFacebook className="text-yellow-300 group-hover:text-yellow-400" />
                  </a>
                )}

                {socials?.instagram && (
                  <a
                    target="_blank"
                    href={socials.instagram}
                    className="group p-4 rounded-full border border-yellow-500/20 bg-black/60 backdrop-blur hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition"
                  >
                    <FaInstagram className="text-yellow-300 group-hover:text-yellow-400" />
                  </a>
                )}

                {socials?.telegram && (
                  <a
                    target="_blank"
                    href={socials.telegram}
                    className="group p-4 rounded-full border border-yellow-500/20 bg-black/60 backdrop-blur hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition"
                  >
                    <FaTelegram className="text-yellow-300 group-hover:text-yellow-400" />
                  </a>
                )}

                {socials?.whatsapp && (
                  <a
                    target="_blank"
                    href={socials.whatsapp}
                    className="group p-4 rounded-full border border-yellow-500/20 bg-black/60 backdrop-blur hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition"
                  >
                    <FaWhatsapp className="text-yellow-300 group-hover:text-yellow-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
