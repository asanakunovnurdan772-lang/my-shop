import Logo from './header/Logo'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import SocialMediaLink from './SocialMediaLink'

type Socials = {
  facebook?: string
  instagram?: string
  telegram?: string
  whatsapp?: string
}

type Props = {
  storeName: string
  logoUrl?: string
  socials?: Socials
}

export default function Footer({ storeName, logoUrl, socials }: Props) {
  return (
    <footer className="relative bg-black text-white py-14 overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 flex flex-col gap-10 md:flex-row md:justify-between md:items-center">
        {/* LOGO */}
        <Link href="/" className="hover:opacity-80 transition">
          <Logo src={logoUrl} alt={storeName} width={100} height={100} classes="object-contain" />
        </Link>

        {/* LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            { href: '/about', label: 'About Us' },
            { href: '/delivery-policy', label: 'Delivery Policy' },
            { href: '/return-policy', label: 'Return Policy' },
            { href: '/privacy-policy', label: 'Privacy Policy' },
            { href: '/', label: 'Terms of Use' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-white/60 hover:text-yellow-300 transition group"
            >
              {item.label}

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* SOCIALS */}
        {socials && (
          <div className="flex gap-4">
            {socials.facebook && <SocialMediaLink href={socials.facebook} icon={FaFacebook} />}
            {socials.instagram && <SocialMediaLink href={socials.instagram} icon={FaInstagram} />}
            {socials.telegram && <SocialMediaLink href={socials.telegram} icon={FaTelegram} />}
            {socials.whatsapp && <SocialMediaLink href={socials.whatsapp} icon={FaWhatsapp} />}
          </div>
        )}
      </div>

      {/* bottom line */}
      <div className="mt-10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {storeName}. All rights reserved.
      </div>
    </footer>
  )
}
