"use client"

import { CreditCard, Calendar } from "lucide-react"

export default function ChairmanFinanceHeader() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5B50E5] border border-purple-100 flex items-center justify-center shrink-0">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Finance Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor your company&apos;s revenue, expenses, payroll cost and overall financial health.
          </p>
        </div>
      </div>

      <div className="bg-slate-50/70 border border-slate-100 rounded-xl px-4 py-2.5 flex items-center gap-3 self-start sm:self-auto">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0">
          <Calendar className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-800 block leading-tight">
            Tuesday, 26 Aug 2025
          </span>
          <span className="text-[10px] text-slate-400 font-normal block leading-tight mt-0.5">
            Last 12 Months (Sep 2024 - Aug 2025)
          </span>
        </div>
      </div>
    </div>
  )
}
