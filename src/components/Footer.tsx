import Logo from './header/Logo'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
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
    <footer className="bg-indigo-200 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-y-8 md:flex-row md:justify-between md:items-center">
        <Link href="/">
          <Logo src={logoUrl} alt={storeName} width={100} height={100} classes="object-contain" />
        </Link>
        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:items-center">
          <Link className="hover:-translate-y-1 transition duration-300" href="/about">
            About Us
          </Link>{' '}
          <GoDotFill className="w-2 h-2 hidden md:block" />
          <Link className="hover:-translate-y-1 transition duration-300" href="/delivery-policy">
            Delivery Policy
          </Link>{' '}
          <Link className="hover:-translate-y-1 transition duration-300" href="/return-policy">
            Return Policy
          </Link>{' '}
          <GoDotFill className="w-2 h-2 hidden md:block" />
          <Link className="hover:-translate-y-1 transition duration-300" href="/privacy-policy">
            Privacy Policy
          </Link>{' '}
          <GoDotFill className="w-2 h-2 hidden md:block" />
          <Link className="hover:-translate-y-1 transition duration-300" href="/">
            Terms of Use
          </Link>
        </div>
        {socials && (
          <div className="flex gap-4">
            {socials.facebook && <SocialMediaLink href={socials.facebook} icon={FaFacebook} />}

            {socials.instagram && <SocialMediaLink href={socials.instagram} icon={FaInstagram} />}

            {socials.telegram && <SocialMediaLink href={socials.telegram} icon={FaTelegram} />}

            {socials.whatsapp && <SocialMediaLink href={socials.whatsapp} icon={FaWhatsapp} />}
          </div>
        )}
      </div>
    </footer>
  )
}
