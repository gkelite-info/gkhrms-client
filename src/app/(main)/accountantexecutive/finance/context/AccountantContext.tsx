"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react"
import { useSearchParams } from "next/navigation"
import { AccountantTab, tabToSlug, slugToTab } from "../types"

interface AccountantContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  activeTab: AccountantTab
  setActiveTab: (tab: AccountantTab) => void
}

const STORAGE_KEY = "accountant_executive_active_tab"

const AccountantContext = createContext<AccountantContextType | undefined>(
  undefined
)

export function AccountantProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")?.toLowerCase() ?? null
  const initializedRef = useRef(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")
  const [activeTab, setActiveTabState] = useState<AccountantTab>(() =>
    tabParam && slugToTab[tabParam] ? slugToTab[tabParam] : "Finance Overview"
  )

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      if (tabParam && slugToTab[tabParam]) {
        setActiveTabState(slugToTab[tabParam])
        return
      }
      try {
        const savedTab = sessionStorage.getItem(STORAGE_KEY) as AccountantTab | null
        if (savedTab && savedTab in tabToSlug) {
          setActiveTabState(savedTab)
        }
      } catch {
        // Ignore storage access errors in restricted browser contexts
      }
      return
    }

    if (tabParam && slugToTab[tabParam]) {
      setActiveTabState(slugToTab[tabParam])
    } else if (!tabParam) {
      setActiveTabState("Finance Overview")
    }
  }, [tabParam])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const tp = params.get("tab")?.toLowerCase()
      if (tp && slugToTab[tp]) {
        setActiveTabState(slugToTab[tp])
      } else {
        setActiveTabState("Finance Overview")
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const setActiveTab = useCallback((tab: AccountantTab) => {
    setActiveTabState(tab)
    try {
      sessionStorage.setItem(STORAGE_KEY, tab)
    } catch {
      // Ignore storage access errors in restricted browser contexts
    }
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("tab", tabToSlug[tab] || "overview")
      url.searchParams.delete("view")
      window.history.replaceState({}, "", url.toString())
    }
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

