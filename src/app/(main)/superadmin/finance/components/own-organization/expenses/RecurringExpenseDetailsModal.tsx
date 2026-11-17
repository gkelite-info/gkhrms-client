"use client"

import { X, Check, Calendar, Landmark, CreditCard, ArrowUpRight, Banknote, Building2 } from "lucide-react"
import { RecurringExpenseRecord } from "./RecurringExpensesData"

interface RecurringExpenseDetailsModalProps {
  item: RecurringExpenseRecord | null
  onClose: () => void
}

export default function RecurringExpenseDetailsModal({
  item,
  onClose,
}: RecurringExpenseDetailsModalProps) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-[#5B50E5] uppercase tracking-wider">
              {item.frequency} Schedule
            </span>
            <h3 className="text-base font-bold text-slate-800 leading-tight mt-0.5">
              {item.expenseName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Amount
            </span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5">
              {item.amount}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              item.status === "Active"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-amber-50 text-amber-600 border border-amber-100"
            }`}
          >
            {item.status === "Active" ? (
              <Check className="w-3 h-3" />
            ) : null}
            {item.status}
          </span>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Building2 className="w-3.5 h-3.5" />
              Vendor / Service
            </span>
            <span className="font-semibold text-slate-800">{item.vendor}</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              Next Due Date
            </span>
            <span className="font-semibold text-slate-800">
              {item.nextDueDate}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-500">
              <CreditCard className="w-3.5 h-3.5" />
              Payment Method
            </span>
            <span className="font-semibold text-slate-800">
              {item.paymentMethod}
            </span>
          </div>

          {item.notes && (
            <div className="flex flex-col gap-1 pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">
                Notes
              </span>
              <p className="text-slate-700 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                {item.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
