import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header/Header'
import { getStoreInfo } from '@/lib/apiServices'
import { getPayloadClient } from '@/lib/payloadClient'
import { headers } from 'next/headers'
import { AuthProvider } from '@/providers/AuthProvider'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const store = await getStoreInfo()

  const payload = await getPayloadClient()

  const { user } = await payload.auth({ headers: await headers() })

  const socials = {
    facebook: store.socials?.facebook ?? undefined,
    instagram: store.socials?.instagram ?? undefined,
    telegram: store.socials?.telegram ?? undefined,
    whatsapp: store.socials?.whatsapp ?? undefined,
  }

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider initialUser={user}>
          <Header storeName={store.name} logoUrl={store.logoUrl} />

          <main>{children}</main>
          <Footer storeName={store.name} logoUrl={store.logoUrl} socials={socials} />
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  )
}
