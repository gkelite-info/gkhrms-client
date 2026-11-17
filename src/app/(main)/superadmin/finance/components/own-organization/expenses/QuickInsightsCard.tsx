"use client"

import { ShoppingBag, TrendingUp, CalendarSync } from "lucide-react"
import { QUICK_INSIGHTS_DATA } from "./ExpensesData"

export default function QuickInsightsCard() {
  const getIcon = (type: string) => {
    switch (type) {
      case "category":
        return {
          icon: ShoppingBag,
          bg: "bg-[#EEF0FD]",
          color: "text-[#5B50E5]",
        }
      case "highest":
        return {
          icon: TrendingUp,
          bg: "bg-emerald-50",
          color: "text-emerald-600",
        }
      case "recurring":
      default:
        return {
          icon: CalendarSync,
          bg: "bg-blue-50",
          color: "text-blue-600",
        }
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
        Quick Insights
      </h2>

      <div className="flex flex-col gap-3">
        {QUICK_INSIGHTS_DATA.map((item) => {
          const { icon: Icon, bg, color } = getIcon(item.iconType)
          return (
            <div
              key={item.title}
              className="p-3.5 rounded-xl border border-slate-100/90 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.title}
                  </span>
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-900 shrink-0">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
