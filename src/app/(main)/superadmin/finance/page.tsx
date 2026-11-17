"use client"

import { Suspense, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import FinanceHeader from "./components/FinanceHeader"
import FinanceStatCards from "./components/FinanceStatCards"
import RecentTransactionsCard from "./components/RecentTransactionsCard"
import SubscriptionSummaryCard from "./components/SubscriptionSummaryCard"
import OwnOrganizationView from "./components/own-organization/OwnOrganizationView"
import { OwnOrgTab } from "./components/own-organization/OwnOrgTabs"

const RevenueTrendChart = dynamic(
  () => import("./components/RevenueTrendChart"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs h-80 flex items-center justify-center">
        <span className="text-xs text-slate-400 font-medium animate-pulse">
          Loading revenue trend...
        </span>
      </div>
    ),
  }
)

const RevenueByPlanChart = dynamic(
  () => import("./components/RevenueByPlanChart"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs h-80 flex items-center justify-center">
        <span className="text-xs text-slate-400 font-medium animate-pulse">
          Loading revenue by plan...
        </span>
      </div>
    ),
  }
)

const VALID_TABS: OwnOrgTab[] = [
  "employees",
  "attendance",
  "payroll",
  "expenses",
  "leave",
  "reports",
]

function SuperAdminFinanceContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const scopeParam = searchParams.get("scope")?.toLowerCase()
  const tabParam = searchParams.get("tab")?.toLowerCase()

  const activeScope: "platform" | "own_organization" =
    scopeParam === "own_organization" || scopeParam === "own-organization"
      ? "own_organization"
      : "platform"

  const activeTab: OwnOrgTab = (
    VALID_TABS.includes(tabParam as OwnOrgTab) ? tabParam : "employees"
  ) as OwnOrgTab

  const handleScopeChange = useCallback(
    (newScope: "platform" | "own_organization") => {
      const params = new URLSearchParams(searchParams.toString())
      if (newScope === "platform") {
        params.delete("scope")
        params.delete("tab")
      } else {
        params.set("scope", "own_organization")
        if (!params.has("tab") || !VALID_TABS.includes(params.get("tab") as OwnOrgTab)) {
          params.set("tab", "employees")
        }
      }
      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleTabChange = useCallback(
    (newTab: OwnOrgTab) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("scope", "own_organization")
      params.set("tab", newTab)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <FinanceHeader
        activeScope={activeScope}
        onScopeChange={handleScopeChange}
      />

      {activeScope === "platform" ? (
        <>
          <FinanceStatCards />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <RevenueTrendChart />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <RevenueByPlanChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <RecentTransactionsCard />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <SubscriptionSummaryCard />
            </div>
          </div>
        </>
      ) : (
        <OwnOrganizationView
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  )
}

export default function SuperAdminFinancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[1600px] mx-auto min-h-[400px] flex items-center justify-center">
          <span className="text-xs text-slate-400 font-medium animate-pulse">
            Loading finance...
          </span>
        </div>
      }
    >
      <SuperAdminFinanceContent />
    </Suspense>
  )
}
