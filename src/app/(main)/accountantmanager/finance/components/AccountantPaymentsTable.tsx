"use client"

import { useState } from "react"
import {
  Building2,
  User,
  Landmark,
  CreditCard,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { AccountantPayment } from "../types"

interface AccountantPaymentsTableProps {
  payments: AccountantPayment[]
  totalCount?: number
  onViewPayment?: (payment: AccountantPayment) => void
}

export default function AccountantPaymentsTable({
  payments,
  totalCount = 152,
  onViewPayment,
}: AccountantPaymentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false)

  const rowsPerPageOptions = [10, 20, 50]
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 19

  const renderPaymentTypeBadge = (type: "Vendor Payment" | "Reimbursement") => {
    if (type === "Vendor Payment") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF5FF] text-[#9333EA] border border-[#F3E8FF]">
          <Building2 className="w-3 h-3 text-[#A855F7] shrink-0" />
          <span>Vendor Payment</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F0F9FF] text-[#0284C7] border border-[#E0F2FE]">
        <User className="w-3 h-3 text-[#0284C7] shrink-0" />
        <span>Reimbursement</span>
      </span>
    )
  }

  const renderPaymentMethod = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return (
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Landmark className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Bank Transfer</span>
          </div>
        )
      case "UPI":
        return (
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <span className="italic font-extrabold text-[11px] text-indigo-600 tracking-tight leading-none">
              UPI
            </span>
            <span>UPI</span>
          </div>
        )
      case "Card":
        return (
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <CreditCard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Card</span>
          </div>
        )
      default:
        return <span className="text-slate-700 font-medium">{method}</span>
    }
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
            Paid
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600">
            Pending
          </span>
        )
      case "Failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
            Failed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            {status}
          </span>
        )
    }
  }

  const displayedList = payments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )
  const fallbackList = payments.slice(0, rowsPerPage)
  const currentList = displayedList.length > 0 ? displayedList : fallbackList

  const displayStart =
    payments.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0
  const displayEnd =
    payments.length > 0
      ? Math.min((currentPage - 1) * rowsPerPage + currentList.length, totalCount)
      : 0

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-white">
              <th className="py-3.5 px-5 font-semibold">PAYMENT ID</th>
              <th className="py-3.5 px-4 font-semibold">DATE</th>
              <th className="py-3.5 px-4 font-semibold">PAYMENT TYPE</th>
              <th className="py-3.5 px-4 font-semibold">TO / PAYEE</th>
              <th className="py-3.5 px-4 font-semibold">REFERENCE</th>
              <th className="py-3.5 px-4 font-semibold">AMOUNT</th>
              <th className="py-3.5 px-4 font-semibold">PAYMENT METHOD</th>
              <th className="py-3.5 px-4 font-semibold">STATUS</th>
              <th className="py-3.5 px-5 font-semibold text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentList.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-xs text-slate-400">
                  No payment records match your current filters.
                </td>
              </tr>
            ) : (
              currentList.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-slate-50/70 transition-colors text-xs text-slate-700"
                >
                  <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">
                    {payment.paymentId}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                    {payment.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {renderPaymentTypeBadge(payment.paymentType)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                    {payment.payee}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">
                    {payment.reference}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {payment.amount}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {renderPaymentMethod(payment.paymentMethod)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {renderStatus(payment.status)}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => onViewPayment && onViewPayment(payment)}
                      className="w-7 h-7 rounded-full inline-flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200/80 transition-colors cursor-pointer"
                      title="View payment details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
        <div>
          Showing <span className="font-semibold text-slate-700">{displayStart}</span> –{" "}
          <span className="font-semibold text-slate-700">{displayEnd}</span> of{" "}
          <span className="font-semibold text-slate-700">{totalCount}</span> payments
        </div>

        <div className="flex flex-wrap items-center gap-4 self-end sm:self-auto">
          <div className="relative flex items-center gap-2">
            <span>Rows per page:</span>
            <button
              type="button"
              onClick={() => setRowsDropdownOpen(!rowsDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
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

