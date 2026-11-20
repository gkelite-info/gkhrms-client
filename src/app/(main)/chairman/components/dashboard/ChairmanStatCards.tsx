"use client"

import {
  Users,
  Network,
  UserCheck,
  UserPlus,
  TrendingDown,
} from "lucide-react"
import { CHAIRMAN_KPI_STATS, ChairmanStatItem } from "./ChairmanDashboardData"

interface ChairmanStatCardsProps {
  onSelectCard?: (id: string) => void
}

export default function ChairmanStatCards({
  onSelectCard,
}: ChairmanStatCardsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "total_employees":
        return Users
      case "active_departments":
        return Network
      case "present_today":
        return UserCheck
      case "new_joiners":
        return UserPlus
      case "attrition_rate":
        return TrendingDown
      default:
        return Users
    }
  }

  const renderBadge = (item: ChairmanStatItem) => {
    if (item.badgeType === "neutral") {
      return (
        <span className="text-[11px] text-slate-400 font-normal">
          {item.badgeText}
        </span>
      )
    }

    if (item.badgeType === "percentage") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          {item.badgeText}
        </span>
      )
    }

    const isDecrease = item.badgeType === "decrease"
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
        <span>{isDecrease ? "▼" : "▲"}</span>
        <span>{item.badgeText}</span>
      </span>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {CHAIRMAN_KPI_STATS.map((card) => {
        const IconComponent = getIcon(card.id)
        const isClickable = Boolean(onSelectCard)

        return (
          <div
            key={card.id}
            onClick={() => onSelectCard?.(card.id)}
            className={`bg-white border border-slate-100/90 rounded-2xl p-4 xl:p-5 shadow-xs flex items-center gap-3.5 xl:gap-4 min-h-[96px] ${
              isClickable
                ? "cursor-pointer hover:border-[#5B50E5]/50 hover:shadow-sm active:scale-[0.99] transition-all"
                : ""
            }`}
          >
            <div
              className={`w-10 h-10 xl:w-11 xl:h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-slate-500 block leading-tight whitespace-normal">
                {card.label}
              </span>

              <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                {card.value}
              </div>

              <div className="mt-0.5">{renderBadge(card)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
