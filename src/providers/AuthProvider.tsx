'use client'

import { createContext, useContext, useState } from 'react'
import { User } from '@/payload-types'

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser: User | null
}) => {
  const [user, setUser] = useState<User | null>(initialUser)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
