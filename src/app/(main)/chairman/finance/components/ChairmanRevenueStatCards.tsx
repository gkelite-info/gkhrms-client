"use client"

import {
  TrendingUp,
  Calendar,
  Database,
  Clock,
  BarChart3,
} from "lucide-react"
import {
  REVENUE_STAT_CARDS,
  RevenueStatCardItem,
} from "./ChairmanRevenueData"

export default function ChairmanRevenueStatCards() {
  const renderIcon = (icon: RevenueStatCardItem["icon"]) => {
    switch (icon) {
      case "trending-up":
        return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
      case "calendar":
        return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B50E5]" />
      case "database":
        return <Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
      case "clock":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
      case "bar-chart":
        return <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
      {REVENUE_STAT_CARDS.map((card) => (
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
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-0.5 leading-none">
              {card.value}
            </div>

            {card.change && (
              <div
                className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold mt-1 sm:mt-1.5 ${
                  card.isWarning ? "text-amber-600" : "text-emerald-500"
                }`}
              >
                <span>▲</span>
                <span>{card.change}</span>
              </div>
            )}

            {card.subtext && (
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal block mt-0.5 sm:mt-1">
                {card.subtext}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
