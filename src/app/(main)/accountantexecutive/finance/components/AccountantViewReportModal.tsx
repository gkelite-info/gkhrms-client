"use client"

import { useState, useMemo } from "react"
import {
  X,
  Calendar,
  Search,
  ChevronDown,
  ArrowDown,
  ArrowUp,
  Layers,
  BarChart2,
  Landmark,
  CreditCard,
  Plane,
  Wifi,
  Briefcase,
  Building2,
  ShoppingCart,
  Plus,
  Coffee,
} from "lucide-react"
import { ReportSummaryRow, ReportTransactionItem } from "../types"
import {
  mockReportTransactions,
  reportExpenseTypeFilterOptions,
} from "../data/mockAccountantData"

interface AccountantViewReportModalProps {
  report: ReportSummaryRow | null
  onClose: () => void
}

export default function AccountantViewReportModal({
  report,
  onClose,
}: AccountantViewReportModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpenseType, setSelectedExpenseType] = useState("All Types")
  const [expenseTypeDropdownOpen, setExpenseTypeDropdownOpen] = useState(false)

  const filteredTransactions = useMemo(() => {
    return mockReportTransactions.filter((item) => {
      if (
        selectedExpenseType !== "All Types" &&
        item.expenseType.toLowerCase() !== selectedExpenseType.toLowerCase()
      ) {
        return false
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesId = item.paymentId.toLowerCase().includes(query)
        const matchesEmployee = item.employee.toLowerCase().includes(query)
        const matchesType = item.expenseType.toLowerCase().includes(query)
        const matchesDept = item.department.toLowerCase().includes(query)

        if (!matchesId && !matchesEmployee && !matchesType && !matchesDept) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, selectedExpenseType])

  if (!report) return null

  const renderExpenseTypeBadge = (type: string) => {
    switch (type) {
      case "Travel":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#9333EA]">
            <Plane className="w-3 h-3 text-[#9333EA]" />
            <span>Travel</span>
          </span>
        )
      case "WFH Internet":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0F9FF] text-[#0284C7]">
            <Wifi className="w-3 h-3 text-[#0284C7]" />
            <span>WFH Internet</span>
          </span>
        )
      case "Client Visit Travel":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#9333EA]">
            <Briefcase className="w-3 h-3 text-[#9333EA]" />
            <span>Client Visit Travel</span>
          </span>
        )
      case "Hotel Stay":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ECFEFF] text-[#0891B2]">
            <Building2 className="w-3 h-3 text-[#0891B2]" />
            <span>Hotel Stay</span>
          </span>
        )
      case "Office Purchase":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FDF2F8] text-[#DB2777]">
            <ShoppingCart className="w-3 h-3 text-[#DB2777]" />
            <span>Office Purchase</span>
          </span>
        )
      case "Medical Reimbursement":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#9333EA]">
            <Plus className="w-3 h-3 text-[#9333EA]" />
            <span>Medical Reimbursement</span>
          </span>
        )
      case "Meal Reimbursement":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ECFEFF] text-[#0891B2]">
            <Coffee className="w-3 h-3 text-[#0891B2]" />
            <span>Meal Reimbursement</span>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            <span>{type}</span>
          </span>
        )
    }
  }

  const renderPaymentMethod = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return (
          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
            <Landmark className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Bank Transfer</span>
          </div>
        )
      case "Card":
        return (
          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
            <CreditCard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Card</span>
          </div>
        )
      case "UPI":
        return (
          <div className="flex items-center gap-1 text-indigo-600 font-bold tracking-tight">
            <span className="italic text-xs font-extrabold">{"//"}</span>
            <span className="text-xs">UPI</span>
          </div>
        )
      default:
        return <span className="text-slate-800 font-medium">{method}</span>
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-4xl sm:max-w-5xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] border border-purple-100 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Report Details – {report.period}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                All financial transactions for the selected month.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 space-y-4 flex-1 overflow-y-auto max-h-[64vh] modal-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-100/80">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-100/60 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#EAF7EE] flex items-center justify-center shrink-0">
                <ArrowDown className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-medium text-slate-400 leading-tight truncate">
                  Money Received
                </span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight mt-0.5 truncate">
                  {report.moneyReceived}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-100/60 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
                <ArrowUp className="w-4 h-4 text-[#EF4444]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-medium text-slate-400 leading-tight truncate">
                  Money Paid
                </span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight mt-0.5 truncate">
                  {report.moneyPaid}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-100/60 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-medium text-slate-400 leading-tight truncate">
                  Total Expenses
                </span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight mt-0.5 truncate">
                  {report.totalExpenses}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-100/60 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center shrink-0">
                <BarChart2 className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-medium text-slate-400 leading-tight truncate">
                  Net Profit
                </span>
                <span className="block text-xs sm:text-sm font-bold text-[#16A34A] tracking-tight leading-tight mt-0.5 truncate">
                  {report.netProfit}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by payment ID, employee or expense type..."
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="relative self-end sm:self-auto min-w-[140px]">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Expense Type
              </label>
              <button
                type="button"
                onClick={() => setExpenseTypeDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
              >
                <span className="truncate">{selectedExpenseType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {expenseTypeDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setExpenseTypeDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-1.5 right-0 z-30 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                    {reportExpenseTypeFilterOptions.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setSelectedExpenseType(type)
                          setExpenseTypeDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                          selectedExpenseType === type
                            ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                            : "text-slate-700 font-medium"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Payment ID</th>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Designation</th>
                    <th className="py-3 px-4">Expense Type</th>
                    <th className="py-3 px-4">Payment Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {tx.paymentId}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {tx.employee}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {tx.department}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {tx.designation}
                      </td>
                      <td className="py-3.5 px-4">
                        {renderExpenseTypeBadge(tx.expenseType)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {tx.paymentDate}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {tx.amount}
                      </td>
                      <td className="py-3.5 px-4">
                        {renderPaymentMethod(tx.paymentMethod)}
                      </td>
                    </tr>
                  ))}

                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-8 text-center text-xs text-slate-400"
                      >
                        No transactions found matching your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between bg-white shrink-0">
          <span className="text-xs text-slate-400">
            Showing 1 – {filteredTransactions.length} of{" "}
            {mockReportTransactions.length} transactions
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
