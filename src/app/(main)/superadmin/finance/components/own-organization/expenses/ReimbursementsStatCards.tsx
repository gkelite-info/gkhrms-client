"use client"

import { Users, CheckCircle2, Clock, Calendar, ArrowUp } from "lucide-react"

interface ReimbursementsStatCardsProps {
  totalReimbursements?: string
  paidAmount?: string
  pendingAmount?: string
  thisMonth?: string
  monthComparison?: string
}

export default function ReimbursementsStatCards({
  totalReimbursements = "₹ 3,25,000",
  paidAmount = "₹ 2,40,000",
  pendingAmount = "₹ 85,000",
  thisMonth = "₹ 1,10,000",
  monthComparison = "vs ₹ 1,00,000 (Oct 2026)",
}: ReimbursementsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#EEF0FD] text-[#5B50E5] flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-400">
            Total Reimbursements
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mt-0.5 truncate">
            {totalReimbursements}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-400">
            Paid Amount
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mt-0.5 truncate">
            {paidAmount}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-400">
            Pending Amount
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mt-0.5 truncate">
            {pendingAmount}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4 relative">
        <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-400">
              This Month
            </span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              <ArrowUp className="w-3 h-3" />
              10.0%
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mt-0.5 truncate">
            {thisMonth}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 truncate">
            {monthComparison}
          </span>
        </div>
      </div>
    </div>
  )
}
