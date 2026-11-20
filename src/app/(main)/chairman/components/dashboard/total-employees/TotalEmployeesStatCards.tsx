"use client"

import { User, UserCheck, UserPlus, ArrowUp, ArrowDown } from "lucide-react"
import { TOTAL_EMPLOYEES_STATS, TotalEmployeesStatItem } from "./TotalEmployeesData"

export default function TotalEmployeesStatCards() {
  const getIcon = (id: string) => {
    switch (id) {
      case "total_employees":
        return User
      case "active_employees":
        return UserCheck
      case "new_joiners":
        return UserPlus
      default:
        return User
    }
  }

  const renderBadge = (item: TotalEmployeesStatItem) => {
    if (item.badgeType === "percentage") {
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
          <ArrowDown className="w-3 h-3 stroke-[2.5]" />
          {item.badgeText}
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
        <ArrowUp className="w-3 h-3 stroke-[2.5]" />
        {item.badgeText}
      </span>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TOTAL_EMPLOYEES_STATS.map((card) => {
        const IconComponent = getIcon(card.id)

        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
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
