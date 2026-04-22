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
    <div className="w-full max-w-5xl mx-auto px-4 py-12 min-h-[calc(100vh-123px-80px)]">
      <article className="bg-white shadow-lg rounded-2xl p-8 md:p-10 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <p className="text-xl font-semibold">{store.name}</p>

            <div className="flex items-start gap-3 text-gray-600">
              <FaMapMarkerAlt className="mt-1 text-indigo-600" />
              <span>{store.address}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <FaPhoneAlt className="text-indigo-600" />
              <span className="hover:text-black transition">{store.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <FaEnvelope className="text-indigo-600" />
              <span className="hover:text-black transition">{store.email}</span>
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold mb-4">Follow Us on Social Media</p>

            <div className="flex gap-4">
              {socials?.facebook && (
                <a
                  target="_blank"
                  href={socials.facebook}
                  className="p-3 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition"
                >
                  <FaFacebook />
                </a>
              )}

              {socials?.instagram && (
                <a
                  target="_blank"
                  href={socials.instagram}
                  className="p-3 rounded-full bg-gray-100 hover:bg-pink-500 hover:text-white transition"
                >
                  <FaInstagram />
                </a>
              )}

              {socials?.telegram && (
                <a
                  target="_blank"
                  href={socials.telegram}
                  className="p-3 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white transition"
                >
                  <FaTelegram />
                </a>
              )}

              {socials?.whatsapp && (
                <a
                  target="_blank"
                  href={socials.whatsapp}
                  className="p-3 rounded-full bg-gray-100 hover:bg-green-500 hover:text-white transition"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
