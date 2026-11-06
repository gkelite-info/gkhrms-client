"use client"

import { useState } from "react"
import { Search, ChevronDown, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { ExpenseRecord, ExpenseType, ExpenseStatus } from "../types"
import { expensesKpiCards, mockExpenseRecords } from "../data/mockFinanceData"
import KpiCardsGrid from "./KpiCardsGrid"
import AddExpenseModal from "./AddExpenseModal"
import ViewExpenseModal from "./ViewExpenseModal"

interface ExpensesViewProps {
  onTotalExpensesClick?: () => void
}

export default function ExpensesView({ onTotalExpensesClick }: ExpensesViewProps) {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(mockExpenseRecords)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<ExpenseRecord | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const handleCardClick = (cardId: string) => {
    if (cardId === "expenses-total" && onTotalExpensesClick) {
      onTotalExpensesClick()
    }
  }

  const handleAddExpense = (newExpense: ExpenseRecord) => {
    setExpenses((prev) => [newExpense, ...prev])
  }

  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch =
      item.expenseId.toLowerCase().includes(search.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())

    const matchesType =
      typeFilter === "All" || item.expenseType === (typeFilter as ExpenseType)

    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter

    const matchesStatus =
      statusFilter === "All" || item.status === (statusFilter as ExpenseStatus)

    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredExpenses.length / pageSize) || 1
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderStatusBadge = (status: ExpenseStatus) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Approved
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            Pending
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            Rejected
          </span>
        )
    }
  }

  const renderTypeBadge = (type: ExpenseType) => {
    if (type === "Employee") {
      return (
        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-[#F0F9FF] text-[#0284C7] border border-[#E0F2FE]">
          Employee
        </span>
      )
    }
    return (
      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-[#FAF5FF] text-[#9333EA] border border-[#F3E8FF]">
        Company
      </span>
    )
  }

  return (
    <div className="space-y-5">
      <KpiCardsGrid cards={expensesKpiCards} onCardClick={handleCardClick} />

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by employee, or expense ID..."
            className="w-full h-10 pl-11 pr-4 bg-white text-xs text-slate-800 placeholder-slate-400 rounded-full border border-slate-200/80 shadow-xs focus:outline-none focus:border-[#4F46E5]/40 focus:ring-2 focus:ring-[#4F46E5]/15 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="appearance-none h-10 pl-4 pr-8 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 shadow-xs focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="All">All Expense Types</option>
              <option value="Employee">Employee</option>
              <option value="Company">Company</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="appearance-none h-10 pl-4 pr-8 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 shadow-xs focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Travel">Travel</option>
              <option value="Meals">Meals</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Client Meeting">Client Meeting</option>
              <option value="Software">Software</option>
              <option value="Local Travel">Local Travel</option>
              <option value="Printing">Printing</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="appearance-none h-10 pl-4 pr-8 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 shadow-xs focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="h-10 px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ml-auto sm:ml-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Expenses ({filteredExpenses.length})
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1 font-semibold">Expense ID</th>
                <th className="pb-3 pt-1 font-semibold">Submitted By</th>
                <th className="pb-3 pt-1 font-semibold">Expense Type</th>
                <th className="pb-3 pt-1 font-semibold">Category</th>
                <th className="pb-3 pt-1 font-semibold">Amount</th>
                <th className="pb-3 pt-1 font-semibold">Submitted On</th>
                <th className="pb-3 pt-1 font-semibold">Status</th>
                <th className="pb-3 pt-1 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedExpenses.length > 0 ? (
                paginatedExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 font-medium text-slate-700 whitespace-nowrap">
                      {expense.expenseId}
                    </td>
                    <td className="py-3.5 text-slate-800 font-semibold whitespace-nowrap">
                      {expense.submittedBy}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderTypeBadge(expense.expenseType)}
                    </td>
                    <td className="py-3.5 text-slate-600 whitespace-nowrap">
                      {expense.category}
                    </td>
                    <td className="py-3.5 text-slate-900 font-bold whitespace-nowrap">
                      {expense.formattedAmount}
                    </td>
                    <td className="py-3.5 text-slate-500 whitespace-nowrap">
                      {expense.submittedOn}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderStatusBadge(expense.status)}
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedExpense(expense)}
                        className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] hover:underline cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-slate-400 text-xs"
                  >
                    No expense records found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing 1 to {paginatedExpenses.length} of {filteredExpenses.length} expenses
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="w-7 h-7 rounded-lg bg-[#4F46E5] text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {currentPage}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddExpense}
      />

      <ViewExpenseModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />
    </div>
  )
}
