"use client"

import { CreditCard, ArrowLeftRight, Calendar } from "lucide-react"
import { AccountantTransactionKpis as KpiData } from "../types"

interface AccountantTransactionKpisProps {
  kpis: KpiData
}

export default function AccountantTransactionKpis({
  kpis,
}: AccountantTransactionKpisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm overflow-hidden">
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
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 leading-tight">
              Total Receipts
            </span>
            <span className="text-[11px] text-slate-400 font-normal leading-tight">
              (Money Received)
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.totalReceipts}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-11 h-11 rounded-xl bg-[#FDF2F2] flex items-center justify-center shrink-0">
          <CreditCard className="w-5 h-5 text-rose-500" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 leading-tight">
              Total Payments
            </span>
            <span className="text-[11px] text-slate-400 font-normal leading-tight">
              (Money Paid)
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.totalPayments}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-11 h-11 rounded-xl bg-[#EFFBFA] flex items-center justify-center shrink-0">
          <ArrowLeftRight className="w-5 h-5 text-cyan-600" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-medium text-slate-500 block leading-tight">
            Total Transactions
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.totalTransactions}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm overflow-hidden">
        <div className="w-11 h-11 rounded-xl bg-[#F3EFFE] flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-medium text-slate-500 block leading-tight">
            This Month
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.thisMonthAmount}
          </p>
          <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
            <span>↑</span>
            <span>{kpis.thisMonthTrend}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

