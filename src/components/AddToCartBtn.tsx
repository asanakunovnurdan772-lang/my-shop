'use client'
import { toast } from 'react-hot-toast'
import { useCartStore } from '@/store/useCartStore'

export function AddToCartButton({
  id,
  title,
  price,
  image,
}: {
  id: number
  title: string
  price: number
  image: string
}) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = () => {
    addItem({ id, title, price, image })
    toast.success('Added to cart')
  }

  return (
    <button
      onClick={handleAddToCart}
      className="relative py-2 px-6 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 transition duration-300 cursor-pointer overflow-hidden"
    >
      Add to Cart
    </button>
  )
}
