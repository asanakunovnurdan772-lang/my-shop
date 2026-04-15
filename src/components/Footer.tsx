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
    <footer className="relative bg-black text-white overflow-hidden">
      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[120px] rounded-full" />
      </div>

      {/* TOP BORDER LINE */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12 relative z-10">
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* LOGO */}
          <Link href="/" className="hover:scale-105 transition">
            <Logo
              src={logoUrl}
              alt={storeName}
              width={110}
              height={110}
              classes="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
            />
          </Link>

          {/* LINKS */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            {['About Us', 'Return Policy', 'Privacy Policy', 'Terms of Use'].map((item, i) => (
              <Link key={i} href="/" className="relative group hover:text-yellow-400 transition">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* SOCIALS */}
          {socials && (
            <div className="flex gap-5 text-yellow-400">
              {socials.facebook && <SocialMediaLink href={socials.facebook} icon={FaFacebook} />}

              {socials.instagram && <SocialMediaLink href={socials.instagram} icon={FaInstagram} />}

              {socials.telegram && <SocialMediaLink href={socials.telegram} icon={FaTelegram} />}

              {socials.whatsapp && <SocialMediaLink href={socials.whatsapp} icon={FaWhatsapp} />}
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>

          <p className="text-yellow-400/60 tracking-widest">PREMIUM DIGITAL EXPERIENCE</p>
        </div>
      </div>
    </footer>
  )
}
