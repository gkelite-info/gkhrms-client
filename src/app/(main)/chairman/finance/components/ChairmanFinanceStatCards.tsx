"use client"

import {
  TrendingUp,
  Layers,
  BarChart2,
  Users,
  ArrowUpRight,
} from "lucide-react"
import { CHAIRMAN_FINANCE_STATS } from "./ChairmanFinanceData"

export default function ChairmanFinanceStatCards() {
  const getIcon = (id: string) => {
    switch (id) {
      case "total_revenue":
        return TrendingUp
      case "total_expenses":
        return Layers
      case "net_profit":
        return BarChart2
      case "payroll_cost":
        return Users
      case "pending_receivables":
        return ArrowUpRight
      case "pending_payables":
        return ArrowUpRight
      default:
        return TrendingUp
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {CHAIRMAN_FINANCE_STATS.map((card) => {
        const IconComponent = getIcon(card.id)

        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500 leading-tight">
                {card.label}
              </span>
            </div>

            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {card.value}
              </div>

              <div
                className={`inline-flex items-center gap-0.5 text-[11px] font-semibold mt-1 ${
                  card.isGood ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                <span>{card.isIncrease ? "▲" : "▼"}</span>
                <span>{card.change}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
