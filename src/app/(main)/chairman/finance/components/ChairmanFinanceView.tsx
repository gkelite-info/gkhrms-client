"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import ChairmanFinanceHeader from "./ChairmanFinanceHeader"
import ChairmanFinanceTabs, { ChairmanFinanceTab } from "./ChairmanFinanceTabs"
import ChairmanFinanceStatCards from "./ChairmanFinanceStatCards"
import RevenueVsExpensesChart from "./RevenueVsExpensesChart"
import ExpenseBreakdownDonutChart from "./ExpenseBreakdownDonutChart"
import ReceivablesVsPayablesCard from "./ReceivablesVsPayablesCard"
import BudgetUtilizationCard from "./BudgetUtilizationCard"
import RecentFinancialActivityTable from "./RecentFinancialActivityTable"
import ChairmanRevenueTabContent from "./ChairmanRevenueTabContent"
import ChairmanExpensesTabContent from "./ChairmanExpensesTabContent"
import ChairmanPayrollTabContent from "./ChairmanPayrollTabContent"
import ChairmanReceivablesPayablesTabContent from "./ChairmanReceivablesPayablesTabContent"
import ChairmanReportsTabContent from "./ChairmanReportsTabContent"

function normalizeTab(rawTab: string | null): ChairmanFinanceTab {
  if (!rawTab) return "overview"
  const lower = rawTab.toLowerCase().trim()
  if (lower === "revenue") return "revenue"
  if (lower === "expenses" || lower === "expense") return "expenses"
  if (lower === "payroll" || lower === "payroll_cost" || lower === "payroll-cost") return "payroll"
  if (
    lower === "receivables_payables" ||
    lower === "receivables-payables" ||
    lower === "receivables" ||
    lower === "payables"
  ) {
    return "receivables_payables"
  }
  if (lower === "reports" || lower === "report") return "reports"
  return "overview"
}

function ChairmanFinanceViewContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryTab = normalizeTab(searchParams.get("tab"))
  const [activeTab, setActiveTab] = useState<ChairmanFinanceTab>(queryTab)

  useEffect(() => {
    setActiveTab(queryTab)
  }, [queryTab])

  const handleTabChange = (tab: ChairmanFinanceTab) => {
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    if (tab === "overview") {
      params.delete("tab")
    } else {
      params.set("tab", tab)
    }
    const queryString = params.toString()
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.replace(targetUrl, { scroll: false })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "reports":
        return <ChairmanReportsTabContent />
      case "receivables_payables":
        return <ChairmanReceivablesPayablesTabContent />
      case "payroll":
        return <ChairmanPayrollTabContent />
      case "expenses":
        return <ChairmanExpensesTabContent />
      case "revenue":
        return <ChairmanRevenueTabContent />
      case "overview":
      default:
        return (
          <>
            <ChairmanFinanceStatCards />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              <div className="lg:col-span-7 flex flex-col">
                <RevenueVsExpensesChart />
              </div>
              <div className="lg:col-span-5 flex flex-col">
                <ExpenseBreakdownDonutChart />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              <div className="lg:col-span-6 flex flex-col">
                <ReceivablesVsPayablesCard />
              </div>
              <div className="lg:col-span-6 flex flex-col">
                <BudgetUtilizationCard />
              </div>
            </div>

            <RecentFinancialActivityTable />
          </>
        )
    }
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-5 md:p-6 flex flex-col gap-4 sm:gap-5 pb-12">
      <ChairmanFinanceHeader activeTab={activeTab} />
      <ChairmanFinanceTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {renderTabContent()}
    </div>
  )
}

export default function ChairmanFinanceView() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center text-slate-400 text-xs">
          Loading financial overview...
        </div>
      }
    >
      <ChairmanFinanceViewContent />
    </Suspense>
  )
}
