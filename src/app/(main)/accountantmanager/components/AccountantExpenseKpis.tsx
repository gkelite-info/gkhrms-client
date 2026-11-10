"use client"

import { FileText, Bookmark, Calendar, PenLine } from "lucide-react"
import { AccountantExpenseKpis as KpiData } from "../types"

interface AccountantExpenseKpisProps {
  kpis: KpiData
}

export default function AccountantExpenseKpis({
  kpis,
}: AccountantExpenseKpisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 xl:gap-3.5">
      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#F4F3FF] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 xl:w-5 xl:h-5 text-[#6366F1]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Total Expense Entries
          </span>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.totalEntries}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center shrink-0">
          <Bookmark className="w-4 h-4 xl:w-5 xl:h-5 text-[#F59E0B]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Pending Bills
          </span>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mt-0.5">
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {kpis.pendingBillsCount}
            </span>
            <span className="text-xs font-bold text-slate-400">•</span>
            <span className="text-xs sm:text-sm xl:text-base font-bold text-slate-800 whitespace-nowrap">
              {kpis.pendingBillsAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4 xl:w-5 xl:h-5 text-[#EF4444]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Due This Week
          </span>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mt-0.5">
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {kpis.dueThisWeekCount}
            </span>
            <span className="text-xs sm:text-sm xl:text-base font-bold text-slate-800 whitespace-nowrap">
              {kpis.dueThisWeekAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#ECFEFF] flex items-center justify-center shrink-0">
          <PenLine className="w-4 h-4 xl:w-5 xl:h-5 text-[#06B6D4]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Draft Entries
          </span>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.draftEntriesCount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 xl:w-5 xl:h-5 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Paid This Month
          </span>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.paidThisMonthAmount}
          </p>
        </div>
      </div>
    </div>
  )
}
