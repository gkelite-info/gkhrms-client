"use client"

import { Building2 } from "lucide-react"
import { DEPARTMENT_STRENGTH_ITEMS } from "./ChairmanDashboardData"

export default function ChairmanDepartmentStrengthCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Department Strength
        </h2>
      </div>

      <div className="flex flex-col gap-2.5 my-auto">
        {DEPARTMENT_STRENGTH_ITEMS.map((item) => (
          <div key={item.department} className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium w-36 truncate text-[11px]">
              {item.department}
            </span>

            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
              <div
                className="h-full bg-[#5B50E5] rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            <span className="font-bold text-slate-900 text-xs w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
