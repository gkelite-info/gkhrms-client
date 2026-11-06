"use client"

import { useState } from "react"
import { Transaction, TransactionStatus } from "../types"
import AllTransactionsModal from "./AllTransactionsModal"

interface RecentTransactionsTableProps {
  transactions: Transaction[]
  searchQuery?: string
  onTransactionClick?: (tx: Transaction) => void
}

export default function RecentTransactionsTable({
  transactions,
  searchQuery = "",
  onTransactionClick,
}: RecentTransactionsTableProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = transactions.filter((tx) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      tx.reference.toLowerCase().includes(q) ||
      tx.type.toLowerCase().includes(q) ||
      tx.status.toLowerCase().includes(q) ||
      tx.date.toLowerCase().includes(q) ||
      tx.formattedAmount.toLowerCase().includes(q)
    )
  })

  const displayList = filtered.slice(0, 5)

  const renderStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "Paid":
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            {status}
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            {status}
          </span>
        )
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            {status}
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            {status}
          </span>
        )
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Recent Transactions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Overview of latest recorded company expenses and financial transfers
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] hover:underline transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1 font-semibold">Date</th>
                <th className="pb-3 pt-1 font-semibold">Type</th>
                <th className="pb-3 pt-1 font-semibold">Reference</th>
                <th className="pb-3 pt-1 font-semibold">Amount</th>
                <th className="pb-3 pt-1 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {displayList.length > 0 ? (
                displayList.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => onTransactionClick?.(tx)}
                    className="hover:bg-indigo-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 text-slate-600 font-normal whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3.5 text-slate-800 font-medium whitespace-nowrap">
                      {tx.type}
                    </td>
                    <td className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {tx.reference}
                    </td>
                    <td className="py-3.5 text-slate-900 font-bold whitespace-nowrap">
                      {tx.formattedAmount}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderStatusBadge(tx.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-slate-400 text-xs"
                  >
                    No transactions match your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AllTransactionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        transactions={transactions}
        onTransactionClick={onTransactionClick}
      />
    </>
  )
}

