"use client"

import { Briefcase, CheckCircle, Clock, FileText } from "lucide-react"
import {
  RECEIVABLES_PAYABLES_STATS,
  ReceivablesPayablesStatItem,
} from "./ChairmanReceivablesPayablesData"

export default function ChairmanReceivablesPayablesStatCards() {
  const renderIcon = (icon: ReceivablesPayablesStatItem["icon"]) => {
    switch (icon) {
      case "briefcase":
        return <Briefcase className="w-4 h-4 text-emerald-600" />
      case "check":
        return <CheckCircle className="w-4 h-4 text-cyan-600" />
      case "clock":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "file-text":
        return <FileText className="w-4 h-4 text-[#5B50E5]" />
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5">
      {RECEIVABLES_PAYABLES_STATS.map((card) => (
        <div
          key={card.id}
          className="bg-white border border-slate-100/90 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between transition-all hover:shadow-sm min-h-[100px] sm:min-h-[110px]"
        >
          <div className="flex items-center justify-between gap-2">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
            >
              {renderIcon(card.icon)}
            </div>

            {card.badge && (
              <span
                className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                  card.badge.isPositive
                    ? "text-emerald-600 bg-emerald-50 border border-emerald-100"
                    : "text-rose-500 bg-rose-50 border border-rose-100"
                }`}
              >
                {card.badge.text}
              </span>
            )}
          </div>

          <div className="mt-2.5 sm:mt-3">
            <span className="text-[11px] sm:text-xs font-medium text-slate-500 block truncate">
              {card.label}
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-0.5 leading-tight truncate">
              {card.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
