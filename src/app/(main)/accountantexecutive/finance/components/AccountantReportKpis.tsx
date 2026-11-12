"use client"

import { Download, Upload, Box, Scale } from "lucide-react"
import type { AccountantReportKpis as IAccountantReportKpis } from "../types"

interface AccountantReportKpisProps {
  kpis: IAccountantReportKpis
}

export default function AccountantReportKpis({ kpis }: AccountantReportKpisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
        <div className="w-11 h-11 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-[#16A34A]" />
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase truncate">
            Money Received
          </span>
          <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
            {kpis.moneyReceived}
          </span>
          <span className="block text-[11px] text-slate-400 mt-0.5 truncate">
            {kpis.moneyReceivedSubtitle}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
        <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
          <Upload className="w-5 h-5 text-[#EF4444]" />
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase truncate">
            Money Paid
          </span>
          <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
            {kpis.moneyPaid}
          </span>
          <span className="block text-[11px] text-slate-400 mt-0.5 truncate">
            {kpis.moneyPaidSubtitle}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
          <Box className="w-5 h-5 text-[#3B82F6]" />
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase truncate">
            Total Expenses
          </span>
          <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
            {kpis.totalExpenses}
          </span>
          <span className="block text-[11px] text-slate-400 mt-0.5 truncate">
            {kpis.totalExpensesSubtitle}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
        <div className="w-11 h-11 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
          <Scale className="w-5 h-5 text-[#8B5CF6]" />
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase truncate">
            Net Profit
          </span>
          <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
            {kpis.netProfit}
          </span>
          <span className="block text-[11px] font-semibold text-[#16A34A] mt-0.5 truncate">
            {kpis.netProfitTrend}
          </span>
        </div>
      </div>
    </div>
  )
}
