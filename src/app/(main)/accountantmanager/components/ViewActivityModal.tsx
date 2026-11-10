"use client"

import { X, CheckCircle2, Calendar, FileText, CreditCard, RotateCcw } from "lucide-react"
import { RecentActivity } from "../types"

interface ViewActivityModalProps {
  activity: RecentActivity | null
  onClose: () => void
}

export default function ViewActivityModal({
  activity,
  onClose,
}: ViewActivityModalProps) {
  if (!activity) return null

  const renderBadge = (type: RecentActivity["type"]) => {
    switch (type) {
      case "expense":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            Expense
          </span>
        )
      case "payment":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
            Payment
          </span>
        )
      case "reimbursement":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200/60">
            Reimbursement
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Activity Details</h3>
            <p className="text-[11px] text-slate-400">Transaction ID: {activity.id}</p>
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
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Activity Type</span>
            {renderBadge(activity.type)}
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Description</span>
            <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {activity.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">Amount</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{activity.amount}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">Date</span>
              <p className="text-xs font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {activity.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-800 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Recorded and reconciled successfully in accounting records.</span>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

