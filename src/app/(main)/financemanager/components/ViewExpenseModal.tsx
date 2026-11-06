"use client"

import { X, Calendar, DollarSign, User, Tag, FileText } from "lucide-react"
import { ExpenseRecord } from "../types"

interface ViewExpenseModalProps {
  expense: ExpenseRecord | null
  onClose: () => void
}

export default function ViewExpenseModal({
  expense,
  onClose,
}: ViewExpenseModalProps) {
  if (!expense) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#4F46E5]">
              {expense.expenseId}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Expense Record Details
            </h3>
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

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-slate-50/70 p-4 rounded-xl space-y-3 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Claim Amount</span>
              <span className="text-xl font-bold text-slate-900">
                {expense.formattedAmount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Current Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  expense.status === "Approved"
                    ? "bg-[#ECFDF5] text-[#059669]"
                    : expense.status === "Pending"
                    ? "bg-[#FFFBEB] text-[#D97706]"
                    : "bg-[#FEF2F2] text-[#DC2626]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    expense.status === "Approved"
                      ? "bg-[#059669]"
                      : expense.status === "Pending"
                      ? "bg-[#D97706]"
                      : "bg-[#DC2626]"
                  }`}
                />
                {expense.status}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Submitted By
              </span>
              <span className="font-semibold text-slate-800">
                {expense.submittedBy}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Expense Type
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  expense.expenseType === "Employee"
                    ? "bg-sky-50 text-sky-600 border border-sky-100"
                    : "bg-purple-50 text-purple-600 border border-purple-100"
                }`}
              >
                {expense.expenseType}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                Category
              </span>
              <span className="font-semibold text-slate-800">
                {expense.category}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Submitted On
              </span>
              <span className="text-slate-700 font-medium">
                {expense.submittedOn}
              </span>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Description / Memo
              </span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed text-[11px]">
                {expense.description || "No memo submitted with this voucher."}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

