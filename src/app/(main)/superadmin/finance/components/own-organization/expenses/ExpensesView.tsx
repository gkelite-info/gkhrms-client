"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import ExpensesHeader, { ExpenseSubPill } from "./ExpensesHeader"
import ExpensesStatCards from "./ExpensesStatCards"
import ExpenseTrendChart from "./ExpenseTrendChart"
import ExpenseCategoryDonutChart from "./ExpenseCategoryDonutChart"
import RecentExpensesTable from "./RecentExpensesTable"
import QuickInsightsCard from "./QuickInsightsCard"
import AllExpensesTable from "./AllExpensesTable"
import AddExpenseModal from "./AddExpenseModal"
import RecurringExpensesStatCards from "./RecurringExpensesStatCards"
import RecurringExpensesTable from "./RecurringExpensesTable"
import ReimbursementsStatCards from "./ReimbursementsStatCards"
import ReimbursementsTable from "./ReimbursementsTable"
import { ExpenseRecord, INITIAL_EXPENSES_DATA } from "./ExpensesData"

const VALID_PILLS: ExpenseSubPill[] = [
  "overview",
  "all_expenses",
  "recurring",
  "reimbursements",
]

export default function ExpensesView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const subtabParam = searchParams.get("subtab")?.toLowerCase()
  const initialPill = VALID_PILLS.includes(subtabParam as ExpenseSubPill)
    ? (subtabParam as ExpenseSubPill)
    : "overview"

  const [activePill, setActivePill] = useState<ExpenseSubPill>(initialPill)
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES_DATA)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAddRecurringOpen, setIsAddRecurringOpen] = useState(false)
  const [isAddReimbursementOpen, setIsAddReimbursementOpen] = useState(false)

  useEffect(() => {
    if (subtabParam && VALID_PILLS.includes(subtabParam as ExpenseSubPill)) {
      setActivePill(subtabParam as ExpenseSubPill)
    }
  }, [subtabParam])

  const handlePillChange = useCallback(
    (pill: ExpenseSubPill) => {
      setActivePill(pill)
      const params = new URLSearchParams(searchParams.toString())
      params.set("subtab", pill)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleHeaderAdd = () => {
    if (activePill === "recurring") {
      setIsAddRecurringOpen(true)
    } else if (activePill === "reimbursements") {
      setIsAddReimbursementOpen(true)
    } else {
      setIsAddModalOpen(true)
    }
  }

  const handleAddExpense = (newExpense: ExpenseRecord) => {
    setExpenses((prev) => [newExpense, ...prev])
  }

  const handleUpdateExpense = (updatedExpense: ExpenseRecord) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    )
  }

  const normalizedExpenses = useMemo(() => {
    const defaultMethods: ExpenseRecord["paymentMethod"][] = [
      "Bank Transfer",
      "Card",
      "UPI",
      "Bank Transfer",
      "UPI",
      "Card",
      "Cash",
      "Bank Transfer",
    ]
    return expenses.map((e, idx) => {
      if (e.paymentMethod) return e
      return {
        ...e,
        paymentMethod: defaultMethods[idx % defaultMethods.length],
      }
    })
  }, [expenses])

  return (
    <div className="flex flex-col gap-6">
      <ExpensesHeader
        activePill={activePill}
        onPillChange={handlePillChange}
        onAddExpense={handleHeaderAdd}
      />

      {activePill === "recurring" ? (
        <>
          <RecurringExpensesStatCards />
          <RecurringExpensesTable
            externalAddOpen={isAddRecurringOpen}
            onCloseExternalAdd={() => setIsAddRecurringOpen(false)}
          />
        </>
      ) : activePill === "reimbursements" ? (
        <>
          <ReimbursementsStatCards />
          <ReimbursementsTable
            externalAddOpen={isAddReimbursementOpen}
            onCloseExternalAdd={() => setIsAddReimbursementOpen(false)}
          />
        </>
      ) : (
        <>
          <ExpensesStatCards />

          {activePill === "overview" ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ExpenseTrendChart />
                <ExpenseCategoryDonutChart />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2">
                  <RecentExpensesTable
                    expenses={normalizedExpenses.slice(0, 5)}
                    onViewAll={() => setActivePill("all_expenses")}
                  />
                </div>
                <div className="lg:col-span-1">
                  <QuickInsightsCard />
                </div>
              </div>
            </>
          ) : (
            <AllExpensesTable
              expenses={normalizedExpenses}
              onUpdateExpense={handleUpdateExpense}
            />
          )}
        </>
      )}

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  )
}
