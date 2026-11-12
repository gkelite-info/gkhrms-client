"use client"

import { useState } from "react"
import {
  Zap,
  Wifi,
  Building2,
  Laptop,
  Wrench,
  ShoppingCart,
  Droplets,
  FileText,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { AccountantExpenseEntry, ExpenseEntryStatus } from "../types"

interface AccountantExpenseTableProps {
  entries: AccountantExpenseEntry[]
  totalCount?: number
  onViewClick?: (entry: AccountantExpenseEntry) => void
  onEditClick?: (entry: AccountantExpenseEntry) => void
}

export default function AccountantExpenseTable({
  entries,
  totalCount = 128,
  onViewClick,
  onEditClick,
}: AccountantExpenseTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false)

  const rowsPerPageOptions = [10, 20, 50]
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 13

  const renderExpenseTypeIcon = (type: string) => {
    switch (type) {
      case "Electricity":
        return <Zap className="w-3.5 h-3.5 text-purple-500 shrink-0" />
      case "Internet":
        return <Wifi className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
      case "Office Rent":
        return <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Software Subscription":
        return <Laptop className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Maintenance":
        return <Wrench className="w-3.5 h-3.5 text-purple-500 shrink-0" />
      case "Office Supplies":
        return <ShoppingCart className="w-3.5 h-3.5 text-pink-500 shrink-0" />
      case "Water Bill":
        return <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
    }
  }

  const renderStatusBadge = (status: ExpenseEntryStatus) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600">
            Pending
          </span>
        )
      case "Paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
            Paid
          </span>
        )
      case "Draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
            Draft
          </span>
        )
      default:
        return null
    }
  }

  const displayedList = entries.slice(0, rowsPerPage)
  const displayStart = entries.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0
  const displayEnd =
    entries.length > 0
      ? Math.min((currentPage - 1) * rowsPerPage + displayedList.length, totalCount)
      : 0

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[960px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-white">
              <th className="py-3.5 px-5 font-semibold">Entry ID</th>
              <th className="py-3.5 px-4 font-semibold">Expense Type</th>
              <th className="py-3.5 px-4 font-semibold">Vendor / Provider</th>
              <th className="py-3.5 px-4 font-semibold">Bill Number</th>
              <th className="py-3.5 px-4 font-semibold">Bill Date</th>
              <th className="py-3.5 px-4 font-semibold">Due Date</th>
              <th className="py-3.5 px-4 font-semibold">Amount</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-xs">
            {displayedList.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-xs font-medium text-slate-400"
                >
                  No expense entries match the selected filters.
                </td>
              </tr>
            ) : (
              displayedList.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="py-4 px-5 font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors whitespace-nowrap">
                    {entry.id}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      {renderExpenseTypeIcon(entry.expenseType)}
                      <span>{entry.expenseType}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-700 font-medium whitespace-nowrap">
                    {entry.vendor}
                  </td>

                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                    {entry.billNumber}
                  </td>

                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                    {entry.billDate}
                  </td>

                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                    {entry.dueDate}
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {entry.amount}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    {renderStatusBadge(entry.status)}
                  </td>

                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => onViewClick?.(entry)}
                        className="p-1 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditClick?.(entry)}
                        className="p-1 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit expense"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 text-xs">
        <div className="text-slate-500 font-medium">
          Showing {displayStart} - {displayEnd} of {totalCount} expense entries
        </div>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="relative flex items-center gap-2 text-slate-500">
            <span>Rows per page:</span>
            <button
              type="button"
              onClick={() => setRowsDropdownOpen(!rowsDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <span>{rowsPerPage}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {rowsDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setRowsDropdownOpen(false)}
                />
                <div className="absolute bottom-full mb-1 right-0 z-30 w-20 bg-white border border-slate-200 rounded-lg shadow-lg py-1 text-xs">
                  {rowsPerPageOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setRowsPerPage(opt)
                        setCurrentPage(1)
                        setRowsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 font-medium hover:bg-slate-50 cursor-pointer ${
                        rowsPerPage === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#4F46E5] text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <span className="px-1 text-slate-400">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentPage === totalPages
                  ? "bg-[#4F46E5] text-white font-semibold shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {totalPages}
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

