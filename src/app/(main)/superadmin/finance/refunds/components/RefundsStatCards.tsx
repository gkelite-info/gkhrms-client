"use client"

import { RotateCcw, Wallet, Calendar, TrendingUp } from "lucide-react"

interface MetricCard {
  id: string
  label: string
  value: string
  subtext: string
  icon: React.ComponentType<{ className?: string }>
  iconContainerClass: string
}

const STAT_CARDS: MetricCard[] = [
  {
    id: "total-refunds",
    label: "Total Refunds",
    value: "56",
    subtext: "+12.0% vs previous period",
    icon: RotateCcw,
    iconContainerClass: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "total-refunded-amount",
    label: "Total Refunded Amount",
    value: "₹ 7,84,000",
    subtext: "+8.6% vs previous period",
    icon: Wallet,
    iconContainerClass: "bg-blue-50 text-blue-600",
  },
  {
    id: "this-month-refunds",
    label: "This Month",
    value: "12",
    subtext: "+50.0% vs last month",
    icon: Calendar,
    iconContainerClass: "bg-sky-50 text-sky-600",
  },
]

export default function RefundsStatCards() {
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
              <div className="mt-1 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{card.subtext}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

