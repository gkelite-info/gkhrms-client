"use client"

import { useState } from "react"
import { TrendingUp, User, Calendar, ChevronDown } from "lucide-react"
import {
  REPORTS_STAT_CARDS,
  ReportsStatCardItem,
} from "./ChairmanReportsData"

export default function ChairmanReportsStatCards() {
  const [dateRange, setDateRange] = useState("Jan 1, 2025 – Mar 31, 2025")
  const [isOpen, setIsOpen] = useState(false)

  const ranges = [
    "Jan 1, 2025 – Mar 31, 2025",
    "Oct 1, 2024 – Dec 31, 2024",
    "Jul 1, 2024 – Sep 30, 2024",
    "Apr 1, 2024 – Jun 30, 2024",
  ]

  const renderIcon = (icon: ReportsStatCardItem["icon"]) => {
    switch (icon) {
      case "trending-up":
        return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
      case "rupee-expenses":
        return <span className="text-sm sm:text-base font-bold text-rose-500">₹</span>
      case "rupee-profit":
        return <span className="text-sm sm:text-base font-bold text-[#5B50E5]">₹</span>
      case "user":
        return <User className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5">
      <div className="flex justify-start sm:justify-end">
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto justify-between bg-white border border-slate-200/80 rounded-xl px-3 sm:px-3.5 py-1.5 flex items-center gap-2 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer text-xs font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{dateRange}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {ranges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => {
                    setDateRange(range)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    dateRange === range
                      ? "font-bold text-[#5B50E5]"
                      : "text-slate-600"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {REPORTS_STAT_CARDS.map((card) => (
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
                <span
                  className={`inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold ${
                    card.id === "total_expenses"
                      ? "text-rose-500"
                      : "text-emerald-500"
                  }`}
                >
                  <span>↑</span>
                  <span>{card.change}</span>
                </span>

                <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal">
                  {card.subtext}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
