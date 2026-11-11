"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Calendar, ChevronDown } from "lucide-react"
import AccountantTabs from "./components/AccountantTabs"
import AccountantKpiCards from "./components/AccountantKpiCards"
import MoneyTrendChart from "./components/MoneyTrendChart"
import ExpensesByCategoryDonut from "./components/ExpensesByCategoryDonut"
import PendingItemsCard from "./components/PendingItemsCard"
import RecentActivityCard from "./components/RecentActivityCard"
import RecentActivityDetailsView from "./components/RecentActivityDetailsView"
import AccountantTransactionsView from "./components/AccountantTransactionsView"
import AccountantExpensesView from "./components/AccountantExpensesView"
import AccountantReimbursementsView from "./components/AccountantReimbursementsView"
import AccountantPaymentsView from "./components/AccountantPaymentsView"
import AccountantReportsView from "./components/AccountantReportsView"
import AccountantModeToggle from "./components/AccountantModeToggle"
import AccountantExecutivesOverviewView from "./components/AccountantExecutivesOverviewView"
import AccountantExecutiveDetailsView from "./components/AccountantExecutiveDetailsView"
import AccountantExecutiveTransactionsView from "./components/AccountantExecutiveTransactionsView"
import AccountantExecutiveExpensesView from "./components/AccountantExecutiveExpensesView"
import { useAccountant } from "./context/AccountantContext"
import { AccountantExecutive, AccountantTab } from "./types"
import {
  accountantKpis,
  monthlyTrendData,
  categoryExpensesData,
  totalCategoryExpense,
  pendingItems,
  recentActivities,
  allRecentActivities,
  mockAccountantExecutives,
} from "./data/mockAccountantData"

const months = [
  "Nov 2026",
  "Oct 2026",
  "Sep 2026",
  "Aug 2026",
  "Jul 2026",
  "Jun 2026",
]

const tabHeaderMeta: Record<AccountantTab, { title: string; subtitle: string }> = {
  "Finance Overview": {
    title: "Finance Overview",
    subtitle: "A quick summary of company finances, expenses and payments.",
  },
  "Executives Overview": {
    title: "Finance Overview",
    subtitle: "A quick summary of company finances, expenses and payments.",
  },
  Transactions: {
    title: "Transactions",
    subtitle: "Complete history of all money movements (Income and expenses).",
  },
  "Expense Entries": {
    title: "Expense Entries",
    subtitle: "Create and manage company bills and expense records before payment.",
  },
  Reimbursements: {
    title: "Reimbursements",
    subtitle: "Track employee-paid claims that need repayment by the company.",
  },
  Payments: {
    title: "Payments",
    subtitle: "Execute and track approved payments (vendor bills, reimbursements, and other expenses).",
  },
  Reports: {
    title: "Reports",
    subtitle: "View and export finance reports with simple insights.",
  },
}


function AccountantContent() {
  const searchParams = useSearchParams()
  const { financeMode, activeTab, setActiveTab } = useAccountant()
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
  const [selectedExecutiveDetails, setSelectedExecutiveDetails] =
    useState<AccountantExecutive | null>(null)
  const [showRecentActivity, setShowRecentActivity] = useState(false)

  const viewParam = searchParams.get("view")?.toLowerCase()
  const executiveIdParam = searchParams.get("id")

  const isExecutiveDetailsView =
    viewParam === "executive-details" || Boolean(selectedExecutiveDetails)

  const activeExecutive = useMemo(() => {
    if (selectedExecutiveDetails) return selectedExecutiveDetails
    if (executiveIdParam) {
      return (
        mockAccountantExecutives.find((exec) => exec.id === executiveIdParam) ||
        mockAccountantExecutives[0]
      )
    }
    return mockAccountantExecutives[0]
  }, [selectedExecutiveDetails, executiveIdParam])

  const handleViewExecutive = (exec: AccountantExecutive) => {
    setSelectedExecutiveDetails(exec)
  }

  const handleBackFromExecutiveDetails = () => {
    setSelectedExecutiveDetails(null)
  }

  const isRecentActivityView =
    showRecentActivity ||
    viewParam === "recent-activity" ||
    viewParam === "recent-finance-activity"

  const handleViewAllActivity = () => {
    setShowRecentActivity(true)
  }

  const handleBackToOverview = () => {
    setShowRecentActivity(false)
  }

  const handleTabChange = (tab: AccountantTab) => {
    setActiveTab(tab)
  }

  if (isRecentActivityView) {
    return (
      <RecentActivityDetailsView
        activities={allRecentActivities}
        onBack={handleBackToOverview}
      />
    )
  }

  if (isExecutiveDetailsView) {
    return (
      <AccountantExecutiveDetailsView
        executive={activeExecutive}
        onBack={handleBackFromExecutiveDetails}
      />
    )
  }

  const currentMeta =
    financeMode === "Executive Finance" && activeTab === "Transactions"
      ? {
          title: "Finance Overview",
          subtitle: "Track all transaction records handled across accountant executives.",
        }
      : financeMode === "Executive Finance" && activeTab === "Expense Entries"
      ? {
          title: "Finance Overview",
          subtitle: "Track expense entries handled across accountant executives.",
        }
      : tabHeaderMeta[activeTab] || tabHeaderMeta["Finance Overview"]

  return (
    <div className="space-y-4 xl:space-y-4.5 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {currentMeta.title}
            </h1>
            <p className="text-xs text-slate-500">
              {currentMeta.subtitle}
            </p>
          </div>

          <AccountantModeToggle />
        </div>

        {activeTab === "Finance Overview" && (
          <div className="relative self-start sm:self-auto flex flex-col items-end">
            <span className="text-[10px] font-medium text-slate-400 mb-1 tracking-wide">
              Month / Year
            </span>
            <button
              type="button"
              onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {monthDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMonthDropdownOpen(false)}
                />
                <div className="absolute top-full mt-1.5 right-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {months.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedMonth(m)
                        setMonthDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium cursor-pointer ${
                        selectedMonth === m
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <AccountantTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "Finance Overview" && (
        <div className="space-y-4 xl:space-y-4.5">
          <AccountantKpiCards cards={accountantKpis} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 xl:gap-4">
            <div className="lg:col-span-7">
              <MoneyTrendChart data={monthlyTrendData} />
            </div>
            <div className="lg:col-span-5">
              <ExpensesByCategoryDonut
                data={categoryExpensesData}
                totalExpenseText={totalCategoryExpense}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 xl:gap-4">
            <PendingItemsCard items={pendingItems} />
            <RecentActivityCard
              activities={recentActivities}
              onViewAll={handleViewAllActivity}
            />
          </div>
        </div>
      )}

      {activeTab === "Executives Overview" && (
        <AccountantExecutivesOverviewView onViewExecutive={handleViewExecutive} />
      )}

      {activeTab === "Transactions" &&
        (financeMode === "Executive Finance" ? (
          <AccountantExecutiveTransactionsView />
        ) : (
          <AccountantTransactionsView />
        ))}

      {activeTab === "Expense Entries" &&
        (financeMode === "Executive Finance" ? (
          <AccountantExecutiveExpensesView />
        ) : (
          <AccountantExpensesView />
        ))}

      {activeTab === "Reimbursements" && <AccountantReimbursementsView />}

      {activeTab === "Payments" && <AccountantPaymentsView />}

      {activeTab === "Reports" && <AccountantReportsView />}
    </div>
  )
}

export default function AccountantPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs font-medium text-slate-400">
          Loading Accountant Portal...
        </div>
      }
    >
      <AccountantContent />
    </Suspense>
  )
}

