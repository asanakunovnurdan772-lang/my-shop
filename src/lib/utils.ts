// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export const formatPrice = (price: number) => price.toFixed(2)

export const getVeryLightColor = () => {
  const r = Math.floor(Math.random() * 55 + 200)
  const g = Math.floor(Math.random() * 55 + 200)
  const b = Math.floor(Math.random() * 55 + 200)
  return `rgb(${r}, ${g}, ${b})`
}
