"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { FinanceMode } from "../types"

interface AccountantContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  financeMode: FinanceMode
  setFinanceMode: (mode: FinanceMode) => void
}

const AccountantContext = createContext<AccountantContextType | undefined>(undefined)

export function AccountantProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")
  const [financeMode, setFinanceMode] = useState<FinanceMode>("My Finance")

  return (
    <AccountantContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        mobileOpen,
        setMobileOpen,
        selectedMonth,
        setSelectedMonth,
        financeMode,
        setFinanceMode,
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

