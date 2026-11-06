"use client"

import { useMemo, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useFinance } from "./context/FinanceContext"
import { FinanceTab, Transaction } from "./types"
import { initialKpiCards, mockTransactions } from "./data/mockFinanceData"
import FinanceTabs from "./components/FinanceTabs"
import KpiCardsGrid from "./components/KpiCardsGrid"
import ExpenseTrendChart from "./components/ExpenseTrendChart"
import ExpenseBreakdownChart from "./components/ExpenseBreakdownChart"
import RecentTransactionsTable from "./components/RecentTransactionsTable"
import ExpensesView from "./components/ExpensesView"
import RevenueView from "./components/RevenueView"
import ReimbursementsView from "./components/ReimbursementsView"
import PaymentsView from "./components/PaymentsView"
import BudgetsView from "./components/BudgetsView"
import ReportsView from "./components/ReportsView"
import ExpenseTrendDetailsView from "./components/ExpenseTrendDetailsView"
import TransactionDetailsView from "./components/TransactionDetailsView"

const tabToSlug: Record<FinanceTab, string> = {
  "Finance Overview": "overview",
  Revenue: "revenue",
  Expenses: "expenses",
  Reimbursements: "reimbursements",
  Payments: "payments",
  Budgets: "budgets",
  Reports: "reports",
}

function FinanceContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { searchQuery } = useFinance()

  const basePath = pathname?.startsWith("/financemanger")
    ? "/financemanger"
    : "/financemanager"

  const tabParam = searchParams.get("tab")?.toLowerCase()
  const viewParam = searchParams.get("view")?.toLowerCase()
  const txIdParam = searchParams.get("id") || searchParams.get("transactionId")

  const isTrendDetails =
    viewParam === "expense-trend-details" ||
    viewParam === "expense-trend" ||
    tabParam === "expense-trend-details" ||
    tabParam === "expense-trend"

  const isTransactionDetails =
    viewParam === "transaction-details" ||
    viewParam === "transaction" ||
    tabParam === "transaction-details" ||
    Boolean(viewParam === "transaction" && txIdParam)

  const selectedTransaction: Transaction = useMemo(() => {
    if (!txIdParam) return mockTransactions[1]
    const found = mockTransactions.find(
      (t) =>
        t.id.toLowerCase() === txIdParam.toLowerCase() ||
        t.reference.toLowerCase() === txIdParam.toLowerCase()
    )
    return found || mockTransactions[1]
  }, [txIdParam])

  const activeTab: FinanceTab = useMemo(() => {
    switch (tabParam) {
      case "revenue":
        return "Revenue"
      case "expenses":
        return "Expenses"
      case "reimbursements":
        return "Reimbursements"
      case "payments":
        return "Payments"
      case "budgets":
        return "Budgets"
      case "reports":
        return "Reports"
      default:
        return "Finance Overview"
    }
  }, [tabParam])

  const handleTabChange = (tab: FinanceTab) => {
    const slug = tabToSlug[tab]
    if (slug === "overview") {
      router.push(basePath)
    } else {
      router.push(`${basePath}?tab=${slug}`)
    }
  }

  const handleOverviewKpiClick = (cardId: string) => {
    if (cardId === "total-expenses") {
      router.push(`${basePath}?tab=expenses`)
    } else if (cardId === "pending-reimbursements") {
      router.push(`${basePath}?tab=reimbursements`)
    } else if (cardId === "budget-utilization") {
      router.push(`${basePath}?tab=budgets`)
    } else if (cardId === "overdue-payments") {
      router.push(`${basePath}?tab=revenue`)
    }
  }

  const handleBackToOverview = () => {
    router.push(basePath)
  }

  const handleOpenTrendDetails = () => {
    router.push(`${basePath}?view=expense-trend-details`)
  }

  const handleTransactionClick = (tx: Transaction) => {
    router.push(`${basePath}?view=transaction-details&id=${tx.id}`)
  }

  if (isTransactionDetails) {
    return (
      <TransactionDetailsView
        transaction={selectedTransaction}
        onBack={handleBackToOverview}
      />
    )
  }

  if (isTrendDetails) {
    return <ExpenseTrendDetailsView onBack={handleBackToOverview} />
  }

  const getPageHeader = () => {
    switch (activeTab) {
      case "Revenue":
        return {
          title: "Revenue",
          subtitle:
            "Track and manage all incoming revenue, invoices and payments.",
        }
      case "Expenses":
        return {
          title: "Expenses",
          subtitle:
            "Track company expenses and employee-submitted expense records.",
        }
      case "Reimbursements":
        return {
          title: "Reimbursements",
          subtitle:
            "Review and manage employee reimbursement claims awaiting repayment.",
        }
      case "Budgets":
        return {
          title: "Budgets",
          subtitle:
            "Track month-wise spending trends and monitor how expenses are distributed over time.",
        }
      case "Payments":
        return {
          title: "Payments",
          subtitle:
            "Schedule and manage accounts payable, vendor disbursements, and banking transfers.",
        }
      case "Reports":
        return {
          title: "Reports",
          subtitle:
            "Generate and export financial analytics, audit filings, and transaction summaries.",
        }
      default:
        return {
          title: "Finance",
          subtitle:
            "Monitor expenses, reimbursements, payments, budgets and recent finance activity.",
        }
    }
  }

  const { title, subtitle } = getPageHeader()

  return (
    <div className="space-y-4 xl:space-y-4.5 pb-6">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-500">
          {subtitle}
        </p>
      </div>

      <FinanceTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "Finance Overview" && (
        <div className="space-y-4 xl:space-y-4.5">
          <KpiCardsGrid
            cards={initialKpiCards}
            onCardClick={handleOverviewKpiClick}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 xl:gap-4">
            <ExpenseTrendChart onOpenDetails={handleOpenTrendDetails} />
            <ExpenseBreakdownChart />
          </div>

          <RecentTransactionsTable
            transactions={mockTransactions}
            searchQuery={searchQuery}
            onTransactionClick={handleTransactionClick}
          />
        </div>
      )}

      {activeTab === "Revenue" && (
        <RevenueView onTotalRevenueClick={handleBackToOverview} />
      )}
      {activeTab === "Expenses" && (
        <ExpensesView onTotalExpensesClick={handleBackToOverview} />
      )}
      {activeTab === "Reimbursements" && (
        <ReimbursementsView onTotalAmountClick={handleBackToOverview} />
      )}
      {activeTab === "Budgets" && (
        <BudgetsView onTotalSpendClick={handleBackToOverview} />
      )}
      {activeTab === "Payments" && <PaymentsView />}
      {activeTab === "Reports" && <ReportsView />}
    </div>
  )
}

export default function FinancePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs font-medium text-slate-400">
          Loading Finance...
        </div>
      }
    >
      <FinanceContent />
    </Suspense>
  )
}
