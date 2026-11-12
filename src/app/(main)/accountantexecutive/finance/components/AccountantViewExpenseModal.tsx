"use client"

import {
  X,
  Calendar,
  Building2,
  Tag,
  CreditCard,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  FileEdit,
} from "lucide-react"
import { AccountantExpenseEntry } from "../types"

interface AccountantViewExpenseModalProps {
  expense: AccountantExpenseEntry | null
  onClose: () => void
  onEdit?: (expense: AccountantExpenseEntry) => void
}

export default function AccountantViewExpenseModal({
  expense,
  onClose,
  onEdit,
}: AccountantViewExpenseModalProps) {
  if (!expense) return null

  const renderStatusBadge = () => {
    switch (expense.status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        )
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Paid
          </span>
        )
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200/60">
            <FileEdit className="w-3.5 h-3.5" />
            Draft
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Expense Entry Details
            </h3>
            <p className="text-[11px] text-slate-400">
              Entry ID: {expense.id} • Bill #{expense.billNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto modal-scrollbar p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                Bill Amount
              </span>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {expense.amount}
              </p>
              {expense.taxGst && (
                <span className="text-[11px] text-slate-500 font-normal mt-0.5 block">
                  Includes Tax/GST: {expense.taxGst}
                </span>
              )}
            </div>
            <div>{renderStatusBadge()}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Expense Type</span>
              </div>
              <p className="font-semibold text-slate-800">
                {expense.expenseType}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Vendor / Provider</span>
              </div>
              <p className="font-semibold text-slate-800">{expense.vendor}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Bill Date</span>
              </div>
              <p className="font-semibold text-slate-800">{expense.billDate}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Due Date</span>
              </div>
              <p className="font-semibold text-slate-800">{expense.dueDate}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <CreditCard className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Payment Method</span>
            </div>
            <p className="font-semibold text-slate-800">
              {expense.paymentMethod}
            </p>
          </div>

          {expense.notes && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Expense Notes
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                {expense.notes}
              </div>
            </div>
          )}

          {expense.attachmentName && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Attached Bill / Invoice
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-[#4F46E5] shrink-0" />
                  <span className="font-medium text-slate-700 truncate">
                    {expense.attachmentName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${expense.attachmentName}`)}
                  className="flex items-center gap-1 text-[#4F46E5] hover:text-[#4338CA] font-semibold text-xs transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-slate-50/50 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => {
                onClose()
                onEdit(expense)
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Edit Entry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

