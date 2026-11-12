"use client"

import { FileText, Clock, Check, CreditCard, X } from "lucide-react"
import { AccountantReimbursementKpis as KpiData } from "../types"

interface AccountantReimbursementKpisProps {
  kpis: KpiData
}

export default function AccountantReimbursementKpis({
  kpis,
}: AccountantReimbursementKpisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 xl:gap-3.5">
      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 xl:w-5 xl:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Total Claims
          </span>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.totalClaimsAmount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 xl:w-5 xl:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Pending Review
          </span>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mt-0.5">
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {kpis.pendingReviewAmount}
            </span>
            <span className="text-[10px] xl:text-[11px] font-medium text-slate-400 whitespace-nowrap">
              ({kpis.pendingReviewCount} Claims)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 xl:w-5 xl:h-5 stroke-[2.5]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Approved for Payment
          </span>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mt-0.5">
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {kpis.approvedPaymentAmount}
            </span>
            <span className="text-[10px] xl:text-[11px] font-medium text-slate-400 whitespace-nowrap">
              ({kpis.approvedPaymentCount} Claims)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
          <CreditCard className="w-4 h-4 xl:w-5 xl:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Paid This Month
          </span>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mt-0.5">
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {kpis.paidThisMonthAmount}
            </span>
            <span className="text-[10px] xl:text-[11px] font-medium text-slate-400 whitespace-nowrap">
              ({kpis.paidThisMonthCount} Claims)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 xl:p-4 border border-slate-100 shadow-xs flex items-center gap-3 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <X className="w-4 h-4 xl:w-5 xl:h-5 stroke-[2.5]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] xl:text-xs font-medium text-slate-500 block leading-tight truncate">
            Rejected Claims
          </span>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mt-0.5">
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {kpis.rejectedClaimsAmount}
            </span>
            <span className="text-[10px] xl:text-[11px] font-medium text-slate-400 whitespace-nowrap">
              ({kpis.rejectedClaimsCount} Claims)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
