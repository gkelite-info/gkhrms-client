"use client"

import { ShieldCheck, ArrowLeftRight } from "lucide-react"
import { AccountantPaymentKpis as KpiData } from "../types"

interface AccountantPaymentKpisProps {
  kpis: KpiData
}

export default function AccountantPaymentKpis({ kpis }: AccountantPaymentKpisProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 xl:gap-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
            TOTAL PAYMENTS
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.totalPayments}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {kpis.totalPaymentsCount} payments
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
            PAYMENTS THIS MONTH
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.paymentsThisMonth}
          </p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
            <span>↑</span>
            <span>+8.6%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center shrink-0">
          <ArrowLeftRight className="w-5 h-5 text-rose-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block mb-1.5">
            BY TYPE
          </span>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs gap-2">
              <span className="text-slate-500 font-medium truncate">Vendor Payments</span>
              <span className="font-bold text-slate-900 shrink-0">
                {kpis.vendorPaymentsAmount}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs gap-2">
              <span className="text-slate-500 font-medium truncate">Reimbursements</span>
              <span className="font-bold text-slate-900 shrink-0">
                {kpis.reimbursementsAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

