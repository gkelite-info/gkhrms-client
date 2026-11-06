"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FinanceContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <FinanceContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}

