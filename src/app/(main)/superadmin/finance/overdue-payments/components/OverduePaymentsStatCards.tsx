"use client"

import { Calendar, Clock, TrendingUp } from "lucide-react"

interface MetricCard {
  id: string
  label: string
  value: string
  subtext?: string
  icon: React.ComponentType<{ className?: string }>
  iconContainerClass: string
}

const STAT_CARDS: MetricCard[] = [
  {
    id: "total-overdue",
    label: "Total Overdue",
    value: "₹ 5,80,000",
    subtext: "6 Companies",
    icon: Calendar,
    iconContainerClass: "bg-[#EEF0FD] text-[#5B50E5]",
  },
  {
    id: "this-month-overdue",
    label: "This Month Overdue",
    value: "₹ 3,10,000",
    subtext: "4 Companies",
    icon: Clock,
    iconContainerClass: "bg-[#FEF9C3] text-[#CA8A04]",
  },
  {
    id: "highest-overdue",
    label: "Highest Overdue",
    value: "₹ 1,50,000",
    icon: TrendingUp,
    iconContainerClass: "bg-[#FFE4E6] text-[#E11D48]",
  },
]

export default function OverduePaymentsStatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {STAT_CARDS.map((card) => {
        const IconComponent = card.icon
        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-6 shadow-xs flex items-center gap-5 transition-shadow hover:shadow-sm"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconContainerClass}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 block">
                {card.label}
              </span>
              <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
                {card.value}
              </div>
              {card.subtext && (
                <span className="text-xs font-medium text-slate-400 mt-1 block">
                  {card.subtext}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

