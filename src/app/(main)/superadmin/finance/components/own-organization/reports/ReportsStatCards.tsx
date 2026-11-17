"use client"

import {
  Users,
  CalendarCheck,
  Coins,
  CreditCard,
  Umbrella,
  ArrowUp,
} from "lucide-react"
import { REPORT_STAT_CARDS } from "./ReportsData"

export default function ReportsStatCards() {
  const getIcon = (id: string) => {
    switch (id) {
      case "employees":
        return Users
      case "attendance":
        return CalendarCheck
      case "payroll":
        return Coins
      case "expenses":
        return CreditCard
      case "leave":
        return Umbrella
      default:
        return Users
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {REPORT_STAT_CARDS.map((card) => {
        const IconComponent = getIcon(card.id)

        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconContainer}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-slate-500 block leading-tight truncate">
                {card.label}
              </span>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  {card.value}
                </span>

                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                    card.isGood ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                  {card.change}
                </span>
              </div>

              <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                {card.comparedTo}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
