'use client'

import Link from 'next/link'
import Logo from './Logo'
import { LuShoppingCart } from 'react-icons/lu'
import { LuUser } from 'react-icons/lu'
import { IoIosClose } from 'react-icons/io'
import { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { useCartStore } from '@/store/useCartStore'

type Props = {
  storeName: string
  logoUrl?: string
}

function Header({ storeName, logoUrl }: Props) {
  const { user, setUser } = useAuth()
  const [userBlockOpen, setUserBlockOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  // Если нужно показать общее количество уникальных товаров
  // const totalItems = useCartStore((state) => state.items.length)

  // Общее количество товаров с учетом их количества
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  )

  const handleLogout = async () => {
    try {
      setLoading(true)

      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setUser(null)
      router.push('/')
      setUserBlockOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleUserBlockClick = () => {
    setUserBlockOpen((prev) => !prev)
  }

  if (!logoUrl) return null

  return (
    <>
      {/* MOBILE */}
      <header className="max-w-7xl mx-auto px-4 xl:px-8 py-5 border-b border-yellow-500/20 bg-black/90 backdrop-blur-xl flex justify-between items-center flex-wrap md:hidden shadow-[0_0_25px_rgba(212,175,55,0.15)]">
        <Link href="/">
          <Logo
            src={logoUrl}
            alt={storeName}
            width={100}
            height={100}
            classes="object-contain transition-transform hover:scale-105 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative text-gold-300 hover:text-yellow-400 transition">
            <LuShoppingCart className="w-5 h-5 text-yellow-400" />
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black text-[10px] absolute -top-2 -right-3 flex items-center justify-center font-bold shadow-lg">
              {totalItems}
            </span>
          </Link>

          <button
            aria-label="Open User Menu"
            onClick={handleUserBlockClick}
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            <LuUser className="w-5 h-5" />
          </button>
        </div>

        {/* overlay */}
        {userBlockOpen && (
          <div
            className="fixed w-full h-screen bg-black/70 top-0 left-0 backdrop-blur-sm z-10"
            onClick={() => setUserBlockOpen(false)}
          />
        )}

        {/* sidebar */}
        <div
          className={`fixed w-[75%] min-h-screen top-0 right-0 bg-black/95 backdrop-blur-2xl px-8 py-12 flex flex-col gap-y-6 z-20 transition-transform duration-300 border-l border-yellow-500/20 shadow-2xl ${
            userBlockOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {user ? (
            <>
              <Link
                className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                href="/profile"
              >
                <LuUser className="w-5 h-5" />
                Profile
              </Link>

              <Link
                className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                href="/"
              >
                <LuShoppingCart className="w-5 h-5" />
                My Orders
              </Link>

              <hr className="border-yellow-500/20" />

              <button
                className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold rounded-full py-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition"
                disabled={loading}
                onClick={handleLogout}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center justify-center py-4">
              <Link
                className="px-8 py-2 rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition"
                href="/auth/login"
              >
                Login
              </Link>

              <Link
                className="px-8 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold shadow-lg hover:scale-105 transition"
                href="/auth/register"
              >
                Register
              </Link>
            </div>
          )}

          <button
            className="w-7 h-7 bg-yellow-500 text-black absolute top-4 right-4 flex justify-center items-center rounded-full shadow-lg hover:scale-110 transition"
            onClick={() => setUserBlockOpen(false)}
          >
            <IoIosClose className="w-4 h-4" />
          </button>
        </div>

        {/* search */}
        <div className="w-full my-6 relative">
          <MdOutlineSearch className="absolute top-3 left-3 w-4 h-4 text-yellow-400" />
          <input
            type="text"
            placeholder="Search luxury products..."
            className="w-full bg-black border border-yellow-500/30 text-yellow-100 rounded-full py-2 px-2 pl-9 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
          />
        </div>

        {/* links */}
        <div className="w-full flex items-center justify-center gap-4">
          <Link
            className="px-8 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold shadow-lg hover:scale-105 transition"
            href="/shop"
          >
            Shop
          </Link>

          <Link
            className="px-8 py-2 rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition"
            href="/new-arrivals"
          >
            New Arrivals
          </Link>
        </div>
      </header>

      {/* DESKTOP */}
      <header className="hidden md:block py-4 border-b  bg-black">
        <div className="max-w-7xl mx-auto px-4 xl:px-8 flex justify-between items-center gap-8">
          <Link href="/">
            <Logo
              src={logoUrl}
              alt={storeName}
              width={100}
              height={100}
              classes="object-contain transition-transform hover:scale-105 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link className="text-yellow-400 hover:text-yellow-300 transition" href="/shop">
              Shop
            </Link>

            <Link className="text-yellow-400 hover:text-yellow-300 transition" href="/new-arrivals">
              New Arrivals
            </Link>
          </div>

          <div className="relative max-w-125 min-w-76">
            <MdOutlineSearch className="absolute top-3 left-3 w-4 h-4 text-yellow-400" />
            <input
              type="text"
              placeholder="Search luxury products..."
              className="w-full bg-black border border-yellow-500/30 text-yellow-100 rounded-full py-2 px-2 pl-9 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="relative text-yellow-400 hover:text-yellow-300 transition"
            >
              <LuShoppingCart className="w-5 h-5" />
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black text-[10px] absolute -top-2 -right-3 flex items-center justify-center font-bold shadow-lg">
                {totalItems}
              </span>
            </Link>

            <button
              aria-label="Open User Menu"
              onClick={handleUserBlockClick}
              className="text-yellow-400 hover:text-yellow-300 transition"
            >
              <LuUser className="w-5 h-5" />
            </button>
          </div>

          {/* overlay */}
          {userBlockOpen && (
            <div
              className="fixed w-full h-screen bg-black/70 top-0 left-0 backdrop-blur-sm z-10"
              onClick={() => setUserBlockOpen(false)}
            />
          )}

          {/* sidebar */}
          <div
            className={`fixed w-[32%] min-h-screen top-0 right-0 bg-black/95 backdrop-blur-2xl px-8 py-12 flex flex-col gap-y-6 z-20 transition-transform duration-300 border-l border-yellow-500/20 shadow-2xl ${
              userBlockOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {user ? (
              <>
                <Link
                  className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                  href="/profile"
                >
                  <LuUser className="w-5 h-5" />
                  Profile
                </Link>

                <Link
                  className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                  href="/"
                >
                  <LuShoppingCart className="w-5 h-5" />
                  My Orders
                </Link>

                <hr className="border-yellow-500/20" />

                <button
                  className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold rounded-full py-2 shadow-lg hover:scale-105 transition"
                  disabled={loading}
                  onClick={handleLogout}
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <div className="flex gap-4 items-center justify-center py-4">
                <Link
                  className="px-8 py-2 rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition"
                  href="/auth/login"
                >
                  Login
                </Link>

                <Link
                  className="px-8 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold shadow-lg hover:scale-105 transition"
                  href="/auth/register"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              className="w-7 h-7 bg-yellow-500 text-black absolute top-4 right-4 flex justify-center items-center rounded-full shadow-lg hover:scale-110 transition"
              onClick={() => setUserBlockOpen(false)}
            >
              <IoIosClose className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
