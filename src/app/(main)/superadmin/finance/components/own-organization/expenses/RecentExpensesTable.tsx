"use client"

import { useState } from "react"
import { Eye, Check, ArrowRight } from "lucide-react"
import { ExpenseRecord, INITIAL_EXPENSES_DATA } from "./ExpensesData"
import ExpenseDetailsModal from "./ExpenseDetailsModal"

interface RecentExpensesTableProps {
  expenses?: ExpenseRecord[]
  onViewAll?: () => void
}

export default function RecentExpensesTable({
  expenses = INITIAL_EXPENSES_DATA.slice(0, 5),
  onViewAll,
}: RecentExpensesTableProps) {
  const [selectedExpense, setSelectedExpense] = useState<ExpenseRecord | null>(null)

  const getCategoryBadge = (cat: ExpenseRecord["category"]) => {
    switch (cat) {
      case "Office & Infrastructure":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            🏢 {cat}
          </span>
        )
      case "Software & Tools":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-600 border border-cyan-100">
            ☁ {cat}
          </span>
        )
      case "Travel & Conveyance":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">
            ⚠ {cat}
          </span>
        )
      case "Utilities":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-50 text-orange-600 border border-orange-100">
            ⚡ {cat}
          </span>
        )
      case "Reimbursement":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EEF0FD] text-[#5B50E5] border border-indigo-100">
            💳 {cat}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200">
            {cat}
          </span>
        )
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between h-full">
      <div className="p-5 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Recent Expenses
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#5B50E5] hover:text-[#4538C9] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-5 whitespace-nowrap">Expense ID</th>
              <th className="py-3 px-4 whitespace-nowrap">Expense Title</th>
              <th className="py-3 px-4 whitespace-nowrap">Category</th>
              <th className="py-3 px-4 whitespace-nowrap">Amount</th>
              <th className="py-3 px-4 whitespace-nowrap">Expense Date</th>
              <th className="py-3 px-4 whitespace-nowrap">Payment Status</th>
              <th className="py-3 px-5 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {expenses.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">
                  {item.id}
                </td>

                <td className="py-3 px-4 font-medium text-slate-800 whitespace-nowrap">
                  {item.title}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  {getCategoryBadge(item.category)}
                </td>

                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                  {item.amount}
                </td>

                <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                  {item.expenseDate}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  {item.paymentStatus === "Paid" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">
                      Unpaid
                    </span>
                  )}
                </td>

                <td className="py-3 px-5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setSelectedExpense(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                    title="View Expense Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ExpenseDetailsModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />
    </div>
  )
}
