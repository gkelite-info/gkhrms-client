"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface AccountantContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
}

const AccountantContext = createContext<AccountantContextType | undefined>(undefined)

export function AccountantProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")

  return (
    <AccountantContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        mobileOpen,
        setMobileOpen,
        selectedMonth,
        setSelectedMonth,
      }}
    >
      {children}
    </AccountantContext.Provider>
  )
}

export function useAccountant() {
  const context = useContext(AccountantContext)
  if (!context) {
    throw new Error("useAccountant must be used within an AccountantProvider")
  }
  return context
}

