"use client"

import { useState } from "react"
import { X, Search, Download, Filter } from "lucide-react"
import { Transaction, TransactionStatus } from "../types"

interface AllTransactionsModalProps {
  isOpen: boolean
  onClose: () => void
  transactions: Transaction[]
  onTransactionClick?: (tx: Transaction) => void
}

export default function AllTransactionsModal({
  isOpen,
  onClose,
  transactions,
  onTransactionClick,
}: AllTransactionsModalProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")

  if (!isOpen) return null

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.type.toLowerCase().includes(search.toLowerCase()) ||
      (tx.department && tx.department.toLowerCase().includes(search.toLowerCase())) ||
      (tx.submittedBy && tx.submittedBy.toLowerCase().includes(search.toLowerCase()))

    const matchesStatus =
      statusFilter === "All" || tx.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "Paid":
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            {status}
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            {status}
          </span>
        )
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            {status}
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            {status}
          </span>
        )
    }
  }

  const exportCsv = () => {
    const header = "Date,Type,Reference,Amount,Status,Department,Submitted By\n"
    const rows = filtered
      .map(
        (t) =>
          `"${t.date}","${t.type}","${t.reference}","${t.formattedAmount}","${t.status}","${t.department || ""}","${t.submittedBy || ""}"`
      )
      .join("\n")
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `finance_transactions_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              All Financial Transactions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive log of company expenses, reimbursements, and payouts
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, type, dept..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="button"
              onClick={exportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 font-semibold">Date</th>
                <th className="py-3 font-semibold">Type</th>
                <th className="py-3 font-semibold">Reference</th>
                <th className="py-3 font-semibold">Department</th>
                <th className="py-3 font-semibold">Amount</th>
                <th className="py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filtered.length > 0 ? (
                filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => {
                      onClose()
                      onTransactionClick?.(tx)
                    }}
                    className="hover:bg-indigo-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3 text-slate-800 font-medium whitespace-nowrap">
                      {tx.type}
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {tx.reference}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {tx.department || "General"}
                    </td>
                    <td className="py-3 text-slate-900 font-bold whitespace-nowrap">
                      {tx.formattedAmount}
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No transactions match the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of {transactions.length} records</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

