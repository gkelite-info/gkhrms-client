"use client"

import { BarChart3 } from "lucide-react"
import { DEPARTMENT_WISE_COSTS } from "./ChairmanReportsData"

export default function ChairmanDepartmentCostProgressCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
          <BarChart3 className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Department-wise Cost
          </h2>
          <p className="text-[11px] text-slate-400">
            Total expenses by department
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 py-1 gap-2.5">
        {DEPARTMENT_WISE_COSTS.map((item) => (
          <div
            key={item.department}
            className="flex items-center justify-between gap-2.5 sm:gap-3 text-xs"
          >
            <span className="w-24 sm:w-32 shrink-0 font-medium text-slate-700 truncate text-[11px] sm:text-xs">
              {item.department}
            </span>

            <div className="flex-1 h-2.5 sm:h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                style={{ width: `${item.percentage * 2.5}%` }}
              />
            </div>

            <span className="w-20 sm:w-24 shrink-0 text-right font-bold text-slate-800 text-[10px] sm:text-[11px]">
              {item.amount}{" "}
              <span className="font-normal text-slate-400 text-[9px] sm:text-[10px]">
                ({item.percentage}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
