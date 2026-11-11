"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUp,
  Calendar,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  FileText,
  RotateCcw,
  CreditCard,
} from "lucide-react"
import ReusableAvatar from "../../../../../reusableComponents/ReusableAvatar"
import {
  mockExecutiveTransactionKpis,
  mockExecutiveTransactions,
  executiveTransactionTypeOptions,
  executiveTransactionExecutiveOptions,
  executiveTransactionStatusOptions,
  executiveTransactionMonthOptions,
} from "../data/mockAccountantData"
import { AccountantExecutiveTransaction } from "../types"

interface AccountantExecutiveTransactionsViewProps {
  onTransactionClick?: (tx: AccountantExecutiveTransaction) => void
}

export default function AccountantExecutiveTransactionsView({
  onTransactionClick,
}: AccountantExecutiveTransactionsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Transaction Type")
  const [selectedExecutive, setSelectedExecutive] = useState("Executive")
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [selectedMonth, setSelectedMonth] = useState("Month")

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [execDropdownOpen, setExecDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const closeAllDropdowns = () => {
    setTypeDropdownOpen(false)
    setExecDropdownOpen(false)
    setStatusDropdownOpen(false)
    setMonthDropdownOpen(false)
  }

  const filteredTransactions = useMemo(() => {
    return mockExecutiveTransactions.filter((tx) => {
      if (
        selectedType !== "Transaction Type" &&
        selectedType !== "Transaction Type: All" &&
        tx.type !== selectedType
      ) {
        return false
      }

      if (
        selectedExecutive !== "Executive" &&
        selectedExecutive !== "Executive: All" &&
        tx.executiveName !== selectedExecutive
      ) {
        return false
      }

      if (
        selectedStatus !== "Status" &&
        selectedStatus !== "Status: All" &&
        tx.status !== selectedStatus
      ) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesId = tx.transactionId.toLowerCase().includes(q)
        const matchesExec = tx.executiveName.toLowerCase().includes(q)
        const matchesRef = tx.reference.toLowerCase().includes(q)
        const matchesAmt = tx.amount.toLowerCase().includes(q)
        const matchesDate = tx.date.toLowerCase().includes(q)
        if (!matchesId && !matchesExec && !matchesRef && !matchesAmt && !matchesDate) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, selectedType, selectedExecutive, selectedStatus])

  const totalTransactionsCount = mockExecutiveTransactionKpis.totalTransactions
  const totalPages = 24
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredTransactions.slice(start, start + pageSize)
  }, [filteredTransactions, currentPage, pageSize])

  const renderTypeBadge = (type: AccountantExecutiveTransaction["type"]) => {
    switch (type) {
      case "Expense Entry":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#FAF5FF] text-[#7C3AED] border border-[#F3E8FF] whitespace-nowrap">
            <FileText className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            <span>Expense Entry</span>
          </span>
        )
      case "Reimbursement":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#F0FDFA] text-[#0D9488] border border-[#CCFBF1] whitespace-nowrap">
            <RotateCcw className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
            <span>Reimbursement</span>
          </span>
        )
      case "Payment":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] whitespace-nowrap">
            <CreditCard className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span>Payment</span>
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#EDE9FE] flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Total Transactions
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveTransactionKpis.totalTransactions}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
            <ArrowDownToLine className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Money Received
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveTransactionKpis.moneyReceived}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#DBEAFE] flex items-center justify-center shrink-0">
            <ArrowUp className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Money Paid
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveTransactionKpis.moneyPaid}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#D97706]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Completed This Month
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveTransactionKpis.completedThisMonth}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by transaction ID, executive, or reference..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !typeDropdownOpen
                closeAllDropdowns()
                setTypeDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedType}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {typeDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveTransactionTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedType(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedType === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !execDropdownOpen
                closeAllDropdowns()
                setExecDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedExecutive}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {execDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveTransactionExecutiveOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedExecutive(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedExecutive === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !statusDropdownOpen
                closeAllDropdowns()
                setStatusDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {statusDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveTransactionStatusOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedStatus(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedStatus === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !monthDropdownOpen
                closeAllDropdowns()
                setMonthDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {monthDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 right-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveTransactionMonthOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedMonth(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedMonth === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[880px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 bg-white">
                <th className="py-3.5 px-5 font-semibold">Transaction ID</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Executive</th>
                <th className="py-3.5 px-4 font-semibold">Type</th>
                <th className="py-3.5 px-4 font-semibold">Reference</th>
                <th className="py-3.5 px-4 font-semibold">Amount</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => onTransactionClick?.(tx)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">
                    {tx.transactionId}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <ReusableAvatar
                        src={tx.executiveAvatar}
                        name={tx.executiveName}
                        size={28}
                        shape="circle"
                        fallbackType="initials"
                        className="shrink-0"
                      />
                      <span className="font-semibold text-slate-900">
                        {tx.executiveName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {renderTypeBadge(tx.type)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {tx.reference}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {tx.amount}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span>{tx.status}</span>
                    </span>
                  </td>
                </tr>
              ))}

              {paginatedTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Showing 1–{paginatedTransactions.length} of {totalTransactionsCount} transactions
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#4F46E5] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <span className="text-slate-400 text-xs px-1">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === totalPages
                  ? "bg-[#4F46E5] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {totalPages}
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

