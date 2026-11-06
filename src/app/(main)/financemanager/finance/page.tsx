"use client"

import { useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useFinance } from "../context/FinanceContext"
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
import PendingPaymentsView from "./components/PendingPaymentsView"
import OverduePaymentsView from "./components/OverduePaymentsView"

const tabToSlug: Record<FinanceTab, string> = {
  "Finance Overview": "overview",
  Revenue: "revenue",
  Expenses: "expenses",
  Reimbursements: "reimbursements",
  Payments: "payments",
  Budgets: "budgets",
  Reports: "reports",
}

const basePath = "/financemanager/finance"

function FinanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { searchQuery } = useFinance()

  const tabParam = searchParams.get("tab")?.toLowerCase()
  const viewParam = searchParams.get("view")?.toLowerCase()
  const txIdParam = searchParams.get("id") || searchParams.get("transactionId")

  const isTrendDetails =
    viewParam === "expense-trend-details" ||
    viewParam === "expense-trend" ||
    tabParam === "expense-trend-details" ||
    tabParam === "expense-trend"

  const isBreakdownModal =
    viewParam === "expense-breakdown" ||
    tabParam === "expense-breakdown"

  const isPendingPayments =
    viewParam === "pending-payments" ||
    tabParam === "pending-payments"

  const isOverduePayments =
    viewParam === "overdue-payments" ||
    tabParam === "overdue-payments"

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
        if (
          searchParams.get("modal") === "add-expense" ||
          searchParams.get("action") === "add-expense"
        ) {
          return "Expenses"
        }
        if (
          searchParams.get("modal") === "add-claim" ||
          searchParams.get("action") === "add-claim"
        ) {
          return "Reimbursements"
        }
        if (
          searchParams.get("modal") === "add-payment" ||
          searchParams.get("action") === "add-payment"
        ) {
          return "Payments"
        }
        return "Finance Overview"
    }
  }, [tabParam, searchParams])

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
      router.push(`${basePath}?view=overdue-payments`)
    } else if (cardId === "pending-payments") {
      router.push(`${basePath}?view=pending-payments`)
    } else if (cardId === "approved-this-month") {
      router.push(`${basePath}?tab=expenses`)
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

  if (isOverduePayments) {
    return <OverduePaymentsView onBack={handleBackToOverview} />
  }

  if (isPendingPayments) {
    return <PendingPaymentsView onBack={handleBackToOverview} />
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
            "Track approved outgoing payments including reimbursements.",
        }
      case "Reports":
        return {
          title: "Reports",
          subtitle:
            "View revenue and expense reports with simple insights.",
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
            <ExpenseBreakdownChart
              initialModalOpen={isBreakdownModal}
              onModalClose={() => {
                if (isBreakdownModal) {
                  router.push(basePath)
                }
              }}
            />
          </div>

          <RecentTransactionsTable
            transactions={mockTransactions}
            searchQuery={searchQuery}
            onTransactionClick={handleTransactionClick}
          />
        </div>
      )}

      {activeTab === "Revenue" && <RevenueView />}
      {activeTab === "Expenses" && <ExpensesView />}
      {activeTab === "Reimbursements" && <ReimbursementsView />}
      {activeTab === "Budgets" && <BudgetsView />}
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

