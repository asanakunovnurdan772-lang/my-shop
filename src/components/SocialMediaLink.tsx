import { IconType } from 'react-icons'

export default function SocialMediaLink({ href, icon: Icon }: { href: string; icon: IconType }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-gray-900 hover:-translate-y-1 transition duration-300"
      target="_blank"
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}
