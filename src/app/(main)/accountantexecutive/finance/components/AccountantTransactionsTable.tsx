"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Building2,
  Zap,
  Laptop,
  User,
  Wifi,
  ShoppingCart,
  Landmark,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { AccountantTransaction } from "../types"

interface AccountantTransactionsTableProps {
  transactions: AccountantTransaction[]
  totalCount?: number
  onTransactionClick?: (tx: AccountantTransaction) => void
}

export default function AccountantTransactionsTable({
  transactions,
  totalCount = 152,
  onTransactionClick,
}: AccountantTransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false)

  const rowsPerPageOptions = [10, 20, 50]

  const totalPages = Math.ceil(totalCount / rowsPerPage) || 19

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "Client Projects":
        return <Briefcase className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Office Rent":
        return <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Utilities":
        return <Zap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Subscriptions":
        return <Laptop className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Reimbursement":
        return <User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Internet":
        return <Wifi className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Office Supplies":
        return <ShoppingCart className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      default:
        return <Briefcase className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
    }
  }

  const renderPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return <Landmark className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "UPI":
        return (
          <span className="font-extrabold text-[10px] tracking-tight text-indigo-600 shrink-0 leading-none">
            UPI
          </span>
        )
      case "Online Payment":
        return <Laptop className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Card":
        return <CreditCard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      default:
        return <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
    }
  }

  const displayedList = transactions.slice(0, rowsPerPage)
  const displayStart = transactions.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0
  const displayEnd =
    transactions.length > 0
      ? Math.min((currentPage - 1) * rowsPerPage + displayedList.length, totalCount)
      : 0

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[920px]">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 bg-white">
              <th className="py-3.5 px-5 font-semibold">Txn ID</th>
              <th className="py-3.5 px-4 font-semibold">Date</th>
              <th className="py-3.5 px-4 font-semibold">Type</th>
              <th className="py-3.5 px-4 font-semibold">Category</th>
              <th className="py-3.5 px-4 font-semibold">Description</th>
              <th className="py-3.5 px-4 font-semibold">Payment Method</th>
              <th className="py-3.5 px-4 font-semibold">Amount</th>
              <th className="py-3.5 px-5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-xs">
            {displayedList.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-xs font-medium text-slate-400"
                >
                  No transactions match the selected filters.
                </td>
              </tr>
            ) : (
              displayedList.map((tx) => {
                const isReceived = tx.type === "Money Received"
                return (
                  <tr
                    key={tx.id}
                    onClick={() => onTransactionClick?.(tx)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-5 font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors whitespace-nowrap">
                      {tx.id}
                    </td>

                    <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                      {tx.date}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          isReceived
                            ? "text-emerald-600 bg-emerald-50/80"
                            : "text-rose-600 bg-rose-50/80"
                        }`}
                      >
                        {isReceived ? (
                          <ArrowDown className="w-3 h-3 stroke-[2.5]" />
                        ) : (
                          <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                        )}
                        <span>{tx.type}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        {renderCategoryIcon(tx.category)}
                        <span>{tx.category}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-600 max-w-[280px] truncate">
                      {tx.description}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        {renderPaymentMethodIcon(tx.paymentMethod)}
                        <span>{tx.paymentMethod}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {tx.amount}
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-emerald-600 bg-emerald-50/80">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 text-xs">
        <div className="text-slate-500 font-medium">
          Showing {displayStart} - {displayEnd} of {totalCount} transactions
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

