"use client"

import { ArrowUpRight, ArrowDownRight, Scale } from "lucide-react"

export default function ReceivablesVsPayablesCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Receivables vs Payables
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-normal">
          As of Aug 2025
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
        <div className="flex flex-col gap-2.5">
          <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Receivables
              </span>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 leading-tight">
                $2.76M
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 inline-flex items-center gap-0.5">
                <ArrowDownRight className="w-3 h-3" />
                -14.8%
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Payables
              </span>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 leading-tight">
                $1.94M
              </div>
              <div className="text-[11px] font-semibold text-rose-500 inline-flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +6.3%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EFF6FF] border border-purple-100/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-slate-500 font-medium">Balance</span>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            $0.82M
          </div>
          <div className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 mt-1">
            <span>▲</span>
            <span>+38.4%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
