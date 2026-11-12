"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import { AccountantTab, FinanceMode, tabToSlug, slugToTab } from "../types"

interface AccountantContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  financeMode: FinanceMode
  setFinanceMode: (mode: FinanceMode) => void
  activeTab: AccountantTab
  setActiveTab: (tab: AccountantTab) => void
}

const AccountantContext = createContext<AccountantContextType | undefined>(undefined)

export function AccountantProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")
  const [financeMode, setFinanceModeState] = useState<FinanceMode>("My Finance")
  const [activeTab, setActiveTabState] = useState<AccountantTab>("Finance Overview")

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const modeParam = params.get("mode")?.toLowerCase()
    const tabParam = params.get("tab")?.toLowerCase()

    if (modeParam === "executive-finance" || modeParam === "executivefinance") {
      setFinanceModeState("Executive Finance")
    } else if (modeParam === "my-finance" || modeParam === "myfinance") {
      setFinanceModeState("My Finance")
    }

    if (tabParam && slugToTab[tabParam]) {
      setActiveTabState(slugToTab[tabParam])
    } else {
      try {
        const savedTab = sessionStorage.getItem("accountant_active_tab") as AccountantTab | null
        if (savedTab) {
          setActiveTabState(savedTab)
        }
      } catch {
        // Ignore storage access errors
      }
    }

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search)
      const tp = p.get("tab")?.toLowerCase()
      const mp = p.get("mode")?.toLowerCase()

      if (mp === "executive-finance" || mp === "executivefinance") {
        setFinanceModeState("Executive Finance")
      } else if (mp === "my-finance" || mp === "myfinance") {
        setFinanceModeState("My Finance")
      }

      if (tp && slugToTab[tp]) {
        setActiveTabState(slugToTab[tp])
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const url = new URL(window.location.href)
    const currentMode = url.searchParams.get("mode")
    const currentTab = url.searchParams.get("tab")
    const targetMode =
      financeMode === "Executive Finance" ? "executive-finance" : "my-finance"
    const targetTab = tabToSlug[activeTab] || "overview"

    if (currentMode !== targetMode || currentTab !== targetTab) {
      url.searchParams.set("mode", targetMode)
      url.searchParams.set("tab", targetTab)
      window.history.replaceState({}, "", url.toString())
    }
  }, [financeMode, activeTab])

  const setActiveTab = useCallback((tab: AccountantTab) => {
    setActiveTabState(tab)
    try {
      sessionStorage.setItem("accountant_active_tab", tab)
    } catch {
      // Ignore storage access errors
    }
  }, [])

  const handleSetFinanceMode = useCallback((mode: FinanceMode) => {
    setFinanceModeState(mode)
    setActiveTabState((prevTab) => {
      if (mode === "Executive Finance" && prevTab === "Finance Overview") {
        return "Executives Overview"
      }
      if (mode === "My Finance" && prevTab === "Executives Overview") {
        return "Finance Overview"
      }
      return prevTab
    })
  }, [])

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
        setFinanceMode: handleSetFinanceMode,
        activeTab,
        setActiveTab,
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
