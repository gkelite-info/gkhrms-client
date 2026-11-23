"use client"

import { Layers, Activity, Briefcase, Target } from "lucide-react"
import {
  EXPENSES_STAT_CARDS,
  ExpenseStatCardItem,
} from "./ChairmanExpensesData"

export default function ChairmanExpensesStatCards() {
  const renderIcon = (icon: ExpenseStatCardItem["icon"]) => {
    switch (icon) {
      case "layers":
        return <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B50E5]" />
      case "activity":
        return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
      case "briefcase":
        return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
      case "target":
        return <Target className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
      {EXPENSES_STAT_CARDS.map((card) => (
        <div
          key={card.id}
          className="bg-white border border-slate-100/90 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-3 sm:gap-3.5 transition-all hover:shadow-sm"
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
          >
            {renderIcon(card.icon)}
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[11px] sm:text-xs font-medium text-slate-500 truncate block">
              {card.label}
            </span>

            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-0.5 leading-none truncate">
              {card.value}
            </div>

            <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-500">
                <span>▲</span>
                <span>{card.change}</span>
              </span>

              {card.subtext && (
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal">
                  {card.subtext}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
