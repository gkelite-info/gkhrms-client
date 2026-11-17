"use client"

import {
  Building2,
  Calendar,
  FileCheck,
  RefreshCw,
} from "lucide-react"

interface ActivePaidCompaniesStatCardsProps {
  totalCount?: number
  monthlyCount?: number
  annualCount?: number
  renewingCount?: number
}

export default function ActivePaidCompaniesStatCards({
  totalCount = 64,
  monthlyCount = 38,
  annualCount = 26,
  renewingCount = 12,
}: ActivePaidCompaniesStatCardsProps) {
  const cards = [
    {
      id: "total",
      label: "Total Active Companies",
      value: totalCount,
      icon: Building2,
      iconContainer: "bg-blue-50/80 text-blue-600 border border-blue-100",
    },
    {
      id: "monthly",
      label: "Monthly Plans",
      value: monthlyCount,
      icon: Calendar,
      iconContainer: "bg-indigo-50/80 text-[#5B50E5] border border-indigo-100",
    },
    {
      id: "annual",
      label: "Annual Plans",
      value: annualCount,
      icon: FileCheck,
      iconContainer: "bg-blue-50/80 text-blue-600 border border-blue-100",
    },
    {
      id: "renewing",
      label: "Renewing This Month",
      value: renewingCount,
      icon: RefreshCw,
      iconContainer: "bg-indigo-50/80 text-[#5B50E5] border border-indigo-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon

        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconContainer}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 block leading-tight">
                {card.label}
              </span>
              <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                {card.value}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
