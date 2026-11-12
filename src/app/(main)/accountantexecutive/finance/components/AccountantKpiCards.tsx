"use client"

import { ArrowUp, CreditCard, Calendar, Coins } from "lucide-react"
import { AccountantKpi } from "../types"

interface AccountantKpiCardsProps {
  cards: AccountantKpi[]
}

export default function AccountantKpiCards({ cards }: AccountantKpiCardsProps) {
  const renderIcon = (type: AccountantKpi["iconType"]) => {
    switch (type) {
      case "received":
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
        )
      case "paid":
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
        )
      case "upcoming":
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 xl:gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-4 transition-all"
        >
          {renderIcon(card.iconType)}

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-slate-500 leading-none">
              {card.title}
            </span>

            <span className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-none mt-2">
              {card.value}
            </span>

            {card.trend && (
              <div className="flex items-center gap-1 font-semibold text-xs mt-2 text-emerald-600">
                <ArrowUp className="w-3.5 h-3.5 shrink-0" />
                <span>{card.trend}</span>
              </div>
            )}

            {card.subtitle && (
              <span className="text-xs font-medium text-slate-400 mt-2 leading-none">
                {card.subtitle}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

