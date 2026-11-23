"use client"

import { FileText } from "lucide-react"
import { PAYROLL_SUMMARY_METRICS } from "./ChairmanPayrollData"

export default function ChairmanPayrollSummaryCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Payroll Summary
        </h2>
      </div>

      <div className="flex flex-col justify-between flex-1 py-1 gap-3.5 mt-2">
        {PAYROLL_SUMMARY_METRICS.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="font-bold text-slate-900">{item.amount}</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                style={{ width: `${Math.max(item.percentage, 4)}%` }}
              />
            </div>

            <span className="text-[10px] text-slate-400 font-normal self-end">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
